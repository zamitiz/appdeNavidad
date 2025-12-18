import React, { useEffect, useState } from 'react';

const Snowfall: React.FC = () => {
  const [flakes, setFlakes] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    // Generate flakes only once on mount to avoid re-renders causing jumpiness
    const flakeCount = 50;
    const newFlakes = [];

    for (let i = 0; i < flakeCount; i++) {
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 5 + 5; // 5 to 10 seconds
      const delay = Math.random() * 5;
      const size = Math.random() * 10 + 10;
      
      newFlakes.push(
        <div
          key={i}
          className="snowflake"
          style={{
            left: `${left}vw`,
            animationDuration: `${animationDuration}s`,
            animationDelay: `-${delay}s`, // Negative delay to start mid-animation
            fontSize: `${size}px`,
          }}
        >
          ❄
        </div>
      );
    }
    setFlakes(newFlakes);
  }, []);

  return <>{flakes}</>;
};

export default Snowfall;