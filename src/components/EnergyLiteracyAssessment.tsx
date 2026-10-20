import React, { useState } from 'react';
import { LITERACY_QUESTIONS } from '../data/etnosainsData';
import {
  Award,
  CheckCircle2,
  XCircle,
  BarChart3,
  RotateCcw,
  ArrowRight,
  BookOpen,
  Info
} from 'lucide-react';
import { sound } from '../utils/audio';

interface Props {
  onProceedToReport: () => void;
  savedAnswers: Record<number, string>;
  onSaveAnswers: (answers: Record<number, string>, finalScore: number) => void;
}

export const EnergyLiteracyAssessment: React.FC<Props> = ({
  onProceedToReport,
  savedAnswers,
  onSaveAnswers
}) => {
  const [answers, setAnswers] = useState<Record<number, string>>(savedAnswers);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qId: number, key: string) => {
    if (submitted) return;
    setAnswers({ ...answers, [qId]: key });
    sound.playClick();
  };

  const calculateScore = () => {
    let correct = 0;
    LITERACY_QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correctKey) {
        correct++;
      }
    });
    return correct;
  };

  const totalScore = calculateScore();
  const percentage = Math.round((totalScore / LITERACY_QUESTIONS.length) * 100);

  // Indicator breakdown
  const indicators = [
    'Konsep Energi',
    'Sumber Energi',
    'Konversi Energi',
    'Interpretasi Data',
    'Evaluasi Pemanfaatan Energi'
  ] as const;

  const indicatorStats = indicators.map((ind) => {
    const questionsOfInd = LITERACY_QUESTIONS.filter((q) => q.indicator === ind);
    const correctOfInd = questionsOfInd.filter((q) => answers[q.id] === q.correctKey).length;
    return {
      name: ind,
      total: questionsOfInd.length,
      correct: correctOfInd,
      pct: questionsOfInd.length > 0 ? Math.round((correctOfInd / questionsOfInd.length) * 100) : 0
    };
  });

  const handleSubmit = () => {
    setSubmitted(true);
    onSaveAnswers(answers, percentage);
    sound.playSuccess();
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    sound.playClick();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4 px-3 sm:px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-bold bg-amber-100 text-amber-800 rounded">
              ASESMEN
            </span>
            <h2 className="font-heading font-bold text-lg sm:text-xl text-slate-900">
              TES LITERASI ENERGI FISIKA KELAS X
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Mengukur 5 indikator utama: Konsep Energi, Sumber Energi, Konversi Energi, Interpretasi Data, dan Evaluasi Pemanfaatan Energi.
          </p>
        </div>

        <button
          onClick={onProceedToReport}
          className="self-start sm:self-auto px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5 transition-all"
        >
          Lihat Portofolio LKPD & Rubrik <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Score Summary Box (Appears after submission) */}
      {submitted && (
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-700 space-y-5 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700 pb-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                Hasil Diagnostik Asesmen
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold mt-0.5">
                Nilai Literasi Energi: {percentage} / 100
              </h3>
              <p className="text-xs text-slate-400">
                Menjawab benar {totalScore} dari {LITERACY_QUESTIONS.length} butir instrumen tes.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-xs font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Ulangi Tes
              </button>
            </div>
          </div>

          {/* Breakdown per Indicator */}
          <div>
            <span className="text-xs font-semibold text-slate-300 block mb-2">
              Capaian Berdasarkan 5 Indikator Literasi Energi:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {indicatorStats.map((ind) => (
                <div key={ind.name} className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 space-y-1.5">
                  <span className="text-[10px] text-slate-400 block font-semibold truncate" title={ind.name}>
                    {ind.name}
                  </span>
                  <div className="flex justify-between items-baseline">
                    <span className="font-mono text-base font-bold text-amber-400">
                      {ind.pct}%
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {ind.correct}/{ind.total}
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${ind.pct >= 75 ? 'bg-emerald-500' : ind.pct >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                      style={{ width: `${ind.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Question Bank Items */}
      <div className="space-y-4">
        {LITERACY_QUESTIONS.map((q, idx) => {
          const studentAns = answers[q.id];
          const isCorrect = studentAns === q.correctKey;

          return (
            <div
              key={q.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-500">
                      SOAL #{q.id}
                    </span>
                    <span className="text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded">
                      Indikator: {q.indicator}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed pt-1">
                    {q.question}
                  </h4>
                </div>

                {submitted && (
                  <div className="shrink-0">
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                        <CheckCircle2 className="w-4 h-4" /> Benar (+10)
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-600 font-bold text-xs bg-red-50 px-2 py-1 rounded-md border border-red-200">
                        <XCircle className="w-4 h-4" /> Salah (0)
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2 pt-1 text-xs">
                {q.options.map((opt) => {
                  const isSelected = studentAns === opt.key;
                  let optionStyle = 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700';

                  if (submitted) {
                    if (opt.key === q.correctKey) {
                      optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold';
                    } else if (isSelected && opt.key !== q.correctKey) {
                      optionStyle = 'bg-red-50 border-red-300 text-red-900 font-semibold';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-amber-100/70 border-amber-500 text-amber-950 font-semibold';
                  }

                  return (
                    <label
                      key={opt.key}
                      onClick={() => handleSelect(q.id, opt.key)}
                      className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-colors ${optionStyle}`}
                    >
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        disabled={submitted}
                        checked={isSelected}
                        onChange={() => {}}
                        className="mt-0.5 text-amber-600"
                      />
                      <span className="font-mono font-bold">{opt.key}.</span>
                      <span className="leading-relaxed">{opt.text}</span>
                    </label>
                  );
                })}
              </div>

              {/* Explanation after submission */}
              {submitted && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1">
                  <div className="flex items-center gap-1 text-slate-800 font-bold text-[11px]">
                    <Info className="w-3.5 h-3.5 text-blue-600" /> Penjelasan Diagnostik Fisika:
                  </div>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit or Proceed Button */}
      {!submitted ? (
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < LITERACY_QUESTIONS.length}
            className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg transition-all cursor-pointer"
          >
            Kumpulkan & Nilai Asesmen Literasi Energi
          </button>
        </div>
      ) : (
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-amber-50/80 p-4 rounded-2xl border border-amber-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs text-amber-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-medium">
              Asesmen selesai! Skor akhir: <strong>{percentage}%</strong>. Akses Laporan & Rubrik E-LKPD kini telah terbuka penuh.
            </span>
          </div>
          <button
            onClick={onProceedToReport}
            className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md flex items-center gap-2 cursor-pointer transition-all shrink-0"
          >
            <span>Buka Laporan E-LKPD Lengkap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

