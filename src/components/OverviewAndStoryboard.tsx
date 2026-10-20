import React from 'react';
import { ActiveTab } from '../types';
import {
  Compass,
  Gamepad2,
  BookOpen,
  FlaskConical,
  Trees,
  Scale,
  Award,
  ArrowRight,
  ShieldAlert,
  Flame,
  Sun,
  Layers,
  Sparkles,
  Target,
  Lock,
  CheckCircle2
} from 'lucide-react';
import { UnlockedLevels } from '../types';

interface Props {
  onStartLevel1: () => void;
  onNavigateTab: (tab: ActiveTab) => void;
  unlockedLevels?: UnlockedLevels;
}

export const OverviewAndStoryboard: React.FC<Props> = ({
  onStartLevel1,
  onNavigateTab,
  unlockedLevels
}) => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto py-6 px-4">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 text-white p-6 sm:p-10 shadow-xl border border-orange-400/30">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-orange-950/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/25 text-amber-200 text-xs font-semibold backdrop-blur-xs border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Prototipe E-LKPD Fisika Interaktif SMA Fase E (Kelas X)</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            ENERGY QUEST: <br />
            <span className="text-amber-200">MISI ENERGI PALEMBANG</span>
          </h1>

          <p className="text-amber-100 text-sm sm:text-base leading-relaxed">
            Selamat datang, Peneliti Muda Fisika! Dalam media E-LKPD interaktif ini, Anda akan memecahkan tantangan energi nyata di Kota Palembang. Menggabungkan kearifan lokal <strong>etnosains pengeringan kemplang</strong> dengan analisis isu sosiosaintifik <strong>kabut asap karhutla dan transisi energi</strong>, Anda dilatih menjadi pengambil keputusan yang berpijak pada data empiris dan prinsip fisika.
          </p>

          {/* Target Learning Outcomes Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-white/15 backdrop-blur-md rounded-xl p-3 border border-white/20">
              <div className="flex items-center gap-2 text-amber-200 font-bold text-xs uppercase tracking-wider mb-1">
                <Target className="w-4 h-4" /> Variabel Hasil Belajar 1
              </div>
              <div className="font-heading font-bold text-white text-base">Literasi Energi</div>
              <p className="text-xs text-amber-100/90 mt-0.5">
                Pemahaman konsep energi, neraca kalor, sumber energi terbarukan, konversi radiasi ke termal, dan interpretasi data.
              </p>
            </div>

            <div className="bg-white/15 backdrop-blur-md rounded-xl p-3 border border-white/20">
              <div className="flex items-center gap-2 text-amber-200 font-bold text-xs uppercase tracking-wider mb-1">
                <Scale className="w-4 h-4" /> Variabel Hasil Belajar 2
              </div>
              <div className="font-heading font-bold text-white text-base">Pengambilan Keputusan Berbasis Bukti</div>
              <p className="text-xs text-amber-100/90 mt-0.5">
                Kecakapan merumuskan kriteria, menganalisis data komparatif, mengutip bukti numerik, dan mengakui keterbatasan pilihan.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-3">
            <button
              onClick={onStartLevel1}
              className="px-6 py-3 rounded-xl bg-white text-orange-700 font-bold text-sm shadow-lg hover:bg-amber-50 hover:shadow-xl transition-all flex items-center gap-2"
            >
              <Gamepad2 className="w-5 h-5 text-orange-600" />
              Mulai Petualangan: Level 1 (Solar Coin Run)
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
            <button
              onClick={() => onNavigateTab('level3')}
              className="px-5 py-3 rounded-xl bg-amber-900/40 hover:bg-amber-900/60 text-white font-semibold text-sm backdrop-blur-md border border-white/20 transition-all flex items-center gap-2"
            >
              <FlaskConical className="w-4 h-4 text-amber-300" />
              Langsung ke Solar Lab Fisika (Q = I·A·t·η)
            </button>
          </div>
        </div>
      </div>

      {/* Critical Scientific & Ethno-Pedagogical Boundary Warnings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-xl p-4 text-xs text-amber-900 space-y-2 shadow-xs">
          <div className="flex items-center gap-2 font-bold text-amber-800 text-sm">
            <Sun className="w-4 h-4 text-amber-600" />
            Batasan Fisika Model Kalor Surya (Level 3)
          </div>
          <p className="leading-relaxed">
            Persamaan <span className="font-mono font-bold">Q = I × A × t × η</span> menghitung total energi termal yang diserap sistem kolektor. Model fisika dasar ini <strong>TIDAK secara langsung memprediksi waktu tuntas pengeringan kemplang</strong>, karena laju pengeringan pangan nyata dipengaruhi oleh difusi massa air internal, kelembaban udara (RH), sirkulasi udara konveksi, dan kalor laten penguapan air (<span className="font-mono">Lv ≈ 2,26 × 10⁶ J/kg</span>).
          </p>
        </div>

        <div className="bg-orange-50 border-l-4 border-orange-600 rounded-xl p-4 text-xs text-orange-950 space-y-2 shadow-xs">
          <div className="flex items-center gap-2 font-bold text-orange-800 text-sm">
            <Flame className="w-4 h-4 text-orange-600" />
            Nuansa Isu Sosiosaintifik Karhutla vs Energi (Level 4)
          </div>
          <p className="leading-relaxed">
            Pemanfaatan energi surya <strong>TIDAK secara langsung mencegah atau memadamkan karhutla</strong>. Karhutla di lahan gambut Sumsel dipicu oleh faktor hidrologis gambut dan pembukaan lahan buatan manusia. Peran energi surya adalah mitigasi emisi gas rumah kaca jangka panjang serta penyediaan teknologi pengering tertutup (Solar Dryer) yang melindungi produk pangan dari polusi kabut asap beracun (PM2.5).
          </p>
        </div>
      </div>

      {/* Alur Pembelajaran (Instructional Flow) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-bold text-xl text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-orange-600" />
              Alur Pembelajaran E-LKPD (Fase E - SMA Kelas X)
            </h2>
            <p className="text-xs text-slate-500">
              Siklus 5 level pembelajaran berbasis gamifikasi terarah menuju penalaran bukti ilmiah.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[
            {
              step: 'Level 1',
              title: 'Solar Coin Run',
              icon: <Gamepad2 className="w-5 h-5 text-amber-500" />,
              badge: 'Orientasi & Gamifikasi',
              desc: 'Platformer 2D mengumpulkan koin surya untuk membuka 5 kartu pengetahuan fisika dan etnosains.',
              tab: 'level1' as ActiveTab
            },
            {
              step: 'Level 2',
              title: 'Energy Explorer',
              icon: <BookOpen className="w-5 h-5 text-blue-500" />,
              badge: 'Literasi Energi Dasar',
              desc: 'Konsep energi, sumber energi, etnosains kemplang, dan aktivitas interpretasi fluktuasi radiasi harian.',
              tab: 'level2' as ActiveTab
            },
            {
              step: 'Level 3',
              title: 'Solar Lab Fisika',
              icon: <FlaskConical className="w-5 h-5 text-emerald-500" />,
              badge: 'Simulasi Interaktif',
              desc: 'Manipulasi variabel I, A, t, dan η pada rumus Q = I·A·t·η dengan grafik real-time dan tabel pengamatan.',
              tab: 'level3' as ActiveTab
            },
            {
              step: 'Level 4',
              title: 'Misi Lingkungan',
              icon: <Trees className="w-5 h-5 text-teal-500" />,
              badge: 'Isu Sosiosaintifik',
              desc: 'Eksplorasi kabut asap karhutla Palembang & aktivitas membedakan Fakta, Asumsi, Opini, dan Bukti.',
              tab: 'level4' as ActiveTab
            },
            {
              step: 'Level 5',
              title: 'Keputusan Bukti',
              icon: <Scale className="w-5 h-5 text-purple-500" />,
              badge: 'Decision Challenge',
              desc: 'Studi kasus UMKM kemplang Palembang: Membandingkan 3 metode pengeringan melalui 8 langkah keputusan.',
              tab: 'level5' as ActiveTab
            }
          ].map((lvl, idx) => {
            const isLocked = (() => {
              if (lvl.tab === 'level1') return false;
              if (!unlockedLevels) return false;
              return !unlockedLevels[lvl.tab as keyof UnlockedLevels];
            })();

            return (
              <div
                key={lvl.step}
                onClick={() => onNavigateTab(lvl.tab)}
                className={`group cursor-pointer rounded-xl border p-4 transition-all flex flex-col justify-between ${
                  isLocked
                    ? 'border-dashed border-slate-300 bg-slate-50/70 hover:border-amber-400'
                    : 'border-slate-200 hover:border-amber-400 hover:shadow-md bg-gradient-to-b from-slate-50/50 to-white'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {lvl.step}
                    </span>
                    <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-amber-100 transition-colors">
                      {isLocked ? <Lock className="w-4 h-4 text-slate-400" /> : lvl.icon}
                    </div>
                  </div>
                  <div className="font-heading font-bold text-slate-800 text-sm group-hover:text-amber-700 transition-colors">
                    {lvl.title}
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="inline-block text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                      {lvl.badge}
                    </span>
                    {isLocked && (
                      <span className="inline-block text-[9px] font-bold text-slate-500 bg-slate-200 px-1.5 py-0.2 rounded">
                        Terkunci
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {lvl.desc}
                  </p>
                </div>
                <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-amber-600 group-hover:translate-x-0.5 transition-transform">
                  <span>{isLocked ? 'Prasyarat Terkunci' : 'Buka Level'}</span>
                  {isLocked ? <Lock className="w-3.5 h-3.5 text-slate-400" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Storyboard Setiap Halaman (Design Specs & Pedagogical Architecture) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div>
          <h2 className="font-heading font-bold text-xl text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-orange-600" />
            Storyboard & Arsitektur Instruksional Tiap Halaman
          </h2>
          <p className="text-xs text-slate-500">
            Spesifikasi komponen antarmuka, tugas belajar, dan keterkaitan indikator asesmen.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              screen: 'Halaman 1: Mini-Game 2D "Solar Coin Run"',
              ux: 'Kanvas grafis interaktif dengan kontrol keyboard (panah/WASD) dan virtual joystick/tombol sentuh untuk smartphone. Rintangan berupa kepulan asap karhutla dan jurang sungai.',
              activity: 'Siswa mengumpulkan koin radiasi surya yang secara bertahap membuka 5 kartu pengetahuan etnosains dan fisika. Skor game ditampilkan secara visual dengan disclaimer jelas bahwa skor game bukan tolok ukur literasi energi.',
              target: 'Engagement afektif & stimulasi rasa ingin tahu kontekstual.'
            },
            {
              screen: 'Halaman 2: Energy Explorer (Etnosains & Konversi Energi)',
              ux: 'Modul interaktif dengan infografis alur energi penjemuran kemplang (radiasi surya → penyerapan kalor → panas laten penguapan), grafik insolasi BMKG Palembang, dan kartu fakta etnosains.',
              activity: 'Siswa membaca data insolasi, menganalisis hubungan jam penyinaran terik dengan laju penguapan air, dan menyelesaikan cek pemahaman konseptual.',
              target: 'Literasi Energi Indikator: Konsep Energi, Sumber Energi, dan Konversi Energi.'
            },
            {
              screen: 'Halaman 3: Solar Lab Fisika Interaktif (Q = I · A · t · η)',
              ux: 'Simulasi laboratorium virtual dengan 4 slider parameter (Intensitas I, Luas Kolektor A, Waktu t, dan Efisiensi η), visualisasi sinar radiasi dan penampang kolektor, grafik hubungan dinamis, serta tabel pengamatan tersimpan.',
              activity: 'Siswa melakukan eksperimen variabel kontrol (mengubah satu variabel dan menahan variabel lain tetap), merekam ke tabel pengamatan, dan menguji pemahaman batas matematis model terhadap laju pengeringan kemplang nyata.',
              target: 'Literasi Energi Indikator: Interpretasi Data Fisika & Analisis Variabel Kalor.'
            },
            {
              screen: 'Halaman 4: Misi Lingkungan (Isu Sosiosaintifik Palembang)',
              ux: 'Studi kasus kabut asap karhutla di Sumatera Selatan dan ketergantungan energi listrik fosil (PLTU batubara). Dilengkapi kartu pemilah pernyataan interaktif: Fakta, Asumsi, Opini, dan Bukti.',
              activity: 'Siswa mengklasifikasi 6 pernyataan sosiosaintifik, membaca justifikasi ilmiah dari umpan balik langsung, dan memahami bahwa energi surya tidak secara langsung memadamkan karhutla melainkan memitigasi emisi dan melindungi pangan.',
              target: 'Pengambilan Keputusan Indikator: Membedakan Fakta, Asumsi, Opini, dan Bukti Ilmiah.'
            },
            {
              screen: 'Halaman 5: Evidence-Based Decision Challenge (Studi Kasus UMKM)',
              ux: 'Dilema UMKM Kemplang "Berkah Musi" Ibu Salmah di Seberang Ulu (produksi 50 kg/hari, modal terbatas Rp 6 juta, daya listrik 1300 VA). Matriks komparatif 3 metode: Tradisional, Solar Dryer Dome, dan Oven Listrik.',
              activity: 'Siswa menjalani 8 langkah pengambilan keputusan berbasis bukti: (1) Identifikasi masalah, (2) Tentukan kriteria, (3) Bandingkan alternatif, (4) Pilih solusi, (5) Kutip bukti data angka, (6) Justifikasi argumen, (7) Akui keterbatasan keputusan, (8) Tentukan kebutuhan data lanjutan.',
              target: 'Kemampuan Pengambilan Keputusan Berbasis Bukti (Komprehensif 6 Aspek).'
            },
            {
              screen: 'Halaman 6: Tes Literasi Energi & Rubrik Keputusan',
              ux: 'Instrumen tes diagnostik 10 butir pilihan ganda beralasan dengan analisis skor per indikator, formulir penilaian rubrik analitik 4 skala kinerja, dan tombol cetak portofolio lengkap E-LKPD ke PDF.',
              activity: 'Siswa mengerjakan tes literasi energi, melakukan asesmen diri (self-assessment), dan mencetak lembar kerja lengkap untuk diserahkan kepada guru fisika.',
              target: 'Pengukuran Otentik Hasil Belajar & Umpan Balik Diagnostik Siswa & Guru.'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
              <div className="font-heading font-bold text-slate-900 text-sm text-orange-700">
                {item.screen}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="font-semibold text-slate-700 block">Antarmuka & Fitur:</span>
                  <span className="text-slate-600">{item.ux}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-700 block">Aktivitas Siswa:</span>
                  <span className="text-slate-600">{item.activity}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-700 block">Sasaran Hasil Belajar:</span>
                  <span className="text-amber-800 font-medium bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block mt-0.5">
                    {item.target}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Research Disclaimer & Ethics Declaration */}
      <div className="rounded-2xl border border-slate-300 bg-slate-100/80 p-5 text-xs text-slate-600 space-y-2">
        <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
          <ShieldAlert className="w-4 h-4 text-slate-600" />
          Pernyataan Etika Riset & Status Pengembangan Produk
        </div>
        <p className="leading-relaxed">
          <strong>Pemberitahuan Metodologi Riset:</strong> Media interaktif ini dikembangkan sebagai <em>prototipe instrumen E-LKPD</em> dalam kerangka penelitian dan pengembangan (Research & Development / R&D) pendidikan fisika SMA. Pengembang <strong>tidak menyatakan atau mengklaim</strong> bahwa produk ini telah tervalidasi secara baku atau telah terbukti secara empiris meningkatkan hasil belajar peserta didik sebelum dilakukannya uji validitas ahli (ahli materi, media, bahasa) serta uji coba empiris (uji terbatas dan uji efektivitas kelas eksperimen) sesuai metodologi penelitian yang diakui. Seluruh data identitas siswa disimpan secara lokal (client-side) pada peramban untuk keperluan pengerjaan lembar kerja dan tidak dikumpulkan tanpa persetujuan subjek riset.
        </p>
      </div>
    </div>
  );
};
