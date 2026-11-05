import { getTestConfig } from "../../../../lib/test-booking/config";
import { availableSlots } from "../../../../lib/test-booking/service";
import { failure, json } from "../../../../lib/test-booking/http";

export const runtime = "nodejs";
export const maxDuration = 60;
export async function GET(request: Request) {
  try {
    getTestConfig();
    const params = new URL(request.url).searchParams;
    return json({ slots: await availableSlots(params.get("date") ?? "", params.get("packageId") ?? "") });
  } catch (error) { return failure(error); }
}
