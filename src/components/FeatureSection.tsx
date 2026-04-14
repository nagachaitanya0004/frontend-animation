import React from 'react';

export default function FeatureSection() {
  const cards = [
    { title: "Total Cost", description: "Efficiently manage and track your total cloud expenditure." },
    { title: "Usage", description: "Monitor resource consumption across all your cloud services." },
    { title: "Savings", description: "Identify opportunities for cost reduction and optimization." }
  ];

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-12">Cloud Optimization Insights</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <div 
            key={index} 
            className="p-6 border border-[var(--card-border)] bg-[var(--card-bg)] rounded-xl hover:shadow-sm transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-3 text-[var(--text)]">{card.title}</h2>
            <p className="text-[var(--text)] opacity-70">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
