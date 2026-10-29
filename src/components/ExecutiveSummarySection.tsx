/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Download, ChevronDown, ChevronUp, FileText, Check, ShieldCheck, Printer, Heart } from 'lucide-react';
import { ANNUAL_REPORT_METRICS } from '../data/reportData';

export const ExecutiveSummarySection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const faqs = [
    {
      q: 'Why has Idiopathic Pulmonary Fibrosis historically been diagnosed so late?',
      a: 'The initial symptoms of IPF—a mild, non-productive dry cough and exertional shortness of breath—are nearly indistinguishable from common benign conditions like post-viral reactive airway disease, adult-onset asthma, chronic bronchitis, or standard age-related deconditioning. Because human ears cannot readily detect the microscopic 7-15ms acoustic crackle signatures in early phases, patients undergo an average of 3 to 4 physician visits and 18 to 26 months of referral delays before receiving a high-resolution CT scan.',
    },
    {
      q: 'What is the role of the MUC5B rs35705950 promoter variant in predicting incidence?',
      a: 'The MUC5B promoter single-nucleotide polymorphism (rs35705950) is the strongest common genetic risk factor identified for pulmonary fibrosis, conferring an odds ratio of approximately 5.45 for heterozygous carriers and up to 20 for homozygous individuals. It leads to chronic mucin hyperproduction in distal airways, provoking alveolar epithelial stress, defective mucociliary clearance, and accelerated cellular senescence.',
    },
    {
      q: 'Can antifibrotics like pirfenidone and nintedanib reverse existing fibrosis?',
      a: 'No. Established dense collagen scars (honeycombing) cannot be enzymatically broken down or reversed once formed. This is precisely why early interception is everything. Current antifibrotic agents and emerging autotaxin/PDE4B inhibitors work by inhibiting fibroblast proliferation and collagen deposition. When administered in Stage 0 or 1—while Forced Vital Capacity is still above 88%—they freeze disease progression, preserving near-normal pulmonary capacity for decades.',
    },
    {
      q: 'How does The I PuriFy acoustic engine distinguish Velcro crackles from common wheezing?',
      a: 'Standard stethoscopes rely on subjective human hearing, which attenuates high frequencies and cannot deconvolve overlapping breath noises. The I PuriFy acoustic neural network performs real-time continuous wavelet transforms, isolating the ultra-brief (<15 millisecond), high-frequency (450–600 Hz) explosive pressure waves produced when stiffened peripheral alveoli snap open during end-inspiration.',
    },
  ];

  const handleDownloadReport = () => {
    // Generate text-based executive summary file for download
    const reportSummary = `THE I PURIFY PROJECT — 2026 ANNUAL IMPACT REPORT
EXECUTIVE SUMMARY: FROM LATE DETECTION TO INTERCEPTED DESTINY

1. KEY CLINICAL IMPACT METRICS (2026):
- High-Risk Screenings Completed: 14,280 patients across 18 countries
- Average Diagnostic Delay (Standard of Care): 760 days (24.2 months)
- Average Diagnostic Latency (I PuriFy): 38 days (-94.8% reduction)
- Preserved Forced Vital Capacity (FVC) at Intervention: 89.4% (vs 51.2% late standard)
- Projected Quality Life Years Added: +8.6 years per patient
- Annual FVC Loss Rate Deceleration: -38 mL/yr (vs -210 mL/yr historical standard)

2. SCIENTIFIC MULTI-OMIC PREDICTIVE ENGINE:
- Genomics: MUC5B rs35705950 promoter variant & TERT telomeric analysis
- Proteomics: Serum MMP-7, SP-D, and KL-6 turnover velocity
- Bio-Acoustics: High-frequency neural spectral end-inspiratory crackle deconvolution
- Longitudinal Kinetics: Daily at-home micro-spirometry trend velocity

3. ACCREDITED CLINICAL NETWORK:
- 48 Interstitial Lung Disease Centers of Excellence across Europe, North America, East Asia, and Oceania.
- Multi-Center Trial Validated in The Lancet Respiratory Medicine (94.2% Specificity, 91.8% Sensitivity).

Report compiled October 2026 by The I PuriFy Consortium.
Authoritative Data Sources: ATS/ERS Guidelines, GBD Pulmonary Epidemiology, JRS Registry.`;

    const blob = new Blob([reportSummary], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'IPuriFy_2026_Annual_Impact_Report_Executive_Summary.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <section className="py-20 md:py-28 bg-[#FBF9F5] dark:bg-[#0E1511] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Executive Summary Download Box */}
        <div className="rounded-3xl bg-white dark:bg-[#121E17] border border-[#E2DDD3] dark:border-[#223028] p-8 sm:p-12 mb-20 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#0D766E] dark:text-[#2DD4BF] font-mono mb-2 font-semibold">
                <span>Official Publication</span>
                <span aria-hidden="true">·</span>
                <span>Full Digital Edition</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-[#14231B] dark:text-[#F0F5F2] mb-3">
                Download the Complete 2026 Annual Impact Report
              </h3>
              <p className="text-sm sm:text-base text-[#46594C] dark:text-[#A7B9AD] leading-relaxed max-w-2xl mb-6">
                Receive the uncompressed clinical dossier containing granular epidemiological tables, trial cohort demographics, biomarker assay specifications, and complete qualitative case interviews.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleDownloadReport}
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#0D766E] hover:bg-[#0F8A80] dark:bg-[#14B8A6] dark:text-[#0E1511] rounded-lg transition-colors shadow-xs"
                >
                  {downloadSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Dossier Downloaded Successfully</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download Executive Brief (TXT)</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#1E2922] dark:text-[#E8EFEA] bg-[#F7F4EE] dark:bg-[#1B2921] hover:bg-[#EFEAE1] dark:hover:bg-[#223329] border border-[#DDD6C8] dark:border-[#2C3E33] rounded-lg transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print View</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 p-6 rounded-2xl bg-[#F7F4EE] dark:bg-[#0A100C] border border-[#E8E2D6] dark:border-[#1E2C23]">
              <div className="text-xs font-mono uppercase tracking-wider font-semibold text-[#5A6D61] dark:text-[#90A296] mb-3">
                Report Provenance & Metadata
              </div>
              <dl className="space-y-2 text-xs font-mono text-[#3E5144] dark:text-[#BAC9BF]">
                <div className="flex justify-between">
                  <dt className="text-[#7D8F83]">Release Date:</dt>
                  <dd className="font-semibold text-[#14231B] dark:text-[#F0F5F2]">October 28, 2026</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#7D8F83]">Cohort Screened:</dt>
                  <dd className="font-semibold text-[#14231B] dark:text-[#F0F5F2]">14,280 Individuals</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#7D8F83]">Global Network:</dt>
                  <dd className="font-semibold text-[#14231B] dark:text-[#F0F5F2]">48 Centers / 18 Countries</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#7D8F83]">Primary Registry:</dt>
                  <dd className="font-semibold text-[#14231B] dark:text-[#F0F5F2]">Lancet Resp Med / PFF</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Clinical FAQ Accordion */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-10">
            <div className="text-xs font-mono uppercase tracking-widest text-[#6B7C72] dark:text-[#8D9F95] mb-2">
              Clinical Dialogue & Education
            </div>
            <h3 className="font-serif text-3xl font-semibold text-[#14231B] dark:text-[#F0F5F2]">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-[#E2DDD3] dark:border-[#223028] bg-white dark:bg-[#121E17] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF8F3] dark:hover:bg-[#15231C]"
                  >
                    <span className="font-serif text-base sm:text-lg font-medium text-[#14231B] dark:text-[#F0F5F2]">
                      {faq.q}
                    </span>
                    <span className="p-1 rounded-md text-[#6B7C72] dark:text-[#8D9F95]">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#46594C] dark:text-[#A7BAAE] leading-relaxed border-t border-[#F0ECE3] dark:border-[#1E2C23] pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Scientific References & Citations */}
        <div className="border-t border-[#E2DDD3] dark:border-[#223028] pt-12 text-xs text-[#6B7C72] dark:text-[#8D9F95] space-y-4 font-mono max-w-4xl mx-auto">
          <div className="font-semibold uppercase tracking-wider text-[#46594C] dark:text-[#A7BAAE]">
            Authoritative References & Data Citations
          </div>
          <ol className="list-decimal pl-4 space-y-2">
            <li>
              Raghu G, et al. Idiopathic Pulmonary Fibrosis (an Update) and Progressive Pulmonary Fibrosis in Adults: An Official ATS/ERS/JRS/ALAT Clinical Practice Guideline. <em>Am J Respir Crit Care Med</em>. 2022.
            </li>
            <li>
              Seibold MA, et al. A common MUC5B promoter polymorphism and pulmonary fibrosis. <em>N Engl J Med</em>. 2011;364(16):1503-1512.
            </li>
            <li>
              The I PuriFy International Consortium. Multi-omic individual incidence prediction in familial and occupational interstitial lung disease cohorts: a 3-year prospective international study. <em>Lancet Respir Med</em>. 2026.
            </li>
            <li>
              Global Burden of Disease Study 2026 Collaborators. Global, regional, and national burden of interstitial lung diseases: a systematic analysis. <em>Lancet</em>. 2026.
            </li>
          </ol>
        </div>

        {/* Institutional Publication Footer */}
        <footer className="mt-16 pt-8 border-t border-[#E2DDD3] dark:border-[#223028] text-xs text-[#6B7C72] dark:text-[#8D9F95] flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-sm text-[#14231B] dark:text-[#F0F5F2]">
              The I PuriFy Project
            </span>
            <span aria-hidden="true">·</span>
            <span>2026 Annual Impact Report</span>
          </div>

          <div className="text-center sm:text-right">
            Medical Disclaimer: Data presented is for clinical research, epidemiological education, and impact reporting purposes.
          </div>
        </footer>
      </div>
    </section>
  );
};
