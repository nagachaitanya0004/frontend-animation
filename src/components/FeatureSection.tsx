'use client';

import React, { useState, useEffect } from 'react';
import { useMetrics } from '@/hooks/useMetrics';
import { motion, Variants, useReducedMotion } from 'framer-motion';

export default function FeatureSection() {
  const { data, isLoading, isError } = useMetrics();
  const shouldReduceMotion = useReducedMotion();
  const [showFinalValues, setShowFinalValues] = useState(false);

  // Trigger the "update" effect once data is loaded and component is ready
  useEffect(() => {
    if (data && !isLoading) {
      const timer = setTimeout(() => setShowFinalValues(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [data, isLoading]);

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
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.5,
        ease: "easeOut",
      },
    },
  };

  if (isLoading) {
    return (
      <div role="status" className="text-center py-20 flex flex-col items-center gap-4">
        <span className="text-lg font-medium animate-pulse">Processing insights...</span>
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

  // Calculate simulated "initial" values (e.g., 90% of actual)
  const initialData = {
    totalCost: Math.round((data?.totalCost || 0) * 0.92),
    usage: Math.round((data?.usage || 0) * 0.8),
    savings: Math.round((data?.savings || 0) * 0.75),
  };

  const metrics = [
    { 
      title: "Total Cost", 
      value: `$${(showFinalValues ? data?.totalCost : initialData.totalCost)?.toLocaleString()}`,
      description: "Estimated total expenditure based on current resource allocation.",
      highlight: false
    },
    { 
      title: "Usage", 
      value: (showFinalValues ? data?.usage : initialData.usage),
      description: "Total number of active cloud resources and services monitored.",
      highlight: false
    },
    { 
      title: "Savings", 
      value: `$${(showFinalValues ? data?.savings : initialData.savings)?.toLocaleString()}`,
      description: "Potential cost reduction identified through optimization strategies.",
      highlight: true,
      badge: "Optimized"
    }
  ];

  return (
    <section aria-labelledby="section-title" className="py-[clamp(4rem,10vh,8rem)] [padding-inline:clamp(1rem,5vw,2rem)] max-w-6xl mx-auto">
      <motion.h1 
        id="section-title"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
        className="font-bold text-center mb-[clamp(2rem,8vh,4rem)] tracking-tight text-[var(--text)]"
      >
        Cloud Optimization Insights
      </motion.h1>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(1.5rem,3vw,2.5rem)]"
      >
        {metrics.map((metric, index) => (
          <motion.div 
            key={index} 
            variants={cardVariants}
            whileHover={shouldReduceMotion ? {} : { 
              scale: 1.02,
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            className={`
              relative p-[clamp(1.5rem,4vw,2.5rem)] border rounded-3xl transition-all duration-300 cursor-default focus-within:ring-2 focus-within:ring-[var(--accent)] outline-none
              ${metric.highlight 
                ? 'border-[var(--accent)] bg-[var(--card-bg)] shadow-lg shadow-[var(--accent)]/5 scale-[1.01]' 
                : 'border-[var(--card-border)] bg-[var(--card-bg)] opacity-90'
              }
            `}
            tabIndex={0}
          >
            {metric.badge && (
              <span className="absolute top-4 right-6 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full bg-[var(--accent)] text-white">
                {metric.badge}
              </span>
            )}
            
            <h2 className={`text-xs uppercase tracking-[0.2em] font-bold mb-4 ${metric.highlight ? 'text-[var(--accent)]' : 'text-[var(--text)] opacity-40'}`}>
              {metric.title}
            </h2>
            
            <motion.div 
              key={metric.value}
              initial={{ opacity: 0.8, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[clamp(2rem,4vw,2.75rem)] font-extrabold mb-4 text-[var(--text)] tracking-tighter leading-none"
            >
              {metric.value}
            </motion.div>
            
            <p className="text-[var(--text)] opacity-60 text-sm leading-relaxed font-medium">
              {metric.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
