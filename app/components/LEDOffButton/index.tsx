"use client";

const LEDOffButton = () => {
  const onClick = async () => {
    try {
      const response = await fetch("api/led-off");
      const data = await response.text();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={onClick}>Turn off LED</button>;
};

export default LEDOffButton;
