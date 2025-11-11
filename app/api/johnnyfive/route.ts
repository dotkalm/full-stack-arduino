import { NextRequest } from "next/server";
import five from "johnny-five";

export async function GET(request: Request) {
    try {
        console.log(five.Board);
        const board = new five.Board();
        const boardCallback = () => {
            const led = new five.Led(13);
            led.blink(500);
        }
        board.on("ready", boardCallback);
        return new Response("Hello from Johnny Five API!");
    } catch (err) {
        console.error(err);
        return new Response("Error initializing Johnny Five", { status: 500 });
    }
}

/*
let five = require("johnny-five");
var five = require("johnny-five");
let board = new five.Board();
board.on("ready",() => {
  let led = new five.Led(9);
  led.blink(500);
});

*/