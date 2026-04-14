'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';

export default function FeatureSection() {
  const [stage, setStage] = useState(0); // 0: Unified, 1: Focused
  const [savings, setSavings] = useState(231);

  useEffect(() => {
    // Transition to Stage 1 after a delay
    const stageTimer = setTimeout(() => setStage(1), 2000);
    return () => clearTimeout(stageTimer);
  }, []);

  useEffect(() => {
    if (stage === 1) {
      // Animate savings value
      const savingsTimer = setTimeout(() => setSavings(237), 1000);
      return () => clearTimeout(savingsTimer);
    }
  }, [stage]);

  const nodeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (id: string) => ({ 
      opacity: stage === 0 ? 1 : (id === 'azure' ? 1 : 0.15), 
      scale: stage === 0 ? 1 : (id === 'azure' ? 1.1 : 0.9),
      x: stage === 1 && id !== 'azure' ? (id.includes('left') ? -20 : 20) : 0,
      filter: stage === 1 && id !== 'azure' ? 'blur(2px)' : 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    })
  };

  const dashboardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: stage === 0 ? 1 : 0.1, 
      scale: stage === 0 ? 1 : 0.95,
      filter: stage === 1 ? 'blur(4px)' : 'blur(0px)',
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const nodes = [
    { id: 'aws', label: 'AWS', pos: 'top-0 left-0 md:top-10 md:left-10' },
    { id: 'azure', label: 'Azure', pos: 'top-0 right-0 md:top-10 md:right-10' },
    { id: 'gcp', label: 'Google Cloud', pos: 'bottom-0 left-0 md:bottom-10 md:left-10' },
    { id: 'prem', label: 'On-Prem', pos: 'bottom-0 right-0 md:bottom-10 md:right-10' },
  ];

  return (
    <section className="relative py-24 px-4 min-h-[700px] flex items-center justify-center bg-[var(--bg)] overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, var(--text) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative w-full max-w-5xl h-[500px]"
      >
        {/* Central Dashboard */}
        <motion.div 
          variants={dashboardVariants}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm p-8 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl shadow-2xl z-20"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--accent)]">Unified Platform</h3>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              { label: 'CPU', val: '40%' },
              { label: 'GPU', val: '15%' },
              { label: 'RAM', val: '65%' },
              { label: 'PV', val: '80%' },
              { label: 'Network', val: '30%' },
              { label: 'Cloud', val: '100%' }
            ].map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase opacity-40">
                  <span>{item.label}</span>
                  <span>{item.val}</span>
                </div>
                <div className="h-1 w-full bg-[var(--card-border)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--text)] opacity-20" style={{ width: item.val }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Orbiting Nodes */}
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            custom={node.id}
            variants={nodeVariants}
            className={`absolute ${node.pos} p-6 border rounded-3xl shadow-lg z-30 min-w-[140px] flex flex-col items-center justify-center transition-all duration-500
              ${node.id === 'azure' && stage === 1 
                ? 'border-[var(--accent)] bg-[var(--card-bg)] shadow-[0_20px_50px_rgba(37,99,235,0.1)]' 
                : 'border-[var(--card-border)] bg-[var(--card-bg)]'
              }
            `}
          >
            <span className={`text-[10px] font-black uppercase tracking-widest mb-4 transition-colors
              ${node.id === 'azure' && stage === 1 ? 'text-[var(--accent)]' : 'opacity-60'}
            `}>
              {node.label}
            </span>

            {/* Azure Pods Grid */}
            <AnimatePresence>
              {node.id === 'azure' && stage === 1 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-3 gap-2 mt-2"
                >
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 * i }}
                      className={`w-4 h-4 rounded-sm border ${i === 4 
                        ? 'border-amber-500 bg-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.5)]' 
                        : 'border-[var(--card-border)] bg-[var(--bg)]'
                      }`}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Waste Detection Popup */}
            <AnimatePresence>
              {node.id === 'azure' && stage === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20, y: -20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 60, y: -60, scale: 1 }}
                  className="absolute p-6 bg-[var(--text)] text-[var(--bg)] rounded-3xl shadow-2xl z-50 min-w-[220px] pointer-events-none origin-bottom-left"
                >
                  <div className="flex flex-col gap-4">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">Inefficiency Found</div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-[9px] uppercase font-bold opacity-40 mb-1">CPU Usage</div>
                        <div className="text-xs font-black">63M <span className="opacity-40 font-bold">vs</span> 700M</div>
                        <div className="h-1 w-full bg-white/10 rounded-full mt-1.5 overflow-hidden">
                          <div className="h-full bg-amber-500" style={{ width: '9%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="text-[9px] uppercase font-bold opacity-40 mb-1">Memory Usage</div>
                        <div className="text-xs font-black">557MiB <span className="opacity-40 font-bold">vs</span> 5GiB</div>
                        <div className="h-1 w-full bg-white/10 rounded-full mt-1.5 overflow-hidden">
                          <div className="h-full bg-amber-500" style={{ width: '11%' }} />
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

                  {/* Attachment Line */}
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[var(--text)] rotate-45 -z-10" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {/* Decorative Connection Lines */}
        <svg className="absolute inset-0 w-full h-full -z-0 opacity-[0.05] pointer-events-none hidden md:block transition-opacity duration-1000"
             style={{ opacity: stage === 0 ? 0.05 : 0.01 }}>
          <line x1="15%" y1="15%" x2="50%" y2="50%" stroke="var(--text)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="85%" y1="15%" x2="50%" y2="50%" stroke="var(--text)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="15%" y1="85%" x2="50%" y2="50%" stroke="var(--text)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="85%" y1="85%" x2="50%" y2="50%" stroke="var(--text)" strokeWidth="1" strokeDasharray="4 4" />
        </svg>

      </motion.div>
    </section>
  );
}
