import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { GalleryPhoto, Lang } from '../types/invitation';
import { ResilientImage } from './ResilientImage';

interface PhotoGalleryLightboxProps {
  photos: GalleryPhoto[];
  lang: Lang;
  onLightboxChange?: (open: boolean) => void;
}

export function PhotoGalleryLightbox({
  photos,
  lang,
  onLightboxChange,
}: PhotoGalleryLightboxProps) {
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);
  const touchStartX = useRef<number | null>(null);

  const openPhoto = (photo: GalleryPhoto) => {
    setActivePhoto(photo);
    onLightboxChange?.(true);
  };

  const closePhoto = () => {
    setActivePhoto(null);
    onLightboxChange?.(false);
  };

  const stepPhoto = (delta: number) => {
    if (!activePhoto) return;
    const idx = photos.findIndex((p) => p.id === activePhoto.id);
    if (idx === -1) return;
    const nextIdx = (idx + delta + photos.length) % photos.length;
    setActivePhoto(photos[nextIdx]);
  };

  useEffect(() => {
    if (!activePhoto) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePhoto();
      if (e.key === 'ArrowLeft') stepPhoto(-1);
      if (e.key === 'ArrowRight') stepPhoto(1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activePhoto]);

  return (
    <section id="gallery-section" className="no-print scroll-mt-6">
      <div className="text-center mb-3.5">
        <p className="text-[10px] tracking-[0.2em] uppercase font-editorial text-[#8D6E36]">
          Gallery
        </p>
        <h3 className="font-moul text-base champagne-title mt-0.5">
          {lang === 'km' ? 'វិចិត្រសាលអនុស្សាវរីយ៍' : 'Photo Gallery'}
        </h3>
        <p className="text-[11px] text-[#5C5449] mt-0.5">
          {lang === 'km'
            ? 'សម្រស់ស្រុកស្រែ និងកម្រងអនុស្សាវរីយ៍'
            : 'Countryside Heritage & Ceremonial Moments'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {photos.map((photo) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => openPhoto(photo)}
            className={`group relative rounded-xl overflow-hidden border border-[#DFD2B6] couture-card-shadow bg-[#F3ECE0] cursor-pointer transition-all hover:border-[#B8934A] ${
              photo.span === 2 ? 'col-span-2' : 'col-span-1'
            } ${photo.aspect}`}
          >
            <ResilientImage
              src={photo.src}
              alt={lang === 'km' ? photo.captionKh : photo.captionEn}
              fallbackTitle={lang === 'km' ? photo.captionKh : photo.captionEn}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5 text-left">
              <span className="text-[#FAF7F0] text-[11px] font-medium leading-tight">
                {lang === 'km' ? photo.captionKh : photo.captionEn}
              </span>
              <span className="text-[#DFC282] text-[10px] mt-1 inline-flex items-center gap-1">
                <ZoomIn className="w-3 h-3" />
                <span>{lang === 'km' ? 'ពង្រីក' : 'View'}</span>
              </span>
            </div>
          </button>
        ))}
      </div>

      <p className="text-center text-[11px] text-[#6E6356] mt-2.5">
        {lang === 'km'
          ? 'ចុចលើរូបភាពដើម្បីទស្សនាទំហំធំ'
          : 'Tap any photo to view full size'}
      </p>

      {activePhoto && (
        <div
          className="fixed inset-0 z-[100] bg-[#0D0B09]/95 flex items-center justify-center p-2 sm:p-4 backdrop-blur-md select-none"
          onClick={closePhoto}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const diff = e.changedTouches[0].clientX - touchStartX.current;
            if (diff > 50) stepPhoto(-1);
            if (diff < -50) stepPhoto(1);
            touchStartX.current = null;
          }}
        >
          <div
            className="relative w-full max-w-[430px] h-[94dvh] max-h-[880px] bg-[#14110D] rounded-2xl sm:rounded-[32px] border border-[#C9A86A]/35 overflow-hidden flex flex-col justify-between p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={closePhoto}
                aria-label="Close photo"
                className="w-9 h-9 rounded-full bg-black/60 hover:bg-black border border-[#C9A86A]/45 text-[#F4E6C4] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative flex-1 flex items-center justify-center my-2">
              <ResilientImage
                src={activePhoto.src}
                alt={lang === 'km' ? activePhoto.captionKh : activePhoto.captionEn}
                className="w-full max-h-[70vh] object-contain rounded-xl border border-[#C9A86A]/35"
              />

              <button
                type="button"
                onClick={() => stepPhoto(-1)}
                aria-label="Previous photo"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/55 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => stepPhoto(1)}
                aria-label="Next photo"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/55 hover:bg-black/80 border border-white/25 text-white flex items-center justify-center cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-center text-xs text-[#F4E6C4] bg-black/65 border border-[#C9A86A]/30 rounded-full px-4 py-1.5 mx-auto max-w-[90%] truncate">
              {lang === 'km' ? activePhoto.captionKh : activePhoto.captionEn}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
