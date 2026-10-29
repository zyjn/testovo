/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Navbar: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FBF9F5]/90 dark:bg-[#0E1511]/90 backdrop-blur-md border-b border-[#E2DDD3] dark:border-[#223028] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single line, text-first) */}
        <div className="flex items-center gap-3 shrink-0">
          <a href="#" className="flex items-baseline gap-2.5 group">
            <span className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#14231B] dark:text-[#F0F5F2] group-hover:text-[#0D766E] dark:group-hover:text-[#2DD4BF] transition-colors">
              The I PuriFy Project
            </span>
            <span className="hidden sm:inline-block text-xs uppercase tracking-widest text-[#6B7C72] dark:text-[#8D9F95] font-medium font-sans">
              2026 Impact Report
            </span>
          </a>
        </div>

        {/* Zone 2: 4-5 Concise Single-Line Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#415347] dark:text-[#B0C0B7]">
          <a
            href="#global-burden"
            className="hover:text-[#14231B] dark:hover:text-[#F0F5F2] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Global Burden
          </a>
          <a
            href="#predictive-science"
            className="hover:text-[#14231B] dark:hover:text-[#F0F5F2] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Predictive Science
          </a>
          <a
            href="#patient-stories"
            className="hover:text-[#14231B] dark:hover:text-[#F0F5F2] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Patient Journeys
          </a>
          <a
            href="#risk-simulator"
            className="hover:text-[#14231B] dark:hover:text-[#F0F5F2] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Risk Simulator
          </a>
          <a
            href="#clinical-milestones"
            className="hover:text-[#14231B] dark:hover:text-[#F0F5F2] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            2026 Milestones
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action + Theme Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme mode"
            className="p-2 text-[#415347] dark:text-[#B0C0B7] hover:text-[#14231B] dark:hover:text-[#F0F5F2] rounded-lg border border-transparent hover:border-[#D6CEBE] dark:hover:border-[#2C3E33] transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          <a
            href="#risk-simulator"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#0D766E] hover:bg-[#0F8A80] dark:bg-[#14B8A6] dark:text-[#0A1A12] dark:hover:bg-[#2DD4BF] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            <span>Assess Patient Risk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="lg:hidden p-2 text-[#415347] dark:text-[#B0C0B7] hover:text-[#14231B] dark:hover:text-[#F0F5F2]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-6 pt-3 pb-6 border-t border-[#E2DDD3] dark:border-[#223028] bg-[#FBF9F5] dark:bg-[#0E1511] space-y-3">
          <a
            href="#global-burden"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-[#415347] dark:text-[#B0C0B7]"
          >
            Global Burden & Mortality
          </a>
          <a
            href="#predictive-science"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-[#415347] dark:text-[#B0C0B7]"
          >
            Predictive Multi-Omics
          </a>
          <a
            href="#patient-stories"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-[#415347] dark:text-[#B0C0B7]"
          >
            Qualitative Patient Journeys
          </a>
          <a
            href="#risk-simulator"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-[#415347] dark:text-[#B0C0B7]"
          >
            Interactive Incidence Simulator
          </a>
          <a
            href="#clinical-milestones"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-[#415347] dark:text-[#B0C0B7]"
          >
            2026 Clinical Milestones
          </a>
          <div className="pt-2">
            <a
              href="#risk-simulator"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#0D766E] rounded-lg"
            >
              Assess Patient Risk
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
