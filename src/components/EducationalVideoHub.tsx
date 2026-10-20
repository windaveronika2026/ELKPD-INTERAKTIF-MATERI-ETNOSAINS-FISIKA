import React, { useState, useEffect, useRef } from 'react';
import {
  Video,
  Play,
  Pause,
  RotateCcw,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Sun,
  ShieldCheck,
  ExternalLink,
  BookOpen,
  Sliders,
  Wind,
  Gauge,
  HelpCircle,
  Search,
  Eye,
  Layers,
  ThermometerSun,
  Fan
} from 'lucide-react';
import { sound } from '../utils/audio';

interface Props {
  onSaveVideoNotes?: (notes: string) => void;
  savedVideoNotes?: string;
}

interface CuratedVideo {
  id: string;
  title: string;
  source: string;
  category: 'karhutla' | 'energi';
  defaultYoutubeId: string;
  youtubeSearchQuery: string;
  description: string;
  keyTimestamps: { time: string; title: string; note: string }[];
  verifiedInsights: string[];
}

export const EducationalVideoHub: React.FC<Props> = ({
  onSaveVideoNotes,
  savedVideoNotes = ''
}) => {
  // Main view mode: 'simulator' (interactive offline) or 'youtube' (video player)
  const [viewMode, setViewMode] = useState<'simulator' | 'youtube'>('simulator');
  
  // Simulator selection: 'karhutla-haze' or 'solar-dome'
  const [simulatorType, setSimulatorType] = useState<'karhutla-haze' | 'solar-dome'>('solar-dome');

  // Video selection & player state
  const [selectedVideoKey, setSelectedVideoKey] = useState<'karhutla' | 'energi'>('energi');
  const [customYoutubeUrl, setCustomYoutubeUrl] = useState('');
  const [activeYoutubeId, setActiveYoutubeId] = useState('v2Bw8Kj7b1I');
  const [iframeError, setIframeError] = useState(false);
  const [reflectionText, setReflectionText] = useState(savedVideoNotes);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // --- SIMULATOR 1 STATE: Peat Fire Haze & Solar Attenuation ---
  const [pm25Level, setPm25Level] = useState<number>(180); // µg/m³
  const [windSpeed, setWindSpeed] = useState<number>(12); // km/h
  const [hotspotCount, setHotspotCount] = useState<number>(45); // titik api OKI/OI
  const [isSim1Running, setIsSim1Running] = useState<boolean>(true);
  const sim1CanvasRef = useRef<HTMLCanvasElement | null>(null);

  // --- SIMULATOR 2 STATE: Solar Dryer Dome Thermal Engineering ---
  const [solarRadiation, setSolarRadiation] = useState<number>(850); // W/m²
  const [collectorArea, setCollectorArea] = useState<number>(2.5); // m²
  const [durationHours, setDurationHours] = useState<number>(5); // hours
  const [domeEfficiency, setDomeEfficiency] = useState<number>(52); // %
  const [fanActive, setFanActive] = useState<boolean>(true);
  const [sim2AnimFrame, setSim2AnimFrame] = useState<number>(0);
  const sim2CanvasRef = useRef<HTMLCanvasElement | null>(null);

  const curatedVideos: Record<'karhutla' | 'energi', CuratedVideo> = {
    karhutla: {
      id: 'karhutla',
      title: 'Dampak Kabut Asap Karhutla Gambut & Indeks PM2.5 di Sumatera Selatan',
      source: 'Dokumentasi Edukasi Sosiosaintifik & BMKG Sumsel',
      category: 'karhutla',
      defaultYoutubeId: '7P8eJ3KkJqg', // Curated educational video ID
      youtubeSearchQuery: 'kabut asap palembang karhutla oki sumatera selatan',
      description:
        'Dokumentasi visual investigatif mengenai dinamika kebakaran lahan gambut di Ogan Komering Ilir (OKI), sebaran partikulat aerosol jelaga (PM2.5) melintasi Sungai Musi dan Jembatan Ampera, serta ancaman kontaminasi fisik dan karsinogenik terhadap pengeringan kemplang tradisional.',
      keyTimestamps: [
        { time: '01:10', title: 'Titik Api Lahan Gambut OKI & OI', note: 'Karakteristik kebakaran smoldering bawah permukaan tanah gambut kering.' },
        { time: '02:40', title: 'Lonjakan Partikulat PM2.5 di Palembang', note: 'Aerosol menghamburkan sinar matahari dan mereduksi radiasi langsung hingga 40%.' },
        { time: '04:15', title: 'Ancaman Kontaminasi Kerupuk Kemplang', note: 'Jelaga karbon hitam menempel pada adonan basah jika dijemur di rak terbuka.' },
        { time: '05:50', title: 'Batas Konseptual Energi Surya', note: 'Energi surya memitigasi emisi global, bukan memadamkan api gambut bawah tanah.' }
      ],
      verifiedInsights: [
        'Konsentrasi PM2.5 di atas 150 µg/m³ tergolong Sangat Tidak Sehat menurut standar BMKG & WHO.',
        'Partikel aerosol menghamburkan radiasi gelombang pendek (Hamburan Rayleigh & Mie), menurunkan intensitas radiasi matahari yang sampai ke permukaan bumi.',
        'Pengeringan di ruang terbuka saat musim karhutla berisiko tinggi mencemari produk pangan dengan senyawa hidrokarbon aromatik polisiklik (PAH).'
      ]
    },
    energi: {
      id: 'energi',
      title: 'Teknologi Solar Dryer Dome & Konversi Energi Surya Efek Rumah Kaca',
      source: 'Rekayasa Fisika Termal & Tepat Guna Pertanian/Pangan',
      category: 'energi',
      defaultYoutubeId: 'v2Bw8Kj7b1I', // Curated thermal solar drying demo ID
      youtubeSearchQuery: 'solar dryer dome pengering surya efek rumah kaca',
      description:
        'Demonstrasi prinsip fisika termal teknologi Solar Dryer Dome: polikarbonat transparan meneruskan radiasi surya gelombang pendek, menyerapnya menjadi kalor gelombang panjang (inframerah) yang terperangkap di dalam kubah (efek rumah kaca), menaikkan suhu 10°C–20°C di atas suhu lingkungan, dan mengusir kelembaban melalui exhaust fan bertenaga surya.',
      keyTimestamps: [
        { time: '00:50', title: 'Prinsip Kubah Polikarbonat', note: 'Transmisi radiasi surya 85% dan insulasi panas mempertahankan kalor di dalam kubah.' },
        { time: '02:30', title: 'Konveksi Paksa Kipas DC Panel Surya', note: 'Exhaust fan mengeluarkan uap air tanpa bergantung pada suplai listrik PLN.' },
        { time: '04:00', title: 'Peningkatan Laju Pengeringan Kemplang', note: 'Penurunan kadar air dari 50% menjadi <12% tercapai dalam 6-8 jam (2x lebih cepat).' },
        { time: '05:45', title: 'Higienitas & Nol Emisi CO2', note: 'Kemplang terlindung 100% dari debu, lalat, dan aerosol kabut asap karhutla.' }
      ],
      verifiedInsights: [
        'Rumus kalor berguna: Q = I · A · t · η. Di mana I adalah intensitas radiasi surya, A luas penampang, t durasi, dan η efisiensi termal kubah.',
        'Efek rumah kaca kubah mampu menaikkan suhu internal hingga 50°C - 55°C dengan suhu lingkungan luar 31°C.',
        'Penggunaan Solar Dome mengeliminasi emisi karbon operasional (0 kg CO2/bulan) dibandingkan oven listrik konvensional (300+ kg CO2/bulan).'
      ]
    }
  };

  const currentVideoData = curatedVideos[selectedVideoKey];

  // Helper to extract YouTube ID from diverse formats:
  // - https://www.youtube.com/watch?v=VIDEO_ID
  // - https://youtu.be/VIDEO_ID
  // - https://www.youtube.com/embed/VIDEO_ID
  // - VIDEO_ID directly
  const extractYoutubeId = (urlOrId: string): string => {
    const trimmed = urlOrId.trim();
    if (!trimmed) return currentVideoData.defaultYoutubeId;

    const matchWatch = trimmed.match(/[?&]v=([^&#]+)/);
    if (matchWatch && matchWatch[1]) return matchWatch[1];

    const matchShort = trimmed.match(/youtu\.be\/([^?&#]+)/);
    if (matchShort && matchShort[1]) return matchShort[1];

    const matchEmbed = trimmed.match(/youtube\.com\/embed\/([^?&#]+)/);
    if (matchEmbed && matchEmbed[1]) return matchEmbed[1];

    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
      return trimmed;
    }

    return currentVideoData.defaultYoutubeId;
  };

  const handleApplyCustomVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customYoutubeUrl.trim()) return;
    const extracted = extractYoutubeId(customYoutubeUrl);
    setActiveYoutubeId(extracted);
    setIframeError(false);
    sound.playSuccess();
  };

  const handleResetToCurated = (key: 'karhutla' | 'energi') => {
    setSelectedVideoKey(key);
    setActiveYoutubeId(curatedVideos[key].defaultYoutubeId);
    setCustomYoutubeUrl('');
    setIframeError(false);
    sound.playClick();
  };

  // Sync internal reflection text if prop changes
  useEffect(() => {
    if (savedVideoNotes) {
      setReflectionText(savedVideoNotes);
    }
  }, [savedVideoNotes]);

  const handleSaveNotes = () => {
    if (onSaveVideoNotes) {
      onSaveVideoNotes(reflectionText);
    }
    sound.playSuccess();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  // --- SIMULATOR 1 ANIMATION LOOP (Karhutla & Solar Attenuation) ---
  useEffect(() => {
    if (viewMode !== 'simulator' || simulatorType !== 'karhutla-haze') return;
    const canvas = sim1CanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particleOffset = 0;

    // Particles array
    const particles = Array.from({ length: Math.min(150, Math.round(pm25Level * 0.4 + 20)) }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * (canvas.height - 40),
      radius: Math.random() * 2 + 1,
      speedX: (Math.random() * 1.5 + 0.8) * (windSpeed / 10),
      speedY: (Math.random() - 0.5) * 0.5,
      alpha: Math.min(0.85, (pm25Level / 350) * 0.7 + 0.15)
    }));

    const renderSim1 = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Sky color affected by haze
      // Clean sky is deep sky blue; extreme haze is dusty brownish orange
      const hazeFactor = Math.min(1, pm25Level / 300);
      const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      if (hazeFactor < 0.25) {
        skyGrad.addColorStop(0, '#38bdf8');
        skyGrad.addColorStop(1, '#bae6fd');
      } else if (hazeFactor < 0.6) {
        skyGrad.addColorStop(0, '#94a3b8');
        skyGrad.addColorStop(0.5, '#fed7aa');
        skyGrad.addColorStop(1, '#ffedd5');
      } else {
        skyGrad.addColorStop(0, '#78350f');
        skyGrad.addColorStop(0.4, '#9a3412');
        skyGrad.addColorStop(1, '#fdba74');
      }
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Sun drawing (attenuated by haze)
      const sunX = 100;
      const sunY = 55;
      const sunAlpha = Math.max(0.2, 1 - hazeFactor * 0.75);

      // Sun halo
      ctx.save();
      ctx.beginPath();
      ctx.arc(sunX, sunY, 32, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(253, 224, 71, ${sunAlpha * 0.4})`;
      ctx.fill();

      // Sun disc
      ctx.beginPath();
      ctx.arc(sunX, sunY, 18, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${sunAlpha})`;
      ctx.fill();
      ctx.restore();

      // Solar rays toward ground
      if (sunAlpha > 0.3) {
        ctx.save();
        ctx.strokeStyle = `rgba(254, 240, 138, ${sunAlpha * 0.25})`;
        ctx.lineWidth = 1.5;
        for (let a = 0; a < 6; a++) {
          ctx.beginPath();
          ctx.moveTo(sunX, sunY);
          ctx.lineTo(sunX + Math.cos(a * 0.4 + 0.3) * 350, sunY + Math.sin(a * 0.4 + 0.3) * 200);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Distant Ampera Bridge Silhouette
      ctx.save();
      ctx.fillStyle = hazeFactor > 0.6 ? 'rgba(55, 65, 81, 0.4)' : 'rgba(185, 28, 28, 0.65)';
      // Towers
      const tower1X = canvas.width * 0.38;
      const tower2X = canvas.width * 0.52;
      ctx.fillRect(tower1X - 6, 80, 12, 90);
      ctx.fillRect(tower2X - 6, 80, 12, 90);
      // Crossbars & Cables
      ctx.fillRect(tower1X - 6, 105, (tower2X - tower1X) + 12, 5);
      ctx.beginPath();
      ctx.moveTo(tower1X - 40, 140);
      ctx.lineTo(tower1X, 90);
      ctx.lineTo(tower2X, 90);
      ctx.lineTo(tower2X + 40, 140);
      ctx.strokeStyle = hazeFactor > 0.6 ? 'rgba(55, 65, 81, 0.35)' : 'rgba(185, 28, 28, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // Musi River water
      const riverY = canvas.height - 50;
      const riverGrad = ctx.createLinearGradient(0, riverY, 0, canvas.height);
      riverGrad.addColorStop(0, hazeFactor > 0.5 ? '#713f12' : '#0369a1');
      riverGrad.addColorStop(1, hazeFactor > 0.5 ? '#451a03' : '#075985');
      ctx.fillStyle = riverGrad;
      ctx.fillRect(0, riverY, canvas.width, 50);

      // Peatland Smoke particles (Aerosol PM2.5)
      if (isSim1Running) {
        particleOffset += 0.5;
        particles.forEach((p) => {
          p.x += p.speedX;
          p.y += p.speedY;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 20 || p.y > riverY - 10) p.y = 40 + Math.random() * (riverY - 60);

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(120, 113, 108, ${p.alpha})`;
          ctx.fill();
        });
      }

      // River bank & drying stations
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, riverY - 14, canvas.width, 14);

      // Station A: Penjemuran Terbuka (Kemplang di rak lincak)
      const openRackX = canvas.width * 0.18;
      const openRackY = riverY - 32;
      // Rack stand
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 3;
      ctx.strokeRect(openRackX - 22, openRackY, 44, 18);
      // Kemplang crackers (turning sooty/gray if high PM2.5)
      const crackerColor = hazeFactor > 0.5 ? '#a8a29e' : '#fef08a';
      for (let i = -1; i <= 1; i++) {
        ctx.beginPath();
        ctx.arc(openRackX + i * 14, openRackY + 4, 5, 0, Math.PI * 2);
        ctx.fillStyle = crackerColor;
        ctx.fill();
        ctx.strokeStyle = '#b45309';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      // Label
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 9px sans-serif';
      ctx.fillText('Rak Terbuka', openRackX - 25, riverY - 36);

      // Station B: Solar Dryer Dome (Kubah tertutup)
      const domeX = canvas.width * 0.82;
      const domeY = riverY - 14;
      // Dome arc
      ctx.save();
      ctx.beginPath();
      ctx.arc(domeX, domeY, 32, Math.PI, 0, false);
      ctx.fillStyle = 'rgba(147, 197, 253, 0.45)';
      ctx.fill();
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Protected kemplang inside dome (always clean golden)
      for (let i = -1; i <= 1; i++) {
        ctx.beginPath();
        ctx.arc(domeX + i * 13, domeY - 10, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#fde047'; // Clean golden
        ctx.fill();
        ctx.strokeStyle = '#ca8a04';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();
      // Label
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 9px sans-serif';
      ctx.fillText('Solar Dryer Dome', domeX - 38, riverY - 38);

      animId = requestAnimationFrame(renderSim1);
    };

    animId = requestAnimationFrame(renderSim1);
    return () => cancelAnimationFrame(animId);
  }, [viewMode, simulatorType, pm25Level, windSpeed, isSim1Running]);

  // --- SIMULATOR 2 ANIMATION LOOP (Solar Dryer Dome Thermal Physics) ---
  useEffect(() => {
    if (viewMode !== 'simulator' || simulatorType !== 'solar-dome') return;
    const canvas = sim2CanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let step = 0;

    const renderSim2 = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      step += 0.04;

      // Background laboratory / ambient gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGrad.addColorStop(0, '#0f172a');
      bgGrad.addColorStop(1, '#1e293b');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width * 0.5;
      const groundY = canvas.height - 40;
      const domeRadius = 90;

      // Concrete / Insulated Floor
      ctx.fillStyle = '#334155';
      ctx.fillRect(centerX - 120, groundY, 240, 20);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.strokeRect(centerX - 120, groundY, 240, 20);

      // Polycarbonate Parabolic Dome
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, groundY, domeRadius, Math.PI, 0, false);
      const domeGrad = ctx.createRadialGradient(centerX, groundY - 30, 10, centerX, groundY, domeRadius);
      domeGrad.addColorStop(0, 'rgba(251, 146, 60, 0.35)'); // Trapped warm infrared
      domeGrad.addColorStop(0.7, 'rgba(186, 230, 253, 0.35)');
      domeGrad.addColorStop(1, 'rgba(56, 189, 248, 0.7)');
      ctx.fillStyle = domeGrad;
      ctx.fill();
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.restore();

      // Top Exhaust Fan (Ventilasi Bertenaga Panel Surya)
      const fanX = centerX;
      const fanY = groundY - domeRadius;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(fanX - 18, fanY - 14, 36, 14);
      ctx.strokeStyle = fanActive ? '#10b981' : '#64748b';
      ctx.lineWidth = 2;
      ctx.strokeRect(fanX - 18, fanY - 14, 36, 14);

      // Rotating Fan Blades
      if (fanActive) {
        ctx.save();
        ctx.translate(fanX, fanY - 7);
        ctx.rotate(step * 6);
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-9, 0);
        ctx.lineTo(9, 0);
        ctx.moveTo(0, -9);
        ctx.lineTo(0, 9);
        ctx.stroke();
        ctx.restore();

        // Exhaust airflow particles escaping upward
        for (let i = 0; i < 4; i++) {
          const flowY = fanY - 16 - ((step * 40 + i * 20) % 50);
          const flowX = fanX + Math.sin(step * 3 + i) * 6;
          ctx.beginPath();
          ctx.arc(flowX, flowY, 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(52, 211, 153, 0.6)';
          ctx.fill();
        }
      }

      // Incoming Shortwave Solar Radiation (Sinar Surya Gelombang Pendek)
      const rayCount = 5;
      for (let r = 0; r < rayCount; r++) {
        const startX = centerX - 100 + r * 50;
        const startY = 20;
        const targetX = centerX - 60 + r * 30;
        const targetY = groundY - 20;

        ctx.save();
        ctx.strokeStyle = 'rgba(253, 224, 71, 0.55)';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(targetX, targetY);
        ctx.stroke();
        ctx.restore();
      }

      // Trapped Longwave Infrared Waves (Gelombang Kalor Terperangkap)
      const waveAlpha = (solarRadiation / 1000) * 0.7;
      ctx.save();
      ctx.strokeStyle = `rgba(249, 115, 22, ${waveAlpha})`;
      ctx.lineWidth = 2.5;
      for (let w = 0; w < 3; w++) {
        const wy = groundY - 25 - w * 22;
        ctx.beginPath();
        for (let wx = centerX - 55; wx <= centerX + 55; wx += 5) {
          const waveHeight = Math.sin((wx + step * 30) * 0.1) * 4;
          if (wx === centerX - 55) ctx.moveTo(wx, wy + waveHeight);
          else ctx.lineTo(wx, wy + waveHeight);
        }
        ctx.stroke();
      }
      ctx.restore();

      // Drying Racks with Kemplang crackers
      const rackY = groundY - 15;
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(centerX - 65, rackY, 130, 10);

      // Kemplang Crackers
      for (let k = -2; k <= 2; k++) {
        const kx = centerX + k * 24;
        ctx.beginPath();
        ctx.ellipse(kx, rackY + 5, 8, 4, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#fef08a';
        ctx.fill();
        ctx.strokeStyle = '#ca8a04';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Air Temperature Overlay Badges
      // Delta T calculation
      const deltaT = Math.round((solarRadiation / 800) * (domeEfficiency / 40) * 16);
      const tIn = 31 + deltaT;

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(`Suhu Dalam Dome: ${tIn}°C (+${deltaT}°C dari luar)`, centerX - 85, groundY - domeRadius + 28);
      ctx.font = '10px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('Efek Rumah Kaca: Kalor inframerah terperangkap di dalam kubah', centerX - 130, groundY - 5);

      animId = requestAnimationFrame(renderSim2);
    };

    animId = requestAnimationFrame(renderSim2);
    return () => cancelAnimationFrame(animId);
  }, [viewMode, simulatorType, solarRadiation, collectorArea, durationHours, domeEfficiency, fanActive]);

  // Derived Physics Calculations for Simulator 1:
  // Beer-Lambert law: Transmittance = e^(-k * PM2.5)
  const transmittance = Math.max(0.35, Math.exp(-(pm25Level / 450)));
  const directRadiation = Math.round(920 * transmittance);
  const contaminationRate = Math.round((pm25Level / 50) * 12); // mg/m² soot per hour

  // Derived Physics Calculations for Simulator 2:
  // Q = I * A * t * eta
  const qJoules = Math.round(solarRadiation * collectorArea * (durationHours * 3600) * (domeEfficiency / 100));
  const qKWh = Number((qJoules / 3600000).toFixed(3));
  const moistureReductionPct = Math.min(85, Math.round((qKWh / 5.5) * 60 + (fanActive ? 15 : 0)));
  const finalMoistureContent = Math.max(9, Math.round(50 - (moistureReductionPct * 0.45)));

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-6">
      {/* Top Header & Mode Toggle */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-bold bg-amber-100 text-amber-800 rounded-md">
              MEDIA INTERAKTIF & MULTIMEDIA
            </span>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              Pusat Simulasi Interaktif Offline & Video Edukasi
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Gunakan simulator fisika offline tanpa kuota internet atau saksikan video kajian lapangan karhutla dan rekayasa surya.
          </p>
        </div>

        {/* View Mode Switcher: Offline Simulator vs YouTube Video */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shrink-0">
          <button
            onClick={() => {
              setViewMode('simulator');
              sound.playClick();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              viewMode === 'simulator'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Simulator Interaktif Offline</span>
          </button>
          <button
            onClick={() => {
              setViewMode('youtube');
              sound.playClick();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              viewMode === 'youtube'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Video YouTube Terverifikasi</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MODE 1: INTERACTIVE OFFLINE SIMULATORS                         */}
      {/* ============================================================== */}
      {viewMode === 'simulator' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Sub-Simulator Selection Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-gradient-to-r from-slate-50 to-amber-50/40 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-600" />
              Pilih Modul Praktikum Virtual:
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSimulatorType('solar-dome');
                  sound.playClick();
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  simulatorType === 'solar-dome'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                }`}
              >
                <ThermometerSun className="w-3.5 h-3.5" />
                <span>Simulasi 1: Rekayasa Solar Dome & Kalor (Q)</span>
              </button>
              <button
                onClick={() => {
                  setSimulatorType('karhutla-haze');
                  sound.playClick();
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  simulatorType === 'karhutla-haze'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Simulasi 2: Karhutla & Hamburan Radiasi PM2.5</span>
              </button>
            </div>
          </div>

          {/* SIMULATOR 1: Solar Dryer Dome Thermal Engineering */}
          {simulatorType === 'solar-dome' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Canvas & Live Gauges */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-md">
                  <canvas
                    ref={sim2CanvasRef}
                    width={560}
                    height={300}
                    className="w-full h-auto block"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] text-amber-300 font-mono border border-white/10 flex items-center gap-1">
                    <Sun className="w-3 h-3 text-amber-400" />
                    Model Termal Solar Dome Palembang
                  </div>
                </div>

                {/* Live Gauge Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                    <span className="text-[10px] text-amber-700 font-bold block">Kalor Berguna (Q)</span>
                    <span className="font-mono font-bold text-base text-amber-950">{qKWh} <span className="text-xs">kWh</span></span>
                    <span className="text-[9px] text-amber-700 block mt-0.5 font-mono">{qJoules.toLocaleString('id-ID')} J</span>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <span className="text-[10px] text-blue-700 font-bold block">Suhu Kubah Dalam</span>
                    <span className="font-mono font-bold text-base text-blue-950">
                      {31 + Math.round((solarRadiation / 800) * (domeEfficiency / 40) * 16)}°C
                    </span>
                    <span className="text-[9px] text-blue-700 block mt-0.5">Suhu luar: 31°C</span>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <span className="text-[10px] text-emerald-700 font-bold block">Kadar Air Akhir</span>
                    <span className="font-mono font-bold text-base text-emerald-950">{finalMoistureContent}%</span>
                    <span className="text-[9px] text-emerald-700 block mt-0.5 font-semibold">
                      {finalMoistureContent <= 12 ? '✓ Siap Goreng (<12%)' : 'Masih Basah'}
                    </span>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                    <span className="text-[10px] text-purple-700 font-bold block">Higienitas Mutu</span>
                    <span className="font-mono font-bold text-base text-purple-950">100% Bersih</span>
                    <span className="text-[9px] text-purple-700 block mt-0.5">Bebas lalat & PM2.5</span>
                  </div>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="lg:col-span-5 space-y-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-blue-600" />
                    Parameter Variabel Eksperimen:
                  </h4>
                  <button
                    onClick={() => {
                      setSolarRadiation(850);
                      setCollectorArea(2.5);
                      setDurationHours(5);
                      setDomeEfficiency(52);
                      setFanActive(true);
                    }}
                    className="text-[10px] text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                </div>

                {/* Slider: Intensitas Surya I */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">Intensitas Radiasi Matahari (I):</span>
                    <span className="font-mono text-blue-700 font-bold">{solarRadiation} W/m²</span>
                  </div>
                  <input
                    type="range"
                    min={400}
                    max={1000}
                    step={25}
                    value={solarRadiation}
                    onChange={(e) => setSolarRadiation(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Mendung (400 W/m²)</span>
                    <span>Terik Palembang (1000 W/m²)</span>
                  </div>
                </div>

                {/* Slider: Luas Kolektor A */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">Luas Permukaan Kubah (A):</span>
                    <span className="font-mono text-blue-700 font-bold">{collectorArea} m²</span>
                  </div>
                  <input
                    type="range"
                    min={1.0}
                    max={5.0}
                    step={0.5}
                    value={collectorArea}
                    onChange={(e) => setCollectorArea(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Kubah Mini (1 m²)</span>
                    <span>Kubah UMKM (5 m²)</span>
                  </div>
                </div>

                {/* Slider: Durasi Jam t */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">Waktu Penyinaran (t):</span>
                    <span className="font-mono text-blue-700 font-bold">{durationHours} Jam ({durationHours * 3600} detik)</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={8}
                    step={1}
                    value={durationHours}
                    onChange={(e) => setDurationHours(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>1 Jam</span>
                    <span>8 Jam (Satu Hari Penuh)</span>
                  </div>
                </div>

                {/* Slider: Efisiensi Termal Kubah η */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">Efisiensi Termal Polikarbonat (η):</span>
                    <span className="font-mono text-blue-700 font-bold">{domeEfficiency}%</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={65}
                    step={1}
                    value={domeEfficiency}
                    onChange={(e) => setDomeEfficiency(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Plastik Biasa (20%)</span>
                    <span>Polikarbonat UV (65%)</span>
                  </div>
                </div>

                {/* Toggle: Exhaust Fan */}
                <div className="pt-2 flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2">
                    <Fan className={`w-4 h-4 ${fanActive ? 'text-emerald-600 animate-spin' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold text-slate-800">Exhaust Fan Panel Surya</span>
                  </div>
                  <button
                    onClick={() => setFanActive(!fanActive)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      fanActive
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {fanActive ? 'AKTIF (ON)' : 'MATI (OFF)'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SIMULATOR 2: Peatland Fire Haze & Solar Attenuation */}
          {simulatorType === 'karhutla-haze' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Canvas & Real-time Attenuation */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-md">
                  <canvas
                    ref={sim1CanvasRef}
                    width={560}
                    height={300}
                    className="w-full h-auto block"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] text-orange-300 font-mono border border-white/10 flex items-center gap-1">
                    <Wind className="w-3 h-3 text-orange-400" />
                    Simulasi Atmosfer Palembang & Jembatan Ampera
                  </div>
                </div>

                {/* Attenuation & Health Gauges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <div className="p-3 bg-slate-100 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-600 font-bold block">Status Udara (ISPU)</span>
                    <span className={`font-mono font-bold text-sm block ${pm25Level < 55 ? 'text-emerald-700' : pm25Level < 150 ? 'text-amber-700' : 'text-rose-700'}`}>
                      {pm25Level < 55 ? 'Baik / Sedang' : pm25Level < 150 ? 'Tidak Sehat' : 'BERBAHAYA'}
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono">{pm25Level} µg/m³</span>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                    <span className="text-[10px] text-amber-700 font-bold block">Radiasi Langsung</span>
                    <span className="font-mono font-bold text-base text-amber-950">{directRadiation} <span className="text-xs">W/m²</span></span>
                    <span className="text-[9px] text-amber-700 block mt-0.5">Turun {(100 - Math.round(transmittance * 100))}% akibat asap</span>
                  </div>

                  <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
                    <span className="text-[10px] text-rose-700 font-bold block">Jelaga di Rak Terbuka</span>
                    <span className="font-mono font-bold text-base text-rose-950">{contaminationRate} <span className="text-xs">mg/m²·j</span></span>
                    <span className="text-[9px] text-rose-700 block mt-0.5 font-semibold">Tercemar Partikulat</span>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <span className="text-[10px] text-emerald-700 font-bold block">Kemplang di Solar Dome</span>
                    <span className="font-mono font-bold text-base text-emerald-950">0 mg jelaga</span>
                    <span className="text-[9px] text-emerald-700 block mt-0.5 font-semibold">100% Higienis</span>
                  </div>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="lg:col-span-5 space-y-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-orange-600" />
                    Kondisi Bencana Kabut Asap:
                  </h4>
                  <button
                    onClick={() => {
                      setPm25Level(180);
                      setWindSpeed(12);
                      setHotspotCount(45);
                    }}
                    className="text-[10px] text-orange-600 hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                </div>

                {/* Slider: PM2.5 Concentration */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">Konsentrasi Aerosol PM2.5:</span>
                    <span className="font-mono text-orange-700 font-bold">{pm25Level} µg/m³</span>
                  </div>
                  <input
                    type="range"
                    min={15}
                    max={500}
                    step={10}
                    value={pm25Level}
                    onChange={(e) => setPm25Level(Number(e.target.value))}
                    className="w-full accent-orange-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Udara Bersih (15)</span>
                    <span>Kabut Tebal (500)</span>
                  </div>
                </div>

                {/* Slider: Titik Api Hotspot OKI/OI */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">Jumlah Titik Panas Hotspot (OKI/OI):</span>
                    <span className="font-mono text-orange-700 font-bold">{hotspotCount} Titik</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={120}
                    step={5}
                    value={hotspotCount}
                    onChange={(e) => {
                      const count = Number(e.target.value);
                      setHotspotCount(count);
                      setPm25Level(Math.min(500, Math.round(count * 3.5 + 20)));
                    }}
                    className="w-full accent-orange-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>5 Titik (Terkendali)</span>
                    <span>120 Titik (Puncak Kemarau)</span>
                  </div>
                </div>

                {/* Slider: Kecepatan Angin */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">Kecepatan Angin Muson Tenggara:</span>
                    <span className="font-mono text-orange-700 font-bold">{windSpeed} km/jam</span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={30}
                    step={1}
                    value={windSpeed}
                    onChange={(e) => setWindSpeed(Number(e.target.value))}
                    className="w-full accent-orange-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Tenang (2 km/jam)</span>
                    <span>Kencang (30 km/jam)</span>
                  </div>
                </div>

                {/* Explanation Box */}
                <div className="bg-orange-100/70 p-3 rounded-xl border border-orange-200 text-xs text-orange-950 space-y-1">
                  <div className="font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-orange-700" />
                    Hukum Atenuasi Gelombang (Beer-Lambert):
                  </div>
                  <p className="text-[11px] text-orange-900 leading-relaxed">
                    Aerosol jelaga karbon hitam memantulkan dan menyerap foton surya sebelum mencapai rak penjemuran kemplang. Akibatnya, waktu pengeringan terbuka menjadi 2–3 kali lebih lama dan produk kotor terkontaminasi.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* MODE 2: YOUTUBE VIDEO STREAMER & CURATED MULTIMEDIA            */}
      {/* ============================================================== */}
      {viewMode === 'youtube' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Curated Video Selector Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Video className="w-4 h-4 text-red-600" />
              Pilih Tayangan Materi:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleResetToCurated('energi')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedVideoKey === 'energi'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Video 1: Teknologi Solar Dryer Dome</span>
              </button>
              <button
                onClick={() => handleResetToCurated('karhutla')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedVideoKey === 'karhutla'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Video 2: Bencana Kabut Asap Karhutla</span>
              </button>
            </div>
          </div>

          {/* Video Player & Fallback Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-4">
              {/* Responsive Iframe Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-800 bg-black aspect-video">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeYoutubeId}?rel=0&modestbranding=1`}
                  title={currentVideoData.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onError={() => setIframeError(true)}
                />
              </div>

              {/* Direct YouTube Link and External Search Helper */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <span className="font-semibold text-slate-800">ID Video:</span>
                  <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-300 text-[11px] text-red-600">
                    {activeYoutubeId}
                  </code>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://www.youtube.com/watch?v=${activeYoutubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Buka Langsung di YouTube</span>
                  </a>
                  <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(currentVideoData.youtubeSearchQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Search className="w-3.5 h-3.5 text-slate-500" />
                    <span>Cari Sumber Lain</span>
                  </a>
                </div>
              </div>

              {/* Custom YouTube URL Input for Teachers and Students */}
              <form onSubmit={handleApplyCustomVideo} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-2">
                <label className="block text-xs font-bold text-slate-800">
                  Punya Link Video YouTube Materi Lain dari Guru? Masukkan di Sini:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customYoutubeUrl}
                    onChange={(e) => setCustomYoutubeUrl(e.target.value)}
                    placeholder="Contoh: https://www.youtube.com/watch?v=... atau ID 11 karakter"
                    className="flex-1 p-2 border border-slate-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Terapkan Video
                  </button>
                </div>
                <p className="text-[10px] text-slate-400">
                  Mendukung link lengkap YouTube, tautan pendek youtu.be, atau ID video 11 karakter.
                </p>
              </form>

              {/* Verified Facts from Video */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs">
                <span className="font-heading font-bold text-slate-900 block text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Kajian Ilmiah Utama Berdasarkan Materi Ini:
                </span>
                <ul className="space-y-1.5 text-slate-700 pl-4 list-disc text-[11px] leading-relaxed">
                  {currentVideoData.verifiedInsights.map((insight, idx) => (
                    <li key={idx}>{insight}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Timestamps & Video Insights on the Right */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-red-600" />
                  Garis Waktu Pembahasan Materi:
                </div>
                <div className="space-y-2 text-xs">
                  {currentVideoData.keyTimestamps.map((ts, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-0.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-red-600 text-[10px] bg-red-50 px-1.5 py-0.5 rounded">
                          ⏱ {ts.time}
                        </span>
                        <strong className="text-slate-800 text-[11px]">{ts.title}</strong>
                      </div>
                      <p className="text-[10px] text-slate-500 pl-1">{ts.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Informative Note regarding School Networks & Offline Simulator */}
              <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 space-y-2 text-xs text-amber-950">
                <div className="font-bold flex items-center gap-1.5 text-amber-900">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  Jika Video Terkendala di Jaringan Sekolah:
                </div>
                <p className="text-[11px] text-amber-900 leading-relaxed">
                  Beberapa jaringan sekolah membatasi pemutaran langsung YouTube. Anda dapat beralih ke <strong>Simulator Interaktif Offline</strong> di tab atas untuk melakukan eksperimen fisika termal secara mandiri tanpa memerlukan koneksi streaming.
                </p>
                <button
                  onClick={() => setViewMode('simulator')}
                  className="mt-1 text-xs font-bold text-amber-800 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5 text-amber-700" /> Beralih ke Simulator Offline Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* STUDENT REFLECTION WORKSHEET (Recorded directly to E-LKPD)     */}
      {/* ============================================================== */}
      <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-5 space-y-3 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-amber-900 text-xs uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-amber-600" />
          Lembar Refleksi Analitis Siswa (Terkoneksi ke E-LKPD):
        </div>
        <p className="text-[11px] text-slate-600 leading-relaxed">
          Setelah mengamati simulasi interaktif atau tayangan video di atas, jelaskan: <em>(1) Mengapa partikulat aerosol PM2.5 menurunkan intensitas radiasi langsung surya, dan (2) Bagaimana teknologi Solar Dryer Dome memberikan perlindungan higienis kemplang sekaligus memanfaatkan efek rumah kaca?</em>
        </p>
        <textarea
          rows={3}
          value={reflectionText}
          onChange={(e) => setReflectionText(e.target.value)}
          placeholder="Tuliskan analisis Anda berdasarkan pengamatan simulasi interaktif atau video... (Contoh: Berdasarkan simulasi atenuasi, aerosol PM2.5 menyebabkan hamburan radiasi sehingga intensitas surya turun drastis. Sementara pada Solar Dome, kubah polikarbonat meneruskan radiasi gelombang pendek dan memerangkap kalor inframerah di dalam kubah sehingga suhu naik hingga 50°C tanpa terpapar jelaga...)"
          className="w-full p-3 border border-slate-300 rounded-xl text-xs bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none leading-relaxed"
        />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
          {savedSuccess ? (
            <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Refleksi tersimpan ke LKPD!
            </span>
          ) : (
            <span className="text-[10px] text-slate-400">Refleksi ini akan dicetak dalam Laporan Portofolio E-LKPD</span>
          )}
          <button
            type="button"
            onClick={handleSaveNotes}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            Simpan Refleksi ke E-LKPD
          </button>
        </div>
      </div>
    </div>
  );
};
