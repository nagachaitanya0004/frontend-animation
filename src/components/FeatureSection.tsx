'use client';

import React from 'react';
import { useMetrics } from '@/hooks/useMetrics';

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
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-12">Cloud Optimization Insights</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {metrics.map((metric, index) => (
          <div 
            key={index} 
            className="p-8 border border-[var(--card-border)] bg-[var(--card-bg)] rounded-2xl hover:shadow-lg transition-all duration-300"
          >
            <h2 className="text-sm uppercase tracking-wider font-semibold mb-4 text-[var(--accent)]">{metric.title}</h2>
            <div className="text-4xl font-bold mb-4 text-[var(--text)]">
              {metric.value}
            </div>
            <p className="text-[var(--text)] opacity-60 text-sm leading-relaxed">{metric.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
