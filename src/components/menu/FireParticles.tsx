import React from 'react';

export const FireParticles = () => {
  // Generamos 20 partículas con valores aleatorios
  const particles = Array.from({ length: 25 });

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((_, i) => {
        const size = Math.random() * 6 + 2; // de 2px a 8px
        const left = Math.random() * 100; // de 0% a 100%
        const duration = Math.random() * 4 + 3; // de 3s a 7s
        const delay = Math.random() * 5; // hasta 5s de retraso

        return (
          <div
            key={i}
            className="fire-particle"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
      <div className="absolute inset-0 heat-haze" />
    </div>
  );
};