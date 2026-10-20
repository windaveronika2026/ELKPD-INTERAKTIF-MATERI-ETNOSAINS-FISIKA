import React from 'react';
import { ActiveTab } from '../types';
import { sound } from '../utils/audio';
import { Lock, ArrowRight, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  targetTab: ActiveTab | null;
  onNavigateToPrerequisite: (tab: ActiveTab) => void;
  onUnlockAllForTesting: () => void;
}

export const LockedLevelModal: React.FC<Props> = ({
  isOpen,
  onClose,
  targetTab,
  onNavigateToPrerequisite,
  onUnlockAllForTesting
}) => {
  if (!isOpen || !targetTab) return null;

  const getLockInfo = (tab: ActiveTab) => {
    switch (tab) {
      case 'level2':
        return {
          title: 'Level 2: Energy Explorer Masih Terkunci!',
          levelName: 'Level 2',
          prereqName: 'Level 1: Solar Coin Run',
          prereqTab: 'level1' as ActiveTab,
          instruction:
            'Anda harus menyelesaikan misi Level 1 terlebih dahulu dengan mengumpulkan koin surya dan mencapai Pos Edukasi Energi Palembang.',
          icon: '🏃'
        };
      case 'level3':
        return {
          title: 'Level 3: Solar Lab Fisika Masih Terkunci!',
          levelName: 'Level 3',
          prereqName: 'Level 2: Energy Explorer',
          prereqTab: 'level2' as ActiveTab,
          instruction:
            'Pelajari konsep etnosains pengeringan kemplang dan selesaikan aktivitas penyelidikan di Level 2 untuk membuka Laboratorium Surya Virtual.',
          icon: '🔬'
        };
      case 'level4':
        return {
          title: 'Level 4: Misi Isu Sosiosaintifik Masih Terkunci!',
          levelName: 'Level 4',
          prereqName: 'Level 3: Solar Lab Fisika',
          prereqTab: 'level3' as ActiveTab,
          instruction:
            'Lakukan simulasi variasi radiasi surya (Q = I·A·t·η) dan rumuskan kesimpulan matematis di Level 3 untuk membuka misi lingkungan ini.',
          icon: '🌲'
        };
      case 'level5':
        return {
          title: 'Level 5: Tantangan Pengambilan Keputusan Masih Terkunci!',
          levelName: 'Level 5',
          prereqName: 'Level 4: Misi Isu Sosiosaintifik',
          prereqTab: 'level4' as ActiveTab,
          instruction:
            'Selesaikan telaah kabut asap karhutla dan tuliskan refleksi sosiosaintifik di Level 4 untuk membuka studi kasus UMKM Ibu Salmah.',
          icon: '⚖️'
        };
      case 'assessment':
      case 'report':
        return {
          title: 'Asesmen & Portofolio E-LKPD Belum Terbuka!',
          levelName: 'Asesmen & Laporan',
          prereqName: 'Level 5: Tantangan Keputusan',
          prereqTab: 'level5' as ActiveTab,
          instruction:
            'Selesaikan rekomendasi matriks multi-kriteria untuk UMKM Kemplang di Level 5 agar seluruh data terkompilasi ke dalam lembar kerja.',
          icon: '📝'
        };
      default:
        return {
          title: 'Level Ini Masih Terkunci!',
          levelName: 'Level',
          prereqName: 'Level Sebelumnya',
          prereqTab: 'level1' as ActiveTab,
          instruction: 'Selesaikan level sebelumnya secara berurutan sesuai alur pembelajaran.',
          icon: '🔒'
        };
    }
  };

  const info = getLockInfo(targetTab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-amber-300 text-center">
        {/* Animated Lock Icon */}
        <div className="w-16 h-16 rounded-2xl bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center mx-auto text-3xl shadow-inner">
          <Lock className="w-8 h-8 text-amber-600 animate-pulse" />
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
            Prinsip Pembelajaran Berurutan
          </span>
          <h3 className="font-heading font-bold text-lg text-slate-900 mt-2">
            {info.title}
          </h3>
          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
            {info.instruction}
          </p>
        </div>

        {/* Prerequisite Callout */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-left space-y-1">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
            Prasyarat Pembukaan:
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <span className="text-amber-600">{info.icon}</span>
            <span>Selesaikan: {info.prereqName}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2 pt-2">
          <button
            onClick={() => {
              sound.playClick();
              onNavigateToPrerequisite(info.prereqTab);
              onClose();
            }}
            className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Buka {info.prereqName}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Kembali
          </button>

          {/* Teacher / Evaluator Unlock Option */}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                sound.playSuccess();
                onUnlockAllForTesting();
                onClose();
              }}
              className="text-[11px] text-amber-700 hover:text-amber-900 font-semibold underline cursor-pointer"
            >
              🔓 Mode Guru / Penguji: Buka Semua Level Langsung
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
