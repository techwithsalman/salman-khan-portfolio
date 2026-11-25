// Web Audio API Synthesizer for high-tech micro-interactions
class SoundFX {
  private ctx: AudioContext | null = null
  public enabled: boolean = true

  private initContext() {
    if (typeof window === 'undefined') return
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  // Subtle metallic click for buttons
  playClick() {
    if (!this.enabled) return
    try {
      this.initContext()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(800, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 0.05)

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.05)
    } catch {
      // AudioContext policy fallback
    }
  }

  // Soft hover hum
  playHover() {
    if (!this.enabled) return
    try {
      this.initContext()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(440, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(520, this.ctx.currentTime + 0.04)

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.04)
    } catch {}
  }

  // High-tech phone dial chirp
  playPhoneDial() {
    if (!this.enabled) return
    try {
      this.initContext()
      if (!this.ctx) return

      const now = this.ctx.currentTime
      const osc1 = this.ctx.createOscillator()
      const osc2 = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc1.frequency.setValueAtTime(697, now)
      osc2.frequency.setValueAtTime(1209, now)

      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15)

      osc1.connect(gain)
      osc2.connect(gain)
      gain.connect(this.ctx.destination)

      osc1.start(now)
      osc2.start(now)
      osc1.stop(now + 0.15)
      osc2.stop(now + 0.15)
    } catch {}
  }

  // Badge flip / card swoosh
  playWhoosh() {
    if (!this.enabled) return
    try {
      this.initContext()
      if (!this.ctx) return

      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(220, now)
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.09)

      gain.gain.setValueAtTime(0.06, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.09)
    } catch {}
  }

  // Harmonic chord chime for success / actions
  playSuccess() {
    if (!this.enabled) return
    try {
      this.initContext()
      if (!this.ctx) return

      const notes = [523.25, 659.25, 783.99, 1046.5] // C E G C
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator()
        const gain = this.ctx!.createGain()
        const start = this.ctx!.currentTime + idx * 0.06

        osc.frequency.setValueAtTime(freq, start)
        gain.gain.setValueAtTime(0.04, start)
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25)

        osc.connect(gain)
        gain.connect(this.ctx!.destination)

        osc.start(start)
        osc.stop(start + 0.25)
      })
    } catch {}
  }
}

export const sound = new SoundFX()
