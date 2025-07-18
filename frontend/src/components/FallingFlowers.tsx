import React from 'react';
import './FallingFlowers.css';

const FallingFlowers: React.FC = () => {
  const flowers = Array.from({ length: 20 });

  return (
    <div className="falling-flowers-container" aria-hidden="true">
      {flowers.map((_, index) => (
        <div key={index} className="flower" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${5 + Math.random() * 5}s` }}>
          🌸
        </div>
      ))}
    </div>
  );
};

export default FallingFlowers;
