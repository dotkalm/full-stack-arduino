import five from "johnny-five";
import { boardManager } from "../../lib/board-manager";

export async function GET() {
  try {
    // Just check if already initialized, don't re-initialize
    if (!boardManager.isInitialized()) {
      return new Response("Board not ready yet", { status: 503 });
    }

    const angle = Math.floor(Math.random() * 360);
    console.log("call servo! " + angle);
    const servo = new five.Servo(10);
    servo.to(angle);

    return new Response("Success - Servo!");
  } catch (err) {
    console.error(err);
    return new Response("Error initializing Johnny Five", { status: 500 });
  }
}
