/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GlobalRegionData {
  id: string;
  name: string;
  shortCode: string;
  incidenceRatePer100k: number; // e.g. 14.2 per 100,000
  incidenceRange: string; // e.g. "10.7 - 17.4"
  annualNewCases: number;
  annualMortality: number;
  mortalityRatePer100k: number;
  avgDiagnosticDelayMonths: number;
  fiveYearSurvivalStandard: number; // % e.g. 29%
  fiveYearSurvivalIntercepted: number; // % e.g. 78%
  activeScreeningCenters: number;
  primaryRiskFactors: string[];
  keyRegistry: string;
  summary: string;
  coordinates: [number, number]; // [longitude, latitude] for mapping
}

export interface PatientStory {
  id: string;
  name: string;
  age: number;
  location: string;
  country: string;
  occupation: string;
  interceptedYear: string;
  yearsSinceInterception: number;
  headline: string;
  subheadline: string;
  clinicalPresentation: string;
  delayBeforePuriFy: string;
  puriFyPredictionTrigger: string;
  interceptionIntervention: string;
  currentFvcPreserved: number; // %
  projectedFvcWithoutInterception: number; // %
  lifeImpactNarrative: string;
  quote: string;
  avatarColor: string;
  keyBiomarkers: {
    label: string;
    value: string;
    status: 'high_risk' | 'moderate' | 'normalized';
  }[];
  audioCharacteristics: {
    title: string;
    frequencyHz: number;
    cracklesDetected: boolean;
    description: string;
  };
}

export interface BiomarkerPillar {
  id: string;
  title: string;
  category: string;
  weight: number; // % contribution to prediction
  mechanism: string;
  detectionWindow: string; // e.g. "3-5 years pre-symptom"
  clinicalSignificance: string;
  targetMarkers: string[];
  scientificValidation: string;
}

export interface RiskInputState {
  age: number;
  biologicalSex: 'male' | 'female';
  smokingHistory: 'never' | 'former' | 'current';
  familyHistory: boolean;
  muc5bCarrier: 'unknown' | 'negative' | 'heterozygous' | 'homozygous';
  serumBiomarkers: 'normal' | 'borderline' | 'elevated' | 'severely_elevated';
  acousticCrackles: 'none' | 'faint_end_inspiratory' | 'distinct_bilateral';
  environmentalExposure: boolean; // silica, asbestos, metal dust, bird fancier, etc.
  gerdPresence: boolean;
}

export interface RiskPredictionResult {
  fiveYearIncidenceRiskPct: number;
  riskTier: 'Minimal' | 'Moderate' | 'High' | 'Critical Impending';
  riskTierColor: string;
  estimatedStandardDelayMonths: number;
  projectedFvcLossWithoutInterception: number;
  projectedFvcPreservedWithPuriFy: number;
  qualityLifeYearsGained: number;
  recommendedPathway: string;
  actionChecklist: string[];
}

export interface ClinicalMilestone {
  year: number;
  quarter: string;
  title: string;
  description: string;
  metricBadge: string;
  institution: string;
}
