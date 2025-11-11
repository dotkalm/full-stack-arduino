"use client";

const Button = () => {
  const onClick = async () => {
    try {
      const response = await fetch("api/led");
      const data = await response.text();
      console.log(data);
      /*if (data === "ON") {
        setIsLEDOn(true);
      } else {
        setIsLEDOn(false);
        }*/
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={onClick}>Click Me</button>;
};

export default Button;
