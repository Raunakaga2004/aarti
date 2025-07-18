import React from 'react';
import './FallingSmoke.css';

const FallingSmoke: React.FC = () => {
  const smokes = Array.from({ length: 15 });

  return (
    <div className="falling-smoke-container" aria-hidden="true">
      {smokes.map((_, index) => (
        <div
          key={index}
          className="smoke"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 6}s`,
            opacity: 0.3 + Math.random() * 0.4,
          }}
        />
      ))}
    </div>
  );
};

export default FallingSmoke;
