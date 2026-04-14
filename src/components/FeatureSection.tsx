'use client';

import React, { useState, useEffect } from 'react';
import { useMetrics } from '@/hooks/useMetrics';
import { useCountUp } from '@/hooks/useCountUp';
import { motion, Variants, useReducedMotion } from 'framer-motion';

export default function FeatureSection() {
  const { data, isLoading, isError } = useMetrics();
  const shouldReduceMotion = useReducedMotion();
  const [showFinalValues, setShowFinalValues] = useState(false);

  useEffect(() => {
    if (data && !isLoading) {
      const timer = setTimeout(() => setShowFinalValues(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [data, isLoading]);

  const animatedCost = useCountUp(data?.totalCost || 0, 1000, showFinalValues);
  const animatedUsage = useCountUp(data?.usage || 0, 1000, showFinalValues);
  const animatedSavings = useCountUp(data?.savings || 0, 1000, showFinalValues);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  if (isLoading) {
    return (
      <div role="status" className="text-center py-20 flex flex-col items-center gap-4">
        <span className="text-lg font-medium animate-pulse opacity-50">Processing insights...</span>
        <div className="sr-only">Please wait while we analyze your cloud resources.</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div role="alert" className="text-center py-20 text-red-600 font-medium">
        Something went wrong. Please check your connection and try again.
      </div>
    );
  }

  const metrics = [
    { 
      title: "Total Cost", 
      displayValue: `₹${animatedCost.toLocaleString()}`,
      description: "Estimated total expenditure based on current resource allocation.",
      highlight: false
    },
    { 
      title: "Usage", 
      displayValue: `${animatedUsage}%`,
      description: "Total number of active cloud resources and services monitored.",
      highlight: false
    },
    { 
      title: "Savings", 
      displayValue: `₹${animatedSavings.toLocaleString()}`,
      description: "Potential cost reduction identified through optimization strategies.",
      highlight: true,
      badge: "Optimized"
    }
  ];

  return (
    <section 
      aria-labelledby="section-title" 
      className="relative py-[clamp(4rem,10vh,8rem)] [padding-inline:clamp(1rem,5vw,2rem)] max-w-7xl mx-auto overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[var(--accent)]/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <motion.h1 
        id="section-title"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)' }}
        className="font-extrabold text-center mb-[clamp(3rem,10vh,5rem)] tracking-tighter text-[var(--text)] leading-[1.1]"
      >
        Cloud Optimization <br className="hidden md:block"/> Insights
      </motion.h1>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(1.5rem,3vw,2.5rem)] relative z-10"
      >
        {metrics.map((metric, index) => (
          <motion.div 
            key={index} 
            variants={cardVariants}
            whileHover={shouldReduceMotion ? {} : { 
              y: -4,
              scale: 1.01,
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            className={`
              relative p-[clamp(2rem,4vw,3rem)] border rounded-[2.5rem] transition-all duration-300 cursor-default focus-within:ring-2 focus-within:ring-[var(--accent)] outline-none backdrop-blur-md
              ${metric.highlight 
                ? 'border-[var(--accent)]/30 bg-gradient-to-br from-[var(--card-bg)] to-[var(--accent)]/[0.04] shadow-2xl shadow-[var(--accent)]/5 ring-1 ring-[var(--accent)]/10' 
                : 'border-[var(--card-border)] bg-[var(--card-bg)]/90 opacity-95'
              }
            `}
            tabIndex={0}
          >
            {metric.badge && (
              <span className="absolute top-6 right-8 text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/20">
                {metric.badge}
              </span>
            )}
            
            <h2 className={`text-[10px] uppercase tracking-[0.3em] font-black mb-6 ${metric.highlight ? 'text-[var(--accent)]' : 'text-[var(--text)] opacity-30'}`}>
              {metric.title}
            </h2>
            
            <div className="text-[clamp(2.5rem,5vw,3.25rem)] font-black mb-6 text-[var(--text)] tracking-tighter leading-none">
              {metric.displayValue}
            </div>

            {/* Subtle Divider */}
            <div className={`h-px w-12 mb-6 ${metric.highlight ? 'bg-[var(--accent)]/20' : 'bg-[var(--card-border)]'}`} />
            
            <p className="text-[var(--text)] opacity-70 text-sm leading-relaxed font-medium max-w-[240px]">
              {metric.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
