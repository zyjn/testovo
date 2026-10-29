/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { GlobalBurdenSection } from './components/GlobalBurdenSection';
import { PredictiveEngineSection } from './components/PredictiveEngineSection';
import { PatientStoriesSection } from './components/PatientStoriesSection';
import { RiskSimulatorSection } from './components/RiskSimulatorSection';
import { ClinicalMilestonesSection } from './components/ClinicalMilestonesSection';
import { ExecutiveSummarySection } from './components/ExecutiveSummarySection';

function MainContent() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <div className="relative min-h-screen bg-[#FBF9F5] dark:bg-[#0E1511] text-[#1E2922] dark:text-[#E8EFEA] font-sans antialiased selection:bg-[#D9E6DC] dark:selection:bg-[#1E3B2E] selection:text-[#0F1E15] dark:selection:text-[#E8EFEA] transition-colors duration-300">
      {/* Editorial Top Bar Contract Navigation */}
      <Navbar />

      {/* Top Reading Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-[#0D766E] dark:bg-[#2DD4BF] origin-left z-50 pointer-events-none transition-colors duration-300"
      />

      {/* Main Report Flow */}
      <main className="w-full overflow-x-hidden">
        <HeroSection />
        <GlobalBurdenSection />
        <PredictiveEngineSection />
        <PatientStoriesSection />
        <RiskSimulatorSection />
        <ClinicalMilestonesSection />
        <ExecutiveSummarySection />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
}
