import five from "johnny-five";
import { boardManager } from "../../lib/board-manager";

export async function GET() {
  try {
    console.log("Motor!");

    // Just check if already initialized, don't re-initialize
    if (!boardManager.isInitialized()) {
      return new Response("Board not ready yet", { status: 503 });
    }

    // Now you can safely use the board
    const board = boardManager.getBoard();

    console.log("Motor board callback!");
    //const angle = Math.floor(Math.random() * 360);
    //console.log("call servo! " + angle);
    const servo = new five.Servo(10);
    //servo.to(angle);
    servo.sweep();

    return new Response("Hello from Johnny Five API! Sweeping!");
  } catch (err) {
    console.error(err);
    return new Response("Error initializing Johnny Five", { status: 500 });
  }
}
