import { CompanionAvatar, GameBadge, LeaderboardEntry, LevelChallenge } from '../types';

export const COMPANION_AVATARS: CompanionAvatar[] = [
  {
    id: 'bujang-surya',
    name: 'Bujang Surya',
    title: 'Penjelajah Fisika Energi Muda',
    role: 'Pemandu Konversi & Radiasi Surya',
    avatarIcon: '☀️',
    tagline: 'Mengubah terik matahari Palembang jadi energi bermanfaat!',
    colorScheme: {
      bg: 'bg-amber-500',
      border: 'border-amber-400',
      text: 'text-amber-950',
      accent: 'from-amber-500 to-orange-600'
    },
    greetings: [
      'Halo Sahabat Energi! Mari kita buktikan radiasi matahari Palembang bisa dihitung dengan fisika!',
      'Siap berpetualang di tepian Sungai Musi? Ayo kita jemur kemplang dengan energi surya terbaik!'
    ],
    encouragements: [
      'Luar biasa! Lompatan energimu tepat sasaran!',
      'Mantap! Konversi energi radiasi surya bekerja optimal!',
      'Hebat! Kamu mulai memahami hubungan fluks radiasi dan laju pengeringan!'
    ],
    tips: {
      level1: [
        'Arahkan karakter dengan panah keyboard atau tombol layar sentuh!',
        'Kumpulkan semua koin pengetahuan surya untuk membuka kartu edukasi!',
        'Hindari asap gambut karhutla agar kemplang tidak tercemar jelaga!'
      ],
      level2: [
        'Perhatikan perbedaan perpindahan kalor: radiasi langsung vs konveksi udara hangat!',
        'Catat pengaruh kadar air kemplang terhadap kerenyahan saat digoreng/dipanggang.'
      ],
      level3: [
        'Coba variasikan luas penampang (A) dan intensitas (I) untuk melihat perubahan energi total (E = I × A × t × η).',
        'Simpan minimal 2-3 data percobaan untuk membuat grafik perbandingan!'
      ],
      level4: [
        'Pilah argumen dengan kritis: manakah fakta berbasis data dan mana asumsi subjektif!',
        'Kabut asap karhutla menghasilkan partikel PM2.5 yang berbahaya bagi makanan terbuka.'
      ],
      level5: [
        'Bantu Ibu Salmah memilih teknologi yang sesuai modal tabungan dan kapasitas listrik 1300 VA!',
        'Pertimbangkan dampak jangka panjang biaya listrik dan kesehatan lingkungan.'
      ]
    }
  },
  {
    id: 'gadis-musi',
    name: 'Gadis Musi',
    title: 'Peneliti Etnosains Kuliner Palembang',
    role: 'Ahli Tradisi Kemplang & Sains Pangan',
    avatarIcon: '🌸',
    tagline: 'Menjaga kearifan lokal wong kito dengan sains modern!',
    colorScheme: {
      bg: 'bg-rose-500',
      border: 'border-rose-400',
      text: 'text-rose-950',
      accent: 'from-rose-500 to-pink-600'
    },
    greetings: [
      'Assalamu’alaikum! Senang belajar bersamamu. Tradisi kemplang Palembang kaya akan sains lho!',
      'Kemplang gurih berawal dari penjemuran yang higienis dan panas yang merata. Ayo kita bantu Ibu Salmah!'
    ],
    encouragements: [
      'Wah, cermat sekali analisismu!',
      'Kemplang kita bakal mengembang mekar sempurna dengan panas seperti ini!',
      'Bagus sekali! Sains dan budaya lokal berpadu indah di tanganmu!'
    ],
    tips: {
      level1: [
        'Perhatikan pijakan bambu tradisional di atas panggung rumah rakit!',
        'Jaga kebersihan kemplang dari debu jalanan dan asap sekitar.'
      ],
      level2: [
        'Kadar air kemplang ideal sebelum dipanggang adalah sekitar 10-12%.',
        'Jika kadar air terlalu tinggi, kemplang akan bantat dan tidak mekar saat dimasak!'
      ],
      level3: [
        'Efisiensi rak bambu terbuka hanya sekitar 15-20%, sedangkan Solar Dryer Dome bisa mencapai 45-60%!'
      ],
      level4: [
        'Kesehatan warga Palembang sering terganggu ISPA saat musim karhutla. Perlindungan pangan sangat penting!'
      ],
      level5: [
        'Perhatikan daya listrik rumah UMKM di Palembang, rata-rata 900 - 1300 VA. Jangan sampai listrik anjlok!'
      ]
    }
  },
  {
    id: 'kempli',
    name: 'Kempli',
    title: 'Maskot Kemplang Pintar Berpikir Kritis',
    role: 'Detektif Sains & Semangat Belajar',
    avatarIcon: '🍘',
    tagline: 'Kriuk, gurih, dan penuh ilmu fisika!',
    colorScheme: {
      bg: 'bg-amber-400',
      border: 'border-amber-300',
      text: 'text-amber-900',
      accent: 'from-amber-400 to-yellow-500'
    },
    greetings: [
      'Kriuuuk! Aku Kempli! Siap membantumu jadi Master Penjemuran Tradisional Palembang!',
      'Jangan biarkan aku basah terkena hujan atau hitam terkena asap ya! Lindungi aku dengan teknologi surya!'
    ],
    encouragements: [
      'Kriuuuk mantap! Nilai skormu meroket tinggi!',
      'Awas gosong! Eh maksudnya keren banget lompatanmu!',
      'Kempli bangga padamu! Kita satu langkah lebih dekat membuka level berikutnya!'
    ],
    tips: {
      level1: [
        'Gunakan tombol lompat ganda atau tekan tombol arah lebih mantap!',
        'Kumpulkan koin sampai 100% untuk lencana Master!'
      ],
      level2: [
        'Baca kartu etnosains untuk memahami rumus fisika kalor penguapan air!'
      ],
      level3: [
        'Uji pengaruh cuaca: coba saat radiasi 900 W/m² vs saat 500 W/m² mendung!'
      ],
      level4: [
        'Tonton video dokumenter Karhutla Palembang di Pusat Video Edukasi!'
      ],
      level5: [
        'Pilih opsi yang ramah lingkungan dan tidak boros tagihan listrik PLN bulanan!'
      ]
    }
  },
  {
    id: 'prof-raden',
    name: 'Prof. Raden',
    title: 'Mentor Fisika Lingkungan & Energi Terbarukan',
    role: 'Pakar Transisi Energi & Kebijakan Sains',
    avatarIcon: '🧑‍🏫',
    tagline: 'Keputusan berbasis bukti ilmiah menyelamatkan masa depan bumi.',
    colorScheme: {
      bg: 'bg-emerald-600',
      border: 'border-emerald-500',
      text: 'text-emerald-950',
      accent: 'from-emerald-600 to-teal-700'
    },
    greetings: [
      'Selamat datang para calon ilmuwan muda! Di era krisis iklim, literasi energi adalah kompetensi kunci.',
      'Mari kita pelajari bagaimana hukum termodinamika diterapkan pada mitigasi sosiosaintifik Sumatera Selatan.'
    ],
    encouragements: [
      'Argumen ilmiah yang sangat tajam dan objektif!',
      'Data adalah raja dalam pengambilan keputusan sains. Kerja bagus!',
      'Kamu menunjukkan kapasitas berpikir tingkat tinggi (HOTS) yang mengesankan!'
    ],
    tips: {
      level1: [
        'Perhatikan konsep energi kinetik saat melompat dan energi potensial gravitasi!',
        'Setiap level harus diselesaikan berurutan untuk membentuk penalaran utuh.'
      ],
      level2: [
        'Analisis data radiasi matahari rata-rata Kota Palembang: 4.5 hingga 5.2 kWh/m²/hari.'
      ],
      level3: [
        'Gunakan rumus: E = I × A × t × η. Catat satuan secara presisi dalam SI (Joule) dan kWh.'
      ],
      level4: [
        'Pahami trade-off sosio-ekologis: pembukaan lahan gambut murah bagi oknum tetapi merugikan publik miliaran rupiah.'
      ],
      level5: [
        'Gunakan matriks pembobotan kriteria: biaya awal, biaya operasional, higienitas, dan dampak lingkungan.'
      ]
    }
  }
];

export const INITIAL_BADGES: GameBadge[] = [
  {
    id: 'badge-level1-master',
    title: 'Master Penjemuran Tradisional',
    description: 'Selesaikan tantangan Level 1, kumpulkan semua koin pengetahuan, dan capai skor minimal 500 poin.',
    icon: '🏆',
    category: 'game',
    levelRequirement: 'Level 1: Game Petualangan Energi',
    unlocked: false
  },
  {
    id: 'badge-solar-seeker',
    title: 'Pencari Jejak Surya',
    description: 'Membuka seluruh 5 Kartu Pengetahuan Sains Etnosains & Radiasi Matahari.',
    icon: '☀️',
    category: 'game',
    levelRequirement: 'Level 1: Eksplorasi Koin Pengetahuan',
    unlocked: false
  },
  {
    id: 'badge-clean-air',
    title: 'Penjaga Langit Bersih',
    description: 'Berhasil mencapai garis akhir tanpa terkena paparan asap gambut karhutla.',
    icon: '🍃',
    category: 'game',
    levelRequirement: 'Level 1: Rintangan Asap Gambut',
    unlocked: false
  },
  {
    id: 'badge-ethno-scholar',
    title: 'Penjelajah Etnosains Palembang',
    description: 'Menyelesaikan eksplorasi fisika pembuatan kemplang dan menjawab kuis pemahaman konsep.',
    icon: '📜',
    category: 'etnosains',
    levelRequirement: 'Level 2: Energy Explorer',
    unlocked: false
  },
  {
    id: 'badge-lab-expert',
    title: 'Laboran Cerdas Radiasi',
    description: 'Melakukan minimal 3 variasi uji simulasi laboratorium surya dan merumuskan kesimpulan matematis.',
    icon: '🔬',
    category: 'lab',
    levelRequirement: 'Level 3: Laboratorium Surya Virtual',
    unlocked: false
  },
  {
    id: 'badge-eco-hero',
    title: 'Pahlawan Ekologi Palembang',
    description: 'Menganalisis isu sosiosaintifik kabut asap karhutla dan membedakan fakta ilmiah dari opini.',
    icon: '🌏',
    category: 'lingkungan',
    levelRequirement: 'Level 4: Misi Isu Sosiosaintifik',
    unlocked: false
  },
  {
    id: 'badge-decision-master',
    title: 'Arsitek Keputusan Bijak',
    description: 'Menyelesaikan matriks keputusan multi-kriteria untuk UMKM Kemplang Ibu Salmah secara komprehensif.',
    icon: '⚖️',
    category: 'keputusan',
    levelRequirement: 'Level 5: Tantangan Pengambilan Keputusan',
    unlocked: false
  }
];

export const INITIAL_CHALLENGES: LevelChallenge[] = [
  {
    id: 'chal-level1-master',
    title: 'Level 1: Master Penjemuran Tradisional',
    subtitle: 'Tantangan Utama Permainan',
    description: 'Raih skor minimal 500 poin dengan mengumpulkan koin surya dan mencapai Rumah Produksi Kemplang.',
    target: 500,
    current: 0,
    unit: 'Poin',
    rewardPoints: 200,
    rewardBadgeId: 'badge-level1-master',
    completed: false
  },
  {
    id: 'chal-coins-collector',
    title: 'Kolektor 5 Kartu Surya',
    subtitle: 'Eksplorasi Pengetahuan',
    description: 'Temukan dan ambil semua 5 koin emas pengetahuan fisika & etnosains di arena panggung kemplang.',
    target: 5,
    current: 0,
    unit: 'Koin',
    rewardPoints: 150,
    rewardBadgeId: 'badge-solar-seeker',
    completed: false
  },
  {
    id: 'chal-hygiene-guardian',
    title: 'Higienitas Bebas Debu Asap',
    subtitle: 'Ketahanan Lingkungan',
    description: 'Capai garis akhir secara utuh untuk membuktikan kemplang kering higienis tanpa tercemar asap.',
    target: 1,
    current: 0,
    unit: 'Misi',
    rewardPoints: 100,
    rewardBadgeId: 'badge-clean-air',
    completed: false
  }
];

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'lb-1',
    name: 'Ahmad Fadhil',
    school: 'SMA Negeri 1 Palembang',
    score: 850,
    kemplangCount: 18,
    avatarId: 'bujang-surya',
    badgeTitle: 'Master Penjemuran Tradisional',
    rank: 1,
    date: 'Hari ini'
  },
  {
    id: 'lb-2',
    name: 'Siti Nurhaliza',
    school: 'SMA Plus Negeri 17 Palembang',
    score: 800,
    kemplangCount: 16,
    avatarId: 'gadis-musi',
    badgeTitle: 'Master Penjemuran Tradisional',
    rank: 2,
    date: 'Hari ini'
  },
  {
    id: 'lb-3',
    name: 'Rian Pratama',
    school: 'SMA Kusuma Bangsa Palembang',
    score: 750,
    kemplangCount: 15,
    avatarId: 'kempli',
    badgeTitle: 'Pencari Jejak Surya',
    rank: 3,
    date: 'Kemarin'
  },
  {
    id: 'lb-4',
    name: 'Dinda Lestari',
    school: 'MAN Insan Cendekia OKI',
    score: 700,
    kemplangCount: 14,
    avatarId: 'gadis-musi',
    badgeTitle: 'Pencari Jejak Surya',
    rank: 4,
    date: 'Kemarin'
  },
  {
    id: 'lb-5',
    name: 'M. Rizky Ilham',
    school: 'SMA Negeri 3 Unggulan Kayuagung',
    score: 650,
    kemplangCount: 13,
    avatarId: 'bujang-surya',
    badgeTitle: 'Penjaga Langit Bersih',
    rank: 5,
    date: '2 hari lalu'
  },
  {
    id: 'lb-6',
    name: 'Putri Maharani',
    school: 'SMA Negeri 6 Palembang',
    score: 600,
    kemplangCount: 12,
    avatarId: 'prof-raden',
    badgeTitle: 'Penjaga Langit Bersih',
    rank: 6,
    date: '3 hari lalu'
  }
];
