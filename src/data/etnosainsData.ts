/**
 * Data and Knowledge Base for ENERGY QUEST: Misi Energi Palembang
 * E-LKPD Fisika SMA Kelas X
 */

import {
  InfoCard,
  SocioScientificStatement,
  DryingAlternative,
  LiteracyQuestion,
  RubricAspect
} from '../types';

export const INITIAL_CARDS: InfoCard[] = [
  {
    id: 'card-1',
    title: 'Radiasi Surya di Kota Palembang',
    category: 'fisika',
    content:
      'Kota Palembang terletak di sekitar 2°59′ LS dan 104°45′ BT (daerah khatulistiwa). Rata-rata insolasi surya harian berkisar antara 4,5 hingga 5,2 kWh/m²/hari dengan intensitas radiasi puncak mencapai 800 - 950 W/m² pada siang hari terik. Potensi ini sangat berlimpah untuk aplikasi termal surya seperti pengeringan bahan pangan.',
    unlocked: false,
    scientificSource: 'Data Klimatologi Stasiun BMKG Kenten Palembang & Kementerian ESDM RI'
  },
  {
    id: 'card-2',
    title: 'Etnosains: Penjemuran Kemplang Tradisional',
    category: 'etnosains',
    content:
      'Kemplang adalah kerupuk khas Palembang berbahan ikan giling dan tapioka. Sebelum digoreng atau dipanggang dengan pasir/arang, kemplang basah harus dikeringkan hingga kadar air turun dari ~50% menjadi di bawah 12% agar kemplang dapat mekar renyah. Secara tradisional, pengrajin menjemur kemplang di atas anyaman bambu (lincak) di tepi jalan atau pekarangan rumah memanfaatkan radiasi matahari langsung dan aliran angin.',
    unlocked: false,
    scientificSource: 'Kajian Etnosains Kuliner Tradisional Sumsel (Jurnal Pendidikan Fisika & Sains Terapan)'
  },
  {
    id: 'card-3',
    title: 'Kabut Asap & Dampaknya terhadap Pengeringan',
    category: 'lingkungan',
    content:
      'Pada musim kemarau di Sumatera Selatan, kebakaran hutan dan lahan gambut (karhutla) kerap menimbulkan kabut asap tebal. Partikulat aerosol (PM2.5 dan PM10) menghalangi radiasi sinar matahari langsung (haze scattering effect), menurunkan intensitas radiasi yang mencapai permukaan hingga 25-45%, serta berisiko menempelkan jelaga kotor pada kemplang yang dijemur terbuka.',
    unlocked: false,
    scientificSource: 'Laporan Pemantauan Kualitas Udara KLHK & Analisis Hamburan Radiasi Atmosfer'
  },
  {
    id: 'card-4',
    title: 'Prinsip Solar Dryer Dome (Kolektor Rumah Kaca)',
    category: 'fisika',
    content:
      'Solar Dryer Dome memanfaatkan efek rumah kaca: radiasi gelombang pendek dari matahari menembus penutup polikarbonat transparan, diserap oleh lantai/rak hitam, dan dipancarkan kembali sebagai radiasi inframerah gelombang panjang yang terperangkap. Ini menaikkan temperatur udara di dalam pengering sebesar 10°C - 20°C di atas suhu lingkungan luar sekaligus melindungi kemplang dari debu kabut asap, hujan mendadak, dan serangga.',
    unlocked: false,
    scientificSource: 'Penelitian Rekayasa Termal Pengering Efek Rumah Kaca Bahan Pangan (ITB & Unsri)'
  },
  {
    id: 'card-5',
    title: 'Bukti vs Opini dalam Pengambilan Keputusan',
    category: 'metodologi',
    content:
      'Pengambilan keputusan berbasis bukti (evidence-based decision making) memerlukan pemilahan antara klaim emosional/opini dengan data empiris terukur. Tidak ada satu teknologi yang selalu "sempurna" untuk semua orang; keputusan yang bijak menimbang trade-off antara modal awal, biaya operasional, keandalan cuaca, dampak lingkungan, dan kapasitas nyata pengguna.',
    unlocked: false,
    scientificSource: 'Socio-Scientific Decision Making Framework (Sadler & Zeidler, 2005)'
  }
];

export const SOCIO_SCIENTIFIC_STATEMENTS: SocioScientificStatement[] = [
  {
    id: 'stmt-1',
    text: 'Pengukuran BMKG Kenten Palembang menunjukkan intensitas radiasi matahari rata-rata pada bulan Juli–Agustus mencapai 750–900 W/m² pada pukul 11.00–13.00 WIB.',
    correctType: 'fakta',
    explanation:
      'Pernyataan ini merupakan FAKTA karena memuat data empiris yang dapat diverifikasi secara objektif dari instrumen stasiun meteorologi resmi.',
    sourceOrLabel: 'Data Pengamatan Stasiun BMKG Kenten Palembang [Fakta Ilmiah]'
  },
  {
    id: 'stmt-2',
    text: 'Semua pengrajin kemplang di Palembang pasti akan bangkrut jika tidak segera mengganti jemuran tradisional dengan oven listrik modern.',
    correctType: 'opini',
    explanation:
      'Pernyataan ini merupakan OPINI atau GENERALISASI yang berlebihan. Kenyataannya, banyak pengrajin kecil tetap bertahan dengan penjemuran tradisional karena kendala modal awal dan daya listrik, asalkan cuaca memungkinkan.',
    sourceOrLabel: 'Kutipan Forum Diskusi Publik Media Sosial [Opini/Persepsi]'
  },
  {
    id: 'stmt-3',
    text: 'Hasil pengujian laboratorium pangan menunjukkan kemplang yang dikeringkan dalam Solar Dryer Dome tertutup memiliki angka cemaran mikroba 78% lebih rendah dan bebas partikulat jelaga PM2.5 dibanding penjemuran di pinggir jalan raya.',
    correctType: 'bukti',
    explanation:
      'Pernyataan ini merupakan BUKTI (EVIDENCE) karena menyajikan data komparatif kuantitatif dari pengujian ilmiah terkontrol untuk mendukung klaim kebersihan pangan.',
    sourceOrLabel: 'Hasil Uji Balai Riset dan Standardisasi Industri Palembang [Bukti Ilmiah Empiris]'
  },
  {
    id: 'stmt-4',
    text: 'Diperkirakan sebagian besar pengrajin kemplang di Seberang Ulu memiliki daya listrik rumah tangga sebesar 900 VA hingga 1300 VA.',
    correctType: 'asumsi',
    explanation:
      'Pernyataan ini merupakan ASUMSI atau dugaan awal yang didasarkan pada profil rata-rata pelanggan rumah tangga UMKM, namun masih memerlukan sensus/survei langsung untuk memastikan kepastian setiap pengrajin.',
    sourceOrLabel: 'Profil Awal Studi Kelayakan UMKM Dinas Koperasi & UKM [Asumsi Kerja]'
  },
  {
    id: 'stmt-5',
    text: 'Memasang panel surya atau pengering surya di atap rumah pengrajin kemplang akan langsung memadamkan titik api kebakaran hutan di Ogan Komering Ilir.',
    correctType: 'opini',
    explanation:
      'Pernyataan ini KELIRU (Miskonsepsi Opini). Energi surya berkontribusi pada mitigasi emisi gas rumah kaca jangka panjang, namun TIDAK secara langsung memadamkan api karhutla gambut yang dipicu oleh faktor hidrologis gambut dan pembukaan lahan.',
    sourceOrLabel: 'Klaim Spekulatif [Miskonsepsi / Opini Tak Berdasar]'
  },
  {
    id: 'stmt-6',
    text: 'Berdasarkan data PLN, tarif listrik golongan R-1/1300 VA adalah Rp 1.444,70 per kWh, sehingga oven listrik berdaya 2.000 Watt (2 kW) yang beroperasi selama 6 jam per hari mengonsumsi energi 12 kWh dengan biaya listrik sekitar Rp 17.336 per hari.',
    correctType: 'bukti',
    explanation:
      'Pernyataan ini merupakan BUKTI matematis dan empiris yang didasarkan pada tarif regulasi resmi dan perhitungan fisika daya listrik (E = P × t).',
    sourceOrLabel: 'Lembar Tarif Tenaga Listrik PT PLN (Persero) [Bukti Kuantitatif Terverifikasi]'
  }
];

export const DRYING_ALTERNATIVES: DryingAlternative[] = [
  {
    id: 'alt-tradisional',
    name: 'Metode A: Penjemuran Tradisional Sinar Matahari Langsung',
    category: 'Tradisional Terbuka',
    shortDesc: 'Menjemur kemplang di atas rak bambu (lincak) di ruang terbuka memanfaatkan sinar matahari dan angin alami.',
    capex: 350000,
    opexPerMonth: 0,
    energySource: 'Radiasi matahari langsung & konveksi angin alami (tanpa biaya energi)',
    energyDemandDesc: 'Gratis, tidak membutuhkan pasokan listrik jaringan atau bahan bakar tambahan.',
    weatherDependency: 'Sangat Tinggi',
    weatherDependencyScore: 1,
    productionCapacity: '25 - 40 kg per hari (tergantung luas pekarangan dan intensitas sinar matahari)',
    capacityPerDayKg: 35,
    environmentalImpact: 'Nol emisi gas rumah kaca operasional; ramah iklim namun rentan terhadap polusi lingkungan lokal.',
    co2PerMonthKg: 0,
    hygieneLevel: 'Rendah - Sedang (Rentan debu jalan, lalat, serangga, dan jelaga asap karhutla saat musim kemarau).',
    userSuitability: 'Sangat cocok untuk pengrajin perintis dengan modal sangat terbatas (< Rp 1.000.000) dan berlokasi jauh dari jalan raya berdebu.',
    advantages: [
      'Modal awal sangat murah (hanya biaya pembuatan rak bambu/plastik penutup darurat).',
      'Biaya operasional energi 100% gratis.',
      'Sangat mudah dirakit dan tidak membutuhkan keterampilan teknis atau daya listrik.'
    ],
    limitations: [
      'Produksi terhenti total saat musim hujan berturut-turut.',
      'Saat terjadi kabut asap karhutla, partikulat jelaga PM2.5 berisiko mencemari produk makanan.',
      'Waktu pengeringan bervariasi (1 - 3 hari), sehingga kapasitas produksi tidak menentu.'
    ]
  },
  {
    id: 'alt-solar-dryer',
    name: 'Metode B: Pengering Surya (Solar Dryer Dome / Kolektor Rumah Kaca)',
    category: 'Teknologi Surya Tertutup',
    shortDesc: 'Kubah polikarbonat transparan dengan ventilasi exhaust fan bertenaga panel surya mini (DC), memanfaatkan efek rumah kaca.',
    capex: 5500000,
    opexPerMonth: 35000,
    energySource: 'Energi termal surya (efek rumah kaca) + panel surya mini 20Wp untuk exhaust fan',
    energyDemandDesc: 'Sistem mandiri (off-grid), exhaust fan otomatis berputar saat ada sinar matahari.',
    weatherDependency: 'Sedang',
    weatherDependencyScore: 3,
    productionCapacity: '50 - 70 kg per siklus pengeringan (suhu dalam kubah mencapai 45°C - 60°C)',
    capacityPerDayKg: 60,
    environmentalImpact: 'Nol emisi karbon operasional (100% energi terbarukan lokal); mendukung target transisi energi hijau.',
    co2PerMonthKg: 0,
    hygieneLevel: 'Sangat Tinggi (Ruang tertutup rapat, dilengkapi jaring filter anti serangga dan bebas dari jelaga debu asap luar).',
    userSuitability: 'Sangat cocok untuk kelompok UMKM / koperasi pengrajin dengan modal menengah (Rp 4–7 juta) yang mengutamakan higienitas dan sertifikasi halal/BPOM.',
    advantages: [
      'Higienitas terjamin standar industri pangan, terlindung dari hujan mendadak dan kabut asap.',
      'Suhu pengeringan 10°C - 20°C lebih tinggi dari suhu sekitar, mempercepat pengeringan menjadi 6 - 8 jam.',
      'Biaya operasional bulanan hampir nol karena fan digerakkan panel surya kecil mandiri.',
      'Dapat memanfaatkan program hibah teknologi tepat guna atau pembiayaan kelompok UMKM.'
    ],
    limitations: [
      'Membutuhkan area penempatan terbuka yang bebas bayangan pohon atau bangunan tinggi (minimal 3x4 meter).',
      'Jika mendung gelap sepanjang hari, suhu pengeringan tetap menurun meski kemplang tetap aman di dalam ruang tertutup.'
    ]
  },
  {
    id: 'alt-electric-dryer',
    name: 'Metode C: Mesin Pengering Listrik (Electric Cabinet Dryer)',
    category: 'Teknologi Elektrik Modern',
    shortDesc: 'Lemari pengering dengan elemen pemanas listrik resistif (heating coil) 2.000 Watt dan blower sirkulasi udara terkontrol digital.',
    capex: 7500000,
    opexPerMonth: 520000,
    energySource: 'Energi listrik jaringan PLN (daya 2.000 Watt continue selama siklus pengeringan)',
    energyDemandDesc: 'Konsumsi ~12 kWh per hari (6 jam operasional). Memerlukan daya tersambung minimal 2.200 VA.',
    weatherDependency: 'Rendah/Tidak Ada',
    weatherDependencyScore: 5,
    productionCapacity: '50 - 60 kg per hari (bisa beroperasi malam hari atau saat hujan badai tanpa henti)',
    capacityPerDayKg: 55,
    environmentalImpact: 'Jejak karbon ~300 kg CO2 per bulan jika listrik dipasok dari bauran PLTU batubara Sumatera Selatan.',
    co2PerMonthKg: 306,
    hygieneLevel: 'Sangat Tinggi (Ruang isolasi stainless steel tahan karat dengan sirkulasi udara termofiltrasi).',
    userSuitability: 'Sangat cocok untuk usaha skala industri menengah-besar yang memiliki kapasitas daya listrik ≥ 2.200 VA dan jadwal kontrak pengiriman ketat.',
    advantages: [
      '100% bebas dari pengaruh cuaca, hujan, mendung, maupun kabut asap luar.',
      'Suhu dan waktu pengeringan dapat diprogram secara presisi dengan termostat digital.',
      'Kualitas kekeringan kemplang sangat seragam sepanjang tahun.'
    ],
    limitations: [
      'Biaya operasional tagihan listrik tinggi (± Rp 520.000 per bulan pada tarif R-1/1300VA-2200VA).',
      'Rumah tangga pengrajin dengan daya 900 VA atau 1300 VA tidak dapat menyalakan alat tanpa menambah daya PLN (biaya tambah daya Rp 1,5–2,5 juta).',
      'Menyumbang emisi gas rumah kaca tidak langsung dari pembangkit listrik berbahan bakar fosil.'
    ]
  }
];

export const LITERACY_QUESTIONS: LiteracyQuestion[] = [
  {
    id: 1,
    indicator: 'Konsep Energi',
    question:
      'Dalam proses pengeringan kemplang basah menjadi kemplang kering, apa peran utama energi termal (panas) yang diserap dari radiasi matahari atau alat pengering?',
    options: [
      { key: 'A', text: 'Mengubah struktur kimia tepung tapioka menjadi minyak goreng' },
      { key: 'B', text: 'Memberikan kalor laten penguapan untuk mengubah molekul air dalam kemplang dari fase cair menjadi uap' },
      { key: 'C', text: 'Menghancurkan seluruh serat ikan agar kemplang menjadi lebih ringan' },
      { key: 'D', text: 'Menciptakan gaya gravitasi tambahan agar air menetes ke bawah rak' }
    ],
    correctKey: 'B',
    explanation:
      'Pengeringan adalah proses perpindahan panas dan massa. Kalor termal yang diserap kemplang digunakan untuk menaikkan suhu kemplang dan menyediakan kalor laten penguapan (Lv ≈ 2,26 × 10⁶ J/kg) agar kandungan air menguap ke udara sekitar.'
  },
  {
    id: 2,
    indicator: 'Sumber Energi',
    question:
      'Manakah pernyataan yang paling tepat mengenai karakteristik energi surya sebagai sumber energi terbarukan di wilayah Kota Palembang?',
    options: [
      { key: 'A', text: 'Energi surya hanya tersedia selama 2 jam per hari sehingga tidak layak dimanfaatkan' },
      { key: 'B', text: 'Energi surya di Palembang melimpah (rata-rata 4,5–5,2 kWh/m²/hari) namun bersifat intermiten (berfluktuasi menurut siklus siang-malam dan tutupan awan)' },
      { key: 'C', text: 'Energi surya menghasilkan polusi jelaga PM2.5 langsung di atas atap pengrajin' },
      { key: 'D', text: 'Energi surya di Palembang langsung habis setelah dipakai satu kali penjemuran' }
    ],
    correctKey: 'B',
    explanation:
      'Palembang memiliki insolasi surya tropis yang tinggi sepanjang tahun, namun bersifat intermiten karena mengikuti siklus rotasi bumi (siang-malam) dan kondisi meteorologis (tutupan awan, hujan, dan kabut asap).'
  },
  {
    id: 3,
    indicator: 'Konversi Energi',
    question:
      'Pada sistem pengering surya efek rumah kaca (Solar Dryer Dome), bagaimanakah urutan konversi energi yang terjadi?',
    options: [
      { key: 'A', text: 'Energi nuklir → Energi kimia → Energi mekanik' },
      { key: 'B', text: 'Energi radiasi elektromagnetik matahari → Diteruskan dinding polikarbonat → Diserap absorber menjadi energi termal (panas) yang memanaskan udara konveksi' },
      { key: 'C', text: 'Energi listrik PLN → Energi pegas → Energi bunyi' },
      { key: 'D', text: 'Energi kimia tapioka → Energi gravitasi → Energi radiasi' }
    ],
    correctKey: 'B',
    explanation:
      'Radiasi surya gelombang pendek masuk menembus polikarbonat transparan, diserap oleh rak atau lantai hitam (absorber), lalu diubah menjadi energi termal (kalor) yang memanaskan udara di dalam kubah. Udara panas ini bersirkulasi secara konveksi melintasi kemplang.'
  },
  {
    id: 4,
    indicator: 'Interpretasi Data',
    question:
      'Berdasarkan persamaan Q = I × A × t × η, jika luas kolektor (A) dinaikkan 2 kali lipat dan durasi penyinaran (t) tetap sama dengan efisiensi (η) konstan pada intensitas radiasi (I) yang sama, maka energi termal (Q) yang diserap sistem akan...',
    options: [
      { key: 'A', text: 'Turun menjadi separuh (0,5 kali semula)' },
      { key: 'B', text: 'Tetap tidak berubah' },
      { key: 'C', text: 'Meningkat menjadi 2 kali lipat dari semula' },
      { key: 'D', text: 'Meningkat menjadi 4 kali lipat dari semula' }
    ],
    correctKey: 'C',
    explanation:
      'Hubungan antara energi termal yang diserap (Q) dengan luas penampang kolektor (A) adalah berbanding lurus (proporsional linear). Jika A menjadi 2A, maka Q menjadi 2Q jika variabel lain dipertahankan konstan.'
  },
  {
    id: 5,
    indicator: 'Interpretasi Data',
    question:
      'Suatu kolektor surya mini memiliki luas 2 m² dan efisiensi 50% (η = 0,5). Jika terpapar radiasi rata-rata 800 W/m² selama 3 jam (10.800 detik), berapakah total energi termal Q yang diserap dalam satuan MegaJoule (MJ)?',
    options: [
      { key: 'A', text: '8,64 MJ' },
      { key: 'B', text: '17,28 MJ' },
      { key: 'C', text: '34,56 MJ' },
      { key: 'D', text: '4,32 MJ' }
    ],
    correctKey: 'A',
    explanation:
      'Q = I × A × t × η = 800 W/m² × 2 m² × 10.800 s × 0,5 = 8.640.000 Joule = 8,64 MegaJoule (MJ).'
  },
  {
    id: 6,
    indicator: 'Evaluasi Pemanfaatan Energi',
    question:
      'Mengapa model matematis Q = I × A × t × η TIDAK dapat langsung dijadikan acuan tunggal untuk memprediksi waktu tuntasnya pengeringan kemplang?',
    options: [
      { key: 'A', text: 'Karena energi matahari tidak memiliki satuan Joule dalam fisika' },
      { key: 'B', text: 'Karena pengeringan bahan pangan melibatkan perpindahan massa air, kelembaban udara (RH), aliran konveksi, ketebalan bahan, dan resistensi difusi air dari dalam kemplang' },
      { key: 'C', text: 'Karena kemplang tidak pernah menyerap energi panas sama sekali' },
      { key: 'D', text: 'Karena efisiensi pengering surya selalu bernilai 100% pada semua kondisi' }
    ],
    correctKey: 'B',
    explanation:
      'Model fisika radiasi Q mengukur energi kalor teoritis yang diserap sistem, namun laju pengeringan kemplang nyata dipengaruhi dinamika perpindahan massa (difusi air dari inti kemplang ke permukaan), kelembaban relatif udara (RH), kecepatan sirkulasi angin, dan ketebalan keping kerupuk.'
  },
  {
    id: 7,
    indicator: 'Evaluasi Pemanfaatan Energi',
    question:
      'Sebuah UMKM kemplang rumahan di Palembang memiliki daya listrik 900 VA dan modal tabungan Rp 1.500.000. Manakah evaluasi pemanfaatan energi yang paling tepat untuk UMKM tersebut?',
    options: [
      { key: 'A', text: 'Memaksa membeli oven listrik 2.000 Watt karena paling modern tanpa memperhitungkan MCB listrik yang pasti anjlok' },
      { key: 'B', text: 'Mengoptimalkan penjemuran matahari dengan modifikasi rak bertingkat higienis berpenutup plastik UV terjangkau sambil mengumpulkan modal' },
      { key: 'C', text: 'Berhenti berproduksi kemplang selamanya karena tidak punya solar dome' },
      { key: 'D', text: 'Menggunakan genset diesel berbahan bakar solar 10 liter per hari di dalam dapur tertutup' }
    ],
    correctKey: 'B',
    explanation:
      'Evaluasi pemanfaatan energi harus kontekstual terhadap kapasitas modal dan daya listrik pengguna. Dengan modal Rp 1,5 juta dan daya 900 VA, oven listrik tidak layak dioperasikan; solusi bertahap yang paling rasional adalah perbaikan higienitas penjemuran matahari semi-tertutup yang hemat biaya.'
  },
  {
    id: 8,
    indicator: 'Sumber Energi',
    question:
      'Manakah pernyataan yang BENAR mengenai keterkaitan antara transisi energi terbarukan (seperti energi surya) dengan peristiwa kebakaran hutan dan lahan (karhutla) di Sumatera Selatan?',
    options: [
      { key: 'A', text: 'Memasang pengering surya di rumah secara langsung memadamkan titik api di lahan gambut' },
      { key: 'B', text: 'Pemanfaatan energi surya berkontribusi pada pengurangan emisi gas rumah kaca jangka panjang, namun pencegahan karhutla memerlukan tata kelola hidrologi gambut dan penegakan hukum pembukaan lahan' },
      { key: 'C', text: 'Karhutla disebabkan oleh pemasangan panel surya yang terlalu banyak di pedesaan' },
      { key: 'D', text: 'Energi surya sama sekali tidak memiliki manfaat apa pun di daerah yang mengalami kabut asap' }
    ],
    correctKey: 'B',
    explanation:
      'Sangat penting menghindari miskonsepsi: energi surya adalah mitigasi iklim global dan diversifikasi energi bersih, tetapi karhutla gambut dipicu oleh pengeringan saluran kanal dan pembakaran lahan oleh manusia yang memerlukan restorasi hidrologi gambut dan regulasi hukum.'
  },
  {
    id: 9,
    indicator: 'Konversi Energi',
    question:
      'Jika sebuah pengering listrik 2.000 Watt dioperasikan selama 6 jam per hari, dan faktor emisi bauran listrik jaringan rata-rata adalah 0,85 kg CO2 per kWh, berapakah perkiraan emisi karbon tidak langsung yang dihasilkan dalam sebulan (30 hari)?',
    options: [
      { key: 'A', text: '12 kg CO2' },
      { key: 'B', text: '102 kg CO2' },
      { key: 'C', text: '306 kg CO2' },
      { key: 'D', text: '3.600 kg CO2' }
    ],
    correctKey: 'C',
    explanation:
      'Energi harian = 2 kW × 6 jam = 12 kWh/hari. Energi bulanan = 12 × 30 = 360 kWh. Total emisi CO2 = 360 kWh × 0,85 kg CO2/kWh = 306 kg CO2 per bulan.'
  },
  {
    id: 10,
    indicator: 'Evaluasi Pemanfaatan Energi',
    question:
      'Ketika terjadi kabut asap kiriman karhutla di Palembang yang menyebabkan kadar PM2.5 mencapai tingkat tidak sehat, keunggulan fisik utama Solar Dryer Dome dibandingkan penjemuran tradisional terbuka adalah...',
    options: [
      { key: 'A', text: 'Solar Dryer Dome menghasilkan api di dalamnya sehingga kemplang terpanggang otomatis' },
      { key: 'B', text: 'Ruang tertutup dengan filter ventilasi mencegah partikulat jelaga beracun menempel pada kemplang, sekaligus mempertahankan suhu pengeringan lebih tinggi dibanding udara luar yang dingin akibat tutupan asap' },
      { key: 'C', text: 'Solar Dryer Dome tidak membutuhkan sinar matahari sama sekali' },
      { key: 'D', text: 'Solar Dryer Dome mengubah asap karbon monoksida menjadi oksigen murni' }
    ],
    correctKey: 'B',
    explanation:
      'Fungsi protektif Solar Dryer Dome terletak pada isolasi fisik ruang terhadap kontaminan udara luar (seperti jelaga PM2.5 dari kabut asap) dan pemanfaatan efek rumah kaca untuk memaksimalkan penyerapan radiasi matahari yang tersisa.'
  }
];

export const DECISION_RUBRIC_ASPECTS: RubricAspect[] = [
  {
    id: 'rubric-1',
    aspectName: '1. Kualitas Identifikasi Masalah',
    description: 'Kemampuan mengenali akar masalah produksi, kendala cuaca, modal, dan sanitasi UMKM kemplang.',
    levels: [
      {
        score: 4,
        label: 'Sangat Baik (Skor 4)',
        description: 'Mengidentifikasi masalah secara komprehensif mencakup kendala cuaca/kabut asap, higienitas pangan, keterbatasan modal, daya listrik, dan kebutuhan kapasitas produksi.'
      },
      {
        score: 3,
        label: 'Baik (Skor 3)',
        description: 'Mengidentifikasi masalah utama (cuaca dan biaya), namun melewatkan aspek daya listrik atau standar higienitas pangan.'
      },
      {
        score: 2,
        label: 'Cukup (Skor 2)',
        description: 'Menyebutkan masalah secara parsial atau superfisial (misal: "kemplang basah kalau hujan") tanpa analisis konteks UMKM.'
      },
      {
        score: 1,
        label: 'Perlu Bimbingan (Skor 1)',
        description: 'Gagal mengidentifikasi masalah nyata atau menyalin ulang teks tanpa pemahaman masalah.'
      }
    ]
  },
  {
    id: 'rubric-2',
    aspectName: '2. Penentuan Kriteria Keputusan',
    description: 'Menetapkan dan memberi bobot kriteria evaluasi (biaya investasi, biaya operasional, cuaca, lingkungan, daya listrik).',
    levels: [
      {
        score: 4,
        label: 'Sangat Baik (Skor 4)',
        description: 'Menetapkan kriteria yang relevan, berimbang, terukur, dan memberi pertimbangan kontekstual terhadap kondisi spesifik pelaku usaha.'
      },
      {
        score: 3,
        label: 'Baik (Skor 3)',
        description: 'Menetapkan minimal 4 kriteria relevan, tetapi belum memberikan pembobotan yang jelas terhadap prioritas kondisi UMKM.'
      },
      {
        score: 2,
        label: 'Cukup (Skor 2)',
        description: 'Hanya menggunakan 1-2 kriteria sederhana (misal: hanya melihat harga murah).'
      },
      {
        score: 1,
        label: 'Perlu Bimbingan (Skor 1)',
        description: 'Tidak merumuskan kriteria keputusan yang jelas atau kriteria tidak relevan dengan sains dan ekonomi.'
      }
    ]
  },
  {
    id: 'rubric-3',
    aspectName: '3. Evaluasi & Perbandingan Alternatif',
    description: 'Membandingkan kelebihan dan kekurangan ketiga alternatif secara objektif berdasarkan matriks data.',
    levels: [
      {
        score: 4,
        label: 'Sangat Baik (Skor 4)',
        description: 'Menganalisis ketiga alternatif secara mendalam, membandingkan trade-off (kelebihan dan konsekuensi) secara seimbang tanpa bias prematur.'
      },
      {
        score: 3,
        label: 'Baik (Skor 3)',
        description: 'Membandingkan ketiga alternatif namun penjelasannya belum merata (hanya fokus pada alternatif yang disukai).'
      },
      {
        score: 2,
        label: 'Cukup (Skor 2)',
        description: 'Hanya membandingkan 2 alternatif atau evaluasi bersifat deskriptif tanpa mengaitkan ke matriks data.'
      },
      {
        score: 1,
        label: 'Perlu Bimbingan (Skor 1)',
        description: 'Tidak membandingkan alternatif secara sistematis atau memanipulasi informasi.'
      }
    ]
  },
  {
    id: 'rubric-4',
    aspectName: '4. Penggunaan Bukti Konkret (Evidence Use)',
    description: 'Mengutip data angka kuantitatif, fakta ilmiah, atau aturan tarif resmi untuk menyokong argumen.',
    levels: [
      {
        score: 4,
        label: 'Sangat Baik (Skor 4)',
        description: 'Mengutip bukti data kuantitatif spesifik (misal: angka Capex Rp, Opex Rp/bulan, emisi kg CO2, intensitas radiasi W/m², atau batas daya VA) secara tepat dan akurat.'
      },
      {
        score: 3,
        label: 'Baik (Skor 3)',
        description: 'Menyebutkan data bukti, namun interpretasi angka masih kurang lengkap atau terdapat kesalahan kecil dalam pembacaan satuan.'
      },
      {
        score: 2,
        label: 'Cukup (Skor 2)',
        description: 'Menyebutkan klaim umum tanpa mengutip angka bukti konkret dari tabel data pembanding.'
      },
      {
        score: 1,
        label: 'Perlu Bimbingan (Skor 1)',
        description: 'Tidak menyertakan bukti sama sekali; argumen hanya berlandaskan opini pribadi atau selera subjektif.'
      }
    ]
  },
  {
    id: 'rubric-5',
    aspectName: '5. Justifikasi Pilihan & Penalaran Logis',
    description: 'Membangun alur logika menghubungkan masalah, kriteria, bukti data, dan pilihan solusi akhir.',
    levels: [
      {
        score: 4,
        label: 'Sangat Baik (Skor 4)',
        description: 'Alur penalaran sangat koheren; mengartikulasikan dengan jelas mengapa pilihan tersebut paling rasional untuk skenario UMKM yang dihadapi.'
      },
      {
        score: 3,
        label: 'Baik (Skor 3)',
        description: 'Penalaran logis dan dapat dipahami, namun ada sedikit celah dalam argumen transisi antara bukti dan simpulan.'
      },
      {
        score: 2,
        label: 'Cukup (Skor 2)',
        description: 'Penalaran melompat-lompat atau justifikasi hanya mengulang deskripsi produk tanpa analisis kritis.'
      },
      {
        score: 1,
        label: 'Perlu Bimbingan (Skor 1)',
        description: 'Tidak ada alur penalaran yang jelas; kesimpulan tidak nyambung dengan kriteria atau bukti.'
      }
    ]
  },
  {
    id: 'rubric-6',
    aspectName: '6. Evaluasi Keterbatasan & Kebutuhan Data Lanjutan',
    description: 'Mengenali kelemahan/risiko dari solusi yang dipilih serta merumuskan informasi tambahan yang perlu dicari.',
    levels: [
      {
        score: 4,
        label: 'Sangat Baik (Skor 4)',
        description: 'Mampu secara kritis mengakui keterbatasan solusi yang dipilih (tidak mengklaim solusinya sempurna) dan merumuskan data spesifik yang masih dibutuhkan.'
      },
      {
        score: 3,
        label: 'Baik (Skor 3)',
        description: 'Menyebutkan keterbatasan solusi, namun belum merumuskan rencana pencarian data tambahan secara terarah.'
      },
      {
        score: 2,
        label: 'Cukup (Skor 2)',
        description: 'Hanya menyebutkan kelemahan seadanya tanpa memahami implikasinya bagi operasional UMKM.'
      },
      {
        score: 1,
        label: 'Perlu Bimbingan (Skor 1)',
        description: 'Mengklaim solusinya tidak memiliki kelemahan sama sekali (overconfident) dan tidak merasa butuh data tambahan.'
      }
    ]
  }
];

export const SCIENTIFIC_REFERENCES = [
  {
    title: 'Solar Energy Engineering: Processes and Systems',
    authors: 'Kalogirou, S. A.',
    year: '2014',
    publisher: 'Academic Press / Elsevier',
    detail: 'Buku rujukan utama pemodelan termal kolektor surya, neraca energi radiasi, dan efisiensi sistem pengering surya efek rumah kaca.'
  },
  {
    title: 'Energy Literacy: What Every Citizen Should Know About Energy',
    authors: 'DeWaters, J. E., & Powers, S. E.',
    year: '2011',
    publisher: 'Journal of Environmental Education, 42(3), 169–185',
    detail: 'Kerangka konseptual pengukuran literasi energi yang mencakup dimensi kognitif (pemahaman konsep & konversi), afektif, dan pengambilan keputusan behavioral.'
  },
  {
    title: 'Preservice Teachers’ Informal Reasoning About Socioscientific Issues: The influence of morality and content knowledge',
    authors: 'Sadler, T. D., & Zeidler, D. L.',
    year: '2005',
    publisher: 'Science Education, 89(1), 112–134',
    detail: 'Landasan teoretis pengambilan keputusan berbasis bukti dalam isu sosiosaintifik (SSI), membedakan fakta, bukti ilmiah, dan penalaran moral.'
  },
  {
    title: 'Kajian Karakteristik Radiasi Surya dan Potensi Energi Terbarukan di Wilayah Sumatera Bagian Selatan',
    authors: 'Pusat Riset Iklim dan Atmosfer - BRIN & BMKG',
    year: '2022',
    publisher: 'Jurnal Sains Dirgantara & Atmosfer Tropis',
    detail: 'Data insolasi radiasi matahari di Palembang rata-rata 4,8 kWh/m²/hari dan analisis hamburan aerosol akibat kebakaran lahan gambut (karhutla).'
  },
  {
    title: 'Pengembangan Teknologi Pengering Efek Rumah Kaca (Solar Dryer Dome) untuk Produk Hasil Perikanan dan Kerupuk Kemplang Tradisional',
    authors: 'Tim Peneliti Etnosains & Rekayasa Pangan Universitas Sriwijaya',
    year: '2023',
    publisher: 'Jurnal Keteknikan Pertanian dan Rekayasa Energi Terbarukan',
    detail: 'Hasil uji komparatif suhu, efisiensi termal, higienitas pangan (bebas PM2.5), dan profil penurunan kadar air kemplang Palembang.'
  }
];
