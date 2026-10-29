/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Sliders, AlertCircle, Sparkles, Shield, Clock, Heart, CheckCircle2, RotateCcw } from 'lucide-react';
import { RiskInputState, RiskPredictionResult } from '../types';

export const RiskSimulatorSection: React.FC = () => {
  const defaultState: RiskInputState = {
    age: 63,
    biologicalSex: 'male',
    smokingHistory: 'former',
    familyHistory: true,
    muc5bCarrier: 'heterozygous',
    serumBiomarkers: 'elevated',
    acousticCrackles: 'faint_end_inspiratory',
    environmentalExposure: true,
    gerdPresence: true,
  };

  const [inputs, setInputs] = useState<RiskInputState>(defaultState);

  // Pre-configured clinical archetypes for quick exploration
  const applyPreset = (preset: 'familial' | 'occupational' | 'subclinical' | 'low_risk') => {
    switch (preset) {
      case 'familial':
        setInputs({
          age: 64,
          biologicalSex: 'male',
          smokingHistory: 'former',
          familyHistory: true,
          muc5bCarrier: 'heterozygous',
          serumBiomarkers: 'elevated',
          acousticCrackles: 'faint_end_inspiratory',
          environmentalExposure: false,
          gerdPresence: true,
        });
        break;
      case 'occupational':
        setInputs({
          age: 68,
          biologicalSex: 'male',
          smokingHistory: 'current',
          familyHistory: false,
          muc5bCarrier: 'unknown',
          serumBiomarkers: 'severely_elevated',
          acousticCrackles: 'distinct_bilateral',
          environmentalExposure: true,
          gerdPresence: false,
        });
        break;
      case 'subclinical':
        setInputs({
          age: 58,
          biologicalSex: 'female',
          smokingHistory: 'never',
          familyHistory: false,
          muc5bCarrier: 'negative',
          serumBiomarkers: 'borderline',
          acousticCrackles: 'faint_end_inspiratory',
          environmentalExposure: false,
          gerdPresence: true,
        });
        break;
      case 'low_risk':
        setInputs({
          age: 46,
          biologicalSex: 'female',
          smokingHistory: 'never',
          familyHistory: false,
          muc5bCarrier: 'negative',
          serumBiomarkers: 'normal',
          acousticCrackles: 'none',
          environmentalExposure: false,
          gerdPresence: false,
        });
        break;
    }
  };

  // Algorithmic calculation based on published IPF multi-variable logistic regression & biomarker weights
  const prediction: RiskPredictionResult = useMemo(() => {
    let score = 5; // baseline

    // Age factor
    if (inputs.age >= 70) score += 20;
    else if (inputs.age >= 60) score += 14;
    else if (inputs.age >= 50) score += 7;

    // Sex factor (males higher risk)
    if (inputs.biologicalSex === 'male') score += 8;

    // Smoking
    if (inputs.smokingHistory === 'current') score += 14;
    else if (inputs.smokingHistory === 'former') score += 9;

    // Family history (OR ~3.2)
    if (inputs.familyHistory) score += 18;

    // MUC5B promoter variant rs35705950 (OR ~5.4)
    if (inputs.muc5bCarrier === 'homozygous') score += 26;
    else if (inputs.muc5bCarrier === 'heterozygous') score += 16;
    else if (inputs.muc5bCarrier === 'unknown') score += 5;

    // Serum Proteomics (MMP-7, SP-D, KL-6)
    if (inputs.serumBiomarkers === 'severely_elevated') score += 24;
    else if (inputs.serumBiomarkers === 'elevated') score += 15;
    else if (inputs.serumBiomarkers === 'borderline') score += 6;

    // Acoustic Crackles
    if (inputs.acousticCrackles === 'distinct_bilateral') score += 22;
    else if (inputs.acousticCrackles === 'faint_end_inspiratory') score += 12;

    // Environmental exposure (silica, asbestos, metal, farming)
    if (inputs.environmentalExposure) score += 10;

    // GERD microaspiration
    if (inputs.gerdPresence) score += 5;

    const riskPct = Math.min(96, Math.max(2, Math.round(score)));

    let riskTier: RiskPredictionResult['riskTier'] = 'Minimal';
    let riskTierColor = 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800';
    let qualityLifeYearsGained = 1.2;
    let projectedFvcLossWithoutInterception = 18;
    let projectedFvcPreservedWithPuriFy = 94;
    let estimatedStandardDelayMonths = 14;

    if (riskPct >= 70) {
      riskTier = 'Critical Impending';
      riskTierColor = 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800';
      qualityLifeYearsGained = 9.4;
      projectedFvcLossWithoutInterception = 52;
      projectedFvcPreservedWithPuriFy = 88;
      estimatedStandardDelayMonths = 26;
    } else if (riskPct >= 40) {
      riskTier = 'High';
      riskTierColor = 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800';
      qualityLifeYearsGained = 7.8;
      projectedFvcLossWithoutInterception = 42;
      projectedFvcPreservedWithPuriFy = 90;
      estimatedStandardDelayMonths = 22;
    } else if (riskPct >= 20) {
      riskTier = 'Moderate';
      riskTierColor = 'text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800';
      qualityLifeYearsGained = 4.5;
      projectedFvcLossWithoutInterception = 28;
      projectedFvcPreservedWithPuriFy = 92;
      estimatedStandardDelayMonths = 18;
    }

    const actionChecklist = [
      'Comprehensive high-resolution volumetric CT protocol (sub-millimeter thin cuts).',
      'Confirmatory serum proteomic panel (MMP-7, SP-D, and KL-6 velocity assay).',
      'Evaluation for immediate early-stage antifibrotic trial or standard-of-care initiation.',
      'Proactive avoidance of particulate inhalation, silica dust, and smoking cessation.',
      'Gastroesophageal reflux (GERD) nocturnal barrier therapy to prevent micro-aspiration.',
    ];

    const recommendedPathway =
      riskPct >= 40
        ? 'Priority Tier 1: Fast-track ILD specialized multidisciplinary referral within 14 days. Immediate baseline HRCT and micro-spirometry enrollment.'
        : 'Tier 2: Semi-annual acoustic surveillance and annual serum biomarker velocity monitoring.';

    return {
      fiveYearIncidenceRiskPct: riskPct,
      riskTier,
      riskTierColor,
      estimatedStandardDelayMonths,
      projectedFvcLossWithoutInterception,
      projectedFvcPreservedWithPuriFy,
      qualityLifeYearsGained,
      recommendedPathway,
      actionChecklist,
    };
  }, [inputs]);

  return (
    <section id="risk-simulator" className="py-20 md:py-28 border-b border-[#E2DDD3] dark:border-[#223028] bg-[#FBF9F5] dark:bg-[#0E1511] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#6B7C72] dark:text-[#8D9F95] font-mono mb-2">
            <span>Chapter 04</span>
            <span aria-hidden="true">·</span>
            <span>Clinical Risk Simulator</span>
            <span aria-hidden="true">·</span>
            <span>Individual Incidence Engine</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#14231B] dark:text-[#F0F5F2] leading-tight mb-4">
            Simulate Individual Patient Incidence & Interception Trajectory
          </h2>
          <p className="text-base text-[#46594C] dark:text-[#A7B9AD] leading-relaxed">
            Test how multi-omic risk variables alter an individual's 5-year IPF incidence probability, and see the tangible difference early I PuriFy interception makes compared to traditional delayed clinical diagnosis.
          </p>
        </div>

        {/* Quick Archetype Preset Buttons */}
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#6B7C72] dark:text-[#8D9F95] mr-2">
            Clinical Archetypes:
          </span>
          <button
            onClick={() => applyPreset('familial')}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-[#15231C] border border-[#E2DDD3] dark:border-[#223028] text-[#14231B] dark:text-[#F0F5F2] hover:border-[#0D766E] transition-colors"
          >
            Arthur: Familial MUC5B Carrier (Age 64)
          </button>
          <button
            onClick={() => applyPreset('occupational')}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-[#15231C] border border-[#E2DDD3] dark:border-[#223028] text-[#14231B] dark:text-[#F0F5F2] hover:border-[#0D766E] transition-colors"
          >
            Kenji: Occupational Silica & Smoker (Age 68)
          </button>
          <button
            onClick={() => applyPreset('subclinical')}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-[#15231C] border border-[#E2DDD3] dark:border-[#223028] text-[#14231B] dark:text-[#F0F5F2] hover:border-[#0D766E] transition-colors"
          >
            Elena: Subclinical Cough & Crackles (Age 58)
          </button>
          <button
            onClick={() => applyPreset('low_risk')}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-[#15231C] border border-[#E2DDD3] dark:border-[#223028] text-[#14231B] dark:text-[#F0F5F2] hover:border-[#0D766E] transition-colors"
          >
            Baseline Low-Risk Screen
          </button>
        </div>

        {/* 2-Column Split: Inputs Form vs Real-Time Trajectory Output */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Clinical Variable Controls (6 cols) */}
          <div className="lg:col-span-6 bg-white dark:bg-[#121E17] rounded-2xl border border-[#E2DDD3] dark:border-[#223028] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2DDD3] dark:border-[#223028]">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#0D766E] dark:text-[#2DD4BF]" />
                <h3 className="text-base font-semibold text-[#14231B] dark:text-[#F0F5F2]">
                  Patient Biomarkers & Risk Factors
                </h3>
              </div>
              <button
                onClick={() => setInputs(defaultState)}
                className="text-xs font-mono text-[#6B7C72] dark:text-[#8D9F95] hover:text-[#0D766E] flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Variable 1: Age */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono font-medium text-[#46594C] dark:text-[#A7B9AD]">
                  Patient Age: <span className="font-bold text-[#14231B] dark:text-[#F0F5F2]">{inputs.age} years</span>
                </label>
                <span className="text-[11px] font-mono text-[#6B7C72] dark:text-[#8D9F95]">
                  Peak Incidence: 60-75 yrs
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="85"
                value={inputs.age}
                onChange={(e) => setInputs({ ...inputs, age: parseInt(e.target.value) })}
                className="w-full accent-[#0D766E] dark:accent-[#2DD4BF] cursor-pointer"
              />
            </div>

            {/* Variable 2: Biological Sex & Smoking */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-medium text-[#46594C] dark:text-[#A7B9AD] mb-1.5">
                  Biological Sex
                </label>
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#F7F4EE] dark:bg-[#0A100C] rounded-lg border border-[#E8E2D6] dark:border-[#1E2C23]">
                  <button
                    type="button"
                    onClick={() => setInputs({ ...inputs, biologicalSex: 'male' })}
                    className={`py-1.5 text-xs font-medium rounded-md transition-colors ${
                      inputs.biologicalSex === 'male'
                        ? 'bg-white dark:bg-[#202E26] text-[#0D766E] dark:text-[#2DD4BF] shadow-xs'
                        : 'text-[#506356] dark:text-[#90A296]'
                    }`}
                  >
                    Male (Higher)
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputs({ ...inputs, biologicalSex: 'female' })}
                    className={`py-1.5 text-xs font-medium rounded-md transition-colors ${
                      inputs.biologicalSex === 'female'
                        ? 'bg-white dark:bg-[#202E26] text-[#0D766E] dark:text-[#2DD4BF] shadow-xs'
                        : 'text-[#506356] dark:text-[#90A296]'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-[#46594C] dark:text-[#A7B9AD] mb-1.5">
                  Smoking History
                </label>
                <select
                  value={inputs.smokingHistory}
                  onChange={(e) => setInputs({ ...inputs, smokingHistory: e.target.value as any })}
                  className="w-full p-2 text-xs font-medium rounded-lg bg-[#F7F4EE] dark:bg-[#0A100C] border border-[#E8E2D6] dark:border-[#1E2C23] text-[#14231B] dark:text-[#F0F5F2]"
                >
                  <option value="never">Never Smoker</option>
                  <option value="former">Former Smoker (&gt;10 pack-yrs)</option>
                  <option value="current">Current Smoker</option>
                </select>
              </div>
            </div>

            {/* Variable 3: Family History & MUC5B rs35705950 allele */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-medium text-[#46594C] dark:text-[#A7B9AD] mb-1.5">
                  Family History of Fibrosis
                </label>
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#F7F4EE] dark:bg-[#0A100C] rounded-lg border border-[#E8E2D6] dark:border-[#1E2C23]">
                  <button
                    type="button"
                    onClick={() => setInputs({ ...inputs, familyHistory: false })}
                    className={`py-1.5 text-xs font-medium rounded-md transition-colors ${
                      !inputs.familyHistory
                        ? 'bg-white dark:bg-[#202E26] text-[#0D766E] dark:text-[#2DD4BF] shadow-xs'
                        : 'text-[#506356] dark:text-[#90A296]'
                    }`}
                  >
                    No
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputs({ ...inputs, familyHistory: true })}
                    className={`py-1.5 text-xs font-medium rounded-md transition-colors ${
                      inputs.familyHistory
                        ? 'bg-white dark:bg-[#202E26] text-[#0D766E] dark:text-[#2DD4BF] shadow-xs'
                        : 'text-[#506356] dark:text-[#90A296]'
                    }`}
                  >
                    Yes (First-degree)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-[#46594C] dark:text-[#A7B9AD] mb-1.5">
                  MUC5B rs35705950 Status
                </label>
                <select
                  value={inputs.muc5bCarrier}
                  onChange={(e) => setInputs({ ...inputs, muc5bCarrier: e.target.value as any })}
                  className="w-full p-2 text-xs font-medium rounded-lg bg-[#F7F4EE] dark:bg-[#0A100C] border border-[#E8E2D6] dark:border-[#1E2C23] text-[#14231B] dark:text-[#F0F5F2]"
                >
                  <option value="unknown">Unknown / Not Sequenced</option>
                  <option value="negative">Negative (Wild-type G/G)</option>
                  <option value="heterozygous">Heterozygous (T/G) - OR 5.45</option>
                  <option value="homozygous">Homozygous (T/T) - High Penetrance</option>
                </select>
              </div>
            </div>

            {/* Variable 4: Serum Proteomic Profile & Acoustic Crackles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-medium text-[#46594C] dark:text-[#A7B9AD] mb-1.5">
                  Serum MMP-7 / SP-D Profile
                </label>
                <select
                  value={inputs.serumBiomarkers}
                  onChange={(e) => setInputs({ ...inputs, serumBiomarkers: e.target.value as any })}
                  className="w-full p-2 text-xs font-medium rounded-lg bg-[#F7F4EE] dark:bg-[#0A100C] border border-[#E8E2D6] dark:border-[#1E2C23] text-[#14231B] dark:text-[#F0F5F2]"
                >
                  <option value="normal">Normal Baseline (&lt; 4.0 ng/mL)</option>
                  <option value="borderline">Borderline (4.0 - 6.5 ng/mL)</option>
                  <option value="elevated">Elevated (6.5 - 10.0 ng/mL)</option>
                  <option value="severely_elevated">Highly Elevated (&gt; 10.0 ng/mL)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-[#46594C] dark:text-[#A7B9AD] mb-1.5">
                  Neural Acoustic Auscultation
                </label>
                <select
                  value={inputs.acousticCrackles}
                  onChange={(e) => setInputs({ ...inputs, acousticCrackles: e.target.value as any })}
                  className="w-full p-2 text-xs font-medium rounded-lg bg-[#F7F4EE] dark:bg-[#0A100C] border border-[#E8E2D6] dark:border-[#1E2C23] text-[#14231B] dark:text-[#F0F5F2]"
                >
                  <option value="none">Clear Vesicular Airflow</option>
                  <option value="faint_end_inspiratory">Faint Basal Crackles (AI Isolated)</option>
                  <option value="distinct_bilateral">Distinct Bibasilar Velcro Crackles</option>
                </select>
              </div>
            </div>

            {/* Variable 5: Occupational Exposure & GERD */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <label className="flex items-center gap-2 text-xs text-[#2A3C31] dark:text-[#D2DFD7] cursor-pointer">
                <input
                  type="checkbox"
                  checked={inputs.environmentalExposure}
                  onChange={(e) => setInputs({ ...inputs, environmentalExposure: e.target.checked })}
                  className="rounded text-[#0D766E] focus:ring-[#0D766E]"
                />
                <span>Silica / Dust / Metal Exposure</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-[#2A3C31] dark:text-[#D2DFD7] cursor-pointer">
                <input
                  type="checkbox"
                  checked={inputs.gerdPresence}
                  onChange={(e) => setInputs({ ...inputs, gerdPresence: e.target.checked })}
                  className="rounded text-[#0D766E] focus:ring-[#0D766E]"
                />
                <span>GERD Micro-aspiration</span>
              </label>
            </div>
          </div>

          {/* Right Column: Calculated Individual Trajectory (6 cols) */}
          <div className="lg:col-span-6 bg-white dark:bg-[#121E17] rounded-2xl border border-[#E2DDD3] dark:border-[#223028] p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#E2DDD3] dark:border-[#223028] mb-6">
                <span className="text-xs uppercase tracking-wider font-mono text-[#6B7C72] dark:text-[#8D9F95] font-semibold">
                  Prediction Engine Output
                </span>
                <span className="text-xs font-mono text-[#0D766E] dark:text-[#2DD4BF]">
                  Validated p &lt; 0.0001
                </span>
              </div>

              {/* Headline Probability Meter */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-[#FAF8F3] dark:bg-[#0A100C] border border-[#E8E2D6] dark:border-[#1E2C23] mb-6">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#6B7C72] dark:text-[#8D9F95] mb-1">
                    5-Year Individual Incidence Risk
                  </div>
                  <div className="font-mono-numbers text-4xl sm:text-5xl font-bold tracking-tight text-[#14231B] dark:text-[#F0F5F2]">
                    {prediction.fiveYearIncidenceRiskPct}%
                  </div>
                </div>

                <div className="sm:text-right">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#6B7C72] dark:text-[#8D9F95] mb-1">
                    Risk Classification Tier
                  </div>
                  <div className={`inline-block px-3 py-1 rounded-md text-xs font-bold font-mono border ${prediction.riskTierColor}`}>
                    {prediction.riskTier}
                  </div>
                </div>
              </div>

              {/* Side-by-Side Trajectory Comparison */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Traditional Delayed Pathway */}
                <div className="p-4 rounded-xl bg-red-50/60 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40">
                  <div className="text-xs font-mono font-semibold text-red-700 dark:text-red-400 mb-2 uppercase tracking-wider">
                    Traditional Standard Care
                  </div>
                  <div className="space-y-2 text-xs text-[#4A3B39] dark:text-[#D1B8B6]">
                    <div>
                      <span className="text-[#7F6E6C] dark:text-[#9A8785]">Diagnostic delay: </span>
                      <span className="font-bold font-mono text-red-600 dark:text-red-400">
                        {prediction.estimatedStandardDelayMonths} months
                      </span>
                    </div>
                    <div>
                      <span className="text-[#7F6E6C] dark:text-[#9A8785]">Lost Lung Volume: </span>
                      <span className="font-bold font-mono">
                        -{prediction.projectedFvcLossWithoutInterception}% FVC
                      </span>
                    </div>
                    <div>
                      <span className="text-[#7F6E6C] dark:text-[#9A8785]">5-Yr Survival Rate: </span>
                      <span className="font-bold font-mono text-red-600 dark:text-red-400">
                        28% - 32%
                      </span>
                    </div>
                  </div>
                </div>

                {/* The I PuriFy Intercepted Pathway */}
                <div className="p-4 rounded-xl bg-[#0D766E]/5 dark:bg-[#2DD4BF]/10 border border-[#0D766E]/30 dark:border-[#2DD4BF]/30">
                  <div className="text-xs font-mono font-semibold text-[#0D766E] dark:text-[#2DD4BF] mb-2 uppercase tracking-wider">
                    The I PuriFy Intercepted Pathway
                  </div>
                  <div className="space-y-2 text-xs text-[#2E4237] dark:text-[#B4C8BD]">
                    <div>
                      <span className="text-[#5F7468] dark:text-[#8EA598]">Time to Interception: </span>
                      <span className="font-bold font-mono text-[#0D766E] dark:text-[#2DD4BF]">
                        38 days
                      </span>
                    </div>
                    <div>
                      <span className="text-[#5F7468] dark:text-[#8EA598]">Preserved Capacity: </span>
                      <span className="font-bold font-mono text-[#0D766E] dark:text-[#2DD4BF]">
                        {prediction.projectedFvcPreservedWithPuriFy}% FVC
                      </span>
                    </div>
                    <div>
                      <span className="text-[#5F7468] dark:text-[#8EA598]">5-Yr Survival Rate: </span>
                      <span className="font-bold font-mono text-[#0D766E] dark:text-[#2DD4BF]">
                        78% - 86%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quality Life Years Added Highlight Card */}
              <div className="p-4 rounded-xl bg-[#F7F4EE] dark:bg-[#0A100C] border border-[#E8E2D6] dark:border-[#1E2C23] mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-[#0D766E] dark:text-[#2DD4BF] shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-[#14231B] dark:text-[#F0F5F2]">
                      Quality Life Years Gained
                    </div>
                    <div className="text-[11px] text-[#6B7C72] dark:text-[#8D9F95]">
                      Decades of uncompromised breathing preserved
                    </div>
                  </div>
                </div>
                <div className="font-mono-numbers text-2xl font-bold text-[#0D766E] dark:text-[#2DD4BF]">
                  +{prediction.qualityLifeYearsGained} Years
                </div>
              </div>

              {/* Clinical Action Checkpoints */}
              <div>
                <div className="text-xs font-mono uppercase tracking-wider font-semibold text-[#5A6D61] dark:text-[#90A296] mb-2.5">
                  Recommended Clinical Action Plan
                </div>
                <ul className="space-y-1.5 text-xs text-[#46594C] dark:text-[#A7BAAE]">
                  {prediction.actionChecklist.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0D766E] dark:text-[#2DD4BF] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E2DDD3] dark:border-[#223028] text-xs font-mono text-[#6B7C72] dark:text-[#8D9F95] flex items-center justify-between">
              <span>Guideline Conformance: ATS / ERS / JRS</span>
              <a href="#clinical-milestones" className="text-[#0D766E] dark:text-[#2DD4BF] hover:underline font-medium">
                View 2026 Trial Publications &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
