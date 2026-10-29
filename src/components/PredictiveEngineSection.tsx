/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Dna, ShieldAlert, Waves, Gauge, ArrowRight, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { BIOMARKER_PILLARS, STAGE_COMPARISON_DATA } from '../data/reportData';

export const PredictiveEngineSection: React.FC = () => {
  const [activePillarId, setActivePillarId] = useState<string>('genomics');
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(0);

  const activePillar = BIOMARKER_PILLARS.find((p) => p.id === activePillarId) || BIOMARKER_PILLARS[0];
  const activeStage = STAGE_COMPARISON_DATA[selectedStageIndex];

  return (
    <section id="predictive-science" className="py-20 md:py-28 border-b border-[#E2DDD3] dark:border-[#223028] bg-[#FBF9F5] dark:bg-[#0E1511] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#6B7C72] dark:text-[#8D9F95] font-mono mb-2">
            <span>Chapter 02</span>
            <span aria-hidden="true">·</span>
            <span>Predictive Multi-Omics</span>
            <span aria-hidden="true">·</span>
            <span>The Science of Interception</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#14231B] dark:text-[#F0F5F2] leading-tight mb-4">
            How The I PuriFy Engine Predicts Individual Incidence
          </h2>
          <p className="text-base text-[#46594C] dark:text-[#A7B9AD] leading-relaxed">
            By fusing inherited germline susceptibility with real-time circulating proteomic turnover and subaudible acoustic biometrics, The I PuriFy predictive platform converts vague pulmonary risk into a quantifiable, actionable individual trajectory.
          </p>
        </div>

        {/* 4 Pillars Interactive Workbench */}
        <div className="mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {BIOMARKER_PILLARS.map((pillar) => {
              const isSelected = activePillarId === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillarId(pillar.id)}
                  className={`text-left p-5 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-white dark:bg-[#15231C] border-[#0D766E] dark:border-[#2DD4BF] shadow-xs'
                      : 'bg-[#F4EFE6]/60 dark:bg-[#121B16] border-[#E2DDD3] dark:border-[#202E25] hover:bg-white dark:hover:bg-[#18251E]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#6B7C72] dark:text-[#8D9F95]">
                      {pillar.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#0D766E] dark:text-[#2DD4BF]">
                      {pillar.weight}% Model Weight
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#14231B] dark:text-[#F0F5F2] mb-1">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-mono text-[#0D766E] dark:text-[#2DD4BF] flex items-center gap-1.5 mt-2">
                    <span>Window: {pillar.detectionWindow}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Synchronized Deep Inspector */}
          <div className="bg-white dark:bg-[#121E17] rounded-2xl border border-[#E2DDD3] dark:border-[#223028] p-6 sm:p-8 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 text-xs font-mono text-[#0D766E] dark:text-[#2DD4BF] font-semibold mb-2">
                  <span>Pillar Focus</span>
                  <span aria-hidden="true">·</span>
                  <span>{activePillar.category}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#14231B] dark:text-[#F0F5F2] mb-4">
                  {activePillar.title}
                </h3>
                <p className="text-sm sm:text-base text-[#3E5144] dark:text-[#A7BAAE] leading-relaxed mb-6">
                  {activePillar.mechanism}
                </p>

                <div className="p-4 rounded-xl bg-[#F7F4EE] dark:bg-[#0A100C] border border-[#E8E2D6] dark:border-[#1E2C23] mb-6">
                  <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#5A6D61] dark:text-[#90A296] mb-1.5">
                    Clinical Prognostic Relevance
                  </div>
                  <p className="text-xs sm:text-sm text-[#27382E] dark:text-[#C5D5CB] leading-relaxed">
                    {activePillar.clinicalSignificance}
                  </p>
                </div>

                <div className="text-xs text-[#6B7C72] dark:text-[#8D9F95] font-mono">
                  Scientific Validation: {activePillar.scientificValidation}
                </div>
              </div>

              {/* Target Markers List & Metric Box */}
              <div className="lg:col-span-5 bg-[#FAF8F3] dark:bg-[#0E1511] rounded-xl p-5 border border-[#E5DFD4] dark:border-[#1E2C23] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider font-semibold text-[#5A6D61] dark:text-[#90A296] mb-3 pb-2 border-b border-[#E2DDD3] dark:border-[#223028]">
                    Primary Quantified Analytes & Biomarkers
                  </div>
                  <ul className="space-y-3 mb-6">
                    {activePillar.targetMarkers.map((marker, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#2A3C31] dark:text-[#D2DFD7]">
                        <CheckCircle2 className="w-4 h-4 text-[#0D766E] dark:text-[#2DD4BF] shrink-0 mt-0.5" />
                        <div>
                          <div className="font-mono font-medium">{marker}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#E2DDD3] dark:border-[#223028] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#6B7C72] dark:text-[#8D9F95]">Predictive Early Window:</span>
                  <span className="text-[#0D766E] dark:text-[#2DD4BF] font-semibold">{activePillar.detectionWindow}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The 4 Clinical Stages: The Interception Window vs Conventional Late Honeycombing */}
        <div className="pt-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#6B7C72] dark:text-[#8D9F95] font-mono mb-1">
                <span>Clinical Staging Matrix</span>
                <span aria-hidden="true">·</span>
                <span>The Time Interception Gap</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#14231B] dark:text-[#F0F5F2]">
                Alveolar Pathology Across Disease Progression
              </h3>
            </div>
            <p className="text-xs text-[#6B7C72] dark:text-[#8D9F95] max-w-sm">
              Click each stage to compare patient lung function and medical outcomes between traditional care and early prediction.
            </p>
          </div>

          {/* Horizontal Stage Stepper */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {STAGE_COMPARISON_DATA.map((stage, idx) => {
              const isSelected = selectedStageIndex === idx;
              return (
                <button
                  key={stage.stage}
                  onClick={() => setSelectedStageIndex(idx)}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white dark:bg-[#15231C] border-[#0D766E] dark:border-[#2DD4BF] shadow-xs ring-1 ring-[#0D766E]/20 dark:ring-[#2DD4BF]/20'
                      : 'bg-[#F4EFE6]/70 dark:bg-[#121B16] border-[#E2DDD3] dark:border-[#202E25] hover:bg-white dark:hover:bg-[#18251E]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                    <span className="text-[#6B7C72] dark:text-[#8D9F95]">0{idx + 1}.</span>
                    <span
                      className={`font-semibold ${
                        idx < 2 ? 'text-[#0D766E] dark:text-[#2DD4BF]' : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {idx < 2 ? 'Interception Zone' : 'Clinical Damage'}
                    </span>
                  </div>
                  <div className="font-serif text-base font-semibold text-[#14231B] dark:text-[#F0F5F2] mb-1">
                    {stage.stage.split(':')[0]}
                  </div>
                  <div className="text-xs font-mono text-[#526558] dark:text-[#9FB1A5]">
                    {stage.timing}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Detailed Comparison Card */}
          <div className="bg-white dark:bg-[#121E17] rounded-2xl border border-[#E2DDD3] dark:border-[#223028] p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-[#E2DDD3] dark:border-[#223028]">
              <div>
                <span className="text-xs font-mono text-[#0D766E] dark:text-[#2DD4BF] font-semibold uppercase tracking-wider">
                  {activeStage.puriFyStatus}
                </span>
                <h4 className="font-serif text-2xl font-semibold text-[#14231B] dark:text-[#F0F5F2]">
                  {activeStage.stage}
                </h4>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="px-3 py-1.5 rounded-lg bg-[#F7F4EE] dark:bg-[#0A100C] border border-[#E8E2D6] dark:border-[#1E2C23]">
                  <span className="text-[#6B7C72] dark:text-[#8D9F95]">Vital Capacity (FVC): </span>
                  <span className="font-bold text-[#14231B] dark:text-[#F0F5F2]">{activeStage.fvcStatus}</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-[#F7F4EE] dark:bg-[#0A100C] border border-[#E8E2D6] dark:border-[#1E2C23]">
                  <span className="text-[#6B7C72] dark:text-[#8D9F95]">Reversibility: </span>
                  <span className="font-bold text-[#0D766E] dark:text-[#2DD4BF]">{activeStage.reversibility}</span>
                </div>
              </div>
            </div>

            {/* Pathology & Contrast */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="p-4 rounded-xl bg-[#FAF8F3] dark:bg-[#0D1410] border border-[#E8E2D6] dark:border-[#1E2C23]">
                <div className="text-xs font-mono uppercase tracking-wider font-semibold text-[#5A6D61] dark:text-[#90A296] mb-2">
                  Alveolar Micro-Pathology
                </div>
                <p className="text-xs sm:text-sm text-[#3E5144] dark:text-[#A7BAAE] leading-relaxed">
                  {activeStage.pathology}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F3] dark:bg-[#0D1410] border border-red-200 dark:border-red-950/40">
                <div className="text-xs font-mono uppercase tracking-wider font-semibold text-red-600 dark:text-red-400 mb-2">
                  Traditional Clinical Standard
                </div>
                <p className="text-xs sm:text-sm text-[#3E5144] dark:text-[#A7BAAE] leading-relaxed">
                  {activeStage.standardCareAction}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F3] dark:bg-[#0D1410] border border-[#0D766E]/40 dark:border-[#2DD4BF]/30">
                <div className="text-xs font-mono uppercase tracking-wider font-semibold text-[#0D766E] dark:text-[#2DD4BF] mb-2">
                  The I PuriFy Intercepted Protocol
                </div>
                <p className="text-xs sm:text-sm text-[#3E5144] dark:text-[#A7BAAE] leading-relaxed">
                  {activeStage.puriFyAction}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2DDD3] dark:border-[#223028] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#526558] dark:text-[#9FB1A5] gap-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#14231B] dark:text-[#F0F5F2]">Prognostic Expectancy:</span>
                <span className="font-mono">{activeStage.survivalPrognosis}</span>
              </div>
              <a href="#patient-stories" className="text-[#0D766E] dark:text-[#2DD4BF] hover:underline font-mono font-medium flex items-center gap-1">
                <span>See Arthur, Elena & Kenji’s Stories</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
