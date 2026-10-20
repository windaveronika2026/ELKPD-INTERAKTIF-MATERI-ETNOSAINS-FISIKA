/**
 * Web Audio API synthesized sound effects & Adventure Background Music (BGM)
 * Lightweight, 100% offline, zero external asset dependencies, works across all browsers.
 */

class SoundEffects {
  private ctx: AudioContext | null = null;
  private bgmInterval: number | null = null;
  private isMusicPlaying = false;
  private musicListeners: ((isPlaying: boolean) => void)[] = [];
  private masterMusicGain: GainNode | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Subscribe to music state changes for UI buttons
  subscribeMusic(listener: (isPlaying: boolean) => void) {
    this.musicListeners.push(listener);
    return () => {
      this.musicListeners = this.musicListeners.filter((l) => l !== listener);
    };
  }

  private notifyMusicListeners() {
    this.musicListeners.forEach((l) => l(this.isMusicPlaying));
  }

  isBgmActive(): boolean {
    return this.isMusicPlaying;
  }

  /**
   * Synthesize a lively, energetic adventure theme loop
   * Inspired by adventure exploration music (brass lead, upbeat bassline, subtle rhythm)
   */
  startAdventureBGM() {
    const ctx = this.getContext();
    if (!ctx) return;

    if (this.isMusicPlaying) return;
    this.isMusicPlaying = true;
    this.notifyMusicListeners();

    if (!this.masterMusicGain) {
      this.masterMusicGain = ctx.createGain();
      this.masterMusicGain.gain.setValueAtTime(0.08, ctx.currentTime);
      this.masterMusicGain.connect(ctx.destination);
    }

    // Adventure melody notes (Frequencies in Hz: C4, D4, E4, G4, A4, C5, D5, E5)
    const melody = [
      { freq: 261.63, dur: 0.22, delay: 0 },    // C4
      { freq: 329.63, dur: 0.22, delay: 0.25 }, // E4
      { freq: 392.00, dur: 0.22, delay: 0.50 }, // G4
      { freq: 523.25, dur: 0.35, delay: 0.75 }, // C5
      { freq: 440.00, dur: 0.22, delay: 1.20 }, // A4
      { freq: 392.00, dur: 0.22, delay: 1.45 }, // G4
      { freq: 329.63, dur: 0.35, delay: 1.70 }, // E4
      { freq: 293.66, dur: 0.22, delay: 2.15 }, // D4

      { freq: 329.63, dur: 0.22, delay: 2.40 }, // E4
      { freq: 392.00, dur: 0.22, delay: 2.65 }, // G4
      { freq: 440.00, dur: 0.22, delay: 2.90 }, // A4
      { freq: 587.33, dur: 0.35, delay: 3.15 }, // D5
      { freq: 523.25, dur: 0.45, delay: 3.60 }, // C5
      { freq: 392.00, dur: 0.30, delay: 4.15 }  // G4
    ];

    // Driving Adventure Bassline
    const bassline = [
      { freq: 130.81, dur: 0.18, delay: 0 },    // C3
      { freq: 130.81, dur: 0.18, delay: 0.3 },
      { freq: 164.81, dur: 0.18, delay: 0.6 },  // E3
      { freq: 196.00, dur: 0.18, delay: 0.9 },  // G3
      { freq: 220.00, dur: 0.18, delay: 1.2 },  // A3
      { freq: 220.00, dur: 0.18, delay: 1.5 },
      { freq: 174.61, dur: 0.18, delay: 1.8 },  // F3
      { freq: 196.00, dur: 0.18, delay: 2.1 },  // G3
      { freq: 130.81, dur: 0.18, delay: 2.4 },  // C3
      { freq: 130.81, dur: 0.18, delay: 2.7 },
      { freq: 164.81, dur: 0.18, delay: 3.0 },  // E3
      { freq: 196.00, dur: 0.18, delay: 3.3 },  // G3
      { freq: 146.83, dur: 0.18, delay: 3.6 },  // D3
      { freq: 196.00, dur: 0.25, delay: 4.0 }   // G3
    ];

    const loopLengthSec = 4.8;

    const playLoop = () => {
      if (!this.isMusicPlaying || !this.masterMusicGain) return;
      const startTime = ctx.currentTime;

      // Schedule melody
      melody.forEach((note) => {
        try {
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          osc.type = 'triangle'; // Warm brass/lead adventure tone
          osc.frequency.setValueAtTime(note.freq, startTime + note.delay);

          noteGain.gain.setValueAtTime(0.001, startTime + note.delay);
          noteGain.gain.exponentialRampToValueAtTime(0.12, startTime + note.delay + 0.04);
          noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + note.delay + note.dur);

          osc.connect(noteGain);
          noteGain.connect(this.masterMusicGain!);
          osc.start(startTime + note.delay);
          osc.stop(startTime + note.delay + note.dur + 0.05);
        } catch {
          // ignore
        }
      });

      // Schedule rhythmic bass
      bassline.forEach((note) => {
        try {
          const osc = ctx.createOscillator();
          const bassGain = ctx.createGain();
          osc.type = 'sawtooth'; // Punchy adventure synth bass
          osc.frequency.setValueAtTime(note.freq, startTime + note.delay);

          bassGain.gain.setValueAtTime(0.001, startTime + note.delay);
          bassGain.gain.exponentialRampToValueAtTime(0.08, startTime + note.delay + 0.03);
          bassGain.gain.exponentialRampToValueAtTime(0.001, startTime + note.delay + note.dur);

          osc.connect(bassGain);
          bassGain.connect(this.masterMusicGain!);
          osc.start(startTime + note.delay);
          osc.stop(startTime + note.delay + note.dur + 0.04);
        } catch {
          // ignore
        }
      });

      // Subtle high-hat adventure click
      for (let t = 0; t < loopLengthSec; t += 0.3) {
        try {
          const osc = ctx.createOscillator();
          const hatGain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(1200 + Math.random() * 400, startTime + t);

          hatGain.gain.setValueAtTime(0.02, startTime + t);
          hatGain.gain.exponentialRampToValueAtTime(0.0001, startTime + t + 0.04);

          osc.connect(hatGain);
          hatGain.connect(this.masterMusicGain!);
          osc.start(startTime + t);
          osc.stop(startTime + t + 0.05);
        } catch {
          // ignore
        }
      }
    };

    // Initial play
    playLoop();
    // Schedule repeating loop every loopLengthSec
    this.bgmInterval = window.setInterval(playLoop, loopLengthSec * 1000);
  }

  stopAdventureBGM() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    this.isMusicPlaying = false;
    this.notifyMusicListeners();
  }

  toggleAdventureBGM() {
    if (this.isMusicPlaying) {
      this.stopAdventureBGM();
    } else {
      this.startAdventureBGM();
    }
  }

  // SFX Actions
  playCoin() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // Audio might be blocked before first interaction
    }
  }

  playJump() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // Silently ignore
    }
  }

  playObstacle() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch {
      // Silently ignore
    }
  }

  playSuccess() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C, E, G, C
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        gain.gain.setValueAtTime(0.2, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.1 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.25);
      });
    } catch {
      // Silently ignore
    }
  }

  playExperiment() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      // High-tech scientific chirp
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // Silently ignore
    }
  }

  playClick() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Silently ignore
    }
  }

  playBadgeUnlock() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      // Majestic harp-like chord
      const freqs = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.2, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.4);
      });
    } catch {
      // Silently ignore
    }
  }

  playCombo() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.18);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } catch {
      // Silently ignore
    }
  }
}

export const sound = new SoundEffects();
