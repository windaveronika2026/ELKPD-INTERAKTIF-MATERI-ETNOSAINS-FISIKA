/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ActiveTab,
  StudentProfile,
  InfoCard,
  ObservationRecord,
  DecisionWorksheet,
  UnlockedLevels,
  GameBadge,
  LeaderboardEntry
} from './types';
import { INITIAL_CARDS } from './data/etnosainsData';
import { INITIAL_BADGES, INITIAL_LEADERBOARD } from './data/gamificationData';
import { Header } from './components/Header';
import { StudentProfileModal } from './components/StudentProfileModal';
import { ResetLKPDModal } from './components/ResetLKPDModal';
import { OverviewAndStoryboard } from './components/OverviewAndStoryboard';
import { Level1Game } from './components/Level1Game';
import { Level2Explorer } from './components/Level2Explorer';
import { Level3SolarLab } from './components/Level3SolarLab';
import { Level4EnvironmentalMission } from './components/Level4EnvironmentalMission';
import { Level5DecisionChallenge } from './components/Level5DecisionChallenge';
import { EnergyLiteracyAssessment } from './components/EnergyLiteracyAssessment';
import { DecisionRubricAndLKPD } from './components/DecisionRubricAndLKPD';
import { TeacherGuideAndEthics } from './components/TeacherGuideAndEthics';
import { EducationalVideoHub } from './components/EducationalVideoHub';
import { LeaderboardAndBadgesModal } from './components/LeaderboardAndBadgesModal';
import { LockedLevelModal } from './components/LockedLevelModal';
import { sound } from './utils/audio';

const STORAGE_KEYS = {
  PROFILE: 'eq_profile',
  CARDS: 'eq_cards',
  NOTES_L2: 'eq_notes_l2',
  OBS_TABLE: 'eq_obs_table',
  LAB_CONCLUSION: 'eq_lab_conclusion',
  REFL_L4: 'eq_refl_l4',
  WORKSHEET: 'eq_worksheet',
  LIT_ANSWERS: 'eq_lit_answers',
  LIT_SCORE: 'eq_lit_score',
  UNLOCKED_LEVELS: 'eq_unlocked_levels',
  BADGES: 'eq_badges',
  AVATAR_ID: 'eq_avatar_id',
  LEADERBOARD: 'eq_leaderboard',
  GAME_SCORE: 'eq_game_score',
  KEMPLANG_COUNT: 'eq_kemplang_count'
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isLeaderboardModalOpen, setIsLeaderboardModalOpen] = useState(false);
  const [leaderboardModalTab, setLeaderboardModalTab] = useState<'badges' | 'leaderboard'>('badges');
  const [lockedTabTarget, setLockedTabTarget] = useState<ActiveTab | null>(null);

  // Student profile state
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      name: '',
      studentClass: 'X MIPA 1',
      groupNumber: 'Kelompok 1',
      school: 'SMAN 1 Palembang',
      date: new Date().toISOString().split('T')[0]
    };
  });

  // Cards unlock state
  const [cards, setCards] = useState<InfoCard[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CARDS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_CARDS;
  });

  // Level progression state (Level harus diselesaikan berurutan baru terbuka)
  const [unlockedLevels, setUnlockedLevels] = useState<UnlockedLevels>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.UNLOCKED_LEVELS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      level1: true,
      level2: false,
      level3: false,
      level4: false,
      level5: false,
      assessment: false,
      report: false
    };
  });

  // Gamification Badges
  const [badges, setBadges] = useState<GameBadge[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BADGES);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_BADGES;
  });

  // Companion Avatar selection
  const [selectedAvatarId, setSelectedAvatarId] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.AVATAR_ID) || 'bujang-surya';
  });

  // Regional Leaderboard
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_LEADERBOARD;
  });

  // Game Score & Kemplang Count
  const [gameScore, setGameScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GAME_SCORE);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return 0;
  });

  const [kemplangCount, setKemplangCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.KEMPLANG_COUNT);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return 0;
  });

  // Level 2 student notes
  const [studentNotesL2, setStudentNotesL2] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.NOTES_L2) || '';
  });

  // Level 3 observation table
  const [observationTable, setObservationTable] = useState<ObservationRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.OBS_TABLE);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'rec-sample-1',
        trialNumber: 1,
        label: 'Percobaan Baseline (Penjemuran Terbuka)',
        intensity: 800,
        area: 2.0,
        durationHours: 4,
        efficiency: 20,
        energyJoules: 11520000,
        energyKWh: 3.2,
        note: 'Efisiensi standar penjemuran di rak bambu terbuka tanpa pelindung'
      }
    ];
  });

  // Level 3 lab conclusion
  const [labConclusion, setLabConclusion] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.LAB_CONCLUSION) || '';
  });

  // Level 4 socio-scientific reflection
  const [studentReflectionL4, setStudentReflectionL4] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.REFL_L4) || '';
  });

  // Level 5 decision worksheet
  const [worksheet, setWorksheet] = useState<DecisionWorksheet>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WORKSHEET);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      problemIdentification: 'Ibu Salmah menghadapi kerugian saat musim hujan dan risiko kontaminasi debu jelaga PM2.5 karhutla. Modal maksimal Rp 6.000.000 dan daya listrik rumah hanya 1.300 VA.',
      prioritizedCriteria: [
        'Biaya Investasi Awal (Capex)',
        'Biaya Operasional Bulanan Listrik/Energi (Opex)',
        'Higienitas Pangan & Bebas Kontaminasi Debu/Lalat/PM2.5',
        'Kesesuaian Daya Listrik Rumah Tangga (1300 VA)'
      ],
      alternativeScores: {},
      chosenAlternative: 'alt-solar-dryer',
      citedEvidences: [
        'Biaya Capex Solar Dome Rp 5.500.000 berada di bawah batas anggaran tabungan Rp 6.000.000.',
        'Daya 2.000 Watt oven listrik melebihi batas saklar MCB 1.300 VA (pasti anjlok).',
        'Solar Dome menghasilkan nol emisi CO2 operasional (0 kg/bln) dibanding oven listrik (306 kg CO2/bln).',
        'Ruang tertutup Solar Dome menyaring jelaga PM2.5 saat bencana kabut asap karhutla berlangsung.'
      ],
      detailedJustification: 'Berdasarkan data matriks, Solar Dryer Dome adalah pilihan paling rasional karena investasinya Rp 5,5 juta (di bawah batas tabungan Rp 6 juta) dan tidak membebani listrik rumah tangga yang hanya 1300 VA. Ruang tertutup juga melindungi kemplang dari kabut asap karhutla tanpa menimbulkan biaya operasional bulanan tinggi seperti oven listrik.',
      acknowledgedLimitations: 'Solar Dryer Dome memerlukan lahan pekarangan terbuka bebas naungan minimal 3x4 meter dan laju pengeringan tetap menurun jika mendung gelap sepanjang hari.',
      additionalInformationNeeded: 'Perlu memastikan luas pekarangan Ibu Salmah dan mengecek ketersediaan hibah dana bergulir teknologi tepat guna dari Dinas Koperasi dan UKM Palembang.',
      isCompleted: true
    };
  });

  // Assessment answers & score
  const [literacyAnswers, setLiteracyAnswers] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LIT_ANSWERS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {};
  });

  const [literacyScore, setLiteracyScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LIT_SCORE);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return 80;
  });

  // Persistence effects
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch {}
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(cards));
    } catch {}
  }, [cards]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.UNLOCKED_LEVELS, JSON.stringify(unlockedLevels));
    } catch {}
  }, [unlockedLevels]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(badges));
    } catch {}
  }, [badges]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AVATAR_ID, selectedAvatarId);
    } catch {}
  }, [selectedAvatarId]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(leaderboard));
    } catch {}
  }, [leaderboard]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.GAME_SCORE, JSON.stringify(gameScore));
      localStorage.setItem(STORAGE_KEYS.KEMPLANG_COUNT, JSON.stringify(kemplangCount));
    } catch {}
  }, [gameScore, kemplangCount]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTES_L2, studentNotesL2);
    } catch {}
  }, [studentNotesL2]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.OBS_TABLE, JSON.stringify(observationTable));
    } catch {}
  }, [observationTable]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LAB_CONCLUSION, labConclusion);
    } catch {}
  }, [labConclusion]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REFL_L4, studentReflectionL4);
    } catch {}
  }, [studentReflectionL4]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WORKSHEET, JSON.stringify(worksheet));
    } catch {}
  }, [worksheet]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LIT_ANSWERS, JSON.stringify(literacyAnswers));
      localStorage.setItem(STORAGE_KEYS.LIT_SCORE, JSON.stringify(literacyScore));
    } catch {}
  }, [literacyAnswers, literacyScore]);

  // Card unlock handler
  const handleUnlockCard = (cardId: string) => {
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, unlocked: true } : c))
    );
  };

  // Badge unlock helper
  const handleUnlockBadge = (badgeId: string) => {
    setBadges((prev) =>
      prev.map((b) => {
        if (b.id === badgeId && !b.unlocked) {
          sound.playBadgeUnlock();
          return {
            ...b,
            unlocked: true,
            unlockedAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
          };
        }
        return b;
      })
    );
  };

  // Level 1 complete handler
  const handleCompleteLevel1 = (finalScore: number, kCount: number) => {
    setGameScore(finalScore);
    setKemplangCount(kCount);
    setUnlockedLevels((prev) => ({ ...prev, level2: true }));

    // Update student's dynamic entry in leaderboard
    setLeaderboard((prev) => {
      const filtered = prev.filter((e) => !e.isCurrentStudent);
      const studentEntry: LeaderboardEntry = {
        id: 'current-student',
        name: profile.name || 'Siswa Saya (Kamu)',
        school: profile.school || 'SMAN 1 Palembang',
        score: finalScore,
        kemplangCount: kCount,
        avatarId: selectedAvatarId,
        badgeTitle: finalScore >= 500 ? 'Master Penjemuran Tradisional' : 'Penjelajah Surya',
        rank: 1,
        date: 'Hari ini',
        isCurrentStudent: true
      };
      return [...filtered, studentEntry];
    });
  };

  // Level progression advancement handlers
  const handleProceedToLevel2 = () => {
    setUnlockedLevels((prev) => ({ ...prev, level2: true }));
    sound.playSuccess();
    setActiveTab('level2');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToLevel3 = () => {
    setUnlockedLevels((prev) => ({ ...prev, level3: true }));
    handleUnlockBadge('badge-ethno-scholar');
    sound.playSuccess();
    setActiveTab('level3');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToLevel4 = () => {
    setUnlockedLevels((prev) => ({ ...prev, level4: true }));
    handleUnlockBadge('badge-lab-expert');
    sound.playSuccess();
    setActiveTab('level4');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToLevel5 = () => {
    setUnlockedLevels((prev) => ({ ...prev, level5: true }));
    handleUnlockBadge('badge-eco-hero');
    sound.playSuccess();
    setActiveTab('level5');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToAssessment = () => {
    setUnlockedLevels((prev) => ({ ...prev, assessment: true, report: true }));
    handleUnlockBadge('badge-decision-master');
    sound.playSuccess();
    setActiveTab('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Teacher / Testing Unlock All Mode
  const handleUnlockAllForTesting = () => {
    setUnlockedLevels({
      level1: true,
      level2: true,
      level3: true,
      level4: true,
      level5: true,
      assessment: true,
      report: true
    });
    setBadges((prev) => prev.map((b) => ({ ...b, unlocked: true })));
    sound.playSuccess();
  };

  // Attempt locked tab
  const handleNavigateTabWithLockCheck = (target: ActiveTab) => {
    if (target === 'overview' || target === 'video' || target === 'guide' || target === 'level1') {
      sound.playClick();
      setActiveTab(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const isLocked = !unlockedLevels[target as keyof UnlockedLevels];
    if (isLocked) {
      sound.playObstacle();
      setLockedTabTarget(target);
      return;
    }
    sound.playClick();
    setActiveTab(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add observation record
  const handleAddObservation = (record: ObservationRecord) => {
    setObservationTable((prev) => [...prev, record]);
  };

  // Delete observation record
  const handleDeleteObservation = (id: string) => {
    setObservationTable((prev) => prev.filter((r) => r.id !== id));
  };

  const unlockedCount = cards.filter((c) => c.unlocked).length;

  const handleTriggerPrintPDF = () => {
    setActiveTab('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset entire E-LKPD for fresh student trial
  const handleResetToBlank = (relockCards: boolean) => {
    setStudentNotesL2('');
    setObservationTable([]);
    setLabConclusion('');
    setStudentReflectionL4('');
    setWorksheet({
      problemIdentification: '',
      prioritizedCriteria: [],
      alternativeScores: {},
      chosenAlternative: '',
      citedEvidences: [],
      detailedJustification: '',
      acknowledgedLimitations: '',
      additionalInformationNeeded: '',
      isCompleted: false
    });
    setLiteracyAnswers({});
    setLiteracyScore(0);
    setGameScore(0);
    setKemplangCount(0);

    // Relock levels for fresh sequential student completion
    setUnlockedLevels({
      level1: true,
      level2: false,
      level3: false,
      level4: false,
      level5: false,
      assessment: false,
      report: false
    });

    if (relockCards) {
      setCards(INITIAL_CARDS.map((c) => ({ ...c, unlocked: false })));
      setBadges(INITIAL_BADGES);
    }

    setActiveTab('level1');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Load benchmark sample answers for teacher/student guidance
  const handleLoadSampleAnswers = () => {
    setCards(INITIAL_CARDS.map((c) => ({ ...c, unlocked: true })));
    setUnlockedLevels({
      level1: true,
      level2: true,
      level3: true,
      level4: true,
      level5: true,
      assessment: true,
      report: true
    });
    setBadges((prev) => prev.map((b) => ({ ...b, unlocked: true })));
    setGameScore(750);
    setKemplangCount(6);

    setStudentNotesL2('Berdasarkan data grafik BMKG Palembang, radiasi puncak mencapai >900 W/m² antara jam 11.00-13.00 WIB. Kalor laten penguapan air kemplang berlangsung paling optimal pada rentang jam ini, namun terhambat 40% saat terjadi kabut asap karhutla.');
    setObservationTable([
      {
        id: 'rec-sample-1',
        trialNumber: 1,
        label: 'Percobaan Baseline (Penjemuran Terbuka)',
        intensity: 800,
        area: 2.0,
        durationHours: 4,
        efficiency: 20,
        energyJoules: 11520000,
        energyKWh: 3.2,
        note: 'Efisiensi standar penjemuran di rak bambu terbuka tanpa pelindung'
      },
      {
        id: 'rec-sample-2',
        trialNumber: 2,
        label: 'Percobaan Solar Dome (Variabel Kontrol: Efisiensi η = 50%)',
        intensity: 800,
        area: 2.0,
        durationHours: 4,
        efficiency: 50,
        energyJoules: 28800000,
        energyKWh: 8.0,
        note: 'Energi berguna meningkat 2,5 kali lipat berkat efek rumah kaca polikarbonat'
      },
      {
        id: 'rec-sample-3',
        trialNumber: 3,
        label: 'Percobaan Cuaca Asap Karhutla (I = 480 W/m²)',
        intensity: 480,
        area: 2.0,
        durationHours: 4,
        efficiency: 50,
        energyJoules: 17280000,
        energyKWh: 4.8,
        note: 'Intensitas radiasi turun drastis akibat hamburan aerosol asap gambut'
      }
    ]);
    setLabConclusion('Energi kalor berguna Q berbanding lurus dengan I, A, t, dan efisiensi η. Namun model Q tidak secara langsung memprediksi waktu pengeringan tuntas kemplang karena adanya faktor difusi air internal kemplang, laju sirkulasi konveksi udara, dan kelembaban relatif udara sekitar.');
    setStudentReflectionL4('Penting membedakan klaim opini publik dengan bukti empiris. Energi surya tidak secara langsung memadamkan karhutla, melainkan memitigasi emisi gas rumah kaca jangka panjang serta menyediakan pengering tertutup yang menjaga mutu pangan kemplang bebas partikulat jelaga PM2.5.');
    setWorksheet({
      problemIdentification: 'Ibu Salmah menghadapi kerugian kemplang berjamur saat musim hujan dan terpapar jelaga PM2.5 saat kabut asap karhutla. Modal maksimal Rp 6.000.000 dan daya listrik rumah hanya 1.300 VA.',
      prioritizedCriteria: [
        'Biaya Investasi Awal (Capex)',
        'Biaya Operasional Bulanan Listrik/Energi (Opex)',
        'Higienitas Pangan & Bebas Kontaminasi Debu/Lalat/PM2.5',
        'Kesesuaian Daya Listrik Rumah Tangga (1300 VA)'
      ],
      alternativeScores: {},
      chosenAlternative: 'alt-solar-dryer',
      citedEvidences: [
        'Biaya Capex Solar Dome Rp 5.500.000 berada di bawah batas anggaran tabungan Rp 6.000.000.',
        'Daya 2.000 Watt oven listrik melebihi batas saklar MCB 1.300 VA (pasti anjlok).',
        'Solar Dome menghasilkan nol emisi CO2 operasional (0 kg/bln) dibanding oven listrik (306 kg CO2/bln).',
        'Ruang tertutup Solar Dome menyaring jelaga PM2.5 saat bencana kabut asap karhutla berlangsung.'
      ],
      detailedJustification: 'Berdasarkan data matriks komparatif, Solar Dryer Dome adalah pilihan paling rasional karena investasinya Rp 5,5 juta (di bawah batas anggaran Rp 6 juta) dan tidak membebani listrik rumah tangga yang hanya 1300 VA. Ruang tertutup juga melindungi kemplang dari kabut asap karhutla tanpa menimbulkan biaya operasional bulanan tinggi seperti oven listrik.',
      acknowledgedLimitations: 'Solar Dryer Dome memerlukan lahan pekarangan terbuka bebas naungan minimal 3x4 meter dan laju pengeringan tetap menurun jika mendung gelap sepanjang hari.',
      additionalInformationNeeded: 'Perlu memastikan kepastian luas pekarangan Ibu Salmah dan mengecek ketersediaan hibah dana bergulir teknologi tepat guna dari Dinas Koperasi dan UKM Palembang.',
      isCompleted: true
    });
    setLiteracyScore(80);
    setActiveTab('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset individual level
  const handleResetLevel = (level: 'level1' | 'level3' | 'level4' | 'level5' | 'assessment') => {
    if (level === 'level1') {
      setCards(INITIAL_CARDS.map((c) => ({ ...c, unlocked: false })));
      setActiveTab('level1');
    } else if (level === 'level3') {
      setObservationTable([]);
      setLabConclusion('');
      setActiveTab('level3');
    } else if (level === 'level4') {
      setStudentReflectionL4('');
      setActiveTab('level4');
    } else if (level === 'level5') {
      setWorksheet({
        problemIdentification: '',
        prioritizedCriteria: [],
        alternativeScores: {},
        chosenAlternative: '',
        citedEvidences: [],
        detailedJustification: '',
        acknowledgedLimitations: '',
        additionalInformationNeeded: '',
        isCompleted: false
      });
      setActiveTab('level5');
    } else if (level === 'assessment') {
      setLiteracyAnswers({});
      setLiteracyScore(0);
      setActiveTab('assessment');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans selection:bg-amber-200 selection:text-amber-900">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleNavigateTabWithLockCheck}
        profile={profile}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenResetModal={() => setIsResetModalOpen(true)}
        onTriggerPrintPDF={handleTriggerPrintPDF}
        unlockedCardsCount={unlockedCount}
        totalCardsCount={cards.length}
        unlockedLevels={unlockedLevels}
        onAttemptLockedTab={(tab) => setLockedTabTarget(tab)}
        onOpenLeaderboard={() => {
          setLeaderboardModalTab('leaderboard');
          setIsLeaderboardModalOpen(true);
        }}
        onOpenBadges={() => {
          setLeaderboardModalTab('badges');
          setIsLeaderboardModalOpen(true);
        }}
        unlockedBadgesCount={badges.filter((b) => b.unlocked).length}
        totalBadgesCount={badges.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'overview' && (
          <OverviewAndStoryboard
            onStartLevel1={() => handleNavigateTabWithLockCheck('level1')}
            onNavigateTab={handleNavigateTabWithLockCheck}
            unlockedLevels={unlockedLevels}
          />
        )}

        {activeTab === 'level1' && (
          <Level1Game
            cards={cards}
            onUnlockCard={handleUnlockCard}
            onProceedToLevel2={handleProceedToLevel2}
            onCompleteLevel1={handleCompleteLevel1}
            badges={badges}
            onUnlockBadge={handleUnlockBadge}
            selectedAvatarId={selectedAvatarId}
            onSelectAvatar={setSelectedAvatarId}
            profile={profile}
            leaderboard={leaderboard}
            onOpenLeaderboard={() => {
              setLeaderboardModalTab('leaderboard');
              setIsLeaderboardModalOpen(true);
            }}
            onOpenBadges={() => {
              setLeaderboardModalTab('badges');
              setIsLeaderboardModalOpen(true);
            }}
          />
        )}

        {activeTab === 'level2' && (
          <Level2Explorer
            onProceedToLevel3={handleProceedToLevel3}
            studentNotes={studentNotesL2}
            onUpdateNotes={setStudentNotesL2}
          />
        )}

        {activeTab === 'level3' && (
          <Level3SolarLab
            onProceedToLevel4={handleProceedToLevel4}
            observationTable={observationTable}
            onAddObservation={handleAddObservation}
            onDeleteObservation={handleDeleteObservation}
            onClearAllObservations={() => setObservationTable([])}
            labConclusion={labConclusion}
            onUpdateConclusion={setLabConclusion}
          />
        )}

        {activeTab === 'level4' && (
          <Level4EnvironmentalMission
            onProceedToLevel5={handleProceedToLevel5}
            studentReflection={studentReflectionL4}
            onUpdateReflection={setStudentReflectionL4}
          />
        )}

        {activeTab === 'video' && (
          <div className="max-w-5xl mx-auto py-4 px-3 sm:px-4">
            <EducationalVideoHub
              savedVideoNotes={studentReflectionL4}
              onSaveVideoNotes={setStudentReflectionL4}
            />
          </div>
        )}

        {activeTab === 'level5' && (
          <Level5DecisionChallenge
            worksheet={worksheet}
            onUpdateWorksheet={setWorksheet}
            onProceedToAssessment={handleProceedToAssessment}
          />
        )}

        {activeTab === 'assessment' && (
          <EnergyLiteracyAssessment
            onProceedToReport={() => setActiveTab('report')}
            savedAnswers={literacyAnswers}
            onSaveAnswers={(ans, sc) => {
              setLiteracyAnswers(ans);
              setLiteracyScore(sc);
            }}
          />
        )}

        {activeTab === 'report' && (
          <DecisionRubricAndLKPD
            profile={profile}
            studentNotesL2={studentNotesL2}
            observationTable={observationTable}
            labConclusion={labConclusion}
            studentReflectionL4={studentReflectionL4}
            worksheet={worksheet}
            literacyScore={literacyScore}
            onOpenResetModal={() => setIsResetModalOpen(true)}
          />
        )}

        {activeTab === 'guide' && <TeacherGuideAndEthics />}
      </main>

      {/* Profile Modal */}
      <StudentProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSave={setProfile}
      />

      {/* Reset & Re-attempt LKPD Modal */}
      <ResetLKPDModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onResetToBlank={handleResetToBlank}
        onLoadSampleAnswers={handleLoadSampleAnswers}
        onResetLevel={handleResetLevel}
      />

      {/* Leaderboard & Badges Modal */}
      <LeaderboardAndBadgesModal
        isOpen={isLeaderboardModalOpen}
        onClose={() => setIsLeaderboardModalOpen(false)}
        badges={badges}
        leaderboard={leaderboard}
        currentScore={gameScore}
        currentKemplangCount={kemplangCount}
        profile={profile}
        selectedAvatarId={selectedAvatarId}
        initialTab={leaderboardModalTab}
      />

      {/* Locked Level Modal with Pre-requisite navigation */}
      <LockedLevelModal
        isOpen={lockedTabTarget !== null}
        onClose={() => setLockedTabTarget(null)}
        targetTab={lockedTabTarget}
        onNavigateToPrerequisite={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onUnlockAllForTesting={handleUnlockAllForTesting}
      />

      {/* Bottom Footer (No print) */}
      <footer className="no-print bg-white border-t border-slate-200 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong>ENERGY QUEST: Misi Energi Palembang</strong> — Prototipe E-LKPD Fisika SMA Fase E (Kelas X)
          </div>
          <div className="text-[11px] text-slate-400">
            Fokus Riset: Literasi Energi & Pengambilan Keputusan Berbasis Bukti
          </div>
        </div>
      </footer>
    </div>
  );
}
