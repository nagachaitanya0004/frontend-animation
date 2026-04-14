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
    <section className="py-24 px-4 max-w-6xl mx-auto">
      <motion.h1 
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-center mb-16"
      >
        Cloud Optimization Insights
      </motion.h1>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {metrics.map((metric, index) => (
          <motion.div 
            key={index} 
            variants={cardVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            className="p-8 border border-[var(--card-border)] bg-[var(--card-bg)] rounded-2xl hover:shadow-xl transition-shadow duration-300 cursor-default"
          >
            <h2 className="text-sm uppercase tracking-widest font-bold mb-4 text-[var(--accent)]">{metric.title}</h2>
            <div className="text-4xl font-extrabold mb-4 text-[var(--text)] tracking-tight">
              {metric.value}
            </div>
            <p className="text-[var(--text)] opacity-60 text-sm leading-relaxed font-medium">{metric.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
