import React, { useState } from 'react';
import { SCIENTIFIC_REFERENCES } from '../data/etnosainsData';
import {
  HelpCircle,
  BookOpen,
  GraduationCap,
  ShieldAlert,
  FileText,
  Clock,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Users
} from 'lucide-react';

export const TeacherGuideAndEthics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'guru' | 'siswa' | 'referensi' | 'etika'>('guru');

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4 px-3 sm:px-4">
      {/* Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-bold bg-slate-100 text-slate-800 rounded">
              PANDUAN & RUJUKAN
            </span>
            <h2 className="font-heading font-bold text-lg sm:text-xl text-slate-900">
              PANDUAN GURU, SISWA, REFERENSI & ETIKA RISET
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Petunjuk implementasi pedagogis Kurikulum Merdeka Fase E, panduan belajar, rujukan ilmiah, dan deklarasi etika R&D.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-1 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'guru', label: '1. Panduan Guru (Pedagogi)', icon: <GraduationCap className="w-4 h-4" /> },
          { id: 'siswa', label: '2. Panduan Siswa', icon: <Users className="w-4 h-4" /> },
          { id: 'referensi', label: '3. Referensi Ilmiah Terverifikasi', icon: <BookOpen className="w-4 h-4" /> },
          { id: 'etika', label: '4. Etika Riset & Deklarasi R&D', icon: <ShieldAlert className="w-4 h-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Panduan Guru */}
      {activeTab === 'guru' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-base">
              <GraduationCap className="w-5 h-5 text-amber-600" />
              Petunjuk Pedagogis Guru Fisika SMA (Fase E - Kelas X)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 block text-xs uppercase tracking-wider">
                  Capaian Pembelajaran (CP) Fase E
                </span>
                <p className="text-slate-600 leading-relaxed">
                  "Peserta didik mampu mendeskripsikan gejala alam dalam cakupan keterampilan proses dalam pengukuran, perubahan iklim, pemanasan global, pencemaran lingkungan, energi alternatif dan pemanfaatannya; serta merancang solusi atas permasalahan lingkungan hidup di sekitarnya."
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 block text-xs uppercase tracking-wider">
                  Alokasi Waktu yang Disarankan
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Disarankan dialokasikan dalam <strong>2 hingga 3 pertemuan (@ 2 × 45 menit)</strong>:
                  <br />• <em>Pertemuan 1:</em> Orientasi Game (L1), Materi Etnosains & Data Grafik (L2).
                  <br />• <em>Pertemuan 2:</em> Simulasi Solar Lab Fisika (L3) & Analisis Karhutla (L4).
                  <br />• <em>Pertemuan 3:</em> Decision Challenge (L5), Tes Literasi Energi, dan Asesmen Portofolio LKPD.
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="font-heading font-bold text-slate-900 text-sm">
                Strategi Pembelajaran & Scaffolding Penalaran:
              </h4>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200">
                  <strong className="text-amber-900 block mb-0.5">1. Peran Gamifikasi Level 1:</strong>
                  Mini-game digunakan sebagai jembatan motivasi (ice-breaking) untuk mengenalkan konteks kearifan lokal Palembang. Guru perlu mengingatkan siswa bahwa skor game murni sarana pengumpulan kartu info dan tidak menentukan nilai fisika siswa.
                </div>
                <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200">
                  <strong className="text-blue-900 block mb-0.5">2. Pembimbingan Laboratorium Virtual Level 3:</strong>
                  Fasilitasi siswa untuk menerapkan <em>Metode Variabel Terkontrol</em> (mengubah luas kolektor A sembari menjaga I, t, dan η tetap konstan) agar siswa memahami secara empiris hubungan linear antara luas kolektor dengan energi termal Q.
                </div>
                <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-200">
                  <strong className="text-purple-900 block mb-0.5">3. Menilai Pengambilan Keputusan di Level 5:</strong>
                  Jangan menyalahkan siswa yang memilih pengering tradisional atau pengering listrik. Nilailah kelengkapan kriteria yang mereka susun, kutipan angka konkret dari matriks data (Capex, Opex, emisi CO2), serta keberanian mengakui keterbatasan teknologi yang dipilih.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Panduan Siswa */}
      {activeTab === 'siswa' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-blue-800 font-bold text-base">
              <Users className="w-5 h-5 text-blue-600" />
              Panduan Belajar Peserta Didik (Langkah Demi Langkah)
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              {[
                { step: 'Langkah 1', title: 'Isi Identitas Anda', desc: 'Klik tombol identitas di kanan atas untuk mengisi Nama, Kelas, Kelompok, dan Sekolah agar otomatis tercetak di lembar kerja.' },
                { step: 'Langkah 2', title: 'Taklukkan Mini-Game Level 1', desc: 'Gerakkan karakter Peneliti Energi dengan tombol panah/layar sentuh untuk mengumpulkan 5 koin surya dan membuka 5 kartu pengetahuan fisika.' },
                { step: 'Langkah 3', title: 'Eksplorasi Materi & Grafik Level 2', desc: 'Pelajari konsep energi, etnosains kemplang Palembang, amati grafik radiasi surya harian, dan selesaikan aktivitas interpretasi data.' },
                { step: 'Langkah 4', title: 'Eksperimen di Solar Lab Level 3', desc: 'Gunakan slider untuk memvariasikan I, A, t, dan efisiensi η. Klik "Simpan ke Tabel Pengamatan" minimal 3 kali percobaan untuk membandingkan pengaruh luas kolektor dan efisiensi terhadap energi Q.' },
                { step: 'Langkah 5', title: 'Selesaikan Misi Lingkungan Level 4', desc: 'Pilah 6 pernyataan isu kabut asap karhutla dan transisi energi ke dalam kategori Fakta, Asumsi, Opini, atau Bukti.' },
                { step: 'Langkah 6', title: 'Ambil Keputusan Berbasis Bukti Level 5', desc: 'Baca studi kasus UMKM Ibu Salmah, periksa tabel pembanding 3 metode, lalu lengkapi 8 langkah keputusan dengan mengutip bukti angka konkret.' },
                { step: 'Langkah 7', title: 'Kerjakan Tes & Ekspor LKPD', desc: 'Kerjakan 10 soal tes literasi energi, lakukan asesmen diri pada rubrik keputusan, dan klik "Cetak / Ekspor PDF" untuk mengunduh portofolio LKPD lengkap Anda.' }
              ].map((s) => (
                <div key={s.step} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                  <span className="font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded text-[10px] shrink-0">
                    {s.step}
                  </span>
                  <div>
                    <strong className="text-slate-900 block font-heading">{s.title}</strong>
                    <p className="text-slate-600 mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Referensi Ilmiah */}
      {activeTab === 'referensi' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              Daftar Referensi Ilmiah Terverifikasi
            </div>

            <p className="text-xs text-slate-500">
              Berikut adalah literatur dan rujukan ilmiah yang dapat diverifikasi yang melandasi muatan fisika, literasi energi, etnosains kemplang, dan pengambilan keputusan sosiosaintifik dalam aplikasi ini:
            </p>

            <div className="space-y-3 pt-2">
              {SCIENTIFIC_REFERENCES.map((ref, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-heading font-bold text-slate-900 text-sm">
                      {ref.title}
                    </h4>
                    <span className="text-[10px] font-mono bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-bold shrink-0">
                      {ref.year}
                    </span>
                  </div>
                  <div className="text-slate-600">
                    <strong>Penulis:</strong> {ref.authors} | <em>{ref.publisher}</em>
                  </div>
                  <div className="text-slate-500 text-[11px] pt-1 border-t border-slate-100">
                    <span className="font-semibold text-slate-700">Relevansi dalam E-LKPD:</span> {ref.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Etika Riset & Deklarasi R&D */}
      {activeTab === 'etika' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-base">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              Deklarasi Etika Penggunaan Data Riset & Status Pengembangan Produk
            </div>

            <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2 text-rose-950">
                <strong className="block text-rose-900 text-sm">
                  1. Pernyataan Status Validasi & Efektivitas Produk (R&D Transparency):
                </strong>
                <p>
                  Pengembang dengan tegas menyatakan bahwa <strong>produk E-LKPD ini merupakan prototipe awal dalam kerangka penelitian dan pengembangan (Research & Development / R&D)</strong>. Pengembang <strong>TIDAK mengklaim</strong> bahwa produk ini telah tervalidasi secara baku oleh para ahli maupun terbukti secara empiris meningkatkan literasi energi dan kemampuan pengambilan keputusan berbasis bukti peserta didik sebelum uji validitas ahli dan eksperimen lapangan kuasi-eksperimental selesai dilaksanakan sesuai metodologi penelitian pendidikan yang sahih.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <strong className="block text-slate-900 text-sm">
                  2. Etika Privasi Data Peserta Didik (Data Protection):
                </strong>
                <p>
                  Semua input identitas siswa (nama, kelas, nomor absen, nama sekolah), catatan eksperimen laboratorium, jawaban aktivitas, dan draft keputusan disimpan secara eksklusif di dalam memori peramban pengguna (browser local storage). Aplikasi tidak mengirimkan rekaman identitas siswa ke peladen eksternal atau pihak ketiga tanpa persetujuan (informed consent) resmi tertulis dari pihak sekolah, guru, dan orang tua/wali murid.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <strong className="block text-slate-900 text-sm">
                  3. Penghormatan terhadap Etnosains Masyarakat Lokal Palembang:
                </strong>
                <p>
                  Penggunaan konteks etnosains pengeringan kemplang di Palembang bertujuan mengangkat nilai-nilai kearifan lokal ke dalam pembelajaran sains sekolah. Pengembang menghormati kearifan para pelaku usaha mikro kemplang di Sumatera Selatan dan berkomitmen agar hasil riset ini kelak dapat memberikan kontribusi timbal balik berupa edukasi teknologi tepat guna yang bermanfaat bagi masyarakat.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
