"use client";

const ServoButton = () => {
  const onClick = async () => {
    try {
      const response = await fetch("api/servo");
      const data = await response.text();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={onClick}>Turn Servo</button>;
};

export default ServoButton;
