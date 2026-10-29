/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, BookOpen, Building2, Check, ArrowUpRight } from 'lucide-react';
import { CLINICAL_MILESTONES_2026, ANNUAL_REPORT_METRICS } from '../data/reportData';

export const ClinicalMilestonesSection: React.FC = () => {
  const partnerInstitutions = [
    'Hospital Clínic de Barcelona',
    'Kyoto University Hospital Respiratory Center',
    'Royal Brompton & Harefield NHS Trust, London',
    'National Jewish Health, Denver',
    'Charité – Universitätsmedizin Berlin',
    'Mayo Clinic Interstitial Lung Disease Clinic',
    'Seoul National University Hospital',
    'The Alfred Hospital, Melbourne',
  ];

  return (
    <section id="clinical-milestones" className="py-20 md:py-28 border-b border-[#E2DDD3] dark:border-[#223028] bg-[#FAF8F3] dark:bg-[#0D1410] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#6B7C72] dark:text-[#8D9F95] font-mono mb-2">
            <span>Chapter 05</span>
            <span aria-hidden="true">·</span>
            <span>Clinical Rigor & Validation</span>
            <span aria-hidden="true">·</span>
            <span>2026 Milestones</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#14231B] dark:text-[#F0F5F2] leading-tight mb-4">
            Scientific Publications & Clinical Network
          </h2>
          <p className="text-base text-[#46594C] dark:text-[#A7B9AD] leading-relaxed">
            In 2026, The I PuriFy Project transitioned from clinical trial validation to standard frontline protocol across 48 international interstitial lung disease centers of excellence.
          </p>
        </div>

        {/* 3 Metric Highlights Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#121E17] border border-[#E2DDD3] dark:border-[#223028] shadow-xs">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#6B7C72] dark:text-[#8D9F95] mb-2">
              Annual FVC Loss Reduction
            </div>
            <div className="font-mono-numbers text-3xl sm:text-4xl font-bold text-[#0D766E] dark:text-[#2DD4BF] mb-2">
              -38 mL / yr
            </div>
            <p className="text-xs text-[#526558] dark:text-[#9FB1A5] leading-relaxed">
              vs. <strong>-210 mL/year</strong> historical standard decline rate—representing an <strong>82% deceleration</strong> in irreversible lung loss.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#121E17] border border-[#E2DDD3] dark:border-[#223028] shadow-xs">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#6B7C72] dark:text-[#8D9F95] mb-2">
              Diagnostic Sensitivity
            </div>
            <div className="font-mono-numbers text-3xl sm:text-4xl font-bold text-[#0D766E] dark:text-[#2DD4BF] mb-2">
              91.8% / 94.2%
            </div>
            <p className="text-xs text-[#526558] dark:text-[#9FB1A5] leading-relaxed">
              Sensitivity & specificity in predicting individual 3-year fibrotic conversion in Lancet Respiratory Medicine multi-center trial.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#121E17] border border-[#E2DDD3] dark:border-[#223028] shadow-xs">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#6B7C72] dark:text-[#8D9F95] mb-2">
              Global Clinical Reach
            </div>
            <div className="font-mono-numbers text-3xl sm:text-4xl font-bold text-[#0D766E] dark:text-[#2DD4BF] mb-2">
              48 Centers · 18 Nations
            </div>
            <p className="text-xs text-[#526558] dark:text-[#9FB1A5] leading-relaxed">
              Direct cloud-integrated multi-omic telemetry feeding into university pulmonology registries across 4 continents.
            </p>
          </div>
        </div>

        {/* Milestone Timeline List */}
        <div className="mb-16">
          <h3 className="font-serif text-2xl font-semibold text-[#14231B] dark:text-[#F0F5F2] mb-6">
            Key 2025–2026 Clinical Milestones
          </h3>
          <div className="space-y-4">
            {CLINICAL_MILESTONES_2026.map((m, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-[#121E17] border border-[#E2DDD3] dark:border-[#223028] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 p-3 rounded-xl bg-[#FAF8F3] dark:bg-[#0A100C] border border-[#E8E2D6] dark:border-[#1E2C23] font-mono text-center min-w-[64px]">
                    <div className="text-xs font-bold text-[#0D766E] dark:text-[#2DD4BF]">{m.quarter}</div>
                    <div className="text-[11px] text-[#6B7C72] dark:text-[#8D9F95]">{m.year}</div>
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-[#14231B] dark:text-[#F0F5F2] mb-1">
                      {m.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#46594C] dark:text-[#A7BAAE] leading-relaxed max-w-3xl">
                      {m.description}
                    </p>
                    <div className="text-xs font-mono text-[#6B7C72] dark:text-[#8D9F95] mt-2">
                      Affiliation: {m.institution}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 sm:self-center">
                  <span className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold text-[#0D766E] dark:text-[#2DD4BF] bg-[#0D766E]/10 dark:bg-[#2DD4BF]/10 border border-[#0D766E]/20">
                    {m.metricBadge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Partner Hospital Grid */}
        <div className="p-8 rounded-2xl bg-white dark:bg-[#121E17] border border-[#E2DDD3] dark:border-[#223028] shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E2DDD3] dark:border-[#223028]">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#0D766E] dark:text-[#2DD4BF]" />
              <h4 className="font-serif text-xl font-semibold text-[#14231B] dark:text-[#F0F5F2]">
                Lead Clinical Research Partners & Hubs
              </h4>
            </div>
            <span className="text-xs font-mono text-[#6B7C72] dark:text-[#8D9F95]">
              48 Interstitial Lung Disease Centers
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {partnerInstitutions.map((inst, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#FAF8F3] dark:bg-[#0A100C] border border-[#E8E2D6] dark:border-[#1E2C23] flex items-center gap-3 text-xs font-medium text-[#2E4034] dark:text-[#CCDCD2]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#0D766E] dark:bg-[#2DD4BF] shrink-0" />
                <span className="leading-snug">{inst}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
