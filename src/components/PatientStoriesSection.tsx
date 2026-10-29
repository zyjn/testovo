/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Activity, User, Heart, Shield, CheckCircle } from 'lucide-react';
import { PATIENT_STORIES } from '../data/reportData';
import { PatientStory } from '../types';

export const PatientStoriesSection: React.FC = () => {
  const [selectedPatientId, setSelectedPatientId] = useState<string>('arthur-pendelton');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioMode, setAudioMode] = useState<'vesicular' | 'crackles'>('crackles');
  const [audioVolume, setAudioVolume] = useState<number>(0.4);

  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorNodeRef = useRef<any>(null);
  const intervalIdRef = useRef<any>(null);

  const selectedPatient = PATIENT_STORIES.find((p) => p.id === selectedPatientId) || PATIENT_STORIES[0];

  // Stop synthetic audio on unmount or patient switch
  useEffect(() => {
    stopSound();
    return () => {
      stopSound();
    };
  }, [selectedPatientId, audioMode]);

  // Synthetic Web Audio API synthesis for clinical lung sound demonstration
  const startSound = (mode: 'vesicular' | 'crackles') => {
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Create white noise buffer for breath airflow
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filter: Lowpass for normal breath sound, bandpass for crackles
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(mode === 'vesicular' ? 240 : 550, ctx.currentTime);

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.05 * audioVolume, ctx.currentTime);

      // Periodic breath cycle modulation (Inspiration -> Expiration)
      const now = ctx.currentTime;
      gainNode.gain.setValueAtTime(0.01, now);
      gainNode.gain.linearRampToValueAtTime(0.12 * audioVolume, now + 1.2);
      gainNode.gain.linearRampToValueAtTime(0.01, now + 2.0);

      whiteNoise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);
      whiteNoise.start();

      oscillatorNodeRef.current = { whiteNoise, gainNode };

      // If crackle mode is chosen, schedule intermittent high-frequency micro-spikes at end-inspiration
      if (mode === 'crackles') {
        const triggerCrackles = () => {
          if (!audioContextRef.current) return;
          const cCtx = audioContextRef.current;
          // Spawn 3-5 rapid micro-pops
          for (let k = 0; k < 4; k++) {
            const crackleOsc = cCtx.createOscillator();
            const crackleGain = cCtx.createGain();
            crackleOsc.type = 'triangle';
            crackleOsc.frequency.setValueAtTime(450 + Math.random() * 220, cCtx.currentTime);

            const popTime = cCtx.currentTime + 0.9 + k * 0.08 + Math.random() * 0.03;
            crackleGain.gain.setValueAtTime(0, popTime);
            crackleGain.gain.linearRampToValueAtTime(0.25 * audioVolume, popTime + 0.005);
            crackleGain.gain.linearRampToValueAtTime(0, popTime + 0.02);

            crackleOsc.connect(crackleGain);
            crackleGain.connect(cCtx.destination);
            crackleOsc.start(popTime);
            crackleOsc.stop(popTime + 0.03);
          }
        };

        triggerCrackles();
        intervalIdRef.current = setInterval(triggerCrackles, 2500);
      }

      setIsPlayingAudio(true);
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  };

  const stopSound = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    if (oscillatorNodeRef.current) {
      try {
        oscillatorNodeRef.current.whiteNoise.stop();
        oscillatorNodeRef.current.whiteNoise.disconnect();
      } catch (e) {
        // Already stopped
      }
      oscillatorNodeRef.current = null;
    }
    setIsPlayingAudio(false);
  };

  const toggleSound = () => {
    if (isPlayingAudio) {
      stopSound();
    } else {
      startSound(audioMode);
    }
  };

  return (
    <section id="patient-stories" className="py-20 md:py-28 border-b border-[#E2DDD3] dark:border-[#223028] bg-[#FAF8F3] dark:bg-[#0D1410] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#6B7C72] dark:text-[#8D9F95] font-mono mb-2">
            <span>Chapter 03</span>
            <span aria-hidden="true">·</span>
            <span>Qualitative Case Studies</span>
            <span aria-hidden="true">·</span>
            <span>Lived Human Impact</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#14231B] dark:text-[#F0F5F2] leading-tight mb-4">
            How Individual Incidence Prediction Transformed Lives
          </h2>
          <p className="text-base text-[#46594C] dark:text-[#A7B9AD] leading-relaxed">
            Behind every statistical survival curve is an individual whose future was altered. Here are four patient journeys showing how predicting incidence before irreversible alveolar destruction replaced fatalism with active, joyful longevity.
          </p>
        </div>

        {/* Patient Selection Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {PATIENT_STORIES.map((patient) => {
            const isSelected = selectedPatientId === patient.id;
            return (
              <button
                key={patient.id}
                onClick={() => {
                  setSelectedPatientId(patient.id);
                  stopSound();
                }}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-[#15231C] border-[#0D766E] dark:border-[#2DD4BF] shadow-xs ring-1 ring-[#0D766E]/20'
                    : 'bg-[#F4EFE6]/60 dark:bg-[#111A15] border-[#E2DDD3] dark:border-[#202E25] hover:bg-white dark:hover:bg-[#16231C]'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-[#6B7C72] dark:text-[#8D9F95] mb-1">
                  <span>{patient.location}, {patient.country}</span>
                  <span className="font-semibold text-[#0D766E] dark:text-[#2DD4BF]">
                    Age {patient.age}
                  </span>
                </div>
                <div className="font-serif text-lg font-semibold text-[#14231B] dark:text-[#F0F5F2] mb-0.5">
                  {patient.name}
                </div>
                <div className="text-xs text-[#526558] dark:text-[#9FB1A5] truncate">
                  {patient.occupation}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Patient Story Presentation Card */}
        <div className="bg-white dark:bg-[#121E17] rounded-2xl border border-[#E2DDD3] dark:border-[#223028] p-6 sm:p-10 shadow-xs">
          {/* Top Headline & Pull Quote */}
          <div className="border-b border-[#E2DDD3] dark:border-[#223028] pb-8 mb-8">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#6B7C72] dark:text-[#8D9F95] mb-3">
              <span>Patient Case File</span>
              <span aria-hidden="true">·</span>
              <span>Screened in {selectedPatient.interceptedYear}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#0D766E] dark:text-[#2DD4BF] font-semibold">
                {selectedPatient.yearsSinceInterception} Years Fibrosis-Free Stability
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#14231B] dark:text-[#F0F5F2] mb-3">
              {selectedPatient.headline}
            </h3>
            <p className="text-sm sm:text-base text-[#46594C] dark:text-[#A7B9AD] mb-6">
              {selectedPatient.subheadline}
            </p>

            {/* Editorial Centered Pull Quote */}
            <div className="my-6 py-6 px-6 sm:px-10 rounded-xl bg-[#F7F4EE] dark:bg-[#0A100C] border-y border-[#E2DDD3] dark:border-[#223028]">
              <blockquote className="font-serif italic text-lg sm:text-xl text-[#1E2E24] dark:text-[#DEEBE2] leading-relaxed text-center max-w-3xl mx-auto">
                "{selectedPatient.quote}"
              </blockquote>
              <div className="mt-3 text-center text-xs font-mono uppercase tracking-widest text-[#6B7C72] dark:text-[#8D9F95]">
                — {selectedPatient.name}, {selectedPatient.age} ({selectedPatient.location})
              </div>
            </div>
          </div>

          {/* 2-Column Split: Clinical Journey vs Functional Trajectory */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-8">
            {/* Left Column: Qualitative Narrative & Interception Details (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#5A6D61] dark:text-[#90A296] mb-2">
                  Clinical Context & Presentation
                </h4>
                <p className="text-sm sm:text-base text-[#2C3E32] dark:text-[#C8D8CE] leading-relaxed">
                  {selectedPatient.clinicalPresentation}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0D766E] dark:text-[#2DD4BF] mb-2">
                  The I PuriFy Prediction Trigger
                </h4>
                <div className="p-4 rounded-xl bg-[#F4EFE6]/70 dark:bg-[#15231C] border border-[#DDD6C8] dark:border-[#202F26]">
                  <p className="text-xs sm:text-sm text-[#27382E] dark:text-[#C5D5CB] leading-relaxed">
                    {selectedPatient.puriFyPredictionTrigger}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#5A6D61] dark:text-[#90A296] mb-2">
                  Targeted Interception Regimen
                </h4>
                <p className="text-xs sm:text-sm text-[#3E5144] dark:text-[#A7BAAE] leading-relaxed">
                  {selectedPatient.interceptionIntervention}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#5A6D61] dark:text-[#90A296] mb-2">
                  Qualitative Life Impact Today
                </h4>
                <p className="text-sm sm:text-base text-[#2C3E32] dark:text-[#C8D8CE] leading-relaxed">
                  {selectedPatient.lifeImpactNarrative}
                </p>
              </div>

              {/* Key Biomarkers Status Grid */}
              <div className="border-t border-[#E2DDD3] dark:border-[#223028] pt-4">
                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#5A6D61] dark:text-[#90A296] mb-3">
                  Biomarker Panel Response Over Follow-Up
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {selectedPatient.keyBiomarkers.map((bio, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-[#FAF8F3] dark:bg-[#0A100C] border border-[#E8E2D6] dark:border-[#1E2C23]"
                    >
                      <div className="text-[11px] font-mono text-[#6B7C72] dark:text-[#8D9F95] truncate">
                        {bio.label}
                      </div>
                      <div className="font-mono-numbers text-xs font-bold text-[#14231B] dark:text-[#F0F5F2] mt-0.5">
                        {bio.value}
                      </div>
                      <div className="text-[10px] font-mono mt-1 text-[#0D766E] dark:text-[#2DD4BF]">
                        Stabilized
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Comparative FVC Trajectory & Acoustic Lung Auscultation (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Forced Vital Capacity (FVC) Trajectory Card */}
              <div className="p-5 rounded-xl bg-[#F7F4EE] dark:bg-[#0A100C] border border-[#E8E2D6] dark:border-[#1E2C23]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#5A6D61] dark:text-[#90A296]">
                    Lung Capacity Trajectory (% FVC)
                  </span>
                  <span className="text-xs font-mono text-[#0D766E] dark:text-[#2DD4BF] font-bold">
                    {selectedPatient.currentFvcPreserved}% Preserved
                  </span>
                </div>

                <div className="relative w-full aspect-[16/10] bg-white dark:bg-[#121E17] rounded-lg p-3 border border-[#E5DFD4] dark:border-[#1E2C23] mb-3">
                  <svg viewBox="0 0 340 180" className="w-full h-full" preserveAspectRatio="none">
                    {/* Y lines */}
                    <line x1="30" y1="20" x2="330" y2="20" stroke="currentColor" strokeDasharray="2 2" className="text-stone-200 dark:text-stone-800" />
                    <text x="24" y="24" textAnchor="end" fontSize="9" fill="currentColor" className="text-stone-400 font-mono">100%</text>
                    
                    <line x1="30" y1="70" x2="330" y2="70" stroke="currentColor" strokeDasharray="2 2" className="text-stone-200 dark:text-stone-800" />
                    <text x="24" y="74" textAnchor="end" fontSize="9" fill="currentColor" className="text-stone-400 font-mono">75%</text>

                    <line x1="30" y1="120" x2="330" y2="120" stroke="currentColor" strokeDasharray="2 2" className="text-stone-200 dark:text-stone-800" />
                    <text x="24" y="124" textAnchor="end" fontSize="9" fill="currentColor" className="text-stone-400 font-mono">50%</text>

                    {/* Standard Projected Decline (Plunging to projected) */}
                    <path
                      d="M 40 28 C 100 32, 160 55, 210 95 C 260 135, 300 148, 320 152"
                      fill="none"
                      stroke="#DC2626"
                      strokeWidth="2"
                      strokeDasharray="4 2"
                    />

                    {/* Actual Intercepted Stability (Preserved above 87-95%) */}
                    <path
                      d="M 40 28 C 100 30, 160 32, 210 33 C 260 34, 300 35, 320 36"
                      fill="none"
                      stroke="#0D766E"
                      strokeWidth="3"
                    />

                    <circle cx="320" cy="36" r="4" fill="#0D766E" />
                    <text x="315" y="52" textAnchor="end" fontSize="9" fontWeight="bold" fill="#0D766E" className="font-mono">
                      Current: {selectedPatient.currentFvcPreserved}%
                    </text>

                    <circle cx="320" cy="152" r="4" fill="#DC2626" />
                    <text x="315" y="168" textAnchor="end" fontSize="9" fontWeight="bold" fill="#DC2626" className="font-mono">
                      Projected without PuriFy: {selectedPatient.projectedFvcWithoutInterception}%
                    </text>
                  </svg>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-[#6B7C72] dark:text-[#8D9F95]">
                  <span>Month 0 (Interception)</span>
                  <span>Month 18</span>
                  <span>Month 36 (Today)</span>
                </div>
              </div>

              {/* Bio-Acoustic Lung Sound Simulation Station */}
              <div className="p-5 rounded-xl bg-[#F7F4EE] dark:bg-[#0A100C] border border-[#E8E2D6] dark:border-[#1E2C23]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#5A6D61] dark:text-[#90A296]">
                    <Activity className="w-3.5 h-3.5 text-[#0D766E] dark:text-[#2DD4BF]" />
                    <span>Neural Acoustic Auscultation</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#0D766E] dark:text-[#2DD4BF]">
                    Interactive Lab Audio
                  </span>
                </div>

                <p className="text-xs text-[#46594C] dark:text-[#A7B9AD] leading-relaxed mb-4">
                  {selectedPatient.audioCharacteristics.description}
                </p>

                {/* Sound Mode Switcher */}
                <div className="flex items-center gap-2 p-1 bg-white dark:bg-[#121E17] rounded-lg border border-[#E5DFD4] dark:border-[#1E2C23] mb-4">
                  <button
                    onClick={() => {
                      setAudioMode('crackles');
                      stopSound();
                    }}
                    className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-md transition-colors ${
                      audioMode === 'crackles'
                        ? 'bg-[#0D766E] text-white shadow-xs'
                        : 'text-[#506356] dark:text-[#90A296] hover:text-[#14231B] dark:hover:text-[#F0F5F2]'
                    }`}
                  >
                    Fine Velcro Crackles (IPF)
                  </button>
                  <button
                    onClick={() => {
                      setAudioMode('vesicular');
                      stopSound();
                    }}
                    className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-md transition-colors ${
                      audioMode === 'vesicular'
                        ? 'bg-[#0D766E] text-white shadow-xs'
                        : 'text-[#506356] dark:text-[#90A296] hover:text-[#14231B] dark:hover:text-[#F0F5F2]'
                    }`}
                  >
                    Healthy Vesicular Sound
                  </button>
                </div>

                {/* Sound Control Bar & Waveform Canvas Simulation */}
                <div className="flex items-center justify-between gap-4 p-3 bg-white dark:bg-[#121E17] rounded-lg border border-[#E5DFD4] dark:border-[#1E2C23]">
                  <button
                    onClick={toggleSound}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#0D766E] hover:bg-[#0F8A80] dark:bg-[#14B8A6] dark:text-[#0A1A12] rounded-md transition-colors shadow-xs"
                  >
                    {isPlayingAudio ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>Pause Audio</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        <span>Listen to Waveform</span>
                      </>
                    )}
                  </button>

                  <div className="flex-1 flex items-center justify-center gap-1 h-6">
                    {/* Simulated Waveform Bars */}
                    {[12, 28, 45, 18, 55, 32, 60, 22, 40, 16, 50, 25].map((height, idx) => (
                      <span
                        key={idx}
                        className={`w-1 rounded-full transition-all duration-150 ${
                          isPlayingAudio
                            ? audioMode === 'crackles'
                              ? 'bg-amber-500 animate-pulse'
                              : 'bg-[#0D766E] dark:bg-[#2DD4BF] animate-pulse'
                            : 'bg-stone-300 dark:bg-stone-700'
                        }`}
                        style={{ height: isPlayingAudio ? `${Math.max(4, (height * Math.random()) % 22 + 4)}px` : '4px' }}
                      />
                    ))}
                  </div>

                  <span className="text-[10px] font-mono text-[#6B7C72] dark:text-[#8D9F95]">
                    {audioMode === 'crackles' ? '480-550 Hz' : '180-240 Hz'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
