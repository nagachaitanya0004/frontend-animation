'use client';

import React from 'react';
import { motion } from 'framer-motion';

const CLOUD_GREEN = "#3ddc84";
const AZURE_BLUE = "#0078d4";

/**
 * OctagonIcon 
 * Renders a hexagonal cluster inside a custom octagon path.
 */
const OctagonIcon = ({ delay = 0.8 }: { delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className="relative w-40 h-40 flex items-center justify-center p-2"
    >
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none" className="absolute inset-0">
        <path
          d="M 47 0 L 113 0 L 160 47 L 160 113 L 113 160 L 47 160 L 0 113 L 0 47 Z"
          stroke={CLOUD_GREEN}
          strokeWidth="2"
          fill="white"
          fillOpacity="0.05"
        />
      </svg>
      
      {/* Cluster of pod blocks (detailed hexes) */}
      <div className="relative w-full h-full flex items-center justify-center gap-2 flex-wrap p-6">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.2 + (i * 0.08) }}
            className="w-8 h-8 relative"
          >
            <svg viewBox="0 0 100 86.6" className="w-full h-full drop-shadow-sm">
              <path
                d="M 25 0 L 75 0 L 100 43.3 L 75 86.6 L 25 86.6 L 0 43.3 Z"
                fill="white"
                stroke="#e2e8f0"
                strokeWidth="4"
              />
              {i % 3 === 0 && (
                <rect x="35" y="30" width="30" height="30" rx="4" fill={CLOUD_GREEN} fillOpacity="0.3" />
              )}
            </svg>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function CloudResourceDashboard() {
  const bars = [
    { label: 'CPU', h: 140 },
    { label: 'GPU', h: 40 },
    { label: 'RAM', h: 90 },
    { label: 'PV', h: 55 },
    { label: 'Network', h: 70 },
    { label: 'Cloud', h: 25 }
  ];

  return (
    <div className="w-screen h-screen bg-[#f0f2f5] flex items-center justify-center overflow-hidden relative font-sans antialiased text-[#1a1a1a]">
      <div className="relative w-[1200px] h-[650px] mx-auto scale-90 xxl:scale-100">
        
        {/* DOTTED SVG CONNECTORS */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 650">
          <g stroke={CLOUD_GREEN} strokeWidth="1.5" strokeDasharray="6 5" fill="none">
            <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
                d="M 220 140 L 460 140 L 460 205"
            />
            <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
                d="M 980 140 L 740 140 L 740 205"
            />
            <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
                d="M 220 510 L 460 510 L 460 445"
            />
            <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
                d="M 980 510 L 740 510 L 740 445"
            />
          </g>
        </svg>

        {/* CENTER CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[240px] bg-white border-2 border-[#3ddc84] rounded-2xl shadow-md p-6 px-8 flex flex-col z-10"
        >
          <div className="flex flex-row items-end justify-around h-full">
            {bars.map((bar, i) => (
              <div key={bar.label} className="flex flex-col items-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: bar.h }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 + i * 0.1 }}
                  className="w-10 bg-[#3ddc84] rounded-t-lg"
                />
                <span className="text-[10px] font-bold text-gray-800 uppercase tracking-wider mt-2">{bar.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* TOP LEFT (AWS) */}
        <div className="absolute top-[60px] left-[60px] flex flex-col items-center">
          <OctagonIcon delay={0.8} />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.4 }}
            className="mt-3 flex flex-col items-center"
          >
            <span className="text-3xl font-black text-[#1a1a1a] tracking-tighter">aws</span>
            <svg width="54" height="15" viewBox="0 0 54 15" className="mt-[-6px]">
              <path d="M 2 6 C 10 12 44 12 52 6" stroke="#ff9900" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              <path d="M 48 6 L 52 6 L 50 10" stroke="#ff9900" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </motion.div>
        </div>

        {/* TOP RIGHT (Azure) */}
        <div className="absolute top-[60px] right-[60px] flex flex-col items-center">
          <OctagonIcon delay={0.9} />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.4 }}
            className="mt-4 flex items-center gap-2.5"
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M11.4 6.3l-5.1 8.8L2.1 19h13.3l-4-12.7z" fill="#0078d4" />
              <path d="M21.9 19h-5.4l-5.1-8.8 2.7-4.5 7.8 13.3z" fill="#50e6ff" />
            </svg>
            <span className="text-xl font-bold text-[#0078d4] tracking-tight">Azure</span>
          </motion.div>
        </div>

        {/* BOTTOM LEFT (Google Cloud) */}
        <div className="absolute bottom-[60px] left-[60px] flex flex-col items-center">
          <OctagonIcon delay={1.0} />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.4 }}
            className="mt-3 flex flex-col items-center"
          >
            <div className="flex gap-1 mb-1.5">
                <div className="w-2.5 h-2.5 rounded-full shadow-sm bg-[#4285F4]" />
                <div className="w-2.5 h-2.5 rounded-full shadow-sm bg-[#EA4335]" />
                <div className="w-2.5 h-2.5 rounded-full shadow-sm bg-[#FBBC05]" />
                <div className="w-2.5 h-2.5 rounded-full shadow-sm bg-[#34A853]" />
            </div>
            <span className="text-lg font-bold text-gray-700 tracking-tight">Google Cloud</span>
          </motion.div>
        </div>

        {/* BOTTOM RIGHT (On-Premise) */}
        <div className="absolute bottom-[60px] right-[60px] flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-[-12px] bg-[#e2e8f0]/40 rounded-3xl -z-10" />
            <OctagonIcon delay={1.1} />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.4 }}
            className="mt-3"
          >
            <span className="text-xl font-bold text-[#1a1a1a]">On-Premise</span>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
