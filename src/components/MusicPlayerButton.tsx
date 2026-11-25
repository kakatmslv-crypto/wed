import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  ChevronDown,
  Music,
  Pause,
  Play,
  Plus,
  Trash2,
  Upload,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { Lang } from '../types/invitation';
import { BUILT_IN_TRACKS, getOrCreateTrackAudioUrl } from '../utils/khmerAudioSynth';
import { ResilientImage } from './ResilientImage';

export interface SongItem {
  id: string;
  titleKh: string;
  titleEn: string;
  artistKh: string;
  artistEn: string;
  cover: string;
  src?: string;
  isCustom?: boolean;
}

interface MusicPlayerButtonProps {
  lang: Lang;
  isPlaying: boolean;
  setIsPlaying: (val: boolean) => void;
  onToast: (msg: string) => void;
}

const CUSTOM_SONGS_KEY = 'khmer_engagement_custom_songs_v1';

export function MusicPlayerButton({
  lang,
  isPlaying,
  setIsPlaying,
  onToast,
}: MusicPlayerButtonProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [customSongs, setCustomSongs] = useState<SongItem[]>(() => {
    try {
      const saved = window.localStorage.getItem(CUSTOM_SONGS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter((item) => item && typeof item.src === 'string' && !item.src.startsWith('blob:'));
        }
      }
    } catch {
      // Ignore storage read errors
    }
    return [];
  });

  const [trackIndex, setTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const [newTitle, setNewTitle] = useState('');
  const [newArtist, setNewArtist] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const allSongs: SongItem[] = useMemo(() => {
    const featuredUpload: SongItem = {
      id: 'chen-nevermind-prewedding',
      titleKh: 'សម្លឹងកែវភ្នែកអូន (Nevermind - Chen)',
      titleEn: 'Nevermind — Chen (Pre-Wedding)',
      artistKh: 'ចម្រៀងមនោសញ្ចេតនា សិរីមង្គល',
      artistEn: 'Romantic Khmer Pre-Wedding Song',
      cover: '/src/assets/images/cambodia_countryside_scenery_1795570954859.jpg',
      src: '/assets/aistudio/Nevermind________Chen_Pre_wedding_Video_Gooda_Sokneth_3921d327.mp3',
    };
    const builtIn: SongItem[] = BUILT_IN_TRACKS.map((t) => ({
      id: t.id,
      titleKh: t.titleKh,
      titleEn: t.titleEn,
      artistKh: t.artistKh,
      artistEn: t.artistEn,
      cover: t.cover,
    }));
    return [featuredUpload, ...builtIn, ...customSongs];
  }, [customSongs]);

  const currentSong = allSongs[trackIndex] ?? allSongs[0];

  useEffect(() => {
    const persistable = customSongs.filter((s) => s.src && !s.src.startsWith('blob:'));
    try {
      window.localStorage.setItem(CUSTOM_SONGS_KEY, JSON.stringify(persistable));
    } catch {
      // Ignore storage write errors
    }
  }, [customSongs]);

  const activeSrc = useMemo(() => {
    if (!currentSong) return '';
    if (currentSong.src) return currentSong.src;
    const spec = BUILT_IN_TRACKS.find((t) => t.id === currentSong.id) ?? BUILT_IN_TRACKS[0];
    return getOrCreateTrackAudioUrl(spec);
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !activeSrc) return;

    if (audio.src !== activeSrc) {
      audio.src = activeSrc;
      audio.load();
    }
    audio.muted = isMuted;
    audio.volume = 0.75;

    if (isPlaying) {
      audio.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [activeSrc, isPlaying, isMuted, setIsPlaying]);

  const togglePlay = () => {
    const next = !isPlaying;
    setIsPlaying(next);
    onToast(
      next
        ? lang === 'km'
          ? `កំពុងចាក់៖ ${currentSong.titleKh}`
          : `Playing: ${currentSong.titleEn}`
        : lang === 'km'
        ? 'បានផ្អាកភ្លេងមង្គល'
        : 'Music paused'
    );
  };

  const selectTrack = (idx: number) => {
    if (idx === trackIndex) {
      togglePlay();
      return;
    }
    setProgress(0);
    setTrackIndex(idx);
    setIsPlaying(true);
    const chosen = allSongs[idx];
    if (chosen) {
      onToast(
        lang === 'km'
          ? `កំពុងចាក់៖ ${chosen.titleKh}`
          : `Playing: ${chosen.titleEn}`
      );
    }
  };

  const handleAddUrlSong = (e: FormEvent) => {
    e.preventDefault();
    const trimmedUrl = newUrl.trim();
    if (!trimmedUrl) {
      onToast(
        lang === 'km' ? 'សូមបញ្ចូលតំណភ្លេង (MP3 URL) ជាមុន!' : 'Please enter an audio URL first.'
      );
      return;
    }

    const title = newTitle.trim() || (lang === 'km' ? 'បទចម្រៀងផ្ទាល់ខ្លួន' : 'Custom Song');
    const artist = newArtist.trim() || (lang === 'km' ? 'បញ្ចូលដោយម្ចាស់ធៀប' : 'Added by Host');

    const added: SongItem = {
      id: `custom-${Date.now()}`,
      titleKh: title,
      titleEn: title,
      artistKh: artist,
      artistEn: artist,
      cover: '/src/assets/images/countryside_lotus_pond_1795571105380.jpg',
      src: trimmedUrl,
      isCustom: true,
    };

    const nextIdx = allSongs.length;
    setCustomSongs((prev) => [...prev, added]);
    setTrackIndex(nextIdx);
    setIsPlaying(true);
    setNewTitle('');
    setNewArtist('');
    setNewUrl('');
    setShowAddForm(false);
    onToast(lang === 'km' ? `បានបន្ថែមបទ៖ ${title}` : `Added song: ${title}`);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const blobUrl = URL.createObjectURL(file);
    const cleanName = file.name.replace(/\.[^/.]+$/, '');
    const title = newTitle.trim() || cleanName;

    const added: SongItem = {
      id: `local-${Date.now()}`,
      titleKh: title,
      titleEn: title,
      artistKh: lang === 'km' ? 'ឯកសារភ្លេងពីឧបករណ៍' : 'Uploaded Audio File',
      artistEn: 'Uploaded Audio File',
      cover: '/src/assets/images/countryside_palm_path_1795571105338.jpg',
      src: blobUrl,
      isCustom: true,
    };

    const nextIdx = allSongs.length;
    setCustomSongs((prev) => [...prev, added]);
    setTrackIndex(nextIdx);
    setIsPlaying(true);
    setNewTitle('');
    setNewArtist('');
    setShowAddForm(false);
    e.target.value = '';
    onToast(lang === 'km' ? `បានបន្ថែម និងចាក់៖ ${title}` : `Added & playing: ${title}`);
  };

  const handleDeleteCustom = (id: string, idxInAll: number) => {
    setCustomSongs((prev) => prev.filter((item) => item.id !== id));
    if (trackIndex === idxInAll) {
      setTrackIndex(0);
    } else if (trackIndex > idxInAll) {
      setTrackIndex((prev) => Math.max(0, prev - 1));
    }
    onToast(lang === 'km' ? 'បានលុបបទចម្រៀង' : 'Song removed');
  };

  return (
    <div className="relative">
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onTimeUpdate={(e) => {
          const el = e.currentTarget;
          if (el.duration && Number.isFinite(el.duration)) {
            setProgress((el.currentTime / el.duration) * 100);
          }
        }}
        onError={() => {
          setIsPlaying(false);
          onToast(
            lang === 'km'
              ? 'មិនអាចចាក់តំណភ្លេងនេះបានទេ សូមសាកល្បងបទផ្សេង!'
              : 'Could not play this audio link. Please try another track.'
          );
        }}
      />

      <div className="flex items-center">
        <button
          type="button"
          onClick={togglePlay}
          className="h-8 pl-2.5 pr-2 rounded-l-full bg-[#1A1714]/75 hover:bg-[#1A1714]/90 backdrop-blur-md border border-r-0 border-[#DFC282]/55 text-[#FAF3E3] flex items-center gap-1.5 text-xs font-medium cursor-pointer transition whitespace-nowrap"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <span className="flex items-center gap-0.5 h-3.5" aria-hidden="true">
              <span className="wave-bar w-0.5 bg-[#DFC282] rounded-full" />
              <span className="wave-bar w-0.5 bg-[#FAF7F0] rounded-full" />
              <span className="wave-bar w-0.5 bg-[#DFC282] rounded-full" />
            </span>
          ) : (
            <Music className="w-3.5 h-3.5 text-[#DFC282]" />
          )}
          <span className="text-[10px]">
            {lang === 'km' ? (isPlaying ? 'កំពុងលេង' : 'ភ្លេង') : isPlaying ? 'Playing' : 'Music'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="h-8 px-2 rounded-r-full bg-[#1A1714]/75 hover:bg-[#1A1714]/90 backdrop-blur-md border border-[#DFC282]/55 text-[#FAF3E3] flex items-center justify-center cursor-pointer transition"
          aria-label="Open playlist"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {menuOpen && (
        <div className="absolute right-0 top-10 z-50 w-76 max-w-[calc(100vw-28px)] bg-[#FCFBF7] rounded-2xl shadow-[0_18px_50px_rgba(13,11,9,0.45)] border border-[#D8C59B] p-3.5 space-y-2.5 text-left">
          <div className="flex items-center justify-between pb-2 border-b border-[#EAE0CA]">
            <div>
              <p className="font-moul text-[11px] text-[#1A1714]">
                {lang === 'km' ? 'បញ្ជីបទចម្រៀងមង្គល' : 'Engagement Playlist'}
              </p>
              <p className="text-[10px] text-[#8D6E36]">
                {lang === 'km'
                  ? `មាន ${allSongs.length} បទសម្រាប់ជ្រើសរើស`
                  : `${allSongs.length} songs available`}
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsMuted((m) => !m)}
                className="w-6 h-6 rounded-full bg-[#F3ECDC] hover:bg-[#E7DEC9] text-[#1A1714] flex items-center justify-center cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="w-6 h-6 rounded-full bg-[#F3ECDC] hover:bg-[#E7DEC9] text-[#1A1714] flex items-center justify-center cursor-pointer"
                aria-label="Close playlist"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] text-[#1A1714] font-medium">
              <span className="truncate max-w-[180px]">
                {lang === 'km' ? currentSong.titleKh : currentSong.titleEn}
              </span>
              <span className="text-[#8D6E36] tabular-nums">
                {isPlaying ? (lang === 'km' ? 'កំពុងចាក់' : 'Playing') : lang === 'km' ? 'ផ្អាក' : 'Paused'}
              </span>
            </div>
            <div className="h-1 w-full bg-[#EAE0CA] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#8D6E36] transition-all duration-200"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
          </div>

          <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-0.5">
            {allSongs.map((song, idx) => {
              const isCurrent = idx === trackIndex;
              const isActive = isCurrent && isPlaying;
              return (
                <div
                  key={song.id}
                  className={`rounded-xl border flex items-center gap-2 p-2 transition ${
                    isCurrent
                      ? 'bg-[#F3ECDC] border-[#C5A467]'
                      : 'bg-white hover:bg-[#FAF7F0] border-[#EAE0CA]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => selectTrack(idx)}
                    className="flex-1 min-w-0 flex items-center gap-2.5 text-left cursor-pointer"
                  >
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-[#D8C59B] shrink-0 bg-[#EFE8D8]">
                      <ResilientImage
                        src={song.cover}
                        alt={song.titleKh}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className={`absolute inset-0 flex items-center justify-center ${
                          isActive ? 'bg-black/45' : 'bg-black/20'
                        }`}
                      >
                        {isActive ? (
                          <Pause className="w-3.5 h-3.5 text-white" />
                        ) : (
                          <Play className="w-3.5 h-3.5 text-white ml-0.5" />
                        )}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-[#1A1714] truncate">
                        {lang === 'km' ? song.titleKh : song.titleEn}
                      </p>
                      <p className="text-[10px] text-[#6E6356] truncate">
                        {lang === 'km' ? song.artistKh : song.artistEn}
                      </p>
                    </div>
                  </button>

                  {song.isCustom && (
                    <button
                      type="button"
                      onClick={() => handleDeleteCustom(song.id, idx)}
                      aria-label="Remove custom song"
                      className="p-1.5 text-[#9A8F80] hover:text-[#5B1418] cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-1.5 border-t border-[#EAE0CA] space-y-2">
            {!showAddForm ? (
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="py-2 px-2.5 rounded-xl bg-[#1A1714] hover:bg-[#2F2A24] text-[#FAF7F0] text-[11px] font-medium flex items-center justify-center gap-1.5 cursor-pointer transition whitespace-nowrap"
                >
                  <Upload className="w-3.5 h-3.5 text-[#DFC282]" />
                  <span>{lang === 'km' ? 'បញ្ចូល MP3' : 'Upload MP3'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(true)}
                  className="py-2 px-2.5 rounded-xl bg-white hover:bg-[#FAF7F0] border border-[#D8C59B] text-[#1A1714] text-[11px] font-medium flex items-center justify-center gap-1.5 cursor-pointer transition whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5 text-[#8D6E36]" />
                  <span>{lang === 'km' ? 'បន្ថែមតំណ' : 'Add URL'}</span>
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleAddUrlSong}
                className="space-y-2 bg-white p-2.5 rounded-xl border border-[#DDD0B5]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#1A1714]">
                    {lang === 'km' ? 'បន្ថែមបទចម្រៀងថ្មី' : 'Add Song by URL'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="text-[10px] text-[#6E6356] hover:text-[#1A1714] cursor-pointer"
                  >
                    {lang === 'km' ? 'បោះបង់' : 'Cancel'}
                  </button>
                </div>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder={lang === 'km' ? 'ឈ្មោះបទចម្រៀង' : 'Song title'}
                  className="w-full px-2.5 py-1.5 text-[11px] rounded-lg border border-[#DDD0B5] bg-[#FAF7F0] text-[#1A1714]"
                />
                <input
                  type="text"
                  value={newArtist}
                  onChange={(e) => setNewArtist(e.target.value)}
                  placeholder={lang === 'km' ? 'អ្នកច្រៀង (ជម្រើស)' : 'Artist (optional)'}
                  className="w-full px-2.5 py-1.5 text-[11px] rounded-lg border border-[#DDD0B5] bg-[#FAF7F0] text-[#1A1714]"
                />
                <input
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://.../song.mp3"
                  className="w-full px-2.5 py-1.5 text-[11px] rounded-lg border border-[#DDD0B5] bg-[#FAF7F0] text-[#1A1714]"
                />
                <button
                  type="submit"
                  className="w-full py-1.5 rounded-lg bg-[#5B1418] hover:bg-[#491013] text-[#FAF7F0] text-[11px] font-medium cursor-pointer"
                >
                  {lang === 'km' ? 'រក្សាទុក និងចាក់' : 'Save & Play'}
                </button>
              </form>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>
      )}
    </div>
  );
}
