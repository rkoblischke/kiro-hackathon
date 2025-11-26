/**
 * Background music utility for continuous game music
 * Creates a Halloween-themed battle melody using Web Audio API
 */

let audioContext: AudioContext | null = null;
let backgroundMusicNode: OscillatorNode | null = null;
let gainNode: GainNode | null = null;
let isPlaying = false;

// Halloween-themed battle melody notes (in Hz)
// Complex creepy melody with dissonant intervals and chromatic movements
const melody = [
  // Main ominous theme - descending chromatic with tritones
  { freq: 277.18, duration: 0.25 }, // C#4
  { freq: 261.63, duration: 0.25 }, // C4
  { freq: 246.94, duration: 0.25 }, // B3
  { freq: 233.08, duration: 0.25 }, // A#3
  { freq: 220.00, duration: 0.4 },  // A3 (hold)
  { freq: 185.00, duration: 0.15 }, // F#3 (tritone - devil's interval)
  { freq: 196.00, duration: 0.15 }, // G3
  { freq: 185.00, duration: 0.15 }, // F#3
  
  // Ascending tension build
  { freq: 207.65, duration: 0.2 },  // G#3
  { freq: 220.00, duration: 0.2 },  // A3
  { freq: 233.08, duration: 0.2 },  // A#3
  { freq: 246.94, duration: 0.2 },  // B3
  { freq: 277.18, duration: 0.3 },  // C#4
  { freq: 311.13, duration: 0.3 },  // D#4
  
  // Dissonant stab
  { freq: 349.23, duration: 0.15 }, // F4
  { freq: 329.63, duration: 0.15 }, // E4
  { freq: 311.13, duration: 0.15 }, // D#4
  { freq: 293.66, duration: 0.4 },  // D4 (hold)
  
  // Dark descending pattern
  { freq: 261.63, duration: 0.2 },  // C4
  { freq: 233.08, duration: 0.2 },  // A#3
  { freq: 207.65, duration: 0.2 },  // G#3
  { freq: 185.00, duration: 0.2 },  // F#3
  { freq: 164.81, duration: 0.5 },  // E3 (low and ominous)
  
  // Creepy high notes
  { freq: 415.30, duration: 0.15 }, // G#4
  { freq: 392.00, duration: 0.15 }, // G4
  { freq: 369.99, duration: 0.15 }, // F#4
  { freq: 349.23, duration: 0.3 },  // F4
  
  // Final descent with tritone resolution
  { freq: 293.66, duration: 0.25 }, // D4
  { freq: 277.18, duration: 0.25 }, // C#4
  { freq: 261.63, duration: 0.25 }, // C4
  { freq: 246.94, duration: 0.25 }, // B3
  { freq: 220.00, duration: 0.6 },  // A3 (resolution)
  { freq: 185.00, duration: 0.4 },  // F#3 (tritone ending - unresolved tension)
];

let currentNoteIndex = 0;
let melodyTimeout: number | null = null;

function playNote(frequency: number, duration: number) {
  if (!audioContext || !gainNode) return;

  // Main oscillator - square wave for retro feel
  const oscillator1 = audioContext.createOscillator();
  const noteGain1 = audioContext.createGain();
  oscillator1.type = 'square';
  oscillator1.frequency.setValueAtTime(frequency, audioContext.currentTime);

  // Second oscillator - slightly detuned for creepy chorus effect
  const oscillator2 = audioContext.createOscillator();
  const noteGain2 = audioContext.createGain();
  oscillator2.type = 'sawtooth';
  oscillator2.frequency.setValueAtTime(frequency * 1.005, audioContext.currentTime);

  // Sub-bass oscillator for depth
  const oscillator3 = audioContext.createOscillator();
  const noteGain3 = audioContext.createGain();
  oscillator3.type = 'sine';
  oscillator3.frequency.setValueAtTime(frequency * 0.5, audioContext.currentTime);

  // Envelope for main note
  noteGain1.gain.setValueAtTime(0, audioContext.currentTime);
  noteGain1.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 0.01);
  noteGain1.gain.linearRampToValueAtTime(0.04, audioContext.currentTime + duration - 0.05);
  noteGain1.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);

  // Envelope for detuned oscillator (quieter)
  noteGain2.gain.setValueAtTime(0, audioContext.currentTime);
  noteGain2.gain.linearRampToValueAtTime(0.04, audioContext.currentTime + 0.02);
  noteGain2.gain.linearRampToValueAtTime(0.02, audioContext.currentTime + duration - 0.05);
  noteGain2.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);

  // Envelope for sub-bass (very quiet)
  noteGain3.gain.setValueAtTime(0, audioContext.currentTime);
  noteGain3.gain.linearRampToValueAtTime(0.03, audioContext.currentTime + 0.01);
  noteGain3.gain.linearRampToValueAtTime(0.015, audioContext.currentTime + duration - 0.05);
  noteGain3.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);

  // Connect all oscillators
  oscillator1.connect(noteGain1);
  noteGain1.connect(gainNode);
  
  oscillator2.connect(noteGain2);
  noteGain2.connect(gainNode);
  
  oscillator3.connect(noteGain3);
  noteGain3.connect(gainNode);

  // Start and stop all oscillators
  oscillator1.start(audioContext.currentTime);
  oscillator1.stop(audioContext.currentTime + duration);
  
  oscillator2.start(audioContext.currentTime);
  oscillator2.stop(audioContext.currentTime + duration);
  
  oscillator3.start(audioContext.currentTime);
  oscillator3.stop(audioContext.currentTime + duration);
}

function playMelody() {
  if (!isPlaying) return;

  const note = melody[currentNoteIndex];
  playNote(note.freq, note.duration);

  currentNoteIndex = (currentNoteIndex + 1) % melody.length;

  melodyTimeout = window.setTimeout(() => {
    playMelody();
  }, note.duration * 1000);
}

export function startBackgroundMusic() {
  if (isPlaying) return;

  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      gainNode = audioContext.createGain();
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime); // Low volume
      gainNode.connect(audioContext.destination);
    }

    isPlaying = true;
    currentNoteIndex = 0;
    playMelody();
  } catch (error) {
    console.log('Background music failed to start:', error);
  }
}

export function stopBackgroundMusic() {
  isPlaying = false;
  
  if (melodyTimeout !== null) {
    clearTimeout(melodyTimeout);
    melodyTimeout = null;
  }

  if (backgroundMusicNode) {
    backgroundMusicNode.stop();
    backgroundMusicNode = null;
  }
}

export function toggleBackgroundMusic() {
  if (isPlaying) {
    stopBackgroundMusic();
  } else {
    startBackgroundMusic();
  }
  return isPlaying;
}
