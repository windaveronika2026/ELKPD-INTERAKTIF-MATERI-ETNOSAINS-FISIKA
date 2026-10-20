import React, { useState } from 'react';
import { GameBadge, LeaderboardEntry, StudentProfile } from '../types';
import { COMPANION_AVATARS } from '../data/gamificationData';
import { sound } from '../utils/audio';
import {
  Award,
  Trophy,
  CheckCircle2,
  Lock,
  Sparkles,
  Users,
  Target,
  Medal,
  Clock,
  School,
  Flame,
  ArrowUpRight
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  badges: GameBadge[];
  leaderboard: LeaderboardEntry[];
  currentScore: number;
  currentKemplangCount: number;
  profile: StudentProfile;
  selectedAvatarId: string;
  initialTab?: 'badges' | 'leaderboard';
}

export const LeaderboardAndBadgesModal: React.FC<Props> = ({
  isOpen,
  onClose,
  badges,
  leaderboard,
  currentScore,
  currentKemplangCount,
  profile,
  selectedAvatarId,
  initialTab = 'badges'
}) => {
  const [activeTab, setActiveTab] = useState<'badges' | 'leaderboard'>(initialTab);

  if (!isOpen) return null;

  const currentAvatar =
    COMPANION_AVATARS.find((a) => a.id === selectedAvatarId) || COMPANION_AVATARS[0];

  const unlockedBadgesCount = badges.filter((b) => b.unlocked).length;

  // Prepare full sorted leaderboard including current student
  const studentEntry: LeaderboardEntry = {
    id: 'current-student',
    name: profile.name || 'Siswa Saya (Kamu)',
    school: profile.school || 'SMA Negeri Palembang',
    score: currentScore,
    kemplangCount: currentKemplangCount,
    avatarId: selectedAvatarId,
    badgeTitle:
      badges.find((b) => b.unlocked && b.id === 'badge-level1-master')?.title ||
      'Calon Master Penjemuran',
    rank: 1,
    date: 'Hari ini (Aktif)',
    isCurrentStudent: true
  };

  const combinedLeaderboard = [...leaderboard.filter((e) => !e.isCurrentStudent), studentEntry]
    .sort((a, b) => b.score - a.score)
    .map((item, index) => ({ ...item, rank: index + 1 }));

  const studentRank = combinedLeaderboard.find((e) => e.isCurrentStudent)?.rank || 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-amber-300 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shadow-inner border border-white/20">
              {activeTab === 'badges' ? '🎖️' : '🏆'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-black/25 px-2 py-0.5 rounded-full text-amber-200">
                  Pusat Prestasi Siswa
                </span>
                <span className="text-xs text-amber-100 hidden sm:inline">
                  • Energy Quest Palembang
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg sm:text-xl text-white">
                {activeTab === 'badges'
                  ? 'Koleksi Lencana & Pencapaian'
                  : 'Papan Peringkat (Leaderboard)'}
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg font-bold transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-3 gap-2">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('badges');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'badges'
                ? 'border-orange-600 text-orange-700 bg-white shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Award className="w-4 h-4 text-amber-600" />
            <span>Daftar Lencana (Badges)</span>
            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {unlockedBadgesCount}/{badges.length}
            </span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('leaderboard');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'leaderboard'
                ? 'border-orange-600 text-orange-700 bg-white shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Papan Peringkat (Leaderboard)</span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Peringkat #{studentRank}
            </span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {activeTab === 'badges' ? (
            /* Badges Tab */
            <div className="space-y-4">
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">🏅</div>
                  <div>
                    <h4 className="font-heading font-bold text-slate-900 text-sm">
                      Pencapaian Kompetensi E-LKPD
                    </h4>
                    <p className="text-slate-600 text-[11px]">
                      Selesaikan setiap level permainan dan tantangan ilmiah untuk membuka lencana master.
                    </p>
                  </div>
                </div>
                <div className="bg-white border border-amber-300 px-3 py-1.5 rounded-xl font-bold text-amber-800 shadow-2xs text-center shrink-0">
                  <div className="text-xs font-semibold text-slate-500">Total Terbuka:</div>
                  <div className="text-base text-orange-600 font-extrabold">
                    {unlockedBadgesCount} / {badges.length} Lencana
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {badges.map((badge) => {
                  const isUnlocked = badge.unlocked;
                  return (
                    <div
                      key={badge.id}
                      className={`p-3.5 rounded-2xl border transition-all text-left relative overflow-hidden ${
                        isUnlocked
                          ? 'border-amber-300 bg-gradient-to-br from-amber-50 via-white to-orange-50/40 shadow-xs ring-1 ring-amber-300/60'
                          : 'border-slate-200 bg-slate-50/70 opacity-65'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-xs shrink-0 ${
                            isUnlocked
                              ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-amber-500/20'
                              : 'bg-slate-200 text-slate-400 grayscale'
                          }`}
                        >
                          {badge.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                              {badge.levelRequirement}
                            </span>
                            {isUnlocked ? (
                              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-full">
                                <CheckCircle2 className="w-3 h-3" /> Terbuka
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-200 px-1.5 py-0.2 rounded-full">
                                <Lock className="w-2.5 h-2.5" /> Terkunci
                              </span>
                            )}
                          </div>

                          <h5 className="font-heading font-bold text-slate-900 text-xs sm:text-sm">
                            {badge.title}
                          </h5>
                          <p className="text-[11px] text-slate-600 leading-snug mt-1">
                            {badge.description}
                          </p>

                          {isUnlocked && badge.unlockedAt && (
                            <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1">
                              <Clock className="w-2.5 h-2.5" />
                              <span>Dibuka: {badge.unlockedAt}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Leaderboard Tab */
            <div className="space-y-4">
              {/* Current Student Highlight Card */}
              <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 p-0.5 rounded-2xl shadow-md">
                <div className="bg-slate-900 text-white rounded-[14px] p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center text-2xl font-black shadow-inner">
                      {currentAvatar.avatarIcon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Peringkat Kamu: #{studentRank}
                        </span>
                        <span className="text-xs text-amber-200">
                          {profile.studentClass || 'Kelas X'}
                        </span>
                      </div>
                      <h4 className="font-heading font-bold text-base sm:text-lg text-white">
                        {profile.name || 'Siswa Berprestasi (Kamu)'}
                      </h4>
                      <p className="text-[11px] text-slate-300">
                        {profile.school || 'SMA Negeri Kota Palembang'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-slate-800/80 border border-amber-500/30 px-3.5 py-2 rounded-xl text-center self-stretch sm:self-auto justify-around">
                    <div>
                      <div className="text-[10px] text-slate-400 font-semibold">Skor Total</div>
                      <div className="text-lg font-black text-amber-400">{currentScore} pts</div>
                    </div>
                    <div className="w-px h-8 bg-slate-700" />
                    <div>
                      <div className="text-[10px] text-slate-400 font-semibold">Kemplang</div>
                      <div className="text-lg font-black text-emerald-400">{currentKemplangCount} keping</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Leaderboard Table */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>Papan Skor Tingkat SMA Palembang & Sumsel</span>
                  <span className="text-amber-700 font-semibold">Update Otomatis</span>
                </div>

                <div className="divide-y divide-slate-100">
                  {combinedLeaderboard.map((entry) => {
                    const isStudent = entry.isCurrentStudent;
                    const avatar =
                      COMPANION_AVATARS.find((a) => a.id === entry.avatarId) || COMPANION_AVATARS[0];

                    let rankBadge = (
                      <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
                        {entry.rank}
                      </span>
                    );
                    if (entry.rank === 1) {
                      rankBadge = (
                        <span className="w-7 h-7 rounded-full bg-amber-400 text-amber-950 font-black text-xs flex items-center justify-center shadow-xs">
                          🥇 1
                        </span>
                      );
                    } else if (entry.rank === 2) {
                      rankBadge = (
                        <span className="w-7 h-7 rounded-full bg-slate-300 text-slate-900 font-bold text-xs flex items-center justify-center shadow-xs">
                          🥈 2
                        </span>
                      );
                    } else if (entry.rank === 3) {
                      rankBadge = (
                        <span className="w-7 h-7 rounded-full bg-amber-700 text-amber-100 font-bold text-xs flex items-center justify-center shadow-xs">
                          🥉 3
                        </span>
                      );
                    }

                    return (
                      <div
                        key={entry.id}
                        className={`p-3 sm:p-3.5 flex items-center justify-between gap-3 transition-colors ${
                          isStudent
                            ? 'bg-amber-50/90 font-medium border-l-4 border-l-orange-500'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {rankBadge}
                          <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-lg shrink-0">
                            {avatar.avatarIcon}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-sm font-bold text-slate-900">
                                {entry.name}
                              </span>
                              {isStudent && (
                                <span className="text-[10px] bg-orange-600 text-white font-bold px-1.5 py-0.2 rounded-full">
                                  Kamu
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-1">
                              <School className="w-3 h-3 text-slate-400" />
                              <span>{entry.school}</span>
                              <span className="hidden sm:inline text-slate-300">•</span>
                              <span className="hidden sm:inline text-amber-700 font-medium">
                                {entry.badgeTitle}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-sm sm:text-base font-extrabold text-slate-900">
                            {entry.score}{' '}
                            <span className="text-xs text-orange-600 font-bold">pts</span>
                          </div>
                          <div className="text-[10px] text-emerald-600 font-semibold">
                            {entry.kemplangCount} kemplang
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-3 sm:p-4 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 hidden sm:block">
            Petualangan Fisika Etnosains • Raih lencana Master Penjemuran Tradisional
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
