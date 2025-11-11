import five from "johnny-five";
import { board } from "../../constants/board";

export async function GET() {
  try {
    //const board = new five.Board();
    const boardCallback = () => {
      //console.log(board);
      //const angle = Math.floor(Math.random() * 360);
      //console.log("call servo! " + angle);
      const servo = new five.Servo(10);
      //servo.to(angle);
      servo.sweep();
    };
    board.on("ready", boardCallback);
    return new Response("Hello from Johnny Five API! Sweeping!");
  } catch (err) {
    console.error(err);
    return new Response("Error initializing Johnny Five", { status: 500 });
  }
}
