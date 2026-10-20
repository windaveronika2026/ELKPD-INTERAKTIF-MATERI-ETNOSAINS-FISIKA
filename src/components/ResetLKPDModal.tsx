import React from 'react';
import {
  RotateCcw,
  Sparkles,
  FileText,
  AlertTriangle,
  X,
  CheckCircle2,
  Trash2,
  Layers,
  FlaskConical,
  Trees,
  Scale,
  Award
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onResetToBlank: (relockCards: boolean) => void;
  onLoadSampleAnswers: () => void;
  onResetLevel: (level: 'level1' | 'level3' | 'level4' | 'level5' | 'assessment') => void;
}

export const ResetLKPDModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onResetToBlank,
  onLoadSampleAnswers,
  onResetLevel
}) => {
  const [relockCards, setRelockCards] = React.useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-amber-300 overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-amber-200" />
            <h3 className="font-heading font-bold text-lg">Pengerjaan Berulang E-LKPD</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 leading-relaxed flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Mode Pembelajaran Berulang:</strong> E-LKPD ini dirancang fleksibel agar siswa dapat mengulang percobaan fisika, menguji alternatif keputusan yang berbeda, atau mengulang tes literasi energi untuk perbaikan nilai.
            </div>
          </div>

          {/* Primary Action Options */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Pilihan Siklus Pengerjaan:
            </span>

            {/* Option 1: Clean Reset */}
            <div className="p-4 rounded-2xl border-2 border-slate-200 hover:border-amber-500 bg-slate-50 hover:bg-amber-50/40 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-slate-900 text-sm">
                      Mulai Pengerjaan Baru (Lembar Kerja Kosong)
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Mengosongkan seluruh jawaban, tabel lab, dan keputusan untuk pengerjaan mandiri siswa dari awal.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pl-10 space-y-2">
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={relockCards}
                    onChange={(e) => setRelockCards(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>Kunci kembali kartu pengetahuan (agar bisa mengumpulkan koin game lagi)</span>
                </label>

                <button
                  type="button"
                  onClick={() => {
                    onResetToBlank(relockCards);
                    onClose();
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:brightness-110 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Bersihkan & Mulai Lembar Baru
                </button>
              </div>
            </div>

            {/* Option 2: Load Sample Benchmark Model */}
            <div className="p-4 rounded-2xl border border-slate-200 hover:border-blue-400 bg-slate-50 hover:bg-blue-50/40 transition-all space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-heading font-bold text-slate-900 text-sm">
                    Muat Contoh Pengerjaan Model (Kunci/Panduan Guru)
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Memuat kembali contoh komprehensif data lab, keputusan, dan analisis sebagai bahan telaah atau perbandingan.
                  </p>
                </div>
              </div>

              <div className="pl-10 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    onLoadSampleAnswers();
                    onClose();
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Muat Contoh Lengkap
                </button>
              </div>
            </div>
          </div>

          {/* Individual Level Reset Shortcuts */}
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Atau Reset Bagian Tertentu Saja:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  onResetLevel('level3');
                  onClose();
                }}
                className="p-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 rounded-lg border border-slate-200 text-left transition-colors flex items-center gap-1.5"
              >
                <FlaskConical className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">Reset Lab L3</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onResetLevel('level4');
                  onClose();
                }}
                className="p-2 bg-slate-100 hover:bg-teal-50 hover:text-teal-800 rounded-lg border border-slate-200 text-left transition-colors flex items-center gap-1.5"
              >
                <Trees className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span className="truncate">Reset Isu L4</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onResetLevel('level5');
                  onClose();
                }}
                className="p-2 bg-slate-100 hover:bg-purple-50 hover:text-purple-800 rounded-lg border border-slate-200 text-left transition-colors flex items-center gap-1.5"
              >
                <Scale className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span className="truncate">Reset Kasus L5</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onResetLevel('assessment');
                  onClose();
                }}
                className="p-2 bg-slate-100 hover:bg-amber-50 hover:text-amber-800 rounded-lg border border-slate-200 text-left transition-colors flex items-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="truncate">Reset Tes Literasi</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onResetLevel('level1');
                  onClose();
                }}
                className="p-2 bg-slate-100 hover:bg-orange-50 hover:text-orange-800 rounded-lg border border-slate-200 text-left transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                <span className="truncate">Kunci Kartu L1</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
