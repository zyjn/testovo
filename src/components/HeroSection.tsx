/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Activity, Clock, ShieldCheck, HeartHandshake, ArrowDown } from 'lucide-react';
import { AnimatedNumber } from './AnimatedNumber';
import { ANNUAL_REPORT_METRICS } from '../data/reportData';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 border-b border-[#E2DDD3] dark:border-[#223028] overflow-hidden">
      {/* Background Subtle Paper Texture Gradient */}
      <div className="absolute inset-0 bg-radial-at-t from-[#EFEAE1]/60 via-transparent to-transparent dark:from-[#17251D]/40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Publication Header Tagline */}
        <div className="flex items-center gap-2.5 text-xs uppercase tracking-widest text-[#6B7C72] dark:text-[#8D9F95] font-mono mb-4">
          <span>The I PuriFy Project</span>
          <span aria-hidden="true">·</span>
          <span>2026 Annual Impact Report</span>
          <span aria-hidden="true">·</span>
          <span>Pulmonary Fibrosis Interception</span>
        </div>

        {/* 2-Column Editorial Marquee Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch mb-16">
          {/* Column 1: Narrative & Headline (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#14231B] dark:text-[#F0F5F2] leading-[1.12] mb-6 text-balance">
                From Late Detection to Intercepted Destiny
              </h1>
              
              <div className="space-y-4 text-base sm:text-lg text-[#3C4E42] dark:text-[#BAC9BF] leading-relaxed max-w-2xl">
                <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#0D766E] dark:first-letter:text-[#2DD4BF]">
                  Idiopathic Pulmonary Fibrosis (IPF) has claimed millions of lives through a devastating clinical reality: patients are traditionally diagnosed only after irreversible honeycombing destroys over 40% of their alveolar capacity. With median survival historically confined to 2.5 to 3.5 years, the clinical community has spent decades reacting too late.
                </p>
                <p>
                  In 2026, <strong>The I PuriFy Project</strong> fundamentally inverted this paradigm. By synthesizing germline genomics (including the MUC5B promoter allele), circulating matrix metalloproteinases, and neural acoustic auscultation, our platform predicts individual disease incidence up to five years before conventional high-resolution CT can see a scar—opening the door to permanent disease arrest and preserved vitality.
                </p>
              </div>
            </div>

            {/* Curatorial Call to Actions */}
            <div className="pt-8 flex flex-wrap items-center gap-4">
              <a
                href="#global-burden"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#0D766E] hover:bg-[#0F8A80] dark:bg-[#14B8A6] dark:text-[#0E1511] dark:hover:bg-[#2DD4BF] rounded-lg shadow-xs transition-colors"
              >
                <span>Explore Global Burden Data</span>
                <ArrowDown className="w-4 h-4" />
              </a>
              <a
                href="#patient-stories"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-[#1E2922] dark:text-[#E8EFEA] bg-white/70 dark:bg-[#18231C] hover:bg-white dark:hover:bg-[#202E25] border border-[#D5CDC0] dark:border-[#2C3E33] rounded-lg transition-colors"
              >
                <span>Read Patient Journeys</span>
              </a>
            </div>
          </div>

          {/* Column 2: Architectural Schematic - The Interception Window (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="h-full rounded-2xl bg-[#F4EFE6]/80 dark:bg-[#15211A]/80 border border-[#DDD6C8] dark:border-[#24342A] p-6 lg:p-7 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between border-b border-[#E0D8CA] dark:border-[#26372D] pb-3 mb-5">
                  <span className="text-xs uppercase tracking-wider font-mono text-[#5A6D61] dark:text-[#90A296] font-semibold">
                    The Clinical Time Paradox
                  </span>
                  <span className="text-xs font-mono text-[#0D766E] dark:text-[#2DD4BF]">
                    Alveolar Architecture
                  </span>
                </div>

                {/* SVG Visual Model: The Conventional Cliff vs The PuriFy Interception */}
                <div className="relative w-full bg-white dark:bg-[#0E1511] rounded-xl p-4 border border-[#E5DFD4] dark:border-[#202D25] mb-5">
                  <div className="text-[11px] font-mono text-[#7D8F83] dark:text-[#7A8D81] mb-2 flex justify-between">
                    <span>Normal Lung (100% FVC)</span>
                    <span className="text-red-600 dark:text-red-400 font-semibold">Honeycombing (&lt;50% FVC)</span>
                  </div>

                  <svg viewBox="0 0 400 160" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
                    {/* Background Grid Lines */}
                    <line x1="20" y1="30" x2="380" y2="30" stroke="currentColor" strokeDasharray="3 3" className="text-stone-200 dark:text-stone-800" />
                    <line x1="20" y1="80" x2="380" y2="80" stroke="currentColor" strokeDasharray="3 3" className="text-stone-200 dark:text-stone-800" />
                    <line x1="20" y1="130" x2="380" y2="130" stroke="currentColor" strokeDasharray="3 3" className="text-stone-200 dark:text-stone-800" />

                    {/* Standard Trajectory Curve (Steep decline cliff) */}
                    <path
                      d="M 30 35 C 130 38, 200 50, 240 90 C 270 120, 310 142, 370 148"
                      fill="none"
                      stroke="#DC2626"
                      strokeWidth="2.5"
                      strokeDasharray="4 2"
                    />

                    {/* I PuriFy Intercepted Curve (Arrested plateau) */}
                    <path
                      d="M 30 35 C 100 37, 130 42, 170 45 C 230 48, 300 50, 370 52"
                      fill="none"
                      stroke="#0D766E"
                      strokeWidth="3"
                    />

                    {/* I PuriFy Interception Point */}
                    <circle cx="170" cy="45" r="5" fill="#0D766E" className="dark:fill-[#2DD4BF]" />
                    <line x1="170" y1="20" x2="170" y2="145" stroke="#0D766E" strokeWidth="1" strokeDasharray="2 2" className="dark:stroke-[#2DD4BF]" />
                    
                    {/* Late Standard Diagnosis Point */}
                    <circle cx="280" cy="128" r="5" fill="#DC2626" />
                    <line x1="280" y1="70" x2="280" y2="145" stroke="#DC2626" strokeWidth="1" strokeDasharray="2 2" />

                    {/* Labels on SVG */}
                    <text x="175" y="24" fontSize="9" fontWeight="600" fill="#0D766E" className="dark:fill-[#2DD4BF] font-mono">
                      I PuriFy Interception (89% FVC)
                    </text>
                    <text x="240" y="80" fontSize="9" fontWeight="600" fill="#DC2626" className="font-mono">
                      Standard Late Diagnosis (51% FVC)
                    </text>
                  </svg>

                  <div className="flex items-center justify-between text-[11px] font-sans text-[#526558] dark:text-[#9FB1A5] pt-1">
                    <span>Year -4 (Presymptomatic)</span>
                    <span>Year 0 (First Cough)</span>
                    <span>Year +3 (End-stage)</span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-[#4E6154] dark:text-[#9EB0A4] leading-relaxed">
                  <div className="flex items-start gap-2">
                    <span className="font-mono font-semibold text-[#0D766E] dark:text-[#2DD4BF]">01.</span>
                    <span><strong>Pre-Fibrotic Detection:</strong> Intercepts patients when only cellular senescence and subclinical collagen leakage exist.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-mono font-semibold text-[#0D766E] dark:text-[#2DD4BF]">02.</span>
                    <span><strong>Antifibrotic Preservation:</strong> Halts functional loss while Forced Vital Capacity remains above 88%.</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E0D8CA] dark:border-[#26372D] text-xs font-mono text-[#6A7C70] dark:text-[#889B8F] flex items-center justify-between">
                <span>Cohort Validation: 14,280 Screened</span>
                <span className="text-[#0D766E] dark:text-[#2DD4BF] font-medium">p &lt; 0.0001</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Headline Impact Metric Cards (Tabular numerals, unboxed discipline) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-[#E2DDD3] dark:border-[#223028]">
          {/* Card 1 */}
          <div className="bg-white/80 dark:bg-[#121E17]/80 rounded-xl p-6 border border-[#E2DDD3] dark:border-[#223028] shadow-xs">
            <div className="flex items-center justify-between mb-3 text-[#0D766E] dark:text-[#2DD4BF]">
              <span className="text-xs uppercase tracking-wider font-mono font-medium text-[#6B7C72] dark:text-[#8D9F95]">
                Interception Velocity
              </span>
              <Clock className="w-4 h-4" />
            </div>
            <div className="font-mono-numbers text-3xl sm:text-4xl font-semibold tracking-tight text-[#14231B] dark:text-[#F0F5F2] mb-1.5">
              <AnimatedNumber value={38} suffix=" Days" />
            </div>
            <p className="text-xs text-[#526558] dark:text-[#9FB1A5] leading-relaxed">
              Down from the global historical average of <strong>760 days (24.2 months)</strong> across standard specialist referral queues.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/80 dark:bg-[#121E17]/80 rounded-xl p-6 border border-[#E2DDD3] dark:border-[#223028] shadow-xs">
            <div className="flex items-center justify-between mb-3 text-[#0D766E] dark:text-[#2DD4BF]">
              <span className="text-xs uppercase tracking-wider font-mono font-medium text-[#6B7C72] dark:text-[#8D9F95]">
                Screenings in 2026
              </span>
              <Activity className="w-4 h-4" />
            </div>
            <div className="font-mono-numbers text-3xl sm:text-4xl font-semibold tracking-tight text-[#14231B] dark:text-[#F0F5F2] mb-1.5">
              <AnimatedNumber value={14280} />
            </div>
            <p className="text-xs text-[#526558] dark:text-[#9FB1A5] leading-relaxed">
              High-risk individuals triaged across 48 accredited clinical Interstitial Lung Disease centers across 18 countries.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/80 dark:bg-[#121E17]/80 rounded-xl p-6 border border-[#E2DDD3] dark:border-[#223028] shadow-xs">
            <div className="flex items-center justify-between mb-3 text-[#0D766E] dark:text-[#2DD4BF]">
              <span className="text-xs uppercase tracking-wider font-mono font-medium text-[#6B7C72] dark:text-[#8D9F95]">
                Vital Capacity Saved
              </span>
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="font-mono-numbers text-3xl sm:text-4xl font-semibold tracking-tight text-[#14231B] dark:text-[#F0F5F2] mb-1.5">
              <AnimatedNumber value={89.4} decimals={1} suffix="%" />
            </div>
            <p className="text-xs text-[#526558] dark:text-[#9FB1A5] leading-relaxed">
              Average preserved Forced Vital Capacity (FVC) at intervention, compared to only <strong>51.2%</strong> at conventional late diagnosis.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white/80 dark:bg-[#121E17]/80 rounded-xl p-6 border border-[#E2DDD3] dark:border-[#223028] shadow-xs">
            <div className="flex items-center justify-between mb-3 text-[#0D766E] dark:text-[#2DD4BF]">
              <span className="text-xs uppercase tracking-wider font-mono font-medium text-[#6B7C72] dark:text-[#8D9F95]">
                Life Years Preserved
              </span>
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div className="font-mono-numbers text-3xl sm:text-4xl font-semibold tracking-tight text-[#14231B] dark:text-[#F0F5F2] mb-1.5">
              <AnimatedNumber value={8.6} decimals={1} prefix="+" suffix=" Yrs" />
            </div>
            <p className="text-xs text-[#526558] dark:text-[#9FB1A5] leading-relaxed">
              Projected quality-adjusted life years added per patient, transforming a 3-year fatal prognosis into over a decade of vitality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
