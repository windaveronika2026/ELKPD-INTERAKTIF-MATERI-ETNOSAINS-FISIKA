import React, { useState } from 'react';
import {
  StudentProfile,
  ObservationRecord,
  DecisionWorksheet
} from '../types';
import { DECISION_RUBRIC_ASPECTS, DRYING_ALTERNATIVES } from '../data/etnosainsData';
import { generateDirectPDF, generateHTMLToPDF } from '../utils/pdfExport';
import {
  FileText,
  Printer,
  Download,
  CheckCircle2,
  Award,
  Layers,
  Scale,
  User,
  FlaskConical,
  Trees,
  HelpCircle,
  Sparkles,
  Loader2,
  RotateCcw
} from 'lucide-react';

interface Props {
  profile: StudentProfile;
  studentNotesL2: string;
  observationTable: ObservationRecord[];
  labConclusion: string;
  studentReflectionL4: string;
  worksheet: DecisionWorksheet;
  literacyScore: number;
  onOpenResetModal?: () => void;
}

export const DecisionRubricAndLKPD: React.FC<Props> = ({
  profile,
  studentNotesL2,
  observationTable,
  labConclusion,
  studentReflectionL4,
  worksheet,
  literacyScore,
  onOpenResetModal
}) => {
  const [rubricScores, setRubricScores] = useState<Record<string, number>>({
    'rubric-1': 4,
    'rubric-2': 4,
    'rubric-3': 4,
    'rubric-4': 4,
    'rubric-5': 4,
    'rubric-6': 4
  });

  const [evaluatorRole, setEvaluatorRole] = useState<'self' | 'teacher'>('self');
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [pdfSuccessMessage, setPdfSuccessMessage] = useState<string | null>(null);

  const chosenAltObj = DRYING_ALTERNATIVES.find((a) => a.id === worksheet.chosenAlternative);

  const handleScoreChange = (aspectId: string, score: number) => {
    setRubricScores({ ...rubricScores, [aspectId]: score });
  };

  const totalRubricScore = Object.values(rubricScores).reduce((a, b) => a + b, 0);
  const maxRubricScore = DECISION_RUBRIC_ASPECTS.length * 4;
  const rubricPercentage = Math.round((totalRubricScore / maxRubricScore) * 100);

  // Handle Direct Vector PDF Generation
  const handleDownloadPDF = () => {
    try {
      setIsExportingPDF(true);
      generateDirectPDF({
        profile,
        studentNotesL2,
        observationTable,
        labConclusion,
        studentReflectionL4,
        worksheet,
        literacyScore,
        rubricScores
      });
      setPdfSuccessMessage('Dokumen PDF E-LKPD (Format Vektor) berhasil diunduh ke perangkat Anda!');
      setTimeout(() => setPdfSuccessMessage(null), 5000);
    } catch (err) {
      console.error('Error generating PDF:', err);
      // Fallback to print
      window.print();
    } finally {
      setIsExportingPDF(false);
    }
  };

  // Handle Visual Snapshot HTML to PDF
  const handleDownloadVisualPDF = async () => {
    try {
      setIsExportingPDF(true);
      await generateHTMLToPDF('printable-elkpd-document', `E-LKPD_Visual_${profile.name ? profile.name.replace(/\s+/g, '_') : 'Siswa'}.pdf`);
      setPdfSuccessMessage('Dokumen PDF Snapshot Visual berhasil dibuat dan diunduh!');
      setTimeout(() => setPdfSuccessMessage(null), 5000);
    } catch (err) {
      console.error('Error generating visual PDF:', err);
      // Fallback
      handleDownloadPDF();
    } finally {
      setIsExportingPDF(false);
    }
  };

  // Handle Browser Native Print Dialog
  const handleBrowserPrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4 px-3 sm:px-4">
      {/* Header (No print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-bold bg-purple-100 text-purple-800 rounded">
              PORTOFOLIO & RUBRIK
            </span>
            <h2 className="font-heading font-bold text-lg sm:text-xl text-slate-900">
              LEMBAR PORTOFOLIO E-LKPD & RUBRIK KEPUTUSAN BERBASIS BUKTI
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Rangkuman kinerja investigasi ilmiah, tabel pengamatan lab, keputusan kasus kemplang, dan rubrik penilaian analitik.
          </p>
        </div>

        {/* Action Buttons for PDF & Print */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleDownloadPDF}
            disabled={isExportingPDF}
            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-2 transition-all disabled:opacity-50"
            title="Download file PDF E-LKPD langsung ke komputer/ponsel"
          >
            {isExportingPDF ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>Download PDF E-LKPD</span>
          </button>

          <button
            onClick={handleDownloadVisualPDF}
            disabled={isExportingPDF}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5 transition-all disabled:opacity-50"
            title="Download salinan visual dokumen halaman persis tampilan layar"
          >
            <Download className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">PDF Visual</span>
          </button>

          <button
            onClick={handleBrowserPrint}
            className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5 transition-all"
            title="Buka dialog cetak browser (Ctrl+P / Simpan sebagai PDF)"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Print</span>
          </button>

          {onOpenResetModal && (
            <button
              onClick={onOpenResetModal}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
              title="Mulai pengerjaan baru atau reset seluruh lembar kerja"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
              <span>Mulai Pengerjaan Berulang</span>
            </button>
          )}
        </div>
      </div>

      {/* Guide Banner for Printing & Saving PDF */}
      <div className="no-print bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs text-blue-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-start gap-2.5">
          <Printer className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <strong>Panduan Cetak / Simpan PDF:</strong>
            <p className="text-[11px] text-blue-800 mt-0.5 leading-relaxed">
              Tombol <strong>Download PDF E-LKPD</strong> akan langsung mengunduh berkas file PDF resmi terstruktur. Jika menggunakan tombol <strong>Cetak / Print</strong>, pilih opsi <em>"Simpan sebagai PDF" (Save as PDF)</em> di jendela printer peramban Anda untuk hasil halaman A4 rapi tanpa header website.
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold bg-white px-2.5 py-1 rounded-md text-blue-700 border border-blue-200 shrink-0">
          A4 Portrait Ready
        </span>
      </div>

      {/* Success Notification Banner */}
      {pdfSuccessMessage && (
        <div className="no-print bg-emerald-50 border border-emerald-300 rounded-xl p-3 text-xs text-emerald-900 flex items-center gap-2 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{pdfSuccessMessage}</span>
        </div>
      )}

      {/* Printable E-LKPD Document Container */}
      <div
        id="printable-elkpd-document"
        className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8 text-slate-800"
      >
        {/* Document Header & Identity Banner */}
        <div className="border-b-2 border-slate-900 pb-5 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-orange-600">
                LEMBAR KERJA PESERTA DIDIK ELEKTRONIK (E-LKPD) FISIKA SMA KELAS X
              </div>
              <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 mt-0.5">
                ENERGY QUEST: MISI ENERGI PALEMBANG
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Konteks Etnosains Pengeringan Kemplang Palembang & Isu Sosiosaintifik Transisi Energi Bersih
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs min-w-[240px] space-y-1">
              <div className="font-bold text-slate-800 border-b pb-1 mb-1">
                Identitas Peserta Didik:
              </div>
              <div><span className="text-slate-500">Nama:</span> <strong className="text-slate-800">{profile.name || '(Belum Diisi)'}</strong></div>
              <div><span className="text-slate-500">Kelas:</span> <strong className="text-slate-800">{profile.studentClass || '-'}</strong> | <span className="text-slate-500">Kelompok:</span> <strong className="text-slate-800">{profile.groupNumber || '-'}</strong></div>
              <div><span className="text-slate-500">Sekolah:</span> <strong className="text-slate-800">{profile.school || '-'}</strong></div>
              <div><span className="text-slate-500">Tanggal:</span> <strong className="text-slate-800">{profile.date || new Date().toISOString().split('T')[0]}</strong></div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200">
              <span className="text-[10px] text-amber-700 block font-bold uppercase">Variabel 1</span>
              <strong className="text-amber-900">Literasi Energi: {literacyScore}/100</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-purple-50 border border-purple-200">
              <span className="text-[10px] text-purple-700 block font-bold uppercase">Variabel 2</span>
              <strong className="text-purple-900">Keputusan Bukti: {rubricPercentage}%</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
              <span className="text-[10px] text-emerald-700 block font-bold uppercase">Solar Lab</span>
              <strong className="text-emerald-900">{observationTable.length} Data Percobaan</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200">
              <span className="text-[10px] text-blue-700 block font-bold uppercase">Alternatif Terpilih</span>
              <strong className="text-blue-900 truncate block">{chosenAltObj?.name || 'Metode B: Solar Dome'}</strong>
            </div>
          </div>
        </div>

        {/* Section 1: Catatan Penyelidikan Level 2 (Energy Explorer) */}
        <div className="space-y-2 print-break-inside-avoid">
          <h3 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-1.5">
            <Layers className="w-4 h-4 text-blue-600" />
            1. Hasil Penyelidikan Konsep Energi & Etnosains (Level 2)
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed italic bg-slate-50 p-3 rounded-xl border border-slate-200">
            {studentNotesL2 || 'Siswa belum menambahkan catatan rangkuman di Level 2.'}
          </p>
        </div>

        {/* Section 2: Tabel Pengamatan Solar Lab Level 3 */}
        <div className="space-y-3 print-break-inside-avoid">
          <h3 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-1.5">
            <FlaskConical className="w-4 h-4 text-emerald-600" />
            2. Hasil Eksperimen Solar Lab (Q = I × A × t × η)
          </h3>

          {observationTable.length === 0 ? (
            <p className="text-xs text-slate-400 italic">Belum ada baris tabel pengamatan yang tersimpan.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-700">
                    <th className="p-2 border border-slate-200 font-bold">No</th>
                    <th className="p-2 border border-slate-200 font-bold">Label Percobaan</th>
                    <th className="p-2 border border-slate-200 font-bold">I (W/m²)</th>
                    <th className="p-2 border border-slate-200 font-bold">A (m²)</th>
                    <th className="p-2 border border-slate-200 font-bold">t (jam)</th>
                    <th className="p-2 border border-slate-200 font-bold">η (%)</th>
                    <th className="p-2 border border-slate-200 font-bold">Q (Joule)</th>
                    <th className="p-2 border border-slate-200 font-bold">Q (kWh)</th>
                    <th className="p-2 border border-slate-200 font-bold">Catatan Analisis</th>
                  </tr>
                </thead>
                <tbody>
                  {observationTable.map((rec, i) => (
                    <tr key={rec.id} className="border-b border-slate-200">
                      <td className="p-2 border border-slate-200 font-mono">{i + 1}</td>
                      <td className="p-2 border border-slate-200 font-medium">{rec.label}</td>
                      <td className="p-2 border border-slate-200 font-mono">{rec.intensity}</td>
                      <td className="p-2 border border-slate-200 font-mono">{rec.area}</td>
                      <td className="p-2 border border-slate-200 font-mono">{rec.durationHours}</td>
                      <td className="p-2 border border-slate-200 font-mono">{rec.efficiency}%</td>
                      <td className="p-2 border border-slate-200 font-mono text-emerald-800">{rec.energyJoules.toLocaleString('id-ID')}</td>
                      <td className="p-2 border border-slate-200 font-mono font-bold text-emerald-900">{rec.energyKWh}</td>
                      <td className="p-2 border border-slate-200 text-slate-600">{rec.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
            <strong className="block text-emerald-900">Simpulan Eksperimen Lab Siswa:</strong>
            <p className="italic">{labConclusion || 'Siswa belum merumuskan simpulan lab di Level 3.'}</p>
          </div>
        </div>

        {/* Section 3: Refleksi Sosiosaintifik Level 4 */}
        <div className="space-y-2 print-break-inside-avoid">
          <h3 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-1.5">
            <Trees className="w-4 h-4 text-teal-600" />
            3. Refleksi Isu Sosiosaintifik Karhutla & Bukti Ilmiah (Level 4)
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed italic bg-slate-50 p-3 rounded-xl border border-slate-200">
            {studentReflectionL4 || 'Siswa belum mengisi refleksi sosiosaintifik di Level 4.'}
          </p>
        </div>

        {/* Section 4: Lembar 8-Langkah Keputusan Berbasis Bukti Level 5 */}
        <div className="space-y-4 print-break-inside-avoid">
          <h3 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-1.5">
            <Scale className="w-4 h-4 text-purple-600" />
            4. Lembar Pengambilan Keputusan Berbasis Bukti (Level 5)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <strong className="text-slate-800 block">Langkah 1: Identifikasi Masalah Utama</strong>
              <p className="text-slate-600">{worksheet.problemIdentification || '(Belum diisi)'}</p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <strong className="text-slate-800 block">Langkah 2: Kriteria Keputusan yang Ditetapkan</strong>
              <div className="flex flex-wrap gap-1 pt-1">
                {worksheet.prioritizedCriteria.length === 0 ? (
                  <span className="text-slate-400 italic">Belum ada kriteria yang dipilih.</span>
                ) : (
                  worksheet.prioritizedCriteria.map((c) => (
                    <span key={c} className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-[10px] font-medium">
                      {c}
                    </span>
                  ))
                )}
              </div>
            </div>

            <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl space-y-1 md:col-span-2">
              <strong className="text-purple-900 block">Langkah 3 & 4: Alternatif Solusi yang Dipilih</strong>
              <span className="font-bold text-purple-950 text-sm">
                {chosenAltObj?.name || 'Metode B: Pengering Surya (Solar Dryer Dome)'}
              </span>
              <p className="text-slate-600 mt-1">{chosenAltObj?.shortDesc}</p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 md:col-span-2">
              <strong className="text-slate-800 block">Langkah 5: Bukti Data Angka yang Dikutip (Evidence Citations)</strong>
              {worksheet.citedEvidences.length === 0 ? (
                <span className="text-slate-400 italic">Belum ada bukti yang dicentang.</span>
              ) : (
                <ul className="list-disc pl-4 text-slate-700 space-y-0.5">
                  {worksheet.citedEvidences.map((e, idx) => (
                    <li key={idx}>{e}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 md:col-span-2">
              <strong className="text-slate-800 block">Langkah 6: Justifikasi & Penalaran Logis</strong>
              <p className="text-slate-700 leading-relaxed">{worksheet.detailedJustification || '(Belum diisi)'}</p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <strong className="text-slate-800 block">Langkah 7: Keterbatasan Solusi Pilihan</strong>
              <p className="text-slate-600">{worksheet.acknowledgedLimitations || '(Belum diisi)'}</p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <strong className="text-slate-800 block">Langkah 8: Data Tambahan yang Masih Diperlukan</strong>
              <p className="text-slate-600">{worksheet.additionalInformationNeeded || '(Belum diisi)'}</p>
            </div>
          </div>
        </div>

        {/* Section 5: Rubrik Pengambilan Keputusan Berbasis Bukti */}
        <div className="space-y-4 print-break-inside-avoid">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
            <div>
              <h3 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600" />
                5. Rubrik Analitik Pengambilan Keputusan Berbasis Bukti
              </h3>
              <p className="text-xs text-slate-500">
                Menilai kualitas proses berpikir: identifikasi masalah, kriteria, evaluasi alternatif, penggunaan bukti, justifikasi, dan keterbatasan (Skala 1 - 4).
              </p>
            </div>

            <div className="no-print flex items-center gap-2 text-xs">
              <span className="text-slate-500">Mode Penilai:</span>
              <button
                onClick={() => setEvaluatorRole('self')}
                className={`px-2.5 py-1 rounded-md font-semibold ${evaluatorRole === 'self' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                Asesmen Diri
              </button>
              <button
                onClick={() => setEvaluatorRole('teacher')}
                className={`px-2.5 py-1 rounded-md font-semibold ${evaluatorRole === 'teacher' ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                Guru Pengampu
              </button>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex justify-between items-center text-xs">
            <span className="font-bold text-amber-900">
              Total Skor Rubrik Keputusan ({evaluatorRole === 'self' ? 'Asesmen Mandiri Siswa' : 'Penilaian Guru'}):
            </span>
            <div className="font-mono text-base font-bold text-amber-900">
              {totalRubricScore} / {maxRubricScore} ({rubricPercentage}%)
            </div>
          </div>

          <div className="space-y-3">
            {DECISION_RUBRIC_ASPECTS.map((aspect) => {
              const currentScore = rubricScores[aspect.id] || 4;

              return (
                <div
                  key={aspect.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-bold text-slate-900">{aspect.aspectName}</span>
                    <span className="font-mono font-bold text-amber-700">Skor: {currentScore} / 4</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">{aspect.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1">
                    {aspect.levels.map((lvl) => {
                      const isSelected = currentScore === lvl.score;
                      return (
                        <div
                          key={lvl.score}
                          onClick={() => handleScoreChange(aspect.id, lvl.score)}
                          className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-amber-100 border-amber-400 font-medium text-amber-950 shadow-2xs'
                              : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-600'
                          }`}
                        >
                          <div className="font-bold text-[11px] mb-1">{lvl.label}</div>
                          <div className="text-[10px] leading-tight text-slate-600">{lvl.description}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Signature Line for Print */}
        <div className="pt-8 border-t border-slate-200 grid grid-cols-2 text-center text-xs text-slate-700 print-only">
          <div className="space-y-12">
            <div>Peserta Didik / Peneliti,</div>
            <div className="font-bold">({profile.name || '...................................................'})</div>
          </div>
          <div className="space-y-12">
            <div>Guru Pengampu Fisika,</div>
            <div className="font-bold">(...................................................)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
