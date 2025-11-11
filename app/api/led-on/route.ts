import five from "johnny-five";
import { boardManager } from "../../lib/board-manager";

export async function GET() {
  try {
    // Just check if already initialized, don't re-initialize
    if (!boardManager.isInitialized()) {
      return new Response("Board not ready yet", { status: 503 });
    }

    const led = new five.Led(13);
    led.on();

    return new Response("Success - LED on!");
  } catch (err) {
    console.error(err);
    return new Response("Error initializing Johnny Five", { status: 500 });
  }
}
