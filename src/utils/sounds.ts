// Sound utility for game audio effects

export class SoundManager {
  private static instance: SoundManager;
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private enabled: boolean = true;

  private constructor() {
    this.preloadSounds();
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  private preloadSounds() {
    const soundFiles = {
      'word-select': '/assets/sounds/word-select.mp3',
      'word-place': '/assets/sounds/word-place.mp3',
      'hint': '/assets/sounds/hint.mp3',
      'correct': '/assets/sounds/correct.mp3',
      'wrong': '/assets/sounds/wrong.mp3',
      'round-complete': '/assets/sounds/round-complete.mp3'
    };

    Object.entries(soundFiles).forEach(([key, path]) => {
      try {
        const audio = new Audio(path);
        audio.preload = 'auto';
        audio.volume = 0.3;
        this.sounds.set(key, audio);
      } catch (e) {
        // Silently fail if audio files don't exist
      }
    });
  }

  public play(soundName: string, volume: number = 0.3) {
    if (!this.enabled) return;

    try {
      const sound = this.sounds.get(soundName);
      if (sound) {
        sound.volume = volume;
        sound.currentTime = 0; // Reset to beginning
        sound.play().catch(() => {}); // Silently fail if can't play
      }
    } catch (e) {
      // Silently fail
    }
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }
}

// Convenience function for easy access
export const playSound = (soundName: string, volume?: number) => {
  SoundManager.getInstance().play(soundName, volume);
};