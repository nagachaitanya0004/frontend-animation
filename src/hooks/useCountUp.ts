'use client';

import { useState, useEffect } from 'react';

export function useCountUp(end: number, duration: number = 1000, startTrigger: boolean = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startTrigger) return;

    let start = 0;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out quadratic function for smoother finish
      const easedProgress = 1 - Math.pow(1 - progress, 2);
      
      const currentCount = Math.floor(easedProgress * end);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    return () => setCount(0); // Optional: reset on unmount or trigger change
  }, [end, duration, startTrigger]);

  return count;
}
