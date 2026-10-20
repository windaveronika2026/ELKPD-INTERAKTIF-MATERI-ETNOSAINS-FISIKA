import React, { useState } from 'react';
import { SOCIO_SCIENTIFIC_STATEMENTS } from '../data/etnosainsData';
import { StatementType } from '../types';
import {
  Trees,
  Flame,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Info,
  RotateCcw
} from 'lucide-react';
import { EducationalVideoHub } from './EducationalVideoHub';

interface Props {
  onProceedToLevel5: () => void;
  studentReflection: string;
  onUpdateReflection: (val: string) => void;
}

export const Level4EnvironmentalMission: React.FC<Props> = ({
  onProceedToLevel5,
  studentReflection,
  onUpdateReflection
}) => {
  const [classifications, setClassifications] = useState<Record<string, StatementType>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelectType = (stmtId: string, type: StatementType) => {
    setClassifications({ ...classifications, [stmtId]: type });
  };

  const calculateScore = () => {
    let correct = 0;
    SOCIO_SCIENTIFIC_STATEMENTS.forEach((stmt) => {
      if (classifications[stmt.id] === stmt.correctType) {
        correct++;
      }
    });
    return correct;
  };

  const score = calculateScore();

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4 px-3 sm:px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-bold bg-teal-100 text-teal-800 rounded">
              LEVEL 4
            </span>
            <h2 className="font-heading font-bold text-lg sm:text-xl text-slate-900">
              ENVIRONMENTAL MISSION: ISU SOSIOSAINTIFIK PALEMBANG
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Menganalisis dilema energi, kabut asap karhutla, dan melatih kecakapan membedakan Fakta, Asumsi, Opini, dan Bukti Ilmiah.
          </p>
        </div>

        <button
          onClick={onProceedToLevel5}
          className="self-start sm:self-auto px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5 transition-all cursor-pointer"
        >
          Lanjut ke Level 5: Decision Challenge <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Level 4 Challenge Card */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-slate-950 text-white p-4 rounded-2xl shadow-sm border border-teal-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-900 uppercase">
              Tantangan Level 4
            </span>
            <span className="text-teal-300 font-bold text-xs sm:text-sm">
              Pahlawan Ekologi & Detektif Fakta Sosiosaintifik
            </span>
          </div>
          <p className="text-[11px] text-slate-300">
            Target Misi: Klasifikasikan 6 butir isu karhutla ke dalam Fakta, Asumsi, Opini, dan Bukti Ilmiah, serta hindari miskonsepsi peran energi surya.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 text-xs shrink-0 font-mono">
          <span className="text-amber-300">Reward Lencana:</span>
          <span className="font-bold text-white">Pahlawan Ekologi</span>
        </div>
      </div>

      {/* Critical Scientific Boundary Box: Peat Fires & Renewable Energy */}
      <div className="bg-orange-50 border-l-4 border-orange-500 rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2 font-heading font-bold text-orange-950 text-sm sm:text-base">
          <Flame className="w-5 h-5 text-orange-600 shrink-0" />
          Klarifikasi Ilmiah: Hubungan Energi Terbarukan & Karhutla di Sumatera Selatan
        </div>
        <p className="text-xs sm:text-sm text-orange-900 leading-relaxed">
          Dalam sains dan sosiologi lingkungan, sangat penting untuk tidak menarik korelasi keliru (miskonsepsi):
          <br />
          <strong>1. Energi terbarukan TIDAK secara langsung memadamkan api atau menghentikan kebakaran hutan/lahan gambut (karhutla).</strong> Titik api gambut umumnya dipicu oleh pembukaan lahan dengan cara membakar serta penurunan tinggi muka air tanah gambut akibat kanal drainase.
          <br />
          <strong>2. Peran Energi Terbarukan (Surya) yang Sebenarnya:</strong>
          <span className="block mt-1 pl-3 border-l-2 border-orange-300">
            • <em>Mitigasi Emisi Global:</em> Mengurangi pelepasan gas rumah kaca (<span className="font-mono">CO₂</span>) dari pembakaran batubara di PLTU, yang memperparah krisis iklim dan anomali musim kemarau panjang (El Niño).<br />
            • <em>Adaptasi Ketahanan Pangan Higienis:</em> Menyediakan teknologi pengering surya tertutup (Solar Dryer Dome) yang memungkinkan para pengrajin kemplang tetap berproduksi bersih, tanpa terkontaminasi oleh partikulat beracun aerosol kabut asap (<span className="font-mono">PM2.5</span>).
          </span>
        </p>
      </div>

      {/* Video Pembelajaran Interaktif Karhutla & Energi Surya Palembang */}
      <EducationalVideoHub
        savedVideoNotes={studentReflection}
        onSaveVideoNotes={onUpdateReflection}
      />

      {/* Definitions of Fact, Assumption, Opinion, and Evidence */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
          <FileCheck2 className="w-4 h-4 text-teal-600" />
          Pedoman Literasi Ilmiah: Membedakan 4 Jenis Pernyataan
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1">
            <span className="font-bold text-blue-800 uppercase text-[10px] tracking-wider block">1. Fakta (Fact)</span>
            <p className="text-blue-900">
              Pernyataan mengenai kejadian atau kondisi objektif yang dapat diverifikasi kebenarannya melalui observasi atau pengukuran langsung.
            </p>
          </div>

          <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-xl space-y-1">
            <span className="font-bold text-purple-800 uppercase text-[10px] tracking-wider block">2. Asumsi (Assumption)</span>
            <p className="text-purple-900">
              Dugaan atau anggapan dasar yang diterima sementara sebagai kebenaran untuk analisis awal sebelum data pembuktian lengkap diperoleh.
            </p>
          </div>

          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
            <span className="font-bold text-amber-800 uppercase text-[10px] tracking-wider block">3. Opini (Opinion)</span>
            <p className="text-amber-900">
              Pandangan subjektif, keyakinan emosional, atau penilaian perseorangan yang belum didukung oleh data terukur atau verifikasi independen.
            </p>
          </div>

          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
            <span className="font-bold text-emerald-800 uppercase text-[10px] tracking-wider block">4. Bukti (Evidence)</span>
            <p className="text-emerald-900">
              Sekumpulan fakta kuantitatif, hasil uji empiris, atau data komparatif yang secara sahih digunakan untuk mendukung atau menyanggah suatu klaim.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Classification Activity */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-heading font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              Tantangan Klasifikasi Pernyataan Sosiosaintifik
            </h3>
            <p className="text-xs text-slate-500">
              Klasifikasikan masing-masing pernyataan di bawah ini menjadi <strong>Fakta</strong>, <strong>Asumsi</strong>, <strong>Opini</strong>, atau <strong>Bukti</strong>!
            </p>
          </div>

          {submitted && (
            <div className="bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-lg text-xs font-bold text-teal-800">
              Skor: {score} / {SOCIO_SCIENTIFIC_STATEMENTS.length} Tepat
            </div>
          )}
        </div>

        <div className="space-y-4">
          {SOCIO_SCIENTIFIC_STATEMENTS.map((stmt, idx) => {
            const currentSelected = classifications[stmt.id];
            const isCorrect = currentSelected === stmt.correctType;

            return (
              <div
                key={stmt.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="inline-block text-[10px] font-mono text-slate-400 font-bold">
                      PERNYATAAN #{idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                      "{stmt.text}"
                    </p>
                    <span className="inline-block text-[10px] text-slate-500 italic">
                      Label Sumber: {stmt.sourceOrLabel}
                    </span>
                  </div>

                  {submitted && (
                    <div className="shrink-0">
                      {isCorrect ? (
                        <span className="flex items-center gap-1 text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                          <CheckCircle2 className="w-4 h-4" /> Tepat
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-600 font-bold text-xs bg-red-50 px-2 py-1 rounded-md border border-red-200">
                          <XCircle className="w-4 h-4" /> Kurang Tepat
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Selection Buttons */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {(['fakta', 'asumsi', 'opini', 'bukti'] as StatementType[]).map((type) => {
                    const isSelected = currentSelected === type;
                    const typeLabels: Record<StatementType, string> = {
                      fakta: 'Fakta',
                      asumsi: 'Asumsi',
                      opini: 'Opini',
                      bukti: 'Bukti (Evidence)'
                    };

                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleSelectType(stmt.id, type)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          isSelected
                            ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {typeLabels[type]}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Explanation */}
                {submitted && (
                  <div className="p-3 rounded-lg text-xs bg-white border border-slate-200 text-slate-700 space-y-1">
                    <strong className="text-slate-900 block">
                      Kategori yang Benar: <span className="uppercase text-teal-700">{stmt.correctType}</span>
                    </strong>
                    <p className="text-slate-600">{stmt.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-end gap-2">
          {submitted && (
            <button
              onClick={() => {
                setClassifications({});
                setSubmitted(false);
              }}
              className="px-4 py-2.5 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-teal-600" /> Ulangi Klasifikasi
            </button>
          )}

          <button
            onClick={() => setSubmitted(true)}
            disabled={Object.keys(classifications).length < SOCIO_SCIENTIFIC_STATEMENTS.length}
            className="px-5 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow transition-all"
          >
            Periksa Hasil Klasifikasi
          </button>
        </div>
      </div>

      {/* Student Reflection on Peat Smoke and Food Security */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
          Refleksi Analitis Siswa (Level 4):
        </label>
        <p className="text-xs text-slate-500">
          Menurut Anda, mengapa penting bagi seorang pengambil keputusan untuk membedakan klaim opini publik dengan bukti empiris hasil uji laboratorium saat merencanakan sistem pengering kemplang di Palembang?
        </p>
        <textarea
          rows={3}
          value={studentReflection}
          onChange={(e) => onUpdateReflection(e.target.value)}
          placeholder="Tuliskan refleksi Anda di sini... (Contoh: Opini seringkali melebih-lebihkan atau menyederhanakan masalah tanpa melihat kendala nyata, sedangkan bukti empiris memberikan angka riil tentang cemaran mikroba, biaya kWh, dan daya tampung listrik...)"
          className="w-full p-3 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
        />

        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-100">
          <span className="text-[11px] text-teal-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
            Refleksi isu sosiosaintifik tersimpan otomatis ke lembar portofolio E-LKPD.
          </span>
          <button
            onClick={onProceedToLevel5}
            className="px-5 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>Selesaikan Level 4 & Buka Level 5: Tantangan Keputusan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
