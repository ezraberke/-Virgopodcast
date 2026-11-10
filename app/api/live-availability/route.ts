import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { DateTime } from "luxon";
import { eventWindows, openWindows, ZONE, type Rule, type Window } from "../../../lib/live-availability";
export const dynamic="force-dynamic";
export const runtime="nodejs";
const headers={"Cache-Control":"no-store"};
type Source={id:string; mode:"events"|"freebusy"; rule?:Rule};
export async function GET(request:NextRequest) {
  const month=request.nextUrl.searchParams.get("month") || "";
  const first=DateTime.fromFormat(month,"yyyy-MM",{zone:ZONE}).startOf("month");
  const now=DateTime.now().setZone(ZONE); const horizon=now.startOf("month").plus({months:6});
  if(!/^\d{4}-\d{2}$/.test(month)||!first.isValid||first<now.startOf("month")||first>=horizon) return NextResponse.json({error:"Choose a month within the next six months."},{status:400,headers});
  try {
    // Explicit operational release gate: never interpret a missing calendar/configuration as free.
    if(process.env.LIVE_AVAILABILITY_ENABLED!=="true") throw new Error("Not enabled");
    const email=process.env.GOOGLE_CLIENT_EMAIL; const key=process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g,"\n");
    const sources=JSON.parse(process.env.LIVE_AVAILABILITY_SOURCES || "[]") as Source[];
    if(!email||!key||sources.length<2||sources.some(s=>!s.id||!["events","freebusy"].includes(s.mode)))throw new Error("Missing sources");
    const reviewedThrough=DateTime.fromISO(process.env.LIVE_AVAILABILITY_REVIEWED_THROUGH||"",{zone:ZONE});
    if(!reviewedThrough.isValid||reviewedThrough<first.plus({months:1}))throw new Error("Unreviewed configuration");
    const auth=new google.auth.JWT({email,key,scopes:["https://www.googleapis.com/auth/calendar.readonly"]});
    const calendar=google.calendar({version:"v3",auth});
    const end=first.plus({months:1}); const queryStart=first.minus({days:1}); const queryEnd=end.plus({days:1});
    const busy:Window[]=[];
    for(const source of sources) {
      if(source.mode==="freebusy") {
        const response=await calendar.freebusy.query({requestBody:{timeMin:queryStart.toISO()!,timeMax:queryEnd.toISO()!,items:[{id:source.id}]}},{timeout:10000});
        const data=response.data.calendars?.[source.id];
        if(!data||data.errors?.length||!Array.isArray(data.busy))throw new Error("Calendar unavailable");
        for(const w of data.busy) {if(!w.start||!w.end)throw new Error("Invalid blocker");busy.push({start:w.start,end:w.end});}
      } else {
        const rule=source.rule;
        if(!rule||![rule.ignore,rule.buffer,rule.forceBusy].every(a=>Array.isArray(a)&&a.every(id=>typeof id==="string")))throw new Error("Missing rules");
        if(rule.awayEvening !== undefined && (!Array.isArray(rule.awayEvening) || !rule.awayEvening.every(id=>typeof id === "string"))) throw new Error("Invalid away rule");
        let pageToken:string|undefined; let pages=0;
        do {
          const response=await calendar.events.list({calendarId:source.id,timeMin:queryStart.toISO()!,timeMax:queryEnd.toISO()!,singleEvents:true,showDeleted:false,maxResults:2500,pageToken,fields:"nextPageToken,items(id,recurringEventId,status,transparency,start,end)"},{timeout:10000});
          if(!Array.isArray(response.data.items))throw new Error("Calendar unavailable");
          busy.push(...eventWindows(response.data.items,rule));pageToken=response.data.nextPageToken||undefined;
          if(++pages>20)throw new Error("Calendar limit");
        }while(pageToken);
      }
    }
    const overrides=JSON.parse(process.env.LIVE_AVAILABILITY_BLOCKS||"[]") as Window[];
    busy.push(...overrides);
    const rangeStart=first<now?now:first;
    const open=openWindows(rangeStart.toISO()!,end.toISO()!,busy);
    return NextResponse.json({month,timeZone:ZONE,availableThrough:reviewedThrough.toISO(),checkedAt:now.toISO(),expiresAt:now.plus({minutes:2}).toISO(),start:first.toISO(),end:end.toISO(),open},{headers});
  }catch { return NextResponse.json({error:"Live availability is temporarily unavailable. Please request a time by email; no times are being shown as open."},{status:503,headers}); }
}
