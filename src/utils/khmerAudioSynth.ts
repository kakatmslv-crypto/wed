export interface BuiltInTrackSpec {
  id: string;
  titleKh: string;
  titleEn: string;
  artistKh: string;
  artistEn: string;
  cover: string;
  bpm: number;
  melody: number[];
  bass: number[];
  pad: number[][];
}

export const BUILT_IN_TRACKS: BuiltInTrackSpec[] = [
  {
    id: 'serey-mongkol',
    titleKh: 'សិរីមង្គល (ភ្លេងប្រពៃណីខ្មែរ)',
    titleEn: 'Serey Mongkol (Traditional Khmer)',
    artistKh: 'ភ្លេងពិណពាទ្យសិរីសួស្តី',
    artistEn: 'Traditional Engagement Ensemble',
    cover: '/src/assets/images/countryside_village_ceremony_1795571106686.jpg',
    bpm: 84,
    // C major pentatonic: C5=523.25, D5=587.33, E5=659.25, G5=783.99, A5=880
    melody: [
      523.25, 659.25, 783.99, 659.25, 587.33, 523.25, 440.0, 523.25,
      587.33, 659.25, 783.99, 880.0, 783.99, 659.25, 587.33, 523.25,
      659.25, 783.99, 880.0, 783.99, 659.25, 587.33, 523.25, 440.0,
      392.0, 440.0, 523.25, 587.33, 659.25, 587.33, 523.25, 523.25,
    ],
    bass: [130.81, 130.81, 146.83, 130.81, 164.81, 146.83, 110.0, 130.81],
    pad: [
      [261.63, 329.63, 392.0],
      [220.0, 261.63, 329.63],
      [196.0, 293.66, 392.0],
      [261.63, 329.63, 392.0],
    ],
  },
  {
    id: 'mchas-besdong',
    titleKh: 'ម្ចាស់បេះដូង (មនោសញ្ចេតនា)',
    titleEn: 'Mchas Besdong (Romantic Serenade)',
    artistKh: 'ភ្លេងមង្គលមនោសញ្ចេតនា',
    artistEn: 'Warm Romantic Strings & Khim',
    cover: '/src/assets/images/countryside_lotus_pond_1795571105380.jpg',
    bpm: 72,
    melody: [
      440.0, 523.25, 587.33, 659.25, 587.33, 523.25, 440.0, 392.0,
      440.0, 523.25, 659.25, 783.99, 659.25, 587.33, 523.25, 440.0,
      392.0, 440.0, 523.25, 659.25, 587.33, 523.25, 440.0, 392.0,
      329.63, 392.0, 440.0, 523.25, 587.33, 523.25, 440.0, 440.0,
    ],
    bass: [110.0, 130.81, 146.83, 110.0, 98.0, 110.0, 130.81, 110.0],
    pad: [
      [220.0, 261.63, 329.63],
      [196.0, 246.94, 293.66],
      [174.61, 220.0, 261.63],
      [220.0, 261.63, 329.63],
    ],
  },
  {
    id: 'jasmine-blossom',
    titleKh: 'ផ្កាម្លិះរួមដំណើរ',
    titleEn: 'Jasmine Blossom Walk',
    artistKh: 'ភ្លេងគឹម និងខ្លុយស្រាល',
    artistEn: 'Khim Dulcimer & Soft Breeze',
    cover: '/src/assets/images/countryside_palm_path_1795571105338.jpg',
    bpm: 78,
    melody: [
      392.0, 440.0, 523.25, 659.25, 523.25, 440.0, 392.0, 329.63,
      392.0, 523.25, 587.33, 659.25, 783.99, 659.25, 587.33, 523.25,
      659.25, 587.33, 523.25, 440.0, 523.25, 587.33, 659.25, 523.25,
      440.0, 392.0, 329.63, 392.0, 440.0, 523.25, 392.0, 392.0,
    ],
    bass: [196.0, 130.81, 146.83, 130.81, 164.81, 146.83, 110.0, 98.0],
    pad: [
      [196.0, 246.94, 293.66],
      [261.63, 329.63, 392.0],
      [220.0, 261.63, 329.63],
      [196.0, 293.66, 392.0],
    ],
  },
  {
    id: 'golden-betrothal',
    titleKh: 'ចំណងស្នេហ៍សិរីសួស្តី',
    titleEn: 'Golden Betrothal Blessing',
    artistKh: 'ភ្លេងប្រពៃណីសម្រាប់ពិធីភ្ជាប់ពាក្យ',
    artistEn: 'Ceremonial Betrothal Harmony',
    cover: '/src/assets/images/engagement_tea_betel_tray_1795509757497.jpg',
    bpm: 88,
    melody: [
      587.33, 659.25, 783.99, 880.0, 783.99, 659.25, 587.33, 523.25,
      587.33, 783.99, 880.0, 783.99, 659.25, 587.33, 523.25, 440.0,
      523.25, 587.33, 659.25, 783.99, 659.25, 587.33, 523.25, 440.0,
      392.0, 523.25, 587.33, 659.25, 587.33, 523.25, 587.33, 587.33,
    ],
    bass: [146.83, 146.83, 196.0, 146.83, 130.81, 146.83, 110.0, 146.83],
    pad: [
      [293.66, 369.99, 440.0],
      [261.63, 329.63, 392.0],
      [220.0, 293.66, 329.63],
      [293.66, 369.99, 440.0],
    ],
  },
];

const wavUrlCache = new Map<string, string>();

function encodeWavFromSamples(samples: Float32Array, sampleRate: number): Blob {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  const writeStr = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i += 1) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeStr(0, 'RIFF');
  view.setUint32(4, 36 + samples.length * 2, true);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeStr(36, 'data');
  view.setUint32(40, samples.length * 2, true);

  let offset = 44;
  for (let i = 0; i < samples.length; i += 1) {
    const clamped = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff, true);
    offset += 2;
  }

  return new Blob([buffer], { type: 'audio/wav' });
}

export function getOrCreateTrackAudioUrl(track: BuiltInTrackSpec): string {
  const existing = wavUrlCache.get(track.id);
  if (existing) return existing;

  const sampleRate = 22050;
  const beatSeconds = 60 / track.bpm;
  const totalBeats = track.melody.length;
  const durationSeconds = totalBeats * beatSeconds;
  const totalSamples = Math.floor(durationSeconds * sampleRate);
  const samples = new Float32Array(totalSamples);

  // Layer 1: Warm Khim / Roneat plucked melody
  for (let b = 0; b < totalBeats; b += 1) {
    const freq = track.melody[b];
    const startSample = Math.floor(b * beatSeconds * sampleRate);
    const noteLengthSamples = Math.floor(beatSeconds * 1.45 * sampleRate);

    for (let i = 0; i < noteLengthSamples; i += 1) {
      const idx = startSample + i;
      if (idx >= totalSamples) break;
      const t = i / sampleRate;
      const attack = Math.min(1, t / 0.018);
      const decay = Math.exp(-t * 3.4);
      const env = attack * decay;

      const fundamental = Math.sin(2 * Math.PI * freq * t);
      const harmonic2 = 0.28 * Math.sin(2 * Math.PI * freq * 2 * t) * Math.exp(-t * 5.2);
      const harmonic3 = 0.09 * Math.sin(2 * Math.PI * freq * 3 * t) * Math.exp(-t * 8.0);
      samples[idx] += 0.22 * env * (fundamental + harmonic2 + harmonic3);
    }
  }

  // Layer 2: Soft breathing harmonic pad chords
  const chordBeats = totalBeats / track.pad.length;
  for (let c = 0; c < track.pad.length; c += 1) {
    const chord = track.pad[c];
    const startSample = Math.floor(c * chordBeats * beatSeconds * sampleRate);
    const chordSamples = Math.floor(chordBeats * beatSeconds * sampleRate);

    for (let i = 0; i < chordSamples; i += 1) {
      const idx = startSample + i;
      if (idx >= totalSamples) break;
      const t = i / sampleRate;
      const progress = i / chordSamples;
      const env = Math.sin(Math.PI * progress);

      let sum = 0;
      for (const f of chord) {
        sum += Math.sin(2 * Math.PI * f * t);
      }
      samples[idx] += 0.045 * env * (sum / chord.length);
    }
  }

  // Layer 3: Gentle warm bass root notes
  const bassBeats = totalBeats / track.bass.length;
  for (let k = 0; k < track.bass.length; k += 1) {
    const freq = track.bass[k];
    const startSample = Math.floor(k * bassBeats * beatSeconds * sampleRate);
    const bassSamples = Math.floor(bassBeats * beatSeconds * sampleRate);

    for (let i = 0; i < bassSamples; i += 1) {
      const idx = startSample + i;
      if (idx >= totalSamples) break;
      const t = i / sampleRate;
      const env = Math.min(1, t / 0.05) * Math.exp(-t * 1.1);
      samples[idx] += 0.14 * env * Math.sin(2 * Math.PI * freq * t);
    }
  }

  // Smooth loop crossfade at edges (0.04s)
  const fadeSamples = Math.floor(0.04 * sampleRate);
  for (let i = 0; i < fadeSamples; i += 1) {
    const w = i / fadeSamples;
    samples[i] *= w;
    samples[totalSamples - 1 - i] *= w;
  }

  const blob = encodeWavFromSamples(samples, sampleRate);
  const url = URL.createObjectURL(blob);
  wavUrlCache.set(track.id, url);
  return url;
}
