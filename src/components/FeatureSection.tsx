'use client';

import React from 'react';
import { useMetrics } from '@/hooks/useMetrics';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function FeatureSection() {
  const { data, isLoading, isError } = useMetrics();

  if (isLoading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center py-20 text-red-500">Something went wrong</div>;
  }

  const metrics = [
    { 
      title: "Total Cost", 
      value: `$${data?.totalCost.toLocaleString()}`,
      description: "Estimated total expenditure based on current resource allocation." 
    },
    { 
      title: "Usage", 
      value: data?.usage,
      description: "Total number of active cloud resources and services monitored." 
    },
    { 
      title: "Savings", 
      value: `$${data?.savings.toLocaleString()}`,
      description: "Potential cost reduction identified through optimization strategies." 
    }
  ];

  return (
    <section className="py-[clamp(4rem,10vh,8rem)] [padding-inline:clamp(1rem,5vw,2rem)] max-w-6xl mx-auto">
      <motion.h1 
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
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            className="p-[clamp(1.5rem,4vw,2.5rem)] border border-[var(--card-border)] bg-[var(--card-bg)] rounded-3xl hover:shadow-xl transition-shadow duration-300 cursor-default"
          >
            <h2 className="text-xs uppercase tracking-[0.2em] font-bold mb-4 text-[var(--accent)] opacity-80">{metric.title}</h2>
            <div className="text-[clamp(2rem,4vw,2.75rem)] font-extrabold mb-4 text-[var(--text)] tracking-tighter leading-none">
              {metric.value}
            </div>
            <p className="text-[var(--text)] opacity-60 text-sm leading-relaxed font-medium">{metric.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
