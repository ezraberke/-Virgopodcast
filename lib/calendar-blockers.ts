import { DateTime } from "luxon";
import type { Window } from "./live-availability";
const ZONE = "America/New_York";
export type CalendarEvent = { summary?: string | null; location?: string | null; id?: string | null; recurringEventId?: string | null; status?: string | null; transparency?: string | null; start?: {dateTime?: string | null; date?: string | null}; end?: {dateTime?: string | null; date?: string | null} };
export type Rule = { ignore: string[]; buffer: string[]; forceBusy: string[] };
export function eventWindows(events: CalendarEvent[], rule: Rule): Window[] {
  return events.flatMap(e => {
    const ids = [e.id, e.recurringEventId].filter(Boolean) as string[];
    if(e.status === "cancelled" || ids.some(id => rule.ignore.includes(id))) return [];
    const classification = classifyPhysicalEvent(e);
    if(e.transparency === "transparent" && !classification.flight && !ids.some(id => rule.forceBusy.includes(id))) return [];
    const start = DateTime.fromISO(e.start?.dateTime || e.start?.date || "", {zone: ZONE});
    const end = DateTime.fromISO(e.end?.dateTime || e.end?.date || "", {zone: ZONE});
    if(!start.isValid || !end.isValid || end <= start) throw new Error("Invalid calendar interval");
    const buffer = ids.some(id => rule.buffer.includes(id)) || classification.buffer ? 30 : 0;
    return [{start:start.minus({minutes:buffer}).toISO()!,end:end.plus({minutes:buffer}).toISO()!}];
  });
}
// Imported only by the server route. Never log, persist or return these text fields.
export function classifyPhysicalEvent(e: CalendarEvent): {flight:boolean;buffer:boolean} {
  const title=e.summary || "";
  const location=e.location || "";
  const timed=!!e.start?.dateTime && !!e.end?.dateTime;
  // Specific travel events only; no inferred trip spanning separate flights.
  const flight=timed && /^(?:flight to\b|flight\s+[a-z0-9]{2,3}\s*\d+\b)/i.test(title.trim());
  // Deadlines/reminders are not attendance, even when they mention a class.
  const reminder=/\b(due|deadline|reminder|assignment|check brightspace|finish|paper|abstract|homework)\b/i.test(title);
  const online=/^(?:online|virtual|remote|zoom|google meet|https?:\/\/)/i.test(location.trim());
  const school=/\bEXPOS[-– ]UA\s*\d+.*(?:—|–|-)\s*Class\b|\bJunior Seminar\b/i.test(title);
  const sport=/\bbasketball\b.*\b(practice|game|vs\.?|at)\b|\b(practice|game)\b.*\bbasketball\b|\bramaz\s*@|@\s*ramaz\b/i.test(title);
  // Require street-address evidence, not an arbitrary location label or a map URL.
  const address=/\b\d{1,6}\s+(?:[A-Za-z0-9.'-]+\s+){0,6}(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Place|Pl)\b/i.test(location);
  return {flight,buffer:flight || (timed && !reminder && !online && (school||sport||address))};
}
