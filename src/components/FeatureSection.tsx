'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

export default function FeatureSection() {
  const nodeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const dashboardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const nodes = [
    { id: 'aws', label: 'AWS', pos: 'top-0 left-0 md:top-10 md:left-10' },
    { id: 'azure', label: 'Azure', pos: 'top-0 right-0 md:top-10 md:right-10' },
    { id: 'gcp', label: 'Google Cloud', pos: 'bottom-0 left-0 md:bottom-10 md:left-10' },
    { id: 'prem', label: 'On-Prem', pos: 'bottom-0 right-0 md:bottom-10 md:right-10' },
  ];

  return (
    <section className="relative py-24 px-4 min-h-[600px] flex items-center justify-center bg-[var(--bg)] overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, var(--text) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative w-full max-w-4xl h-[400px]"
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
            variants={nodeVariants}
            className={`absolute ${node.pos} p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl shadow-lg z-10 min-w-[120px] flex items-center justify-center group hover:border-[var(--accent)] transition-colors duration-300`}
          >
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 group-hover:text-[var(--accent)] transition-all">
              {node.label}
            </span>
            
            {/* Visual connector placeholder (Conceptual) */}
            <div className="absolute inset-0 border border-dashed border-[var(--card-border)] rounded-3xl -z-10 opacity-0 group-hover:opacity-100 scale-110 transition-all" />
          </motion.div>
        ))}

        {/* Conceptual connection lines (Decorative) */}
        <svg className="absolute inset-0 w-full h-full -z-0 opacity-[0.05] pointer-events-none hidden md:block">
          <line x1="15%" y1="15%" x2="50%" y2="50%" stroke="var(--text)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="85%" y1="15%" x2="50%" y2="50%" stroke="var(--text)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="15%" y1="85%" x2="50%" y2="50%" stroke="var(--text)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="85%" y1="85%" x2="50%" y2="50%" stroke="var(--text)" strokeWidth="1" strokeDasharray="4 4" />
        </svg>

      </motion.div>
    </section>
  );
}
