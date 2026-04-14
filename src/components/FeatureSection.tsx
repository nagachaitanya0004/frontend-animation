'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';

// Hexagon clip-path utility
const hexPath = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";

interface HexagonNodeProps {
  label: string;
  isFocused: boolean;
  isOptimized: boolean;
  stage: number;
  children?: React.ReactNode;
}

const HexagonNode = ({ label, isFocused, isOptimized, stage, children }: HexagonNodeProps) => {
  return (
    <div className="relative group">
      {/* Hexagon Border/Background Wrapper */}
      <div 
        className={`w-40 h-32 flex flex-col items-center justify-center transition-all duration-500 relative
          ${isFocused 
            ? (isOptimized ? 'bg-emerald-500/10' : 'bg-[var(--accent)]/10') 
            : 'bg-[var(--card-bg)]'
          }
        `}
        style={{ clipPath: hexPath }}
      >
        {/* Actual Hexagon Content Area */}
        <div 
          className={`absolute inset-[2px] flex flex-col items-center justify-center transition-all duration-500
            ${isFocused 
              ? (isOptimized ? 'bg-emerald-50/50 dark:bg-emerald-950/20' : 'bg-blue-50/50 dark:bg-blue-950/20') 
              : 'bg-[var(--card-bg)]'
            }
          `}
          style={{ clipPath: hexPath }}
        >
          <span className={`text-[10px] font-black uppercase tracking-widest mb-1 transition-colors
            ${isFocused ? (isOptimized ? 'text-emerald-500' : 'text-[var(--accent)]') : 'opacity-60'}
          `}>
            {label}
          </span>
          {children}
        </div>

        {/* Highlight Border Overlay */}
        <div 
          className={`absolute inset-0 pointer-events-none transition-all duration-500
            ${isFocused 
              ? (isOptimized ? 'bg-emerald-500/30' : 'bg-[var(--accent)]/30') 
              : 'bg-[var(--card-border)]/50'
            }
          `}
          style={{ clipPath: hexPath, zIndex: -1 }}
        />
      </div>
    </div>
  );
};

export default function FeatureSection() {
  const [stage, setStage] = useState(0); // 0: Unified, 1: Focused, 2: Optimized
  const [savings, setSavings] = useState(231);
  const [showCursor, setShowCursor] = useState(false);
  const [isOptimized, setIsOptimized] = useState(false);

  useEffect(() => {
    // Sequence Progression
    const timer1 = setTimeout(() => setStage(1), 2000); // 2s: Switch to Focused
    const timer2 = setTimeout(() => {
      if (stage === 1) setSavings(237);
    }, 3500); // 3.5s: Initial savings increment
    const timer3 = setTimeout(() => setShowCursor(true), 4500); // 4.5s: Cursor starts moving
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [stage]);

  const onCursorReached = () => {
    setTimeout(() => {
      setIsOptimized(true);
      setSavings(242);
      setStage(2);
    }, 200);
  };

  const nodeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (id: string) => ({ 
      opacity: stage === 0 ? 1 : (id === 'azure' ? 1 : 0.15), 
      scale: stage === 0 ? 1 : (id === 'azure' ? 1.15 : 0.85),
      x: stage >= 1 && id !== 'azure' ? (id.includes('left') ? -30 : 30) : 0,
      filter: stage >= 1 && id !== 'azure' ? 'blur(3px)' : 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    })
  };

  const dashboardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: stage === 0 ? 1 : 0.05, 
      scale: stage === 0 ? 1 : 0.9,
      filter: stage >= 1 ? 'blur(6px)' : 'blur(0px)',
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const nodes = [
    { id: 'aws', label: 'AWS', pos: 'top-0 left-0 md:top-6 md:left-6' },
    { id: 'azure', label: 'Azure', pos: 'top-0 right-0 md:top-6 md:right-6' },
    { id: 'gcp', label: 'Google Cloud', pos: 'bottom-0 left-0 md:bottom-6 md:left-6' },
    { id: 'prem', label: 'On-Prem', pos: 'bottom-0 right-0 md:bottom-6 md:right-6' },
  ];

  return (
    <section className="relative py-24 px-4 min-h-[750px] flex items-center justify-center bg-[var(--bg)] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, var(--text) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative w-full max-w-5xl h-[500px]"
      >
        {/* Stage 2 Success Label */}
        <AnimatePresence>
          {stage === 2 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="absolute top-[-60px] left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center"
            >
              <div className="bg-emerald-500 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-emerald-500/20">
                Optimization Success
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mt-4 text-[var(--accent)] drop-shadow-sm">
                UP TO 70% SAVED
              </h2>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Central Dashboard */}
        <motion.div 
          variants={dashboardVariants}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm p-8 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[3rem] shadow-2xl z-20"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--accent)]">Unified Platform</h3>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="flex items-end justify-between h-32 gap-2 mb-4">
            {[
              { label: 'CPU', val: '40%', height: 'h-[40%]' },
              { label: 'GPU', val: '15%', height: 'h-[15%]' },
              { label: 'RAM', val: '65%', height: 'h-[65%]' },
              { label: 'PV', val: '80%', height: 'h-[80%]' },
              { label: 'Network', val: '30%', height: 'h-[30%]' },
              { label: 'Cloud', val: '95%', height: 'h-[95%]' }
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center flex-1 gap-2">
                <div className={`w-full ${item.height} bg-emerald-500 rounded-t-lg transition-all duration-1000 ease-out`} />
                <span className="text-[9px] font-bold uppercase opacity-40">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Orbiting Hexagon Nodes */}
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            custom={node.id}
            variants={nodeVariants}
            className={`absolute ${node.pos} z-30 flex flex-col items-center justify-center`}
          >
            <HexagonNode 
              label={node.label} 
              isFocused={node.id === 'azure' && stage >= 1}
              isOptimized={isOptimized}
              stage={stage}
            >
              {/* Azure Pods Hex-Cluster */}
              <AnimatePresence>
                {node.id === 'azure' && stage >= 1 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap items-center justify-center gap-1 max-w-[80px]"
                  >
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ 
                          scale: (i === 4 && isOptimized) ? 0 : 1,
                          opacity: (i === 4 && isOptimized) ? 0 : 1,
                        }}
                        transition={{ 
                          delay: i === 4 && isOptimized ? 0 : 0.05 * i,
                        }}
                        className={`w-3 h-3 transition-all duration-500 relative
                          ${i === 4 
                            ? (isOptimized ? 'bg-emerald-500/20' : 'bg-amber-500/40 shadow-[0_0_8px_rgba(245,158,11,0.5)]')
                            : 'bg-[var(--card-border)]/50'
                          }
                        `}
                        style={{ clipPath: hexPath }}
                      >
                        {i === 4 && isOptimized && (
                          <motion.div 
                            initial={{ scale: 1, opacity: 0.5 }}
                            animate={{ scale: 4, opacity: 0 }}
                            className="absolute inset-0 bg-emerald-500"
                            style={{ clipPath: hexPath }}
                          />
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </HexagonNode>

            {/* Waste Detection Popup */}
            <AnimatePresence>
              {node.id === 'azure' && stage === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20, y: -20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 70, y: -70, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute p-6 bg-[var(--text)] text-[var(--bg)] rounded-3xl shadow-2xl z-50 min-w-[220px] pointer-events-none origin-bottom-left"
                >
                  <div className="flex flex-col gap-4">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">Inefficiency Found</div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-[9px] uppercase font-bold opacity-40 mb-1">CPU Usage</div>
                        <div className="text-xs font-black">63M <span className="opacity-40 font-bold">vs</span> 700M</div>
                        <div className="h-1 w-full bg-white/10 rounded-full mt-1.5 overflow-hidden">
                          <div className="h-full bg-amber-500" style={{ width: '9%' }} />
                        </div>
                      </div>
                      <div className="pt-2 border-t border-white/10 flex justify-between items-end">
                        <div className="text-[9px] uppercase font-bold opacity-40">Monthly Savings</div>
                        <motion.div 
                          key={savings}
                          initial={{ opacity: 0.5, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xl font-black text-emerald-400"
                        >
                          ${savings}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {/* Simulated Virtual Cursor */}
        <AnimatePresence>
          {showCursor && !isOptimized && (
            <motion.div 
              initial={{ x: '50vw', y: '50vh', opacity: 0 }}
              animate={{ x: '76vw', y: '12vh', opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              onAnimationComplete={onCursorReached}
              className="fixed z-[100] pointer-events-none drop-shadow-xl"
            >
              <div className="bg-white p-2 rounded-full border border-[var(--card-border)] ring-4 ring-black/5 animate-pulse">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--text)">
                  <path d="M7.5 1h1.5v2.24l7.14 7.14L11.5 13l-4 4V1zm1.5 1.5v12.26l2.12-2.12 3.86-3.86-5.98-5.98V2.5z" />
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <svg className="absolute inset-0 w-full h-full -z-0 opacity-[0.03] pointer-events-none hidden md:block transition-opacity duration-1000"
             style={{ opacity: stage === 0 ? 0.03 : 0.01 }}>
          <line x1="15%" y1="15%" x2="50%" y2="50%" stroke="var(--text)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="85%" y1="15%" x2="50%" y2="50%" stroke="var(--text)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="15%" y1="85%" x2="50%" y2="50%" stroke="var(--text)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="85%" y1="85%" x2="50%" y2="50%" stroke="var(--text)" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
      </motion.div>
    </section>
  );
}
