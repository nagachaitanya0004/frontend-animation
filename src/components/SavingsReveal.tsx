'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MINT_GREEN = "#3ddc84";

const Hexagon = ({ isActive = true, isDashed = false, size = 80, delay = 0 }) => {
  const width = size;
  const height = size * 0.866;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 1.1 }}
      transition={{ delay, duration: 0.4 }}
      className="absolute"
      style={{ width, height }}
    >
      <svg width={width} height={height} viewBox="0 0 100 86.6" fill="none">
        <path
          d="M 25 0 L 75 0 L 100 43.3 L 75 86.6 L 25 86.6 L 0 43.3 Z"
          fill={isDashed ? "transparent" : "white"}
          stroke={isDashed ? "#d1d5db" : "transparent"}
          strokeWidth={isDashed ? "4" : "0"}
          strokeDasharray={isDashed ? "8 6" : "0"}
        />
        {!isDashed && (
           <path
            d="M 25 0 L 75 0 L 100 43.3 L 75 86.6 L 25 86.6 L 0 43.3 Z"
            stroke="#e2e8f0"
            strokeWidth="3"
            fill={isActive ? "white" : "transparent"}
          />
        )}
      </svg>
    </motion.div>
  );
};

export default function SavingsReveal() {
  const [phase, setPhase] = useState<'approaching' | 'clicking' | 'dissolving' | 'complete'>('approaching');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('clicking'), 600);
    const t2 = setTimeout(() => setPhase('dissolving'), 1000);
    const t3 = setTimeout(() => setPhase('complete'), 1800);

    return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-[#f0f2f5] flex items-center justify-center font-sans antialiased overflow-hidden">
      <div className="w-[1200px] h-[650px] flex flex-row items-center justify-center gap-0 relative">
        
        {/* AZURE OCTAGON (SCENE CONTINUITY) */}
        <motion.div
          initial={{ opacity: 1 }}
          className="relative w-[340px] h-[340px] flex items-center justify-center"
        >
          <svg width="340" height="340" viewBox="0 0 340 340" fill="none" className="absolute">
             <path
                d="M 100 0 L 240 0 L 340 100 L 340 240 L 240 340 L 100 340 L 0 240 L 0 100 Z"
                stroke={MINT_GREEN}
                strokeWidth="2.5"
                fill="transparent"
             />
          </svg>

          {/* Pod Cluster */}
          <div className="relative w-full h-full">
             <div className="absolute top-[20%] left-[30%]">
                <Hexagon size={75} />
             </div>
             <div className="absolute top-[20%] left-[55%]">
                <Hexagon size={75} />
             </div>
             <div className="absolute top-[45%] left-[20%]">
                <Hexagon size={75} />
             </div>
             
             {/* THE TARGET POD (Action Sequence) */}
             <div className="absolute bottom-[20%] left-[30%]">
                {/* Dissolving Solid Pod */}
                <motion.div
                    animate={phase === 'clicking' ? { scale: 0.9 } : {}}
                    className="relative"
                >
                    <Hexagon size={95} isActive={phase !== 'dissolving' && phase !== 'complete'} />
                </motion.div>
                
                {/* Dashed placeholder revealed during dissolution */}
                {phase === 'dissolving' && (
                    <Hexagon isDashed size={95} isActive={true} />
                )}
             </div>
          </div>
        </motion.div>

        {/* SAVINGS BANNER REVEAL */}
        <div className="relative ml-8 overflow-visible">
           <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={phase === 'complete' ? { width: 520, opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[80px] bg-white border-2 border-[#3ddc84] rounded-2xl flex items-center overflow-hidden z-20 shadow-sm"
           >
              <span className="text-[2.2rem] font-black tracking-[0.22em] text-[#1a3a2a] uppercase pl-16 whitespace-nowrap">
                UP TO 70% SAVED
              </span>
           </motion.div>

           {/* CURSOR ANIMATION (Simulated click) */}
           <motion.div
            initial={{ opacity: 0, x: 200, y: 150 }}
            animate={
                phase === 'approaching' ? { opacity: 1, x: -246, y: 110 } :
                phase === 'clicking' ? { opacity: 1, x: -246, y: 110, scale: [1, 0.8, 1] } :
                { opacity: 0, x: -246, y: 110 }
            }
            transition={{ 
                duration: phase === 'approaching' ? 0.7 : 0.2,
                ease: [0.16, 1, 0.3, 1]
            }}
            className="absolute z-50 transform pointer-events-none"
           >
             <svg width="48" height="48" viewBox="0 0 24 24" fill="white" stroke="#1a1a1a" strokeWidth="1.5">
                <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
             </svg>
             {/* Click ripple */}
             {phase === 'clicking' && (
                <motion.div 
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{ scale: 4, opacity: 0 }}
                    className="absolute top-0 left-0 w-4 h-4 rounded-full bg-[#3ddc84]"
                />
             )}
           </motion.div>
        </div>

      </div>
    </div>
  );
}
