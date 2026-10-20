import React, { useState } from 'react';
import {
  BookOpen,
  Sun,
  Flame,
  ArrowRight,
  TrendingUp,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Zap,
  Droplets,
  Layers,
  Video
} from 'lucide-react';
import { EducationalVideoHub } from './EducationalVideoHub';

interface Props {
  onProceedToLevel3: () => void;
  studentNotes: string;
  onUpdateNotes: (notes: string) => void;
}

export const Level2Explorer: React.FC<Props> = ({
  onProceedToLevel3,
  studentNotes,
  onUpdateNotes
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'konsep' | 'etnosains' | 'grafik' | 'aktivitas' | 'video'>('konsep');

  // Quiz state for interactive interpretation activity
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const hourlySolarData = [
    { hour: '07:00', normal: 220, haze: 110 },
    { hour: '08:00', normal: 430, haze: 220 },
    { hour: '09:00', normal: 610, haze: 340 },
    { hour: '10:00', normal: 780, haze: 450 },
    { hour: '11:00', normal: 890, haze: 520 },
    { hour: '12:00', normal: 940, haze: 550 },
    { hour: '13:00', normal: 910, haze: 530 },
    { hour: '14:00', normal: 790, haze: 460 },
    { hour: '15:00', normal: 580, haze: 320 },
    { hour: '16:00', normal: 340, haze: 180 },
    { hour: '17:00', normal: 130, haze: 60 }
  ];

  const handleQuizOption = (qKey: string, optKey: string) => {
    setSelectedAnswers({ ...selectedAnswers, [qKey]: optKey });
  };

  const handleCheckQuiz = () => {
    setSubmittedQuiz(true);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4 px-3 sm:px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-bold bg-blue-100 text-blue-800 rounded">
              LEVEL 2
            </span>
            <h2 className="font-heading font-bold text-lg sm:text-xl text-slate-900">
              ENERGY EXPLORER (Konsep, Etnosains & Interpretasi Data)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Pelajari konsep fisik energi, etnosains kemplang Palembang, konversi energi termal surya, dan interpretasi grafik radiasi harian.
          </p>
        </div>

        <button
          onClick={onProceedToLevel3}
          className="self-start sm:self-auto px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5 transition-all cursor-pointer"
        >
          Lanjut ke Level 3: Solar Lab <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Level 2 Challenge Card */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-4 rounded-2xl shadow-sm border border-blue-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-900 uppercase">
              Tantangan Level 2
            </span>
            <span className="text-amber-300 font-bold text-xs sm:text-sm">
              Peneliti Etnosains & Fluktuasi Radiasi Surya
            </span>
          </div>
          <p className="text-[11px] text-slate-300">
            Target Misi: Pahami konversi radiasi surya ke energi kalor, analisis grafik puncak insolasi jam 12:00, dan periksa pemahaman kuis.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 text-xs shrink-0 font-mono">
          <span className="text-amber-300">Reward Lencana:</span>
          <span className="font-bold text-white">Cendekiawan Etnosains</span>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-slate-200 gap-1 overflow-x-auto scrollbar-none pb-1">
        {[
          { id: 'konsep', label: '1. Konsep & Sumber Energi', icon: <Zap className="w-4 h-4" /> },
          { id: 'etnosains', label: '2. Etnosains Kemplang Palembang', icon: <Droplets className="w-4 h-4" /> },
          { id: 'grafik', label: '3. Data Radiasi Surya Palembang', icon: <TrendingUp className="w-4 h-4" /> },
          { id: 'aktivitas', label: '4. Aktivitas Interpretasi Data', icon: <HelpCircle className="w-4 h-4" /> },
          { id: 'video', label: '5. Video Karhutla & Surya', icon: <Video className="w-4 h-4 text-red-500" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as typeof activeSubTab)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeSubTab === tab.id
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* SubTab 1: Konsep & Sumber Energi */}
      {activeSubTab === 'konsep' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                <Zap className="w-4 h-4" />
                Definisi Fisika: Energi, Usaha, dan Daya
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dalam fisika, <strong>Energi</strong> didefinisikan sebagai kemampuan untuk melakukan usaha (<span className="font-mono font-semibold">W</span>) atau menghasilkan perubahan termal/mekanik. Satuan standar internasional (SI) untuk energi adalah <strong>Joule (J)</strong> atau kiloWatt-jam (<strong>kWh</strong>), di mana:
              </p>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl font-mono text-xs text-blue-900 font-bold text-center">
                1 kWh = 1.000 Watt × 3.600 detik = 3.600.000 Joule = 3,6 × 10⁶ J
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Daya (P)</strong> adalah laju transfer atau perubahan energi per satuan waktu (<span className="font-mono">P = E / t</span>), dengan satuan <strong>Watt (W = J/s)</strong>.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
                <Sun className="w-4 h-4" />
                Sumber Energi: Terbarukan vs Tak Terbarukan
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
                  <strong className="block text-emerald-800">Energi Terbarukan (Renewable):</strong>
                  Sumber energi alami yang dapat pulih secara kontinu tanpa habis dalam skala waktu manusia, seperti radiasi matahari (surya), angin, air, biomassa, dan panas bumi.
                </div>
                <div className="p-2.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700">
                  <strong className="block text-slate-800">Energi Fosil / Tak Terbarukan:</strong>
                  Batubara, minyak bumi, dan gas alam yang terbentuk dari fosil jutaan tahun. Di Sumatera Selatan, sebagian besar pasokan listrik jaringan PLN masih disuplai oleh PLTU batubara mulut tambang yang menghasilkan emisi gas rumah kaca (<span className="font-mono">CO₂</span>).
                </div>
              </div>
            </div>
          </div>

          {/* Konversi Energi Diagram */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-orange-600" />
              Alur Konversi Energi pada Proses Pengeringan Surya
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center">
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
                <div className="text-[10px] font-bold text-amber-600 uppercase">Input Energi</div>
                <div className="font-heading font-bold text-amber-900 text-xs sm:text-sm">Radiasi Elektromagnetik Matahari</div>
                <p className="text-[11px] text-amber-700">Foton cahaya tampak & inframerah dengan intensitas <span className="font-mono font-semibold">I (W/m²)</span>.</p>
              </div>

              <div className="p-3.5 bg-orange-50 border border-orange-200 rounded-xl space-y-1">
                <div className="text-[10px] font-bold text-orange-600 uppercase">Proses Penyerapan</div>
                <div className="font-heading font-bold text-orange-900 text-xs sm:text-sm">Konversi ke Energi Termal (Kalor)</div>
                <p className="text-[11px] text-orange-700">Diserap oleh permukaan kemplang/kolektor dengan efisiensi <span className="font-mono font-semibold">η</span>.</p>
              </div>

              <div className="p-3.5 bg-teal-50 border border-teal-200 rounded-xl space-y-1">
                <div className="text-[10px] font-bold text-teal-600 uppercase">Perubahan Wujud</div>
                <div className="font-heading font-bold text-teal-900 text-xs sm:text-sm">Kalor Laten Penguapan (Lv)</div>
                <p className="text-[11px] text-teal-700">Molekul air cair menyerap <span className="font-mono font-semibold">Lv ≈ 2,26 × 10⁶ J/kg</span> untuk menguap.</p>
              </div>

              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                <div className="text-[10px] font-bold text-emerald-600 uppercase">Hasil Akhir</div>
                <div className="font-heading font-bold text-emerald-900 text-xs sm:text-sm">Kemplang Siap Goreng/Panggang</div>
                <p className="text-[11px] text-emerald-700">Kadar air turun dari 50% menjadi &lt;12% sehingga mekar sempurna saat dipanggang/goreng.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SubTab 2: Etnosains Kemplang */}
      {activeSubTab === 'etnosains' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-base">
              <Droplets className="w-5 h-5 text-amber-600" />
              Etnosains Masyarakat Palembang: Tradisi Pengeringan Kemplang
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Masyarakat Palembang di sepanjang tepian Sungai Musi, khususnya di Seberang Ulu, 2 Ulu, 3-4 Ulu, dan kawasan Ogan Baru, telah bergenerasi memproduksi kerupuk dan kemplang berbahan baku ikan sungai (seperti ikan tenggiri, gabus, atau belida) dicampur tepung tapioka.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Praktik Tradisional (Lincak)
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Keping adonan basah yang telah direbus dijemur di atas rak anyaman bambu yang disebut <em>lincak</em>. Penjemuran dilakukan di pekarangan rumah atau bahu jalan dari pukul 08.00 pagi hingga 16.00 sore.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Fisika Pemekaran Kemplang
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Jika kadar air masih terlalu tinggi (&gt;15%), kemplang akan bantat saat digoreng/dipanggang. Sebaliknya, pengeringan seragam yang menurunkan air hingga kadar 10–12% memungkinkan gelembung uap air meledak mikro dan membuat kemplang merekah renyah.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                  Dilema Lingkungan & Cuaca
                </span>
                <p className="text-xs text-amber-900 leading-relaxed">
                  Penjemuran di bahu jalan rentan terhadap debu lalu lintas, lalat, dan partikel kabut asap karhutla. Saat musim hujan tiba, pengrajin terpaksa menghentikan produksi sehingga merugi ratusan ribu hingga jutaan rupiah.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SubTab 3: Grafik Radiasi Surya Palembang */}
      {activeSubTab === 'grafik' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Grafik Profil Intensitas Radiasi Surya Harian Kota Palembang
                </h3>
                <p className="text-xs text-slate-500">
                  Data rata-rata klimatologis BMKG Kenten Palembang: Kondisi Cerah Normal vs Terpapar Kabut Asap Karhutla
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-amber-500 rounded-sm" />
                  <span className="text-slate-700 font-medium">Hari Cerah Normal</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-slate-400 rounded-sm" />
                  <span className="text-slate-700 font-medium">Hari Kabut Asap (Haze)</span>
                </div>
              </div>
            </div>

            {/* Custom Interactive SVG Chart */}
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 760 260" className="w-full h-auto max-h-[300px]">
                {/* Horizontal Grid lines */}
                {[0, 200, 400, 600, 800, 1000].map((val) => {
                  const y = 220 - (val / 1000) * 180;
                  return (
                    <g key={val}>
                      <line x1="60" y1={y} x2="730" y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
                      <text x="50" y={y + 4} textAnchor="end" fontSize="10" fill="#64748b">
                        {val} W/m²
                      </text>
                    </g>
                  );
                })}

                {/* Vertical Hour labels */}
                {hourlySolarData.map((d, idx) => {
                  const x = 75 + idx * 60;
                  return (
                    <text key={d.hour} x={x} y="240" textAnchor="middle" fontSize="10" fill="#475569">
                      {d.hour}
                    </text>
                  );
                })}

                {/* Normal Day Curve (Amber) */}
                <path
                  d={`M ${hourlySolarData.map((d, i) => `${75 + i * 60},${220 - (d.normal / 1000) * 180}`).join(' L ')}`}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3.5"
                />

                {/* Haze Day Curve (Slate Gray) */}
                <path
                  d={`M ${hourlySolarData.map((d, i) => `${75 + i * 60},${220 - (d.haze / 1000) * 180}`).join(' L ')}`}
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                />

                {/* Data Points */}
                {hourlySolarData.map((d, i) => {
                  const x = 75 + i * 60;
                  const yNormal = 220 - (d.normal / 1000) * 180;
                  const yHaze = 220 - (d.haze / 1000) * 180;
                  return (
                    <g key={d.hour}>
                      <circle cx={x} cy={yNormal} r="4" fill="#d97706" />
                      <circle cx={x} cy={yHaze} r="3" fill="#64748b" />
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 leading-relaxed">
              <strong className="block text-blue-950 mb-1">Analisis Data Grafik:</strong>
              1. <strong>Puncak Radiasi:</strong> Intensitas matahari tertinggi terjadi antara pukul <strong>11.00 – 13.00 WIB</strong> mencapai &gt;900 W/m².<br />
              2. <strong>Dampak Kabut Asap (Haze Scattering):</strong> Partikel aerosol dari karhutla menyerap dan menghamburkan radiasi matahari, menyebabkan intensitas radiasi yang mencapai permukaan turun sekitar <strong>40% hingga 45%</strong>, sehingga laju pengeringan melambat secara drastis.
            </div>
          </div>
        </div>
      )}

      {/* SubTab 4: Aktivitas Interpretasi Data */}
      {activeSubTab === 'aktivitas' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-base">
              <HelpCircle className="w-5 h-5 text-indigo-600" />
              Aktivitas Literasi Energi: Interpretasi Data Grafik & Fisika Kemplang
            </div>

            <p className="text-xs text-slate-600">
              Jawablah pertanyaan evaluasi interpretasi grafik di bawah ini untuk menguji pemahaman literasi energi Anda:
            </p>

            {/* Questions */}
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="text-xs font-bold text-slate-800">
                  Soal 1: Berdasarkan grafik radiasi di atas, pada rentang jam berapakah penjemuran kemplang menerima pasokan energi termal matahari paling intensif?
                </div>
                <div className="space-y-1.5">
                  {[
                    { key: 'A', text: 'Pukul 07.00 – 09.00 WIB' },
                    { key: 'B', text: 'Pukul 11.00 – 13.00 WIB (Puncak radiasi >900 W/m²)' },
                    { key: 'C', text: 'Pukul 15.00 – 17.00 WIB' }
                  ].map((opt) => (
                    <label
                      key={opt.key}
                      className={`flex items-center gap-2 p-2 rounded-lg text-xs cursor-pointer border transition-colors ${
                        selectedAnswers['q1'] === opt.key
                          ? 'bg-blue-100 border-blue-400 font-semibold'
                          : 'bg-white border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="q1"
                        checked={selectedAnswers['q1'] === opt.key}
                        onChange={() => handleQuizOption('q1', opt.key)}
                        className="text-blue-600"
                      />
                      <span>{opt.text}</span>
                    </label>
                  ))}
                </div>
                {submittedQuiz && (
                  <div className={`p-2.5 rounded-lg text-xs mt-2 ${selectedAnswers['q1'] === 'B' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                    {selectedAnswers['q1'] === 'B' ? '✓ Benar! Pukul 11.00-13.00 WIB adalah jendela waktu penyerapan kalor radiasi paling tinggi.' : '✕ Kurang tepat. Lihat kembali puncak grafik radiasi surya di atas.'}
                  </div>
                )}
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="text-xs font-bold text-slate-800">
                  Soal 2: Mengapa kabut asap karhutla menyebabkan pengeringan tradisional kemplang membutuhkan waktu lebih lama hingga 2-3 hari?
                </div>
                <div className="space-y-1.5">
                  {[
                    { key: 'A', text: 'Karena partikel asap aerosol menyerap dan menghamburkan radiasi matahari sehingga intensitas I berkurang drastis' },
                    { key: 'B', text: 'Karena asap membuat kemplang menjadi berminyak' },
                    { key: 'C', text: 'Karena energi matahari berubah menjadi medan magnet' }
                  ].map((opt) => (
                    <label
                      key={opt.key}
                      className={`flex items-center gap-2 p-2 rounded-lg text-xs cursor-pointer border transition-colors ${
                        selectedAnswers['q2'] === opt.key
                          ? 'bg-blue-100 border-blue-400 font-semibold'
                          : 'bg-white border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="q2"
                        checked={selectedAnswers['q2'] === opt.key}
                        onChange={() => handleQuizOption('q2', opt.key)}
                        className="text-blue-600"
                      />
                      <span>{opt.text}</span>
                    </label>
                  ))}
                </div>
                {submittedQuiz && (
                  <div className={`p-2.5 rounded-lg text-xs mt-2 ${selectedAnswers['q2'] === 'A' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                    {selectedAnswers['q2'] === 'A' ? '✓ Tepat Sekali! Efek hamburan aerosol mengurangi intensitas radiasi langsung yang mencapai kemplang.' : '✕ Kurang tepat. Alasan fisika utamanya adalah hamburan radiasi elektromagnetik oleh aerosol.'}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleCheckQuiz}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow"
              >
                Periksa Jawaban Aktivitas
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SubTab 5: Video Pembelajaran Karhutla & Surya */}
      {activeSubTab === 'video' && (
        <div className="animate-in fade-in space-y-4">
          <EducationalVideoHub
            savedVideoNotes={studentNotes}
            onSaveVideoNotes={onUpdateNotes}
          />
        </div>
      )}

      {/* Lembar Catatan Siswa (Tersimpan ke E-LKPD) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
          <BookOpen className="w-4 h-4 text-blue-600" />
          Lembar Catatan Penyelidikan Siswa (Level 2)
        </div>
        <p className="text-xs text-slate-500">
          Tuliskan rangkuman hasil pengamatan Anda mengenai kaitan antara jam puncak radiasi matahari dengan perubahan energi termal pengeringan kemplang:
        </p>
        <textarea
          rows={3}
          value={studentNotes}
          onChange={(e) => onUpdateNotes(e.target.value)}
          placeholder="Tuliskan catatan Anda di sini... (Contoh: Berdasarkan data grafik, radiasi mencapai 940 W/m² pada jam 12 siang. Pada saat itu konversi kalor laten penguapan air kemplang berlangsung paling cepat...)"
          className="w-full p-3 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />

        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-100">
          <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Catatan penyelidikan tersimpan otomatis ke lembar portofolio E-LKPD.
          </span>
          <button
            onClick={onProceedToLevel3}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>Selesaikan Level 2 & Buka Level 3: Solar Lab</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
