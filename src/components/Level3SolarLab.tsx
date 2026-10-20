import React, { useState } from 'react';
import { ObservationRecord, SimulationParams } from '../types';
import {
  FlaskConical,
  Sun,
  Maximize2,
  Clock,
  Gauge,
  PlusCircle,
  Trash2,
  Info,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Download,
  RotateCcw
} from 'lucide-react';
import { sound } from '../utils/audio';

interface Props {
  onProceedToLevel4: () => void;
  observationTable: ObservationRecord[];
  onAddObservation: (record: ObservationRecord) => void;
  onDeleteObservation: (id: string) => void;
  onClearAllObservations: () => void;
  labConclusion: string;
  onUpdateConclusion: (val: string) => void;
}

export const Level3SolarLab: React.FC<Props> = ({
  onProceedToLevel4,
  observationTable,
  onAddObservation,
  onDeleteObservation,
  onClearAllObservations,
  labConclusion,
  onUpdateConclusion
}) => {
  const [params, setParams] = useState<SimulationParams>({
    intensity: 800, // W/m^2
    area: 2.0, // m^2
    durationHours: 4, // hours
    efficiency: 45 // %
  });

  const [trialLabel, setTrialLabel] = useState('Uji Coba Pengaruh Luas Kolektor (A)');
  const [trialNote, setTrialNote] = useState('');

  // Physics calculation
  // Q = I * A * t * eta
  // t in seconds = durationHours * 3600
  // eta as decimal = efficiency / 100
  const durationSeconds = params.durationHours * 3600;
  const etaDecimal = params.efficiency / 100;
  const energyJoules = params.intensity * params.area * durationSeconds * etaDecimal;
  const energyMegaJoules = energyJoules / 1000000;
  const energyKWh = energyJoules / 3600000;

  // Comparison points for graph
  const timePoints = [1, 2, 3, 4, 5, 6, 7, 8];
  const chartDataCurrent = timePoints.map((h) => {
    const sec = h * 3600;
    const j = params.intensity * params.area * sec * etaDecimal;
    return { hour: h, kwh: j / 3600000 };
  });

  // Reference curve: Traditional Sun Drying (efficiency ~20%)
  const chartDataTraditional = timePoints.map((h) => {
    const sec = h * 3600;
    const j = params.intensity * params.area * sec * 0.2;
    return { hour: h, kwh: j / 3600000 };
  });

  const handleSaveTrial = () => {
    const newRecord: ObservationRecord = {
      id: 'rec-' + Date.now(),
      trialNumber: observationTable.length + 1,
      label: trialLabel || `Percobaan ${observationTable.length + 1}`,
      intensity: params.intensity,
      area: params.area,
      durationHours: params.durationHours,
      efficiency: params.efficiency,
      energyJoules: Math.round(energyJoules),
      energyKWh: Number(energyKWh.toFixed(3)),
      note: trialNote || 'Variabel terkontrol'
    };
    onAddObservation(newRecord);
    setTrialNote('');
    sound.playExperiment();
  };

  const handleExportCSV = () => {
    if (observationTable.length === 0) return;
    const headers = ['No', 'Label', 'Intensitas (W/m2)', 'Luas A (m2)', 'Waktu t (jam)', 'Efisiensi (%)', 'Energi Q (Joule)', 'Energi Q (kWh)', 'Catatan'];
    const rows = observationTable.map((r) => [
      r.trialNumber,
      `"${r.label}"`,
      r.intensity,
      r.area,
      r.durationHours,
      r.efficiency,
      r.energyJoules,
      r.energyKWh,
      `"${r.note}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Tabel_Pengamatan_Solar_Lab_Palembang.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4 px-3 sm:px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-800 rounded">
              LEVEL 3
            </span>
            <h2 className="font-heading font-bold text-lg sm:text-xl text-slate-900">
              SOLAR LAB: SIMULASI ENERGI TERMAL SURYA
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Eksperimen virtual menghitung energi kalor berguna dengan model fisika: <span className="font-mono font-bold text-emerald-700">Q = I × A × t × η</span>
          </p>
        </div>

        <button
          onClick={onProceedToLevel4}
          className="self-start sm:self-auto px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5 transition-all cursor-pointer"
        >
          Lanjut ke Level 4: Misi Lingkungan <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Level 3 Challenge Card */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white p-4 rounded-2xl shadow-sm border border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-900 uppercase">
              Tantangan Level 3
            </span>
            <span className="text-emerald-300 font-bold text-xs sm:text-sm">
              Eksperimen Termal Solar Lab & Pengaruh Luas Kolektor (A)
            </span>
          </div>
          <p className="text-[11px] text-slate-300">
            Target Misi: Uji model kalor Q = I·A·t·η, simpan minimal 2 variasi parameter ke tabel pengamatan, dan simpulkan keterbatasan model Q.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 text-xs shrink-0 font-mono">
          <span className="text-amber-300">Reward Lencana:</span>
          <span className="font-bold text-white">Ahli Laboratorium Surya</span>
        </div>
      </div>

      {/* Physics Formula Explanation Box */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2 font-heading font-bold text-emerald-950 text-sm sm:text-base">
          <FlaskConical className="w-5 h-5 text-emerald-600" />
          Persamaan Energi Termal Surya Sederhana
        </div>

        <div className="p-3 bg-white rounded-xl border border-emerald-300 font-mono text-center text-sm sm:text-lg font-black text-emerald-800 tracking-wide shadow-2xs">
          Q = I × A × t × η
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs text-slate-700 pt-1">
          <div className="p-2.5 bg-white/80 rounded-lg border border-emerald-100">
            <strong className="text-emerald-800 block">Q (Energi Kalor):</strong>
            Energi termal berguna yang diserap. Satuan SI: <strong>Joule (J)</strong> atau <strong>kWh</strong>.
          </div>
          <div className="p-2.5 bg-white/80 rounded-lg border border-emerald-100">
            <strong className="text-emerald-800 block">I (Intensitas Radiasi):</strong>
            Daya radiasi surya per satuan luas. Satuan SI: <strong>W/m²</strong> (Joule/(s·m²)).
          </div>
          <div className="p-2.5 bg-white/80 rounded-lg border border-emerald-100">
            <strong className="text-emerald-800 block">A (Luas Kolektor):</strong>
            Luas permukaan penampang bidang penjemuran/kolektor. Satuan SI: <strong>m²</strong>.
          </div>
          <div className="p-2.5 bg-white/80 rounded-lg border border-emerald-100">
            <strong className="text-emerald-800 block">t (Waktu) & η (Efisiensi):</strong>
            Durasi penyinaran dalam detik (s) dan faktor efisiensi sistem tanpa satuan (0 s/d 1).
          </div>
        </div>
      </div>

      {/* CRITICAL PEDAGOGICAL BOUNDARY WARNING BOX */}
      <div className="bg-amber-50 border-l-4 border-amber-500 rounded-xl p-4 text-xs text-amber-900 space-y-1.5 shadow-xs">
        <div className="flex items-center gap-2 font-bold text-amber-800 text-xs sm:text-sm">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          Peringatan Batasan Model Fisika Kalor:
        </div>
        <p className="leading-relaxed">
          Tegaskan dalam ingatan Anda: <strong>Model energi matematis Q = I × A × t × η ini TIDAK secara langsung memprediksi waktu tuntas pengeringan kemplang!</strong> Pengeringan pangan adalah proses gabungan perpindahan kalor dan massa yang rumit, dipengaruhi oleh kelembaban udara sekitar (RH), laju konveksi aliran udara pembawa uap, ketebalan pori kemplang, dan kalor laten penguapan air (<span className="font-mono">Lv ≈ 2,26 × 10⁶ J/kg</span>).
        </p>
      </div>

      {/* Interactive Simulation Controls & Visual Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Controls Sliders */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-slate-900 text-sm flex items-center gap-2">
              <Gauge className="w-4 h-4 text-emerald-600" />
              Parameter Variabel Eksperimen
            </h3>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
              Variabel Kontrol
            </span>
          </div>

          {/* Controlled Variable Experiment Quick Presets */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
            <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">
              🔬 Panduan Variasi Satu Variabel (Kontrol Eksperimen):
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setParams({ intensity: 800, area: 4.0, durationHours: 4, efficiency: 45 });
                  setTrialLabel('Uji Variabel Bebas: Luas Kolektor A = 4 m² (I, t, η tetap)');
                  setTrialNote('I=800 W/m², t=4 jam, η=45% konstan. Menguji kenaikan energi saat A diperbesar.');
                }}
                className="text-left p-2 rounded-lg bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 transition-colors flex items-center justify-between"
              >
                <div>
                  <strong className="text-emerald-800 text-[11px] block">1. Variasikan Luas (A)</strong>
                  <span className="text-[10px] text-slate-500">I, t, η dipertahankan konstan (A dinaikkan ke 4 m²)</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">Set</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setParams({ intensity: 800, area: 2.0, durationHours: 4, efficiency: 60 });
                  setTrialLabel('Uji Variabel Bebas: Efisiensi η = 60% (I, A, t tetap)');
                  setTrialNote('I=800 W/m², A=2 m², t=4 jam konstan. Membandingkan solar dome efisiensi tinggi vs terbuka.');
                }}
                className="text-left p-2 rounded-lg bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 transition-colors flex items-center justify-between"
              >
                <div>
                  <strong className="text-emerald-800 text-[11px] block">2. Variasikan Efisiensi (η)</strong>
                  <span className="text-[10px] text-slate-500">I, A, t dipertahankan konstan (η diuji 60% vs 20%)</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">Set</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setParams({ intensity: 480, area: 2.0, durationHours: 4, efficiency: 45 });
                  setTrialLabel('Uji Variabel Bebas: Intensitas I = 480 W/m² (Kondisi Kabut Asap)');
                  setTrialNote('A=2 m², t=4 jam, η=45% konstan. Mengamati penurunan drastis Q saat kabut asap tebal.');
                }}
                className="text-left p-2 rounded-lg bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-slate-700 transition-colors flex items-center justify-between"
              >
                <div>
                  <strong className="text-amber-800 text-[11px] block">3. Variasikan Radiasi (I: Kabut Asap)</strong>
                  <span className="text-[10px] text-slate-500">A, t, η dipertahankan konstan (I turun ke 480 W/m²)</span>
                </div>
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">Set</span>
              </button>
            </div>
          </div>

          {/* Slider 1: Intensity I */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-500" /> Intensitas Radiasi (I)
              </span>
              <span className="font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {params.intensity} W/m²
              </span>
            </div>
            <input
              type="range"
              min={400}
              max={1000}
              step={20}
              value={params.intensity}
              onChange={(e) => setParams({ ...params, intensity: Number(e.target.value) })}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>400 W/m² (Mendung/Asap)</span>
              <span>1000 W/m² (Terik Puncak)</span>
            </div>
          </div>

          {/* Slider 2: Area A */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-blue-500" /> Luas Kolektor / Rak (A)
              </span>
              <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {params.area.toFixed(1)} m²
              </span>
            </div>
            <input
              type="range"
              min={0.5}
              max={10.0}
              step={0.5}
              value={params.area}
              onChange={(e) => setParams({ ...params, area: Number(e.target.value) })}
              className="w-full accent-blue-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0,5 m² (Rak Kecil)</span>
              <span>10,0 m² (Dome Komunal)</span>
            </div>
          </div>

          {/* Slider 3: Duration t */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-500" /> Durasi Penyinaran (t)
              </span>
              <span className="font-mono font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                {params.durationHours} Jam ({params.durationHours * 3600} Detik)
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={8}
              step={0.5}
              value={params.durationHours}
              onChange={(e) => setParams({ ...params, durationHours: Number(e.target.value) })}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>1 Jam (3.600 s)</span>
              <span>8 Jam (28.800 s)</span>
            </div>
          </div>

          {/* Slider 4: Efficiency eta */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> Efisiensi Sistem (η)
              </span>
              <span className="font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {params.efficiency}% (η = {(params.efficiency / 100).toFixed(2)})
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={80}
              step={5}
              value={params.efficiency}
              onChange={(e) => setParams({ ...params, efficiency: Number(e.target.value) })}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>20% (Jemur Terbuka)</span>
              <span>55% (Solar Dome Tertutup)</span>
            </div>
          </div>

          {/* Save to table form */}
          <div className="pt-3 border-t border-slate-200 space-y-2.5">
            <label className="block text-xs font-semibold text-slate-700">
              Simpan Data Percobaan ke Tabel:
            </label>
            <input
              type="text"
              value={trialLabel}
              onChange={(e) => setTrialLabel(e.target.value)}
              placeholder="Label Percobaan (cth: Variasi A = 4 m²)"
              className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <input
              type="text"
              value={trialNote}
              onChange={(e) => setTrialNote(e.target.value)}
              placeholder="Catatan analisis variabel..."
              className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <button
              onClick={handleSaveTrial}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow flex items-center justify-center gap-1.5 transition-colors"
            >
              <PlusCircle className="w-4 h-4" /> Simpan ke Tabel Pengamatan
            </button>
          </div>
        </div>

        {/* Right: Real-time Simulation Output & Visual Gauge */}
        <div className="lg:col-span-7 space-y-5">
          {/* Result Scoreboard */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-2xl shadow-md border border-slate-700 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-700 pb-3">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Hasil Perhitungan Energi Termal (Q)
              </span>
              <span className="text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">
                Real-Time Compute
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="text-[10px] text-slate-400 block uppercase">Dalam Joule (SI)</span>
                <div className="font-mono font-bold text-emerald-400 text-base sm:text-lg truncate">
                  {Math.round(energyJoules).toLocaleString('id-ID')} J
                </div>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="text-[10px] text-slate-400 block uppercase">Dalam MegaJoule</span>
                <div className="font-mono font-bold text-amber-400 text-base sm:text-lg">
                  {energyMegaJoules.toFixed(2)} MJ
                </div>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="text-[10px] text-slate-400 block uppercase">Dalam kWh</span>
                <div className="font-mono font-bold text-sky-400 text-base sm:text-lg">
                  {energyKWh.toFixed(3)} kWh
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-800/50 rounded-xl text-xs font-mono text-slate-300 leading-relaxed border border-slate-700/60">
              Q = ({params.intensity} W/m²) × ({params.area} m²) × ({params.durationHours * 3600} s) × {(params.efficiency / 100).toFixed(2)}
              <br />
              <span className="text-emerald-400 font-bold">
                Q = {Math.round(energyJoules).toLocaleString('id-ID')} Joule ({energyKWh.toFixed(3)} kWh)
              </span>
            </div>
          </div>

          {/* Interactive Comparison Graph: Q vs Time for Current vs Traditional */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-800">
                  Grafik Akumulasi Energi (kWh) terhadap Waktu Penyinaran (t)
                </h4>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full inline-block" /> Sistem Aktif (η = {params.efficiency}%)
                </span>
                <span className="flex items-center gap-1 text-slate-500">
                  <span className="w-2.5 h-2.5 bg-slate-400 rounded-full inline-block" /> Tradisional (η = 20%)
                </span>
              </div>
            </div>

            <div className="w-full">
              <svg viewBox="0 0 500 200" className="w-full h-auto max-h-[220px]">
                {/* Horizontal axes */}
                {[0, 2, 4, 6, 8, 10].map((v) => {
                  const y = 170 - (v / 10) * 140;
                  return (
                    <g key={v}>
                      <line x1="40" y1={y} x2="480" y2={y} stroke="#f1f5f9" strokeDasharray="2 2" />
                      <text x="32" y={y + 3} textAnchor="end" fontSize="9" fill="#94a3b8">
                        {v} kWh
                      </text>
                    </g>
                  );
                })}

                {/* X labels (Hours) */}
                {timePoints.map((h, idx) => {
                  const x = 50 + idx * 55;
                  return (
                    <text key={h} x={x} y="190" textAnchor="middle" fontSize="9" fill="#64748b">
                      {h} Jam
                    </text>
                  );
                })}

                {/* Traditional Line (Gray) */}
                <path
                  d={`M ${chartDataTraditional.map((p, i) => `${50 + i * 55},${Math.max(30, 170 - (p.kwh / 10) * 140)}`).join(' L ')}`}
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                />

                {/* Current Simulation Line (Emerald) */}
                <path
                  d={`M ${chartDataCurrent.map((p, i) => `${50 + i * 55},${Math.max(30, 170 - (p.kwh / 10) * 140)}`).join(' L ')}`}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                />

                {/* Current parameter marker */}
                {chartDataCurrent.map((p, i) => {
                  const x = 50 + i * 55;
                  const y = Math.max(30, 170 - (p.kwh / 10) * 140);
                  const isCurrentHour = p.hour === Math.round(params.durationHours);
                  return (
                    <circle
                      key={p.hour}
                      cx={x}
                      cy={y}
                      r={isCurrentHour ? 5.5 : 3.5}
                      fill={isCurrentHour ? '#059669' : '#10b981'}
                      stroke={isCurrentHour ? '#ffffff' : 'none'}
                      strokeWidth="1.5"
                    />
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Observation Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-heading font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-emerald-600" />
              Tabel Pengamatan Eksperimen Fisika
            </h3>
            <p className="text-xs text-slate-500">
              Bandingkan hasil ketika satu variabel diubah dan variabel lain dipertahankan konstan (Metode Variabel Kontrol).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onClearAllObservations}
              disabled={observationTable.length === 0}
              className="px-3 py-1.5 border border-red-200 text-red-700 hover:bg-red-50 rounded-lg text-xs font-semibold disabled:opacity-40 flex items-center gap-1.5 transition-colors"
              title="Bersihkan semua data pengamatan untuk mengulang eksperimen"
            >
              <RotateCcw className="w-3.5 h-3.5 text-red-500" /> Reset Tabel Lab
            </button>

            <button
              onClick={handleExportCSV}
              disabled={observationTable.length === 0}
              className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Ekspor CSV
            </button>
          </div>
        </div>

        {observationTable.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl text-xs text-slate-400">
            Belum ada data pengamatan yang disimpan. Silakan atur slider parameter dan klik tombol "Simpan ke Tabel Pengamatan".
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                  <th className="p-2.5 font-bold">No</th>
                  <th className="p-2.5 font-bold">Label / Fokus Uji</th>
                  <th className="p-2.5 font-bold">I (W/m²)</th>
                  <th className="p-2.5 font-bold">A (m²)</th>
                  <th className="p-2.5 font-bold">t (jam)</th>
                  <th className="p-2.5 font-bold">η (%)</th>
                  <th className="p-2.5 font-bold">Q (Joule)</th>
                  <th className="p-2.5 font-bold">Q (kWh)</th>
                  <th className="p-2.5 font-bold">Catatan Analisis</th>
                  <th className="p-2.5 font-bold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {observationTable.map((rec, idx) => (
                  <tr key={rec.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-2.5 font-mono text-slate-500">{idx + 1}</td>
                    <td className="p-2.5 font-semibold text-slate-800">{rec.label}</td>
                    <td className="p-2.5 font-mono">{rec.intensity}</td>
                    <td className="p-2.5 font-mono">{rec.area}</td>
                    <td className="p-2.5 font-mono">{rec.durationHours}</td>
                    <td className="p-2.5 font-mono">{rec.efficiency}%</td>
                    <td className="p-2.5 font-mono text-emerald-700">{rec.energyJoules.toLocaleString('id-ID')}</td>
                    <td className="p-2.5 font-mono font-bold text-emerald-800">{rec.energyKWh}</td>
                    <td className="p-2.5 text-slate-600 max-w-xs">{rec.note}</td>
                    <td className="p-2.5 text-center">
                      <button
                        onClick={() => onDeleteObservation(rec.id)}
                        className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                        title="Hapus baris"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Refleksi & Simpulan Siswa */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
          Simpulan Ilmiah Siswa (Level 3):
        </label>
        <p className="text-xs text-slate-500">
          Jelaskan bagaimana pengaruh luas penampang kolektor (A) dan efisiensi (η) terhadap energi panas yang diserap (Q) berdasarkan data tabel di atas, serta kemukakan mengapa rumus Q tidak langsung menentukan waktu tuntas pengeringan kemplang:
        </p>
        <textarea
          rows={3}
          value={labConclusion}
          onChange={(e) => onUpdateConclusion(e.target.value)}
          placeholder="Tuliskan simpulan eksperimen Anda... (Contoh: Ketika luas kolektor A dinaikkan 2 kali lipat dari 2 m² menjadi 4 m² dengan variabel lain konstan, energi Q meningkat 2 kali lipat secara proporsional linear. Namun waktu pengeringan kemplang tetap bergantung pada aliran udara konveksi dan penguapan air...)"
          className="w-full p-3 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
        />

        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-100">
          <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Tabel data & simpulan matematis tersimpan otomatis ke laporan E-LKPD.
          </span>
          <button
            onClick={onProceedToLevel4}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>Selesaikan Level 3 & Buka Level 4: Misi Lingkungan Karhutla</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
