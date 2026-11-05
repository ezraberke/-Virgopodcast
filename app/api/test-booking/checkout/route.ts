import { assertSameOrigin, getTestConfig } from "../../../../lib/test-booking/config";
import { parseBooking } from "../../../../lib/test-booking/validation";
import { openCheckout } from "../../../../lib/test-booking/service";
import { failure, json, readBody } from "../../../../lib/test-booking/http";

export const runtime = "nodejs";
export const maxDuration = 60;
export async function POST(request: Request) {
  try {
    const config = getTestConfig();
    assertSameOrigin(request, config.origin);
    return json(await openCheckout(parseBooking(await readBody(request))));
  } catch (error) { return failure(error); }
}
