import React, { useState } from 'react';
import { DRYING_ALTERNATIVES } from '../data/etnosainsData';
import { DecisionWorksheet } from '../types';
import {
  Scale,
  CheckCircle2,
  FileSpreadsheet,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Info,
  Layers,
  Sparkles,
  Zap,
  DollarSign,
  CloudSun,
  ShieldAlert,
  RotateCcw
} from 'lucide-react';
import { sound } from '../utils/audio';

interface Props {
  worksheet: DecisionWorksheet;
  onUpdateWorksheet: (ws: DecisionWorksheet) => void;
  onProceedToAssessment: () => void;
}

export const Level5DecisionChallenge: React.FC<Props> = ({
  worksheet,
  onUpdateWorksheet,
  onProceedToAssessment
}) => {
  const [activeTab, setActiveTab] = useState<'case' | 'matrix' | 'workspace'>('case');
  const [selectedAltForEvidence, setSelectedAltForEvidence] = useState<string>('alt-solar-dryer');

  // Predefined criteria list for students to select/rank
  const availableCriteria = [
    'Biaya Investasi Awal (Capex)',
    'Biaya Operasional Bulanan Listrik/Energi (Opex)',
    'Keandalan saat Cuaca Hujan & Musim Kabut Asap',
    'Higienitas Pangan & Bebas Kontaminasi Debu/Lalat/PM2.5',
    'Kesesuaian Daya Listrik Rumah Tangga (1300 VA)',
    'Kapasitas & Kecepatan Produksi Kemplang',
    'Jejak Emisi Karbon Lingkungan (CO₂)'
  ];

  const handleToggleCriterion = (crit: string) => {
    let nextList = [...worksheet.prioritizedCriteria];
    if (nextList.includes(crit)) {
      nextList = nextList.filter((c) => c !== crit);
    } else {
      nextList.push(crit);
    }
    onUpdateWorksheet({ ...worksheet, prioritizedCriteria: nextList });
    sound.playClick();
  };

  const handleSelectAlternative = (altId: string) => {
    onUpdateWorksheet({ ...worksheet, chosenAlternative: altId });
    sound.playSuccess();
  };

  const handleToggleEvidenceCitation = (evidenceText: string) => {
    let nextList = [...worksheet.citedEvidences];
    if (nextList.includes(evidenceText)) {
      nextList = nextList.filter((e) => e !== evidenceText);
    } else {
      nextList.push(evidenceText);
    }
    onUpdateWorksheet({ ...worksheet, citedEvidences: nextList });
    sound.playClick();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4 px-3 sm:px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-bold bg-purple-100 text-purple-800 rounded">
              LEVEL 5
            </span>
            <h2 className="font-heading font-bold text-lg sm:text-xl text-slate-900">
              EVIDENCE-BASED DECISION CHALLENGE
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Membantu Pengrajin Kemplang Palembang memilih metode pengeringan melalui 8 langkah penalaran berbasis bukti.
          </p>
        </div>

        <button
          onClick={onProceedToAssessment}
          className="self-start sm:self-auto px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5 transition-all cursor-pointer"
        >
          Lanjut ke Tes Literasi Energi <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Level 5 Challenge Card */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-950 text-white p-4 rounded-2xl shadow-sm border border-purple-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-900 uppercase">
              Tantangan Level 5
            </span>
            <span className="text-purple-300 font-bold text-xs sm:text-sm">
              Master Keputusan Bukti Ilmiah UMKM Palembang
            </span>
          </div>
          <p className="text-[11px] text-slate-300">
            Target Misi: Selesaikan 8 tahapan penalaran keputusan Ibu Salmah, bandingkan data matriks, kutip bukti riil, dan simpan justifikasi akhir.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 text-xs shrink-0 font-mono">
          <span className="text-amber-300">Reward Lencana:</span>
          <span className="font-bold text-white">Master Keputusan Ilmiah</span>
        </div>
      </div>

      {/* NO SINGLE CORRECT ANSWER DISCLAIMER */}
      <div className="bg-purple-50 border-l-4 border-purple-500 rounded-2xl p-4 text-xs text-purple-950 space-y-1.5 shadow-xs">
        <div className="flex items-center gap-2 font-bold text-purple-900 text-xs sm:text-sm">
          <Info className="w-4 h-4 text-purple-600 shrink-0" />
          Prinsip Penilaian: Tidak Ada Satu Solusi Tunggal yang Selalu Benar!
        </div>
        <p className="leading-relaxed">
          Dalam pengambilan keputusan berbasis bukti dunia nyata, <strong>tidak ada satu alternatif yang secara mutlak merupakan satu-satunya jawaban benar untuk semua situasi</strong>. Penilaian tidak didasarkan pada alternatif mana yang Anda pilih, melainkan pada <strong>kualitas argumen, ketepatan mengutip bukti kuantitatif dari tabel, kejelasan kompromi (trade-offs), dan pengakuan atas keterbatasan keputusan Anda</strong>.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-1 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'case', label: '1. Studi Kasus UMKM', icon: <AlertCircle className="w-4 h-4" /> },
          { id: 'matrix', label: '2. Matriks Komparasi 3 Alternatif', icon: <FileSpreadsheet className="w-4 h-4" /> },
          { id: 'workspace', label: '3. Lembar Kerja 8 Langkah Keputusan', icon: <Scale className="w-4 h-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-purple-50 text-purple-700 border border-purple-200'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Case Description */}
      {activeTab === 'case' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 animate-in fade-in">
          <div className="flex items-center gap-2 text-purple-700 font-bold text-base">
            <AlertCircle className="w-5 h-5 text-purple-600" />
            Kasus Nyata: Dilema UMKM Kemplang "Berkah Musi" Seberang Ulu
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
            <p>
              Ibu Salmah adalah ketua kelompok pengrajin kemplang rumahan di kawasan Seberang Ulu, Palembang. Usaha ini mempekerjakan 4 orang ibu rumah tangga dengan rata-rata kapasitas produksi <strong>50 kg adonan basah per hari</strong>.
            </p>
            <p>
              Selama ini, Ibu Salmah mengeringkan kemplang dengan <strong>penjemuran tradisional di atas rak bambu di pinggir jalan</strong>. Namun dalam setahun terakhir, muncul kendala serius:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Musim Kabut Asap Karhutla:</strong> Partikulat jelaga debu hitam (<span className="font-mono">PM2.5</span>) menempel pada kemplang basah, sehingga warna kemplang menjadi kusam dan ditolak oleh toko oleh-oleh khas Palembang.</li>
              <li><strong>Hujan Mendadak:</strong> Saat musim penghujan, kemplang membusuk dan berjamur karena terlambat kering, menimbulkan kerugian rata-rata Rp 1.200.000 per bulan.</li>
              <li><strong>Kondisi Khusus Pengguna:</strong> Ibu Salmah memiliki modal tabungan usaha maksimal <strong>Rp 6.000.000</strong>. Daya listrik rumahnya adalah <strong>1.300 VA</strong> (tidak dapat menyalakan alat bertenaga tinggi &gt;1.500 Watt tanpa memutus saklar MCB listrik).</li>
            </ul>
            <p className="font-semibold text-slate-800 pt-1">
              Tugas Anda: Bantu Ibu Salmah mengevaluasi data ketiga alternatif metode pengeringan dan rumuskan keputusan berbasis bukti terbaik untuk kelompoknya!
            </p>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setActiveTab('matrix')}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold shadow flex items-center gap-1.5"
            >
              Lihat Matriks Data Pembanding <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Comparative Matrix of 3 Alternatives */}
      {activeTab === 'matrix' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">Status Data:</span>
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-medium">
                [Data Terverifikasi Tarif PLN 2026 & BMKG]
              </span>
              <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded text-[11px] font-medium">
                [Data Hipotetis Hasil Rekayasa Uji Pengering Pangan]
              </span>
            </div>
            <span className="text-slate-400 hidden sm:inline text-[11px]">
              Gunakan angka di bawah sebagai kutipan bukti di Lembar Kerja
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DRYING_ALTERNATIVES.map((alt) => (
              <div
                key={alt.id}
                className={`bg-white rounded-2xl border p-5 shadow-xs flex flex-col justify-between transition-all ${
                  worksheet.chosenAlternative === alt.id
                    ? 'border-purple-500 ring-2 ring-purple-200'
                    : 'border-slate-200 hover:border-purple-300'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                      {alt.category}
                    </span>
                    {worksheet.chosenAlternative === alt.id && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Pilihan Anda
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading font-bold text-slate-900 text-sm leading-snug">
                    {alt.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {alt.shortDesc}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                    <div className="flex justify-between items-center py-1 border-b border-slate-100">
                      <span className="text-slate-500 flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> Biaya Awal (Capex):
                      </span>
                      <span className="font-mono font-bold text-slate-800">
                        Rp {alt.capex.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-slate-100">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-amber-600" /> Biaya Operasional / Bln:
                      </span>
                      <span className="font-mono font-bold text-slate-800">
                        Rp {alt.opexPerMonth.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-slate-100">
                      <span className="text-slate-500 flex items-center gap-1">
                        <CloudSun className="w-3.5 h-3.5 text-blue-600" /> Ketergantungan Cuaca:
                      </span>
                      <span className="font-semibold text-slate-800">
                        {alt.weatherDependency}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-slate-100">
                      <span className="text-slate-500">Kapasitas Harian:</span>
                      <span className="font-mono font-bold text-slate-800">
                        {alt.capacityPerDayKg} kg / hari
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-slate-100">
                      <span className="text-slate-500">Emisi CO₂ Operasional:</span>
                      <span className="font-mono font-bold text-slate-800">
                        {alt.co2PerMonthKg} kg / bulan
                      </span>
                    </div>

                    <div className="py-1">
                      <span className="text-slate-500 block mb-0.5">Standar Higienitas:</span>
                      <span className="font-medium text-slate-700 text-[11px] block">
                        {alt.hygieneLevel}
                      </span>
                    </div>

                    <div className="py-1">
                      <span className="text-slate-500 block mb-0.5">Kesesuaian Pengguna:</span>
                      <span className="text-slate-600 text-[11px] block">
                        {alt.userSuitability}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                      Kelebihan Utama:
                    </span>
                    <ul className="text-[11px] text-slate-600 space-y-1 pl-4 list-disc">
                      {alt.advantages.map((adv, i) => (
                        <li key={i}>{adv}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 block">
                      Keterbatasan & Risiko:
                    </span>
                    <ul className="text-[11px] text-slate-600 space-y-1 pl-4 list-disc">
                      {alt.limitations.map((lim, i) => (
                        <li key={i}>{lim}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100">
                  <button
                    onClick={() => {
                      handleSelectAlternative(alt.id);
                      setActiveTab('workspace');
                    }}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                      worksheet.chosenAlternative === alt.id
                        ? 'bg-purple-600 text-white shadow'
                        : 'bg-slate-100 hover:bg-purple-50 text-purple-700 border border-slate-200'
                    }`}
                  >
                    {worksheet.chosenAlternative === alt.id
                      ? '✓ Alternatif Ini Terpilih'
                      : 'Pilih & Mulai Lembar Kerja'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: 8-Step Evidence-Based Decision Workspace */}
      {activeTab === 'workspace' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6 animate-in fade-in">
          <div>
            <h3 className="font-heading font-bold text-slate-900 text-base flex items-center gap-2">
              <Scale className="w-5 h-5 text-purple-600" />
              Lembar Kerja 8 Langkah Pengambilan Keputusan Berbasis Bukti
            </h3>
            <p className="text-xs text-slate-500">
              Lengkapi setiap bagian dengan mengutip bukti data spesifik dari matriks komparasi.
            </p>
          </div>

          <div className="space-y-5 text-xs">
            {/* Step 1: Identifikasi Masalah */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">1</span>
                Identifikasi Masalah Nyata UMKM
              </div>
              <p className="text-slate-500">
                Apa saja akar masalah utama yang dihadapi Ibu Salmah terkait cuaca, kualitas produk kemplang, batas modal, dan daya listrik rumahnya?
              </p>
              <textarea
                rows={3}
                value={worksheet.problemIdentification}
                onChange={(e) =>
                  onUpdateWorksheet({ ...worksheet, problemIdentification: e.target.value })
                }
                placeholder="Tuliskan identifikasi masalah Anda... (Contoh: Ibu Salmah menghadapi masalah kemplang berjamur saat hujan dan terkena debu jelaga PM2.5 saat musim kabut asap, sementara modal yang tersedia hanya Rp 6.000.000 dan daya listrik rumah tangga terbatas pada 1.300 VA...)"
                className="w-full p-2.5 border border-slate-300 rounded-lg text-xs outline-none focus:ring-1 focus:ring-purple-500 bg-white"
              />
            </div>

            {/* Step 2: Menentukan Kriteria Keputusan */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">2</span>
                Penentuan Kriteria Keputusan & Prioritas
              </div>
              <p className="text-slate-500">
                Pilihlah kriteria pertimbangan yang menurut Anda paling penting bagi situasi Ibu Salmah:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {availableCriteria.map((crit) => {
                  const isChecked = worksheet.prioritizedCriteria.includes(crit);
                  return (
                    <button
                      key={crit}
                      type="button"
                      onClick={() => handleToggleCriterion(crit)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        isChecked
                          ? 'bg-purple-600 text-white border-purple-600 shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {isChecked ? '✓ ' : '+ '} {crit}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Memilih Solusi Alternatif */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">3 & 4</span>
                Memilih Alternatif Solusi Terbaik
              </div>
              <p className="text-slate-500">
                Pilih metode pengeringan yang Anda tetapkan sebagai rekomendasi solusi bagi UMKM Ibu Salmah:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                {DRYING_ALTERNATIVES.map((alt) => (
                  <button
                    key={alt.id}
                    type="button"
                    onClick={() => handleSelectAlternative(alt.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      worksheet.chosenAlternative === alt.id
                        ? 'bg-purple-100/70 border-purple-500 font-bold text-purple-900 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-[10px] text-purple-700 uppercase">{alt.category}</div>
                    <div className="text-xs font-semibold mt-0.5">{alt.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Mengutip Bukti Spesifik (Evidence Citation) */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">5</span>
                Kutipan Bukti Data Konkret (Evidence Citation)
              </div>
              <p className="text-slate-500">
                Pilihlah atau cantumkan bukti data angka dari matriks yang memperkuat alasan pilihan Anda:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {[
                  'Biaya Capex Solar Dome Rp 5.500.000 berada di bawah batas anggaran tabungan Rp 6.000.000.',
                  'Biaya Capex Oven Listrik Rp 7.500.000 melebihi anggaran tabungan (defisit Rp 1.500.000).',
                  'Daya 2.000 Watt oven listrik melebihi batas saklar MCB 1.300 VA (pasti anjlok).',
                  'Biaya operasional oven listrik Rp 520.000/bln memberatkan kas bulanan UMKM mikro.',
                  'Solar Dome menghasilkan nol emisi CO2 operasional (0 kg/bln) dibanding oven listrik (306 kg CO2/bln).',
                  'Suhu dalam Solar Dome naik 10-20°C lebih tinggi dari suhu luar, mempercepat pengeringan jadi 6-8 jam.',
                  'Penjemuran tradisional memiliki opex Rp 0 tetapi risiko kehilangan bahan Rp 1.200.000 saat hujan.',
                  'Ruang tertutup Solar Dome menyaring jelaga PM2.5 saat bencana kabut asap karhutla berlangsung.'
                ].map((evid) => {
                  const isChecked = worksheet.citedEvidences.includes(evid);
                  return (
                    <label
                      key={evid}
                      onClick={() => handleToggleEvidenceCitation(evid)}
                      className={`flex items-start gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-purple-100/80 border-purple-400 font-medium text-purple-950'
                          : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 text-purple-600 rounded"
                      />
                      <span className="text-[11px] leading-relaxed">{evid}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Step 6: Justifikasi Alasan Logis */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">6</span>
                Penjelasan Alasan Komprehensif (Justifikasi Logis)
              </div>
              <p className="text-slate-500">
                Susunlah paragraf argumentasi mengapa pilihan Anda adalah keputusan yang paling rasional dengan menghubungkan kriteria, kondisi UMKM, dan bukti data angka yang telah dikutip:
              </p>
              <textarea
                rows={4}
                value={worksheet.detailedJustification}
                onChange={(e) =>
                  onUpdateWorksheet({ ...worksheet, detailedJustification: e.target.value })
                }
                placeholder="Tuliskan justifikasi Anda di sini... (Jelaskan alur penalaran Anda yang menghubungkan data biaya, cuaca, daya listrik, dan higienitas pangan...)"
                className="w-full p-2.5 border border-slate-300 rounded-lg text-xs outline-none focus:ring-1 focus:ring-purple-500 bg-white"
              />
            </div>

            {/* Step 7: Mengakui Keterbatasan Keputusan */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">7</span>
                Pengakuan Keterbatasan & Trade-Offs (Konsekuensi)
              </div>
              <p className="text-slate-500">
                Tidak ada solusi yang sempurna. Apa saja kelemahan atau risiko dari teknologi/metode yang Anda pilih bagi Ibu Salmah?
              </p>
              <textarea
                rows={2}
                value={worksheet.acknowledgedLimitations}
                onChange={(e) =>
                  onUpdateWorksheet({ ...worksheet, acknowledgedLimitations: e.target.value })
                }
                placeholder="Tuliskan keterbatasan solusi pilihan Anda... (Contoh: Jika memilih Solar Dryer Dome, kelemahannya membutuhkan lahan bebas bayangan pohon seluas 3x4 m dan laju pengeringan tetap melambat jika langit mendung gelap sepanjang hari...)"
                className="w-full p-2.5 border border-slate-300 rounded-lg text-xs outline-none focus:ring-1 focus:ring-purple-500 bg-white"
              />
            </div>

            {/* Step 8: Informasi Tambahan yang Dibutuhkan */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">8</span>
                Informasi & Data Tambahan yang Masih Dibutuhkan
              </div>
              <p className="text-slate-500">
                Sebagai pengambil keputusan yang cermat, data lanjutan apa lagi yang perlu diselidiki di lapangan sebelum pembelian dilakukan?
              </p>
              <textarea
                rows={2}
                value={worksheet.additionalInformationNeeded}
                onChange={(e) =>
                  onUpdateWorksheet({ ...worksheet, additionalInformationNeeded: e.target.value })
                }
                placeholder="Tuliskan kebutuhan data tambahan... (Contoh: Mengetahui kepastian ketersediaan lahan terbuka di pekarangan rumah Ibu Salmah, mencari informasi program hibah teknologi tepat guna dari Dinas Koperasi Sumsel, atau garansi masa pakai polikarbonat UV...)"
                className="w-full p-2.5 border border-slate-300 rounded-lg text-xs outline-none focus:ring-1 focus:ring-purple-500 bg-white"
              />
            </div>
          </div>

          {/* Live Decision Synthesis Preview Card */}
          <div className="p-4 bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50 rounded-2xl border border-purple-200 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-purple-900 text-sm">
              <Sparkles className="w-4 h-4 text-purple-600" />
              Pratinjau Sintesis Rekomendasi Keputusan Siswa:
            </div>
            <p className="text-slate-600 leading-relaxed">
              <strong>Rekomendasi Terpilih:</strong> <span className="font-semibold text-purple-950">{DRYING_ALTERNATIVES.find(a => a.id === worksheet.chosenAlternative)?.name || 'Belum dipilih'}</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px] text-slate-700">
              <div className="bg-white/80 p-2.5 rounded-lg border border-purple-100">
                <span className="font-bold text-purple-800 block">Kriteria yang Diprioritaskan:</span>
                <span>{worksheet.prioritizedCriteria.join(', ') || 'Belum dipilih'}</span>
              </div>
              <div className="bg-white/80 p-2.5 rounded-lg border border-purple-100">
                <span className="font-bold text-purple-800 block">Jumlah Bukti Numerik Terkutip:</span>
                <span>{worksheet.citedEvidences.length} Butir Bukti Data Matriks</span>
              </div>
            </div>
            <div className="p-2.5 bg-white/90 rounded-lg border border-purple-100 text-[11px] text-slate-700 italic">
              "{worksheet.detailedJustification || 'Tuliskan justifikasi penalaran Anda di Langkah 6...'}"
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Kosongkan lembar kerja keputusan untuk pengerjaan ulang?')) {
                  onUpdateWorksheet({
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
                }
              }}
              className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-purple-600" /> Reset Lembar Keputusan
            </button>

            <button
              onClick={() => {
                onUpdateWorksheet({ ...worksheet, isCompleted: true });
                onProceedToAssessment();
              }}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" /> Simpan Keputusan & Lanjut ke Tes Literasi Energi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
