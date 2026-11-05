import { NextResponse } from "next/server";
import { BookingError } from "./config";

export function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex", "Referrer-Policy": "no-referrer" } });
}
export function failure(error: unknown) {
  if (error instanceof BookingError) return json({ error: error.message }, error.status);
  // Never log API keys, request bodies, contact details or payment/session URLs.
  console.error("Test booking dependency failed; inspect provider health and retry.");
  return json({ error: "Test booking is temporarily unavailable. Please retry the same request." }, 503);
}
export async function readBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new BookingError("Missing request body.");
  let size = 0;
  let text = "";
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16000) { await reader.cancel(); throw new BookingError("Request is too large.", 413); }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
    return JSON.parse(text) as unknown;
  } catch (error) {
    if (error instanceof BookingError) throw error;
    throw new BookingError("Invalid request body.");
  }
}
