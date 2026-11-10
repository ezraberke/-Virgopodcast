import { DateTime } from "luxon";
export const ZONE = "America/New_York";
export type Window = { start: string; end: string };
export function openWindows(start: string, end: string, busy: Window[]): Window[] {
  let cursor=DateTime.fromISO(start).toMillis(); const limit=DateTime.fromISO(end).toMillis();
  if(!Number.isFinite(cursor)||!Number.isFinite(limit)||limit<=cursor) throw new Error("Invalid range");
  const windows=busy.map(w=>({s:DateTime.fromISO(w.start).toMillis(),e:DateTime.fromISO(w.end).toMillis()}));
  if(windows.some(w=>!Number.isFinite(w.s)||!Number.isFinite(w.e)||w.e<=w.s)) throw new Error("Invalid blocker");
  const open:Window[]=[];
  for(const w of windows.sort((a,b)=>a.s-b.s)) { if(w.e<=cursor||w.s>=limit)continue; if(w.s>cursor)open.push({start:DateTime.fromMillis(cursor,{zone:ZONE}).toISO()!,end:DateTime.fromMillis(Math.min(w.s,limit),{zone:ZONE}).toISO()!}); cursor=Math.max(cursor,w.e); if(cursor>=limit)break; }
  if(cursor<limit)open.push({start:DateTime.fromMillis(cursor,{zone:ZONE}).toISO()!,end:DateTime.fromMillis(limit,{zone:ZONE}).toISO()!});
  return open;
}
