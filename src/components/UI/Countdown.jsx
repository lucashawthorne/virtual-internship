import React, { useEffect, useState } from "react";

const Countdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!expiryDate) return;

    const updateCountdown = () => {
      const now = Date.now();
      const distance = expiryDate - now;

      if (distance <= 0) {
        setTimeLeft("Expired");
        return;
      }

      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown(); // run immediately
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval); // cleanup
  }, [expiryDate]);

  return <div className="de_countdown">{timeLeft}</div>;
};

export default Countdown;
