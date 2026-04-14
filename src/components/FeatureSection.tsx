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
    <div className="relative group scale-90 md:scale-100">
      <div 
        className={`w-36 h-28 md:w-inner-node md:h-inner-node flex flex-col items-center justify-center transition-all duration-700 relative
          ${isFocused 
            ? (isOptimized ? 'bg-emerald-500/20' : 'bg-[var(--accent)]/20') 
            : 'bg-[var(--card-bg)] shadow-md'
          }
        `}
        style={{ 
          clipPath: hexPath,
          // Custom sizing for the hex nodes to avoid "cramped" feel
          width: '150px',
          height: '130px'
        }}
      >
        <div 
          className={`absolute inset-[1.5px] flex flex-col items-center justify-center transition-all duration-700
            ${isFocused 
              ? (isOptimized ? 'bg-emerald-50/60 dark:bg-emerald-950/30' : 'bg-blue-50/60 dark:bg-blue-950/30') 
              : 'bg-[var(--card-bg)]'
            }
          `}
          style={{ clipPath: hexPath }}
        >
          <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-1 transition-colors
            ${isFocused ? (isOptimized ? 'text-emerald-500' : 'text-[var(--accent)]') : 'opacity-60'}
          `}>
            {label}
          </span>
          {children}
        </div>

        <div 
          className={`absolute inset-0 pointer-events-none transition-all duration-700
            ${isFocused 
              ? (isOptimized ? 'bg-emerald-500/40' : 'bg-[var(--accent)]/40') 
              : 'bg-[var(--card-border)]/40'
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
    const timer1 = setTimeout(() => setStage(1), 2000); 
    const timer2 = setTimeout(() => {
      if (stage === 1) setSavings(237);
    }, 3500);
    const timer3 = setTimeout(() => setShowCursor(true), 4500); 
    
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
    }, 300);
  };

  const nodeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (id: string) => ({ 
      opacity: stage === 0 ? 1 : (id === 'azure' ? 1 : 0.1), 
      scale: stage === 0 ? 1 : (id === 'azure' ? 1.1 : 0.8),
      x: stage >= 1 && id !== 'azure' ? (id.includes('left') ? -40 : 40) : 0,
      y: stage >= 1 && id !== 'azure' ? (id.includes('top') ? -20 : 20) : 0,
      filter: stage >= 1 && id !== 'azure' ? 'blur(4px)' : 'blur(0px)',
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    })
  };

  const dashboardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: stage === 0 ? 1 : 0.05, 
      scale: stage === 0 ? 1 : 0.9,
      filter: stage >= 1 ? 'blur(8px)' : 'blur(0px)',
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  const nodes = [
    { id: 'aws', label: 'AWS', pos: 'top-[5%] left-[5%] md:top-[8%] md:left-[8%]' },
    { id: 'azure', label: 'Azure', pos: 'top-[5%] right-[5%] md:top-[8%] md:right-[8%]' },
    { id: 'gcp', label: 'Google Cloud', pos: 'bottom-[5%] left-[5%] md:bottom-[8%] md:left-[8%]' },
    { id: 'prem', label: 'On-Prem', pos: 'bottom-[5%] right-[5%] md:bottom-[8%] md:right-[8%]' },
  ];

  return (
    <section className="relative py-32 px-4 min-h-[800px] flex items-center justify-center bg-[var(--bg)] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, var(--text) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative w-full max-w-6xl h-[600px] md:h-[650px]"
      >
        {/* Stage 2 Success Label - Positioned with more room */}
        <AnimatePresence>
          {stage === 2 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: -40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="absolute top-[-80px] left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center w-full px-4 text-center"
            >
              <div className="bg-emerald-500 text-white px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-3xl shadow-emerald-500/30">
                Performance Optimized
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mt-6 text-[var(--accent)] drop-shadow-md leading-none">
                UP TO 70% SAVED
              </h2>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Central Dashboard - Optimized Size */}
        <motion.div 
          variants={dashboardVariants}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[340px] md:max-w-md p-10 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[4rem] shadow-3xl z-20"
        >
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--accent)]">Intelligence Hub</h3>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          </div>

          <div className="flex items-end justify-between h-36 gap-3 mb-6">
            {[
              { label: 'CPU', val: '40%', height: 'h-[40%]' },
              { label: 'GPU', val: '15%', height: 'h-[15%]' },
              { label: 'RAM', val: '65%', height: 'h-[65%]' },
              { label: 'PV', val: '80%', height: 'h-[80%]' },
              { label: 'Net', val: '30%', height: 'h-[30%]' },
              { label: 'Cloud', val: '95%', height: 'h-[95%]' }
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center flex-1 gap-3">
                <div className={`w-full ${item.height} bg-emerald-500 rounded-t-xl transition-all duration-1000 ease-out shadow-sm`} />
                <span className="text-[8px] md:text-[9px] font-black uppercase opacity-30">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Connection Lines (Proportional Anchors) */}
        <svg className="absolute inset-0 w-full h-full -z-10 pointer-events-none transition-opacity duration-1000"
             style={{ opacity: stage === 0 ? 0.4 : 0.05 }}>
          <g stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="6 8" className="opacity-20">
            <line x1="15%" y1="15%" x2="45%" y2="45%" />
            <line x1="85%" y1="15%" x2="55%" y2="45%" />
            <line x1="15%" y1="85%" x2="45%" y2="55%" />
            <line x1="85%" y1="85%" x2="55%" y2="55%" />
          </g>
        </svg>

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
              <AnimatePresence>
                {node.id === 'azure' && stage >= 1 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-wrap items-center justify-center gap-1.5 max-w-[90px]"
                  >
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ 
                          scale: (i === 4 && isOptimized) ? 0 : 1,
                          opacity: (i === 4 && isOptimized) ? 0 : 1,
                        }}
                        transition={{ delay: i === 4 && isOptimized ? 0 : 0.04 * i }}
                        className={`w-3.5 h-3.5 transition-all duration-700 relative
                          ${i === 4 
                            ? (isOptimized ? 'bg-emerald-500/20' : 'bg-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.6)]')
                            : 'bg-[var(--card-border)]/60'
                          }
                        `}
                        style={{ clipPath: hexPath }}
                      >
                        {i === 4 && isOptimized && (
                          <motion.div 
                            initial={{ scale: 1, opacity: 0.6 }}
                            animate={{ scale: 5, opacity: 0 }}
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

            {/* Popup Alignment Refined */}
            <AnimatePresence>
              {node.id === 'azure' && stage === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 80, y: -90, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute p-7 bg-[var(--text)] text-[var(--bg)] rounded-[2.5rem] shadow-4xl z-50 min-w-[240px] pointer-events-none origin-bottom-left"
                >
                  <div className="flex flex-col gap-5">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400">Inefficiency Found</div>
                    <div className="space-y-4">
                      <div>
                        <div className="text-[9px] uppercase font-black opacity-30 mb-1.5">CPU Capacity Utilization</div>
                        <div className="text-[13px] font-black">63M <span className="opacity-30 font-bold">/</span> 700M</div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full mt-2 overflow-hidden">
                          <div className="h-full bg-amber-500" style={{ width: '9%' }} />
                        </div>
                      </div>
                      <div className="pt-3 border-t border-white/10 flex justify-between items-end">
                        <div className="text-[9px] uppercase font-black opacity-30">Potential Savings</div>
                        <motion.div 
                          key={savings}
                          initial={{ opacity: 0.5, y: -3 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-2xl font-black text-emerald-400"
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

        {/* Virtual Cursor - Path Refined for Percentage Layout */}
        <AnimatePresence>
          {showCursor && !isOptimized && (
            <motion.div 
              initial={{ x: '50vw', y: '50vh', opacity: 0 }}
              animate={{ x: '78vw', y: '16vh', opacity: 1 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              onAnimationComplete={onCursorReached}
              className="fixed z-[100] pointer-events-none drop-shadow-2xl"
            >
              <div className="bg-white p-2.5 rounded-full border border-[var(--card-border)] ring-8 ring-black/5 animate-pulse">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--text)">
                  <path d="M7.5 1h1.5v2.24l7.14 7.14L11.5 13l-4 4V1zm1.5 1.5v12.26l2.12-2.12 3.86-3.86-5.98-5.98V2.5z" />
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
