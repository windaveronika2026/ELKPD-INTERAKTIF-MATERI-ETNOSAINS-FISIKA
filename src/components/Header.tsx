import React from 'react';
import { ActiveTab, StudentProfile, UnlockedLevels } from '../types';
import {
  Compass,
  Gamepad2,
  BookOpen,
  FlaskConical,
  Trees,
  Scale,
  Award,
  FileText,
  HelpCircle,
  UserCheck,
  Printer,
  Download,
  RotateCcw,
  Sparkles,
  Music,
  Video,
  Lock,
  Trophy,
  Medal
} from 'lucide-react';
import { sound } from '../utils/audio';

interface Props {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  profile: StudentProfile;
  onOpenProfile: () => void;
  onOpenResetModal: () => void;
  onTriggerPrintPDF: () => void;
  unlockedCardsCount: number;
  totalCardsCount: number;
  unlockedLevels?: UnlockedLevels;
  onAttemptLockedTab?: (tab: ActiveTab) => void;
  onOpenLeaderboard?: () => void;
  onOpenBadges?: () => void;
  unlockedBadgesCount?: number;
  totalBadgesCount?: number;
}

export const Header: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  profile,
  onOpenProfile,
  onOpenResetModal,
  onTriggerPrintPDF,
  unlockedCardsCount,
  totalCardsCount,
  unlockedLevels,
  onAttemptLockedTab = () => {},
  onOpenLeaderboard = () => {},
  onOpenBadges = () => {},
  unlockedBadgesCount = 0,
  totalBadgesCount = 7
}) => {
  const [isBgmPlaying, setIsBgmPlaying] = React.useState(sound.isBgmActive());

  React.useEffect(() => {
    return sound.subscribeMusic(setIsBgmPlaying);
  }, []);

  const isTabLocked = (id: ActiveTab): boolean => {
    if (id === 'overview' || id === 'video' || id === 'guide' || id === 'level1') return false;
    if (!unlockedLevels) return false;
    if (id === 'level2') return !unlockedLevels.level2;
    if (id === 'level3') return !unlockedLevels.level3;
    if (id === 'level4') return !unlockedLevels.level4;
    if (id === 'level5') return !unlockedLevels.level5;
    if (id === 'assessment') return !unlockedLevels.assessment;
    if (id === 'report') return !unlockedLevels.report;
    return false;
  };

  const navItems: { id: ActiveTab; label: string; shortLabel: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: 'Alur & Storyboard', shortLabel: 'Alur', icon: <Compass className="w-4 h-4" /> },
    { id: 'level1', label: 'Level 1: Coin Run', shortLabel: 'Game L1', icon: <Gamepad2 className="w-4 h-4" />, badge: `${unlockedCardsCount}/${totalCardsCount}` },
    { id: 'level2', label: 'Level 2: Explorer', shortLabel: 'Materi L2', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'level3', label: 'Level 3: Solar Lab', shortLabel: 'Lab L3', icon: <FlaskConical className="w-4 h-4" /> },
    { id: 'level4', label: 'Level 4: Sosiosains', shortLabel: 'Isu L4', icon: <Trees className="w-4 h-4" /> },
    { id: 'video', label: 'Video Karhutla & Surya', shortLabel: 'Video', icon: <Video className="w-4 h-4" /> },
    { id: 'level5', label: 'Level 5: Keputusan', shortLabel: 'Studi L5', icon: <Scale className="w-4 h-4" /> },
    { id: 'assessment', label: 'Tes Literasi Energi', shortLabel: 'Tes', icon: <Award className="w-4 h-4" /> },
    { id: 'report', label: 'Portofolio LKPD & Rubrik', shortLabel: 'LKPD', icon: <FileText className="w-4 h-4" /> },
    { id: 'guide', label: 'Panduan & Referensi', shortLabel: 'Panduan', icon: <HelpCircle className="w-4 h-4" /> }
  ];

  const handleTabClick = (itemId: ActiveTab) => {
    if (isTabLocked(itemId)) {
      sound.playObstacle();
      onAttemptLockedTab(itemId);
    } else {
      sound.playClick();
      setActiveTab(itemId);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs no-print">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-orange-600 to-amber-600 text-white px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="bg-amber-900/60 text-amber-200 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px]">
              E-LKPD Fisika Interaktif
            </span>
            <span className="hidden sm:inline text-amber-100 font-medium">
              Fase E (Kelas X SMA) • Etnosains Pengeringan Kemplang Palembang & Isu Sosiosaintifik
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Adventure BGM Toggle */}
            <button
              onClick={() => sound.toggleAdventureBGM()}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                isBgmPlaying
                  ? 'bg-amber-400 text-amber-950 shadow-xs animate-pulse font-bold'
                  : 'bg-black/25 hover:bg-black/40 text-amber-100 border border-white/20'
              }`}
              title="Putar / Hentikan Musik Petualangan Sains"
            >
              <Music className={`w-3.5 h-3.5 ${isBgmPlaying ? 'animate-bounce' : 'text-amber-200'}`} />
              <span>{isBgmPlaying ? 'Musik: ON ♫' : 'Musik Petualang'}</span>
            </button>

            <button
              onClick={onOpenLeaderboard}
              className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded-md text-amber-50 font-bold transition-colors cursor-pointer"
              title="Buka Papan Peringkat Siswa (Leaderboard)"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-300" />
              <span>Leaderboard</span>
            </button>

            <button
              onClick={onOpenBadges}
              className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded-md text-amber-50 font-bold transition-colors cursor-pointer"
              title="Buka Koleksi Lencana (Badges)"
            >
              <Award className="w-3.5 h-3.5 text-orange-300" />
              <span>Lencana ({unlockedBadgesCount}/{totalBadgesCount})</span>
            </button>

            <button
              onClick={onOpenProfile}
              className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded-md text-amber-50 font-medium transition-colors cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-amber-200" />
              <span>
                {profile.name ? `${profile.name} (${profile.studentClass || 'Kelas X'})` : 'Isi Identitas Siswa'}
              </span>
            </button>

            <button
              onClick={onOpenResetModal}
              className="flex items-center gap-1 bg-amber-900/50 hover:bg-amber-900/80 text-amber-100 px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer"
              title="Pengerjaan berulang / Reset lembar kerja siswa"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
              <span>Ulang / Reset LKPD</span>
            </button>

            <button
              onClick={onTriggerPrintPDF}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-3 py-1 rounded-md shadow-xs transition-colors cursor-pointer"
              title="Cetak & Unduh E-LKPD ke PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Cetak / Unduh PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20 font-heading font-black text-lg">
            EQ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-bold text-slate-900 text-base md:text-lg tracking-tight">
                ENERGY QUEST: <span className="text-orange-600">MISI ENERGI PALEMBANG</span>
              </h1>
              <span className="hidden lg:inline-flex items-center gap-1 bg-orange-100 text-orange-800 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-orange-200">
                <Sparkles className="w-3 h-3 text-orange-500" /> R&D Prototipe
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden md:block">
              Fokus Hasil Belajar: Literasi Energi & Kemampuan Pengambilan Keputusan Berbasis Bukti
            </p>
          </div>
        </div>

        {/* Quick status */}
        <div className="hidden lg:flex items-center gap-3 text-xs">
          <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <span className="text-slate-500">Kartu Edukasi:</span>
            <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {unlockedCardsCount} / {totalCardsCount} Terbuka
            </span>
          </div>

          <div className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-amber-800 font-bold">
            <Award className="w-3.5 h-3.5 text-orange-600" />
            <span>{unlockedBadgesCount} Lencana</span>
          </div>
        </div>
      </div>

      {/* Level Navigation Tabs (Horizontal Scrollable for Mobile) */}
      <div className="bg-slate-50/90 border-t border-slate-200/80 px-2 sm:px-4 py-1.5 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-1 min-w-max">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const locked = isTabLocked(item.id);

            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-xs'
                    : locked
                    ? 'text-slate-400 bg-slate-100/80 hover:bg-slate-200/50 border border-dashed border-slate-300/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
                title={locked ? 'Terkunci! Selesaikan level sebelumnya terlebih dahulu' : item.label}
              >
                {locked ? (
                  <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                ) : (
                  item.icon
                )}
                <span className="hidden md:inline">{item.label}</span>
                <span className="inline md:hidden">{item.shortLabel}</span>

                {locked ? (
                  <span className="text-[9px] bg-slate-200 text-slate-500 px-1.5 py-0.2 rounded-full font-bold">
                    Terkunci
                  </span>
                ) : item.badge ? (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-white/25 text-white' : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
