import LEDOnButton from "./components/LEDOnButton";
import LEDOffButton from "./components/LEDOffButton";
import ServoButton from "./components/ServoButton";

export default function Home() {
  return (
    <>
      <LEDOnButton />
      <br />
      <LEDOffButton />
      <br />
      <ServoButton />
    </>
  );
}
