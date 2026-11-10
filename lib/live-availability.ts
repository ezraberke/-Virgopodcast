import { DateTime } from "luxon";
export const ZONE = "America/New_York";
export type Window = { start: string; end: string };
export type CalendarEvent = { id?: string | null; recurringEventId?: string | null; status?: string | null; transparency?: string | null; start?: {dateTime?: string | null; date?: string | null}; end?: {dateTime?: string | null; date?: string | null} };
export type Rule = { ignore: string[]; buffer: string[]; forceBusy: string[] };
export function eventWindows(events: CalendarEvent[], rule: Rule): Window[] {
  return events.flatMap(e => {
    const ids = [e.id, e.recurringEventId].filter(Boolean) as string[];
    if(e.status === "cancelled" || ids.some(id => rule.ignore.includes(id))) return [];
    if(e.transparency === "transparent" && !ids.some(id => rule.forceBusy.includes(id))) return [];
    const start = DateTime.fromISO(e.start?.dateTime || e.start?.date || "", {zone: ZONE});
    const end = DateTime.fromISO(e.end?.dateTime || e.end?.date || "", {zone: ZONE});
    if(!start.isValid || !end.isValid || end <= start) throw new Error("Invalid calendar interval");
    const buffer = ids.some(id => rule.buffer.includes(id)) ? 30 : 0;
    return [{start:start.minus({minutes:buffer}).toISO()!,end:end.plus({minutes:buffer}).toISO()!}];
  });
}
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
