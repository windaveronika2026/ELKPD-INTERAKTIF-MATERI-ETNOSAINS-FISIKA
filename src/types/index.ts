/**
 * Type definitions for Energy Quest: Misi Energi Palembang
 * E-LKPD Fisika SMA Kelas X
 */

export interface StudentProfile {
  name: string;
  studentClass: string;
  groupNumber: string;
  school: string;
  date: string;
}

export type ActiveTab =
  | 'overview'
  | 'level1'
  | 'level2'
  | 'level3'
  | 'level4'
  | 'level5'
  | 'assessment'
  | 'report'
  | 'guide'
  | 'video';

export interface InfoCard {
  id: string;
  title: string;
  category: 'etnosains' | 'fisika' | 'lingkungan' | 'metodologi';
  content: string;
  unlocked: boolean;
  scientificSource: string;
}

export interface SimulationParams {
  intensity: number; // I in W/m^2 (400 - 1000)
  area: number; // A in m^2 (0.5 - 10.0)
  durationHours: number; // t in hours (1 - 8)
  efficiency: number; // eta in % (10% - 80%)
}

export interface ObservationRecord {
  id: string;
  trialNumber: number;
  label: string;
  intensity: number; // W/m^2
  area: number; // m^2
  durationHours: number; // jam
  efficiency: number; // %
  energyJoules: number; // Joule
  energyKWh: number; // kWh
  note: string;
}

export type StatementType = 'fakta' | 'asumsi' | 'opini' | 'bukti';

export interface SocioScientificStatement {
  id: string;
  text: string;
  correctType: StatementType;
  explanation: string;
  sourceOrLabel: string;
}

export interface DryingAlternative {
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  capex: number; // Biaya awal (Rp)
  opexPerMonth: number; // Biaya operasional/bln (Rp)
  energySource: string;
  energyDemandDesc: string;
  weatherDependency: 'Sangat Tinggi' | 'Sedang' | 'Rendah/Tidak Ada';
  weatherDependencyScore: number; // 1 (buruk) - 5 (sangat baik)
  productionCapacity: string;
  capacityPerDayKg: number;
  environmentalImpact: string;
  co2PerMonthKg: number;
  hygieneLevel: string;
  userSuitability: string;
  advantages: string[];
  limitations: string[];
}

export interface DecisionWorksheet {
  problemIdentification: string;
  prioritizedCriteria: string[];
  alternativeScores: Record<string, Record<string, number>>;
  chosenAlternative: string;
  citedEvidences: string[];
  detailedJustification: string;
  acknowledgedLimitations: string;
  additionalInformationNeeded: string;
  isCompleted: boolean;
}

export interface LiteracyQuestion {
  id: number;
  indicator: 'Konsep Energi' | 'Sumber Energi' | 'Konversi Energi' | 'Interpretasi Data' | 'Evaluasi Pemanfaatan Energi';
  question: string;
  context?: string;
  options: {
    key: string;
    text: string;
  }[];
  correctKey: string;
  explanation: string;
}

export interface RubricAspect {
  id: string;
  aspectName: string;
  description: string;
  levels: {
    score: number;
    label: string;
    description: string;
  }[];
}

export interface GameBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'game' | 'etnosains' | 'lab' | 'lingkungan' | 'keputusan';
  levelRequirement: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  school: string;
  score: number;
  kemplangCount: number;
  avatarId: string;
  badgeTitle: string;
  rank: number;
  date: string;
  isCurrentStudent?: boolean;
}

export interface CompanionAvatar {
  id: string;
  name: string;
  title: string;
  role: string;
  avatarIcon: string;
  tagline: string;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    accent: string;
  };
  greetings: string[];
  encouragements: string[];
  tips: {
    level1: string[];
    level2: string[];
    level3: string[];
    level4: string[];
    level5: string[];
  };
}

export interface LevelChallenge {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  rewardPoints: number;
  rewardBadgeId: string;
  completed: boolean;
}

export interface UnlockedLevels {
  level1: boolean;
  level2: boolean;
  level3: boolean;
  level4: boolean;
  level5: boolean;
  assessment: boolean;
  report: boolean;
}
