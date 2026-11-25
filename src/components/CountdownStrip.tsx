import { useEffect, useState } from 'react';
import { Lang } from '../types/invitation';

interface CountdownStripProps {
  targetIso: string;
  lang: Lang;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

const KHMER_DIGITS = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];

export function toKhmerDigits(num: number | string): string {
  return String(num)
    .split('')
    .map((ch) => (ch >= '0' && ch <= '9' ? KHMER_DIGITS[Number(ch)] : ch))
    .join('');
}

function computeRemaining(targetIso: string): TimeRemaining {
  const parsed = new Date(targetIso).getTime();
  const target = Number.isNaN(parsed)
    ? new Date('2027-02-06T07:00:00+07:00').getTime()
    : parsed;
  const diff = target - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPast: false,
  };
}

export function CountdownStrip({ targetIso, lang }: CountdownStripProps) {
  const [remaining, setRemaining] = useState<TimeRemaining>(() => computeRemaining(targetIso));

  useEffect(() => {
    setRemaining(computeRemaining(targetIso));
    const timer = window.setInterval(() => {
      setRemaining(computeRemaining(targetIso));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [targetIso]);

  const boxes = [
    { value: remaining.days, km: 'ថ្ងៃ', en: 'Days' },
    { value: remaining.hours, km: 'ម៉ោង', en: 'Hours' },
    { value: remaining.minutes, km: 'នាទី', en: 'Mins' },
    { value: remaining.seconds, km: 'វិនាទី', en: 'Secs' },
  ];

  return (
    <section id="countdown-section" className="no-print scroll-mt-6">
      <div className="text-center mb-3.5">
        <p className="text-[10px] tracking-[0.2em] uppercase font-editorial text-[#8D6E36]">
          {lang === 'km' ? 'ថ្ងៃសិរីមង្គល' : 'The Date'}
        </p>
        <h3 className="font-moul text-base champagne-title mt-0.5">
          {remaining.isPast
            ? lang === 'km'
              ? 'ថ្ងៃសិរីមង្គលបានមកដល់'
              : 'The Special Day Has Arrived'
            : lang === 'km'
            ? 'រាប់ថយក្រោយដល់ថ្ងៃពិធី'
            : 'Counting Down'}
        </h3>
        <p className="text-[11px] text-[#5C5449] mt-0.5">
          {lang === 'km' ? 'ថ្ងៃសៅរ៍ ទី ០៦ ខែកុម្ភៈ ឆ្នាំ២០២៧' : 'Saturday, 06 February 2027'}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {boxes.map((box) => {
          const formatted = String(box.value).padStart(2, '0');
          return (
            <div
              key={box.en}
              className="bg-white rounded-xl py-3.5 px-2 border border-[#E2D6BD] couture-card-shadow text-center"
            >
              <p className="text-xl sm:text-2xl font-semibold text-[#1A1714] tabular-nums leading-none">
                {lang === 'km' ? toKhmerDigits(formatted) : formatted}
              </p>
              <p className="text-[10px] font-medium text-[#8D6E36] mt-1.5">
                {lang === 'km' ? box.km : box.en}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
