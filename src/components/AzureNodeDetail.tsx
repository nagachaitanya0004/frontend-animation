'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MINT_GREEN = "#3ddc84";

interface HexagonIconProps {
  isFilled?: boolean;
  size?: number;
  delay?: number;
  pulse?: boolean;
}

const HexagonIcon = ({ 
  isFilled = false, 
  size = 65, 
  delay = 0, 
  pulse = false 
}: HexagonIconProps) => {
  const width = size;
  const height = size * 0.866;
  
  return (
    <div className="absolute flex items-center justify-center" style={{ width, height }}>
      <motion.div
        animate={pulse ? { y: [0, -4, 0], filter: ['drop-shadow(0 0 0px #3ddc84)', 'drop-shadow(0 0 12px #3ddc84)', 'drop-shadow(0 0 0px #3ddc84)'] } : {}}
        transition={pulse ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : {}}
        className="w-full h-full relative flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay, duration: 0.4 }}
          className="w-full h-full relative"
        >
          <svg width="100%" height="100%" viewBox="0 0 100 86.6" fill="none">
            <path
              d="M 25 0 L 75 0 L 100 43.3 L 75 86.6 L 25 86.6 L 0 43.3 Z"
              fill={isFilled ? MINT_GREEN : "white"}
              stroke={isFilled ? MINT_GREEN : "#d1d5db"}
              strokeWidth="4"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default function AzureNodeDetail() {
  const [showPopup, setShowPopup] = useState(false);
  const [savings, setSavings] = useState(231);

  useEffect(() => {
    // Reveal popup after zoom in
    const t1 = setTimeout(() => setShowPopup(true), 600);
    
    // Increment savings after popup appears
    const t2 = setTimeout(() => {
        const interval = setInterval(() => {
            setSavings(prev => prev < 237 ? prev + 1 : prev);
        }, 150);
        return () => clearInterval(interval);
    }, 1500);

    return () => {
        clearTimeout(t1);
        clearTimeout(t2);
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-[#f0f2f5] flex items-center justify-center relative overflow-hidden font-sans antialiased">
      <div className="relative w-[1200px] h-[650px] flex items-center justify-center">
        
        {/* AZURE OCTAGON NODE (CENTERED IN STORY) */}
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.7, ease: "easeOut" }}
           className="relative w-[340px] h-[340px] flex items-center justify-center"
        >
          <svg width="340" height="340" viewBox="0 0 340 340" fill="none" className="absolute inset-0">
             <path
                d="M 100 0 L 240 0 L 340 100 L 340 240 L 240 340 L 100 340 L 0 240 L 0 100 Z"
                stroke={MINT_GREEN}
                strokeWidth="2.5"
                fill="white"
                fillOpacity="0.03"
             />
          </svg>

          {/* Internal Pods */}
          <div className="relative w-full h-full">
             <div className="absolute top-[20%] left-[30%]">
                <HexagonIcon size={75} delay={0.4} />
             </div>
             <div className="absolute top-[20%] left-[55%]">
                <HexagonIcon size={75} delay={0.6} />
             </div>
             <div className="absolute top-[45%] left-[20%]">
                <HexagonIcon size={75} delay={0.8} />
             </div>
             
             {/* THE WASTE POD (Localized logic) */}
             <div className="absolute bottom-[20%] left-[30%]">
                <HexagonIcon isFilled size={95} delay={1.0} pulse />
                
                {/* FLOATING POPUP (Per Stage 2) */}
                <AnimatePresence>
                  {showPopup && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, x: -50, scale: 0.85 }}
                      animate={{ opacity: 1, y: -110, x: 20, scale: 1 }}
                      transition={{ 
                        type: "spring", 
                        damping: 18, 
                        stiffness: 140,
                        delay: 0.1 
                      }}
                      className="absolute z-50 w-[240px] bg-[#1a1a1a] text-white p-5 rounded-2xl shadow-2xl border border-white/10"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">Waste Detected</div>
                        
                        <div className="space-y-2">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 font-bold uppercase">CPU Usage vs Request</span>
                            <span className="text-xs font-black">63M / 700M</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 font-bold uppercase">Memory Usage vs Request</span>
                            <span className="text-xs font-black">557MiB / 5GiB</span>
                          </div>
                          <div className="pt-2 border-t border-white/5 flex justify-between items-end">
                             <span className="text-[10px] text-gray-400 font-bold uppercase">Estimated Savings</span>
                             <span className="text-lg font-black text-emerald-400 tracking-tighter">${savings}/mo</span>
                          </div>
                        </div>
                      </div>
                      {/* Connector notch */}
                      <div className="absolute -bottom-1 left-4 w-3 h-3 bg-[#1a1a1a] rotate-45 border-b border-r border-white/10" />
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
