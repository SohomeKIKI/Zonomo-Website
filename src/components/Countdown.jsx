import React, { useState, useEffect } from 'react';
import SplitFlapText from './SplitFlapText';
import './Countdown.css';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    // Target is exactly 90 days from now for demonstration
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 90); 

    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft("00D : 00H : 00M : 00S");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      const d = String(days).padStart(2, '0');
      const h = String(hours).padStart(2, '0');
      const m = String(minutes).padStart(2, '0');
      const s = String(seconds).padStart(2, '0');

      setTimeLeft(`${d}D : ${h}H : ${m}M : ${s}S`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="countdown-section">
      <div className="countdown-content">
        <h2 className="countdown-title">LAUNCHING IN</h2>
        <div className="countdown-clock">
          {timeLeft && (
            <SplitFlapText
              text={timeLeft}
              flipDuration={0.1}
              stagger={0}
              flipsPerChar={1}
              charset="0123456789DHMS: "
              tileColor="#111111"
              textColor="#ffffff"
              tileRadius={4}
              gap={4}
              fontSize={64}
              padTo={21}
            />
          )}
        </div>
        <p className="countdown-desc">DELHI NCR ONLY</p>
      </div>
    </section>
  );
};

export default Countdown;
