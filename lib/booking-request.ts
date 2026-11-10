export const PUBLIC_BOOKING_URL = "https://www.virgopodcast.com/book";

export function newYorkDateTime(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(now);
  const part = (name: string) => parts.find((item) => item.type === name)?.value;
  return `${part("year")}-${part("month")}-${part("day")}T${part("hour")}:${part("minute")}`;
}

export function isPastRequest(date: string, time: string, now = new Date()) {
  return `${date}T${time}` < newYorkDateTime(now);
}
