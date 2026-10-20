import React, { useRef, useEffect, useState, useCallback } from 'react';
import { InfoCard, GameBadge, LeaderboardEntry, StudentProfile } from '../types';
import { sound } from '../utils/audio';
import { CompanionAvatarWidget } from './CompanionAvatarWidget';
import {
  Gamepad2,
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Volume2,
  VolumeX,
  Music,
  Trophy,
  Award,
  Target,
  Flame,
  ShieldCheck,
  Check
} from 'lucide-react';

interface Props {
  cards: InfoCard[];
  onUnlockCard: (cardId: string) => void;
  onProceedToLevel2: () => void;
  onCompleteLevel1?: (score: number, kemplangCount: number) => void;
  badges?: GameBadge[];
  onUnlockBadge?: (badgeId: string) => void;
  selectedAvatarId?: string;
  onSelectAvatar?: (avatarId: string) => void;
  profile?: StudentProfile;
  leaderboard?: LeaderboardEntry[];
  onOpenLeaderboard?: () => void;
  onOpenBadges?: () => void;
}

interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  vy: number;
  speed: number;
  jumpStrength: number;
  isGrounded: boolean;
  facing: 'right' | 'left';
}

interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

interface Coin {
  id: string;
  x: number;
  y: number;
  radius: number;
  collected: boolean;
  cardUnlockId?: string;
}

interface CollectibleKemplang {
  id: string;
  x: number;
  y: number;
  radius: number;
  collected: boolean;
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'smog' | 'spikes';
}

export const Level1Game: React.FC<Props> = ({
  cards,
  onUnlockCard,
  onProceedToLevel2,
  onCompleteLevel1,
  badges = [],
  onUnlockBadge,
  selectedAvatarId = 'bujang-surya',
  onSelectAvatar = () => {},
  profile = {
    name: 'Siswa Palembang',
    studentClass: 'X MIPA 1',
    groupNumber: 'Kelompok 1',
    school: 'SMAN 1 Palembang',
    date: ''
  },
  leaderboard = [],
  onOpenLeaderboard,
  onOpenBadges
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [score, setScore] = useState(0);
  const [coinsCollected, setCoinsCollected] = useState(0);
  const [totalCoins, setTotalCoins] = useState(5);
  const [kemplangCollected, setKemplangCollected] = useState(0);
  const [totalKemplang, setTotalKemplang] = useState(6);
  const [combo, setCombo] = useState(1);
  const [lastPickupTime, setLastPickupTime] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'gameover'>('playing');
  const [activeCardModal, setActiveCardModal] = useState<InfoCard | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isBgmPlaying, setIsBgmPlaying] = useState(sound.isBgmActive());
  const [showBadgeBanner, setShowBadgeBanner] = useState<string | null>(null);
  const [hitSmogCount, setHitSmogCount] = useState(0);

  useEffect(() => {
    return sound.subscribeMusic(setIsBgmPlaying);
  }, []);

  // Touch controls state
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  const scoreRef = useRef(0);
  const coinsCollectedRef = useRef(0);
  const kemplangCollectedRef = useRef(0);
  const comboRef = useRef(1);
  const lastPickupTimeRef = useRef(0);
  const hitSmogRef = useRef(0);

  const playerRef = useRef<Player>({
    x: 40,
    y: 280,
    width: 26,
    height: 38,
    vx: 0,
    vy: 0,
    speed: 4.2,
    jumpStrength: -11.5,
    isGrounded: false,
    facing: 'right'
  });

  const levelGoalRef = useRef({ x: 920, y: 240, width: 36, height: 60 });

  const platformsRef = useRef<Platform[]>([
    // Ground sections
    { x: 0, y: 340, width: 280, height: 60, color: '#334155' },
    { x: 340, y: 340, width: 320, height: 60, color: '#334155' },
    { x: 720, y: 340, width: 280, height: 60, color: '#334155' },
    // Elevated platforms
    { x: 120, y: 260, width: 90, height: 16, color: '#d97706' },
    { x: 260, y: 210, width: 100, height: 16, color: '#ea580c' },
    { x: 420, y: 250, width: 110, height: 16, color: '#d97706' },
    { x: 570, y: 190, width: 100, height: 16, color: '#ea580c' },
    { x: 730, y: 240, width: 120, height: 16, color: '#d97706' }
  ]);

  const coinsRef = useRef<Coin[]>([
    { id: 'c1', x: 165, y: 220, radius: 10, collected: false, cardUnlockId: 'card-1' },
    { id: 'c2', x: 310, y: 170, radius: 10, collected: false, cardUnlockId: 'card-2' },
    { id: 'c3', x: 475, y: 210, radius: 10, collected: false, cardUnlockId: 'card-3' },
    { id: 'c4', x: 620, y: 150, radius: 10, collected: false, cardUnlockId: 'card-4' },
    { id: 'c5', x: 790, y: 200, radius: 10, collected: false, cardUnlockId: 'card-5' }
  ]);

  const kemplangsRef = useRef<CollectibleKemplang[]>([
    { id: 'k1', x: 200, y: 320, radius: 9, collected: false },
    { id: 'k2', x: 380, y: 320, radius: 9, collected: false },
    { id: 'k3', x: 540, y: 320, radius: 9, collected: false },
    { id: 'k4', x: 175, y: 240, radius: 9, collected: false },
    { id: 'k5', x: 450, y: 230, radius: 9, collected: false },
    { id: 'k6', x: 770, y: 220, radius: 9, collected: false }
  ]);

  const obstaclesRef = useRef<Obstacle[]>([
    // Peat smoke plume
    { x: 280, y: 350, width: 60, height: 50, type: 'smog' },
    { x: 660, y: 350, width: 60, height: 50, type: 'smog' },
    { x: 480, y: 315, width: 35, height: 25, type: 'spikes' }
  ]);

  const initGame = useCallback(() => {
    playerRef.current = {
      x: 40,
      y: 280,
      width: 26,
      height: 38,
      vx: 0,
      vy: 0,
      speed: 4.2,
      jumpStrength: -11.5,
      isGrounded: false,
      facing: 'right'
    };
    coinsRef.current.forEach((c) => (c.collected = false));
    kemplangsRef.current.forEach((k) => (k.collected = false));
    scoreRef.current = 0;
    coinsCollectedRef.current = 0;
    kemplangCollectedRef.current = 0;
    comboRef.current = 1;
    lastPickupTimeRef.current = 0;
    hitSmogRef.current = 0;
    setScore(0);
    setCoinsCollected(0);
    setKemplangCollected(0);
    setCombo(1);
    setHitSmogCount(0);
    setShowBadgeBanner(null);
    setGameState('playing');
  }, []);

  // Keyboard handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = true;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let cameraX = 0;

    const gravity = 0.52;
    const friction = 0.82;

    const render = () => {
      // 1. Update logic if playing
      if (gameState === 'playing') {
        const player = playerRef.current;
        const keys = keysPressed.current;

        // Horizontal movement
        if (keys['ArrowRight'] || keys['d'] || keys['D']) {
          player.vx += 0.8;
          player.facing = 'right';
        } else if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
          player.vx -= 0.8;
          player.facing = 'left';
        }

        // Jump
        if (
          (keys['ArrowUp'] || keys['w'] || keys['W'] || keys[' ']) &&
          player.isGrounded
        ) {
          player.vy = player.jumpStrength;
          player.isGrounded = false;
          if (soundEnabled) sound.playJump();
        }

        // Apply physics
        player.vx *= friction;
        player.vy += gravity;

        // Terminal fall speed
        if (player.vy > 13) player.vy = 13;

        // Move horizontally
        player.x += player.vx;

        // Collision with platforms (Horizontal & Vertical)
        platformsRef.current.forEach((plat) => {
          // Check collision
          if (
            player.x < plat.x + plat.width &&
            player.x + player.width > plat.x &&
            player.y < plat.y + plat.height &&
            player.y + player.height > plat.y
          ) {
            // Horizontal pushback
            if (player.vx > 0) {
              player.x = plat.x - player.width;
              player.vx = 0;
            } else if (player.vx < 0) {
              player.x = plat.x + plat.width;
              player.vx = 0;
            }
          }
        });

        // Move vertically
        player.y += player.vy;
        player.isGrounded = false;

        platformsRef.current.forEach((plat) => {
          if (
            player.x + player.width > plat.x &&
            player.x < plat.x + plat.width &&
            player.y + player.height > plat.y &&
            player.y < plat.y + plat.height
          ) {
            // Landing from top
            if (player.vy > 0 && player.y + player.height - player.vy <= plat.y + 10) {
              player.y = plat.y - player.height;
              player.vy = 0;
              player.isGrounded = true;
            }
            // Hitting ceiling
            else if (player.vy < 0) {
              player.y = plat.y + plat.height;
              player.vy = 0;
            }
          }
        });

        // Fall into pit check
        if (player.y > 420) {
          if (soundEnabled) sound.playObstacle();
          setGameState('gameover');
        }

        // Obstacles collision (Smog & Spikes)
        obstaclesRef.current.forEach((obs) => {
          if (
            player.x < obs.x + obs.width &&
            player.x + player.width > obs.x &&
            player.y < obs.y + obs.height &&
            player.y + player.height > obs.y
          ) {
            hitSmogRef.current += 1;
            setHitSmogCount((c) => c + 1);
            if (soundEnabled) sound.playObstacle();
            setGameState('gameover');
          }
        });

        // Collectible Kemplang Crackers collection
        kemplangsRef.current.forEach((k) => {
          if (!k.collected) {
            const dx = player.x + player.width / 2 - k.x;
            const dy = player.y + player.height / 2 - k.y;
            const dist = Math.hypot(dx, dy);

            if (dist < k.radius + player.width / 2) {
              k.collected = true;
              const now = Date.now();
              let nextCombo = 1;
              if (now - lastPickupTimeRef.current < 2800) {
                nextCombo = Math.min(comboRef.current + 1, 4);
              }
              comboRef.current = nextCombo;
              lastPickupTimeRef.current = now;
              setCombo(nextCombo);

              const added = 50 + (nextCombo > 1 ? 25 * nextCombo : 0);
              scoreRef.current += added;
              kemplangCollectedRef.current += 1;
              setScore(scoreRef.current);
              setKemplangCollected(kemplangCollectedRef.current);

              if (soundEnabled) {
                if (nextCombo > 1) sound.playCombo();
                else sound.playCoin();
              }
            }
          }
        });

        // Coin collection
        coinsRef.current.forEach((coin) => {
          if (!coin.collected) {
            const dx = player.x + player.width / 2 - coin.x;
            const dy = player.y + player.height / 2 - coin.y;
            const dist = Math.hypot(dx, dy);

            if (dist < coin.radius + player.width / 2) {
              coin.collected = true;
              scoreRef.current += 100;
              coinsCollectedRef.current += 1;
              setScore(scoreRef.current);
              setCoinsCollected(coinsCollectedRef.current);
              if (soundEnabled) sound.playCoin();

              if (coin.cardUnlockId) {
                onUnlockCard(coin.cardUnlockId);
                const card = cards.find((c) => c.id === coin.cardUnlockId);
                if (card) {
                  setActiveCardModal(card);
                }
              }
            }
          }
        });

        // Goal reached
        const goal = levelGoalRef.current;
        if (
          player.x < goal.x + goal.width &&
          player.x + player.width > goal.x &&
          player.y < goal.y + goal.height &&
          player.y + player.height > goal.y
        ) {
          const cleanBonus = hitSmogRef.current === 0 ? 150 : 50;
          const finalScore = scoreRef.current + cleanBonus;
          scoreRef.current = finalScore;
          setScore(finalScore);
          if (soundEnabled) sound.playSuccess();
          setGameState('won');

          // Trigger level 1 completion callback to unlock Level 2
          onCompleteLevel1?.(finalScore, kemplangCollectedRef.current);

          // Check badges unlock
          if (finalScore >= 500) {
            onUnlockBadge?.('badge-level1-master');
            setShowBadgeBanner('Master Penjemuran Tradisional');
            if (soundEnabled) sound.playBadgeUnlock();
          }
          if (coinsCollectedRef.current >= 5) {
            onUnlockBadge?.('badge-solar-seeker');
          }
          if (hitSmogRef.current === 0) {
            onUnlockBadge?.('badge-clean-air');
          }
        }

        // Camera follow player smoothly
        const targetCameraX = Math.max(0, Math.min(player.x - 220, 1000 - canvas.width));
        cameraX += (targetCameraX - cameraX) * 0.1;
      }

      // 2. Draw scene
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(-cameraX, 0);

      // Sky gradient (warm solar sunrise / afternoon)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      skyGrad.addColorStop(0, '#fef3c7'); // amber-100
      skyGrad.addColorStop(0.5, '#fed7aa'); // orange-200
      skyGrad.addColorStop(1, '#bae6fd'); // sky-200
      ctx.fillStyle = skyGrad;
      ctx.fillRect(cameraX, 0, canvas.width, canvas.height);

      // Distant Palembang Skyline (Ampera Bridge silhouette & river)
      ctx.fillStyle = 'rgba(217, 119, 6, 0.18)';
      ctx.beginPath();
      // Bridge pylons
      ctx.rect(300, 140, 20, 160);
      ctx.rect(340, 140, 20, 160);
      ctx.rect(280, 200, 100, 14);
      // Cables
      ctx.moveTo(250, 260);
      ctx.lineTo(310, 140);
      ctx.lineTo(350, 140);
      ctx.lineTo(410, 260);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.25)';
      ctx.stroke();
      ctx.fill();

      // Sun Orb with radiating rays
      const sunPulse = Math.sin(Date.now() / 350) * 4;
      ctx.beginPath();
      ctx.arc(880, 80, 36 + sunPulse, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(251, 191, 36, 0.9)';
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 24;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Platforms
      platformsRef.current.forEach((plat) => {
        ctx.fillStyle = plat.color;
        ctx.fillRect(plat.x, plat.y, plat.width, plat.height);

        // Top grass/solar surface highlight
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(plat.x, plat.y, plat.width, 4);
      });

      // Draw Obstacles (Smog & Spikes)
      obstaclesRef.current.forEach((obs) => {
        if (obs.type === 'smog') {
          // Smoke plume animation
          const t = Date.now() / 400;
          ctx.fillStyle = 'rgba(100, 116, 139, 0.65)';
          for (let i = 0; i < 4; i++) {
            const sx = obs.x + 10 + i * 14 + Math.sin(t + i) * 6;
            const sy = obs.y + 10 - i * 9;
            ctx.beginPath();
            ctx.arc(sx, sy, 12 + i * 2, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.fillStyle = '#475569';
          ctx.font = '10px sans-serif';
          ctx.fillText('Asap Gambut', obs.x, obs.y + 40);
        } else if (obs.type === 'spikes') {
          ctx.fillStyle = '#dc2626';
          for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(obs.x + i * 12, obs.y + obs.height);
            ctx.lineTo(obs.x + i * 12 + 6, obs.y);
            ctx.lineTo(obs.x + i * 12 + 12, obs.y + obs.height);
            ctx.closePath();
            ctx.fill();
          }
        }
      });

      // Draw Coins (Glowing Solar Discs)
      coinsRef.current.forEach((coin) => {
        if (!coin.collected) {
          const coinBob = Math.sin(Date.now() / 200 + coin.x) * 4;
          ctx.save();
          ctx.beginPath();
          ctx.arc(coin.x, coin.y + coinBob, coin.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#fbbf24';
          ctx.shadowColor = '#d97706';
          ctx.shadowBlur = 10;
          ctx.fill();

          ctx.strokeStyle = '#b45309';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Solar ray icon in coin
          ctx.fillStyle = '#78350f';
          ctx.font = 'bold 9px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('☼', coin.x, coin.y + coinBob);
          ctx.restore();
        }
      });

      // Draw Collectible Kemplang Crackers (Traditional Sun-Drying)
      kemplangsRef.current.forEach((k) => {
        if (!k.collected) {
          const bob = Math.sin(Date.now() / 230 + k.x) * 3;
          ctx.save();
          // Shadow on platform
          ctx.beginPath();
          ctx.ellipse(k.x, k.y + 10, 11, 4, 0, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0,0,0,0.2)';
          ctx.fill();

          // Kemplang Cracker
          ctx.beginPath();
          ctx.ellipse(k.x, k.y + bob, 12, 8, 0, 0, Math.PI * 2);
          ctx.fillStyle = '#fef08a';
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.strokeStyle = '#d97706';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Crack lines
          ctx.strokeStyle = '#b45309';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(k.x - 5, k.y + bob - 2);
          ctx.lineTo(k.x + 4, k.y + bob + 3);
          ctx.moveTo(k.x - 2, k.y + bob + 3);
          ctx.lineTo(k.x + 5, k.y + bob - 1);
          ctx.stroke();

          // Text label
          ctx.fillStyle = '#78350f';
          ctx.font = 'bold 8px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('Kemplang', k.x, k.y + bob - 10);
          ctx.restore();
        }
      });

      // Draw Finish Goal (Pos Edukasi Energi Palembang)
      const goal = levelGoalRef.current;
      ctx.fillStyle = '#059669';
      ctx.fillRect(goal.x + 4, goal.y, 6, goal.height);

      // Flag
      ctx.beginPath();
      ctx.moveTo(goal.x + 10, goal.y);
      ctx.lineTo(goal.x + 36, goal.y + 12);
      ctx.lineTo(goal.x + 10, goal.y + 24);
      ctx.closePath();
      ctx.fillStyle = '#10b981';
      ctx.fill();

      ctx.fillStyle = '#065f46';
      ctx.font = 'bold 9px sans-serif';
      ctx.fillText('POS LEVEL 2', goal.x - 14, goal.y - 6);

      // Draw Player Character (Peneliti Muda Fisika)
      const player = playerRef.current;
      ctx.save();
      // Body / Jacket
      ctx.fillStyle = '#ea580c'; // Orange vest
      ctx.fillRect(player.x, player.y + 12, player.width, player.height - 12);

      // Head
      ctx.fillStyle = '#fed7aa';
      ctx.beginPath();
      ctx.arc(player.x + player.width / 2, player.y + 8, 8, 0, Math.PI * 2);
      ctx.fill();

      // Cap / Hair (Solar Researcher Hat)
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(player.x + 3, player.y - 2, player.width - 6, 6);

      // Eye
      ctx.fillStyle = '#0f172a';
      const eyeOffset = player.facing === 'right' ? 4 : -4;
      ctx.beginPath();
      ctx.arc(player.x + player.width / 2 + eyeOffset, player.y + 8, 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Solar badge on chest
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(player.x + player.width / 2, player.y + 22, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      ctx.restore(); // restore camera

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [gameState, cards, onUnlockCard, onUnlockBadge, onCompleteLevel1, soundEnabled]);

  // Virtual control buttons for mobile / touchscreen
  const handleTouchStart = (key: string) => {
    keysPressed.current[key] = true;
  };

  const handleTouchEnd = (key: string) => {
    keysPressed.current[key] = false;
  };

  return (
    <div className="space-y-5 max-w-5xl mx-auto py-4 px-3 sm:px-4">
      {/* Companion Avatar Guide */}
      <CompanionAvatarWidget
        selectedAvatarId={selectedAvatarId}
        onSelectAvatar={onSelectAvatar}
        activeLevelKey="level1"
      />

      {/* Level Header & Quick Gamification Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-bold bg-amber-100 text-amber-800 rounded">
              LEVEL 1
            </span>
            <h2 className="font-heading font-bold text-lg sm:text-xl text-slate-900">
              SOLAR COIN RUN (Orientasi Etnosains & Pengetahuan Surya)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Kendalikan Peneliti Muda di panggung penjemuran kemplang, raih koin pengetahuan surya & jemur kemplang tradisional!
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onOpenLeaderboard && (
            <button
              onClick={onOpenLeaderboard}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500/15 hover:bg-amber-500/25 text-amber-900 border border-amber-300 flex items-center gap-1.5 transition-all cursor-pointer"
              title="Lihat Papan Peringkat Siswa"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>Leaderboard</span>
            </button>
          )}

          {onOpenBadges && (
            <button
              onClick={onOpenBadges}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-orange-500/15 hover:bg-orange-500/25 text-orange-950 border border-orange-300 flex items-center gap-1.5 transition-all cursor-pointer"
              title="Lihat Lencana Pencapaian"
            >
              <Award className="w-3.5 h-3.5 text-orange-600" />
              <span>
                Lencana ({badges.filter((b) => b.unlocked).length}/{badges.length})
              </span>
            </button>
          )}

          {/* Adventure BGM Button */}
          <button
            onClick={() => sound.toggleAdventureBGM()}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              isBgmPlaying
                ? 'bg-amber-400 text-amber-950 font-bold shadow-xs animate-pulse'
                : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
            title="Nyalakan / Matikan Musik Petualangan Sains"
          >
            <Music className={`w-3.5 h-3.5 ${isBgmPlaying ? 'animate-bounce text-amber-900' : 'text-amber-600'}`} />
            <span>{isBgmPlaying ? 'Musik: ON ♫' : 'Musik'}</span>
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            title={soundEnabled ? 'Matikan Suara SFX' : 'Nyalakan Suara SFX'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          <button
            onClick={initGame}
            className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Ulang
          </button>
        </div>
      </div>

      {/* Tantangan Level: Master Penjemuran Tradisional Tracker */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-yellow-500/10 border border-amber-300 rounded-2xl p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center text-lg font-bold shadow-xs">
              🏆
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                  Tantangan Level 1
                </span>
                <span className="text-xs font-bold text-slate-900">
                  Master Penjemuran Tradisional
                </span>
              </div>
              <p className="text-[11px] text-slate-600">
                Target: Kumpulkan koin surya, jemur kemplang tradisional, dan raih skor minimal 500 poin!
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs font-bold text-slate-500">Skor Saat Ini: </span>
            <span className="text-base font-extrabold text-orange-600">{score}</span>
            <span className="text-xs text-slate-500"> / 500 Poin</span>
          </div>
        </div>

        {/* Progress bar towards 500 pts */}
        <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-500 to-orange-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, Math.round((score / 500) * 100))}%` }}
          />
        </div>

        {/* Challenge Checklist Items */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-2 border-t border-amber-200/60 text-xs">
          <div className="flex items-center gap-1.5">
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${coinsCollected >= 5 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
              ✓
            </span>
            <span className="text-[11px] text-slate-700">Koin: <strong>{coinsCollected}/5</strong></span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${kemplangCollected >= 3 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
              ✓
            </span>
            <span className="text-[11px] text-slate-700">Kemplang: <strong>{kemplangCollected}/{totalKemplang}</strong></span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${score >= 500 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
              ✓
            </span>
            <span className="text-[11px] text-slate-700">Target 500 Poin</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${hitSmogCount === 0 ? 'bg-emerald-500 text-white' : 'bg-amber-200 text-amber-800'}`}>
              ✓
            </span>
            <span className="text-[11px] text-slate-700">Bebas Asap Gambut</span>
          </div>
        </div>
      </div>

      {/* Game Canvas Container */}
      <div className="relative bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-700">
        <canvas
          ref={canvasRef}
          width={800}
          height={380}
          className="w-full h-auto block max-h-[420px] aspect-[800/380]"
        />

        {/* In-Game HUD overlay */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none">
          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-mono font-bold border border-white/20">
              Skor: <span className="text-amber-400">{score}</span>
            </div>
            <div className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-mono font-bold border border-white/20">
              Koin Surya: <span className="text-yellow-300">{coinsCollected}/{totalCoins}</span>
            </div>
            <div className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-mono font-bold border border-white/20">
              Kemplang: <span className="text-orange-300">{kemplangCollected}/{totalKemplang}</span>
            </div>
            {combo > 1 && (
              <div className="bg-orange-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full animate-bounce shadow-md">
                Combo x{combo} 🔥
              </div>
            )}
          </div>

          <div className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold border border-white/20 hidden sm:block">
            Arah: Pos Level 2 ➔
          </div>
        </div>

        {/* Badge unlock popup in canvas */}
        {showBadgeBanner && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 animate-in fade-in zoom-in border border-yellow-300">
            <Award className="w-5 h-5 text-yellow-200 animate-spin" />
            <div className="text-left">
              <div className="text-[10px] uppercase font-bold text-yellow-100">Lencana Terbuka!</div>
              <div className="text-xs font-black">{showBadgeBanner}</div>
            </div>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-white text-center space-y-3 animate-in fade-in">
            <AlertTriangle className="w-12 h-12 text-red-500 animate-bounce" />
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-red-400">
              Misi Terhambat!
            </h3>
            <p className="text-xs text-slate-300 max-w-sm">
              Karakter Anda terpapar kepulan asap gambut karhutla atau jatuh ke perairan. Ayo coba lagi dan jemur kemplang hingga tuntas!
            </p>
            <button
              onClick={initGame}
              className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl font-bold text-sm shadow hover:brightness-110 flex items-center gap-2 transition-all pointer-events-auto cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Ulangi Level 1
            </button>
          </div>
        )}

        {/* Won Overlay with full gamification rewards */}
        {gameState === 'won' && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-white text-center space-y-3 animate-in fade-in">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-3xl shadow-lg animate-bounce">
              🏆
            </div>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-emerald-300">
              Misi Level 1 Berhasil Selesai!
            </h3>
            <p className="text-xs text-slate-200 max-w-md">
              Hebat! Anda telah berhasil mencapai Pos Edukasi Energi Palembang dan menyelesaikan tantangan penjemuran kemplang tradisional.
            </p>

            {/* Score & Rewards Breakdown */}
            <div className="bg-slate-800/90 border border-amber-400/40 rounded-2xl p-3.5 max-w-sm w-full text-xs space-y-1.5 pointer-events-auto">
              <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider pb-1 border-b border-slate-700">
                Rincian Poin Misi
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Koin Pengetahuan ({coinsCollected} × 100)</span>
                <span className="font-bold text-white">+{coinsCollected * 100} pts</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Kemplang Dijemur ({kemplangCollected} × 50)</span>
                <span className="font-bold text-white">+{kemplangCollected * 50} pts</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Bonus Higienitas Udara Bersih</span>
                <span className="font-bold text-emerald-400">+{hitSmogCount === 0 ? 150 : 50} pts</span>
              </div>
              <div className="flex justify-between text-white font-extrabold text-sm pt-1.5 border-t border-slate-700">
                <span>Total Skor Akhir:</span>
                <span className="text-amber-400 font-mono">{score} pts</span>
              </div>
            </div>

            {/* Level 2 unlocked notice */}
            <div className="text-[11px] text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Level 2: Energy Explorer Kini Telah Terbuka!</span>
            </div>

            <div className="flex flex-wrap gap-2 justify-center pointer-events-auto pt-2">
              <button
                onClick={initGame}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Main Lagi
              </button>
              {onOpenLeaderboard && (
                <button
                  onClick={onOpenLeaderboard}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Trophy className="w-3.5 h-3.5" /> Lihat Leaderboard
                </button>
              )}
              <button
                onClick={onProceedToLevel2}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl text-xs font-bold shadow-lg flex items-center gap-1.5 cursor-pointer"
              >
                Lanjut ke Level 2: Energy Explorer <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>


      {/* Touch & Mobile Controls */}
      <div className="block sm:hidden bg-slate-100 p-3 rounded-2xl border border-slate-200">
        <div className="text-[10px] text-center font-bold text-slate-500 uppercase tracking-wider mb-2">
          Kontrol Layar Sentuh (Smartphone)
        </div>
        <div className="flex justify-between items-center max-w-xs mx-auto gap-2">
          <div className="flex gap-2">
            <button
              onMouseDown={() => handleTouchStart('ArrowLeft')}
              onMouseUp={() => handleTouchEnd('ArrowLeft')}
              onTouchStart={() => handleTouchStart('ArrowLeft')}
              onTouchEnd={() => handleTouchEnd('ArrowLeft')}
              className="w-14 h-12 bg-white active:bg-amber-200 rounded-xl border border-slate-300 font-bold text-slate-800 text-lg shadow-xs flex items-center justify-center select-none"
            >
              ◀
            </button>
            <button
              onMouseDown={() => handleTouchStart('ArrowRight')}
              onMouseUp={() => handleTouchEnd('ArrowRight')}
              onTouchStart={() => handleTouchStart('ArrowRight')}
              onTouchEnd={() => handleTouchEnd('ArrowRight')}
              className="w-14 h-12 bg-white active:bg-amber-200 rounded-xl border border-slate-300 font-bold text-slate-800 text-lg shadow-xs flex items-center justify-center select-none"
            >
              ▶
            </button>
          </div>

          <button
            onMouseDown={() => handleTouchStart(' ')}
            onMouseUp={() => handleTouchEnd(' ')}
            onTouchStart={() => handleTouchStart(' ')}
            onTouchEnd={() => handleTouchEnd(' ')}
            className="w-20 h-12 bg-gradient-to-r from-amber-600 to-orange-600 active:brightness-90 text-white rounded-xl font-bold text-sm shadow-md flex items-center justify-center select-none"
          >
            LOMPAT ▲
          </button>
        </div>
      </div>

      {/* Keyboard Controls Guide */}
      <div className="hidden sm:flex items-center justify-between text-xs text-slate-500 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200">
        <div className="flex items-center gap-4">
          <span>Kontrol Laptop:</span>
          <span><kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded shadow-2xs font-mono font-bold">←</kbd> / <kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded shadow-2xs font-mono font-bold">A</kbd> Kiri</span>
          <span><kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded shadow-2xs font-mono font-bold">→</kbd> / <kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded shadow-2xs font-mono font-bold">D</kbd> Kanan</span>
          <span><kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded shadow-2xs font-mono font-bold">↑</kbd> / <kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded shadow-2xs font-mono font-bold">Spasi</kbd> Lompat</span>
        </div>
        <span className="text-amber-700 font-medium">Hindari asap gambut & jurang!</span>
      </div>

      {/* Unlocked Cards Showcase */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-600" />
            <h3 className="font-heading font-bold text-slate-900 text-base">
              Kartu Pengetahuan yang Berhasil Dibuka ({cards.filter((c) => c.unlocked).length} / {cards.length})
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            Klik kartu untuk membaca rincian ilmiah
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {cards.map((card) => {
            const isUnlocked = card.unlocked;
            return (
              <div
                key={card.id}
                onClick={() => isUnlocked && setActiveCardModal(card)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isUnlocked
                    ? 'border-amber-300 bg-amber-50/50 hover:bg-amber-100/60 cursor-pointer shadow-2xs'
                    : 'border-slate-200 bg-slate-50 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                    {card.category}
                  </span>
                  {isUnlocked ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded">
                      Terkunci
                    </span>
                  )}
                </div>
                <div className="font-heading font-bold text-slate-800 text-xs sm:text-sm line-clamp-1">
                  {card.title}
                </div>
                <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                  {isUnlocked ? card.content : 'Kumpulkan koin surya di dalam game untuk membuka kartu ini.'}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Card Detail Modal */}
      {activeCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-amber-300 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                  {activeCardModal.category}
                </span>
              </div>
              <button
                onClick={() => setActiveCardModal(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div>
              <h4 className="font-heading font-bold text-lg text-slate-900">
                {activeCardModal.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2">
                {activeCardModal.content}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-[11px] text-slate-600">
              <strong className="text-slate-700 block">Sumber / Rujukan Ilmiah:</strong>
              {activeCardModal.scientificSource}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveCardModal(null)}
                className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs font-bold rounded-lg shadow hover:brightness-105"
              >
                Tutup & Lanjut Belajar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
