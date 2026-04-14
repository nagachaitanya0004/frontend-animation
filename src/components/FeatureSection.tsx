'use client';

import React, { useState, useEffect } from 'react';
import { useMetrics } from '@/hooks/useMetrics';
import { motion, AnimatePresence, Variants } from 'framer-motion';

export default function FeatureSection() {
  const { data, isLoading, isError } = useMetrics();
  const [stage, setStage] = useState(0); // 0: Overview, 1: Waste Detection, 2: Outcome

  // Automatic progression logic for the story
  useEffect(() => {
    if (!isLoading && !isError && data) {
      const timers = [
        setTimeout(() => setStage(1), 3000), // Move to Waste Detection
        setTimeout(() => setStage(2), 7000), // Execute Optimization
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [isLoading, isError, data]);

  if (isLoading) return <div className="py-32 text-center opacity-50">Fetching cloud topology...</div>;
  if (isError) return <div className="py-32 text-center text-red-500">Failed to load platform data.</div>;

  const nodes = [
    { id: 'aws', label: 'AWS', x: -140, y: -100 },
    { id: 'azure', label: 'Azure', x: 140, y: -100 },
    { id: 'gcp', label: 'GCP', x: -140, y: 100 },
    { id: 'prem', label: 'On-Prem', x: 140, y: 100 },
  ];

  const pods = [1, 2, 3, 4, 5, 6];

  return (
    <section className="relative py-24 min-h-[700px] flex items-center justify-center overflow-hidden bg-[var(--bg)]">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)] opacity-[0.03] pointer-events-none" />

      <div className="relative w-full max-w-4xl h-[500px] flex items-center justify-center">
        
        {/* STAGE 1 & 2: Central Dashboard & Orbiting Nodes */}
        <AnimatePresence>
          {stage < 2 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: stage === 0 ? 1 : 0.2, 
                scale: stage === 0 ? 1 : 0.8,
                filter: stage === 0 ? 'blur(0px)' : 'blur(4px)'
              }}
              exit={{ opacity: 0 }}
              className="absolute z-10 w-64 p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-xl"
            >
              <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-40">Global View</h3>
              <div className="space-y-3">
                {[
                  { label: 'CPU', val: '64%', color: 'bg-emerald-500' },
                  { label: 'RAM', val: '82%', color: 'bg-amber-500' },
                  { label: 'Network', val: '24%', color: 'bg-blue-500' }
                ].map(item => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex justify-between text-[9px] font-bold uppercase">
                      <span>{item.label}</span>
                      <span>{item.val}</span>
                    </div>
                    <div className="h-1.5 w-full bg-[var(--card-border)] rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: item.val }}
                        className={`h-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Orbiting Cloud Nodes */}
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: (stage === 0 || (stage === 1 && node.id === 'azure')) ? 1 : 0,
              x: stage === 0 ? node.x : (node.id === 'azure' ? 0 : node.x * 2),
              y: stage === 0 ? node.y : (node.id === 'azure' ? 0 : node.y * 2),
              scale: stage === 1 && node.id === 'azure' ? 2.5 : 1,
              zIndex: node.id === 'azure' ? 50 : 5
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 80 }}
            className={`absolute px-6 py-3 rounded-full border-2 font-black text-xs tracking-tighter backdrop-blur-md shadow-lg
              ${node.id === 'azure' 
                ? 'border-[var(--accent)] bg-[var(--card-bg)] text-[var(--accent)]' 
                : 'border-[var(--card-border)] bg-[var(--card-bg)]/80 text-[var(--text)] opacity-40'
              }
            `}
          >
            {node.label}

            {/* STAGE 2: Deep Dive into Azure Pods */}
            {stage >= 1 && node.id === 'azure' && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="grid grid-cols-3 gap-1 scale-[0.3]">
                  {pods.map(p => (
                    <motion.div 
                      key={p}
                      initial={{ scale: 0 }}
                      animate={{ 
                        scale: (stage === 2 && p === 4) ? 0 : 1,
                        backgroundColor: p === 4 ? 'var(--accent)' : 'rgba(var(--accent-rgb), 0.1)',
                        opacity: (stage === 2 && p === 4) ? 0 : 1
                      }}
                      className={`w-4 h-4 rounded-sm border border-[var(--accent)]/20 ${p === 4 ? 'shadow-[0_0_10px_var(--accent)] animate-pulse' : ''}`}
                    />
                  ))}
                </div>

                {/* Waste Insight Popup */}
                {stage === 1 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20, scale: 0.5 }}
                    animate={{ opacity: 1, y: -60, scale: 0.4 }}
                    className="absolute whitespace-nowrap bg-[var(--text)] text-[var(--bg)] p-6 rounded-3xl shadow-2xl flex flex-col gap-2 origin-bottom"
                  >
                    <div className="text-[14px] font-black uppercase text-amber-400">Inefficiency Detected</div>
                    <div className="h-px w-full bg-white/10" />
                    <div className="flex gap-8">
                      <div>
                        <div className="text-[10px] opacity-50 uppercase">Allocated</div>
                        <div className="text-xl font-black">₹{Math.round((data?.totalCost || 0) / 4)}</div>
                      </div>
                      <div>
                        <div className="text-[10px] opacity-50 uppercase">Savings</div>
                        <div className="text-xl font-black text-emerald-400">₹{data?.savings}</div>
                      </div>
                    </div>
                    <div className="text-[9px] font-bold opacity-60">POD #4: Over-provisioned resources found</div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </motion.div>
        ))}

        {/* STAGE 3: Action & Outcome Overlay */}
        <AnimatePresence>
          {stage === 2 && data && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center z-[100] text-center px-6"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.5 }}
                className="w-24 h-24 mb-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-2xl shadow-emerald-500/20"
              >
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
                Captured <span className="text-emerald-500">₹{data.savings.toLocaleString()}</span>
              </h2>
              <p className="text-lg font-bold opacity-40 uppercase tracking-widest max-w-sm">
                Up to 70% saved across your optimized cloud footprint.
              </p>
              
              <motion.button
                onClick={() => setStage(0)}
                className="mt-12 px-8 py-3 bg-[var(--text)] text-[var(--bg)] rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
              >
                Replay Analysis
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
