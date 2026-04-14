'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CloudResourceDashboard from '@/components/CloudResourceDashboard';
import AzureNodeDetail from '@/components/AzureNodeDetail';
import SavingsReveal from '@/components/SavingsReveal';

type View = 'overview' | 'detail' | 'savings';

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    filter: 'blur(10px)',
  },
};

const pageTransition = {
  duration: 0.8,
  ease: 'easeInOut' as const,
};

export default function Home() {
  const [view, setView] = useState<View>('overview');

  useEffect(() => {
    // Stage 1 -> Stage 2 after 3s
    const t1 = setTimeout(() => {
      setView('detail');
    }, 3000);
    
    // Stage 2 -> Stage 3 after 7s total
    const t2 = setTimeout(() => {
      setView('savings');
    }, 7000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <main className="bg-[#f0f2f5] min-h-screen overflow-hidden flex items-center justify-center">
      <AnimatePresence mode="wait">
        {view === 'overview' && (
          <motion.div
            key="overview"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className="w-full h-full flex items-center justify-center"
          >
            <CloudResourceDashboard />
          </motion.div>
        )}
        
        {view === 'detail' && (
          <motion.div
            key="detail"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className="w-full h-full flex items-center justify-center"
          >
            <AzureNodeDetail />
          </motion.div>
        )}
        
        {view === 'savings' && (
          <motion.div
            key="savings"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className="w-full h-full flex items-center justify-center"
          >
            <SavingsReveal />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
