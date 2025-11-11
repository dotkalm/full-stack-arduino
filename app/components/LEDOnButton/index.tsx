"use client";

const LEDOnButton = () => {
  const onClick = async () => {
    try {
      const response = await fetch("api/led-on");
      const data = await response.text();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={onClick}>Turn on LED</button>;
};

export default LEDOnButton;
