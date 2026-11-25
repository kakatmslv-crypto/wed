import { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, Crown, Palette, Share2, Sparkles } from 'lucide-react';
import {
  CLASSIC_KHMER_BLESSINGS,
  DRESS_CODE_PALETTE,
  FruitTrayGroup,
  ROYAL_CEREMONY_TRAYS,
  THIRTY_SIX_FRUITS,
} from '../data/ceremonialOfferings';
import { Lang } from '../types/invitation';
import { toKhmerDigits } from './CountdownStrip';
import { ResilientImage } from './ResilientImage';

interface RoyalCeremonyFeaturesProps {
  groomName: string;
  brideName: string;
  lang: Lang;
  onToast: (msg: string) => void;
}

type FruitFilter = 'all' | FruitTrayGroup;
type AristocratTab = 'protocol' | 'dress' | 'blessings';

export function RoyalCeremonyFeatures({
  groomName,
  brideName,
  lang,
  onToast,
}: RoyalCeremonyFeaturesProps) {
  const [fruitFilter, setFruitFilter] = useState<FruitFilter>('all');
  const [showAllFruits, setShowAllFruits] = useState(false);
  const [activeTab, setActiveTab] = useState<AristocratTab>('protocol');

  const filteredFruits =
    fruitFilter === 'all'
      ? THIRTY_SIX_FRUITS
      : THIRTY_SIX_FRUITS.filter((item) => item.group === fruitFilter);

  const visibleFruits =
    fruitFilter === 'all' && !showAllFruits
      ? filteredFruits.slice(0, 12)
      : filteredFruits;

  const handleCopyText = async (text: string, toastKm: string, toastEn: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    onToast(lang === 'km' ? toastKm : toastEn);
  };

  const handleShareInvite = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}${window.location.search}`;
    const title =
      lang === 'km'
        ? `ធៀបអញ្ជើញពិធីភ្ជាប់ពាក្យ · ${groomName} & ${brideName}`
        : `Engagement Invitation · ${groomName} & ${brideName}`;

    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl });
        return;
      } catch {
        // User cancelled or share failed; fall back to copy
      }
    }
    await handleCopyText(
      shareUrl,
      'បានចម្លងតំណធៀបអញ្ជើញរួចរាល់!',
      'Invitation link copied!'
    );
  };

  const fruitFilterTabs: { key: FruitFilter; km: string; en: string }[] = [
    { key: 'all', km: 'ទាំង ៣៦', en: 'All 36' },
    { key: 'prosperity', km: 'សិរីសួស្តី', en: 'Harmony' },
    { key: 'abundance', km: 'ទ្រព្យសម្បត្តិ', en: 'Wealth' },
    { key: 'sweetness', km: 'ផ្អែមល្ហែម', en: 'Sweetness' },
    { key: 'heritage', km: 'ប្រពៃណី', en: 'Heritage' },
  ];

  return (
    <div className="no-print space-y-7">
      {/* Section 1: 36 Auspicious Fruits of Cambodian Engagement */}
      <section id="fruits-section" className="scroll-mt-6 space-y-3.5">
        <div className="text-center">
          <p className="text-[10px] tracking-[0.2em] uppercase font-editorial text-[#8D6E36]">
            Royal Offerings
          </p>
          <h3 className="font-moul text-base champagne-title mt-0.5">
            {lang === 'km' ? 'ផ្លែឈើសិរីមង្គល ៣៦ មុខ' : '36 Auspicious Betrothal Fruits'}
          </h3>
          <p className="text-[11px] text-[#5C5449] mt-0.5">
            {lang === 'km'
              ? 'ពានជំនូនប្រពៃណីខ្មែរសម្រាប់ពិធីចូលស្តីដណ្តឹង និងភ្ជាប់ពាក្យ'
              : 'Traditional Khmer engagement trays symbolizing sweetness and prosperity'}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2D6BD] couture-card-shadow overflow-hidden">
          {/* Editorial 16:9 Trays Photograph with Measured Contrast Scrim */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#EFE6D3]">
            <ResilientImage
              src="/src/assets/images/khmer_36_fruits_trays_1795579006232.jpg"
              alt="ពានមាស ពានប្រាក់ ផ្លែឈើសិរីមង្គល ៣៦ មុខ និងផ្កាម្លិះប្រពៃណីខ្មែរ"
              fallbackTitle="ផ្លែឈើសិរីមង្គល ៣៦ មុខ"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-3.5 text-left">
              <p className="font-moul text-xs text-[#FFFDF5]">
                {lang === 'km'
                  ? 'ក្បួនហែជំនូនផ្លែឈើ ៣៦ មុខ'
                  : 'Ceremonial 36-Fruit Procession Trays'}
              </p>
              <p className="text-[10.5px] text-[#F1DCAA] mt-0.5">
                {lang === 'km'
                  ? 'ពានមាស-ពានប្រាក់ · ផ្កាម្លិះ · សូត្រមាសខ្មែរ'
                  : 'Gold & Silver Phan Bowls · Jasmine Garlands · Woven Silk'}
              </p>
            </div>
          </div>

          <div className="p-4 space-y-3.5">
            {/* Segmented Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-[#EFE8D8] rounded-xl">
              {fruitFilterTabs.map((tab) => {
                const isActive = fruitFilter === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setFruitFilter(tab.key)}
                    className={`flex-1 min-w-fit px-2.5 py-1.5 text-[11px] font-medium rounded-lg cursor-pointer transition whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-white text-[#1A1714] shadow-2xs'
                        : 'text-[#5C5449] hover:text-[#1A1714]'
                    }`}
                  >
                    {lang === 'km' ? tab.km : tab.en}
                  </button>
                );
              })}
            </div>

            {/* Clean Fruit Rows */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-2 pt-1">
              {visibleFruits.map((fruit) => {
                const numLabel =
                  lang === 'km'
                    ? toKhmerDigits(fruit.id.toString().padStart(2, '0'))
                    : fruit.id.toString().padStart(2, '0');

                return (
                  <div
                    key={fruit.id}
                    className="py-1.5 border-b border-[#F2EBDC] flex items-start gap-2 text-left"
                  >
                    <span className="text-[10px] font-semibold text-[#8D6E36] tabular-nums pt-0.5 shrink-0">
                      {numLabel}.
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#1A1714] leading-snug truncate">
                        {lang === 'km' ? fruit.nameKh : fruit.nameEn}
                      </p>
                      <p className="text-[10px] text-[#6E6356] leading-snug truncate">
                        {lang === 'km' ? fruit.meaningKh : fruit.meaningEn}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {fruitFilter === 'all' && (
              <button
                type="button"
                onClick={() => setShowAllFruits((prev) => !prev)}
                className="w-full py-2 px-3 rounded-xl bg-[#FAF7F0] hover:bg-[#F3ECDC] border border-[#D8C59B] text-xs font-medium text-[#2B241C] flex items-center justify-center gap-1.5 cursor-pointer transition whitespace-nowrap"
              >
                {showAllFruits ? (
                  <>
                    <ChevronUp className="w-3.5 h-3.5 text-[#8D6E36]" />
                    <span>
                      {lang === 'km' ? 'បង្រួមបញ្ជីផ្លែឈើ' : 'Show Fewer Fruits'}
                    </span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3.5 h-3.5 text-[#8D6E36]" />
                    <span>
                      {lang === 'km'
                        ? 'បង្ហាញផ្លែឈើទាំង ៣៦ មុខ'
                        : 'View All 36 Ceremonial Fruits'}
                    </span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Section 2: Aristocratic Protocol & Luxury Guest Features */}
      <section id="aristocratic-section" className="scroll-mt-6 space-y-3.5">
        <div className="text-center">
          <p className="text-[10px] tracking-[0.2em] uppercase font-editorial text-[#8D6E36]">
            Aristocratic Suite
          </p>
          <h3 className="font-moul text-base champagne-title mt-0.5">
            {lang === 'km' ? 'ពិធីការ និងមុខងារអភិជន' : 'Royal Protocol & Guest Suite'}
          </h3>
          <p className="text-[11px] text-[#5C5449] mt-0.5">
            {lang === 'km'
              ? 'ពានជំនូន · សម្លៀកបំពាក់ប្រពៃណី · ពាក្យជូនពរប្រសិទ្ធពរ'
              : 'Procession Guide · Attire Palette · Classical Blessings'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2D6BD] couture-card-shadow space-y-4">
          {/* Interactive Suite Tabs */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-[#EFE8D8] rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('protocol')}
              className={`py-1.5 px-2 text-[11px] font-medium rounded-lg flex items-center justify-center gap-1 cursor-pointer transition whitespace-nowrap shrink-0 ${
                activeTab === 'protocol'
                  ? 'bg-white text-[#1A1714] shadow-2xs'
                  : 'text-[#5C5449] hover:text-[#1A1714]'
              }`}
            >
              <Crown className="w-3 h-3 text-[#8D6E36]" />
              <span>{lang === 'km' ? 'ក្បួនជំនូន' : 'Trays'}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('dress')}
              className={`py-1.5 px-2 text-[11px] font-medium rounded-lg flex items-center justify-center gap-1 cursor-pointer transition whitespace-nowrap shrink-0 ${
                activeTab === 'dress'
                  ? 'bg-white text-[#1A1714] shadow-2xs'
                  : 'text-[#5C5449] hover:text-[#1A1714]'
              }`}
            >
              <Palette className="w-3 h-3 text-[#8D6E36]" />
              <span>{lang === 'km' ? 'សម្លៀកបំពាក់' : 'Attire'}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('blessings')}
              className={`py-1.5 px-2 text-[11px] font-medium rounded-lg flex items-center justify-center gap-1 cursor-pointer transition whitespace-nowrap shrink-0 ${
                activeTab === 'blessings'
                  ? 'bg-white text-[#1A1714] shadow-2xs'
                  : 'text-[#5C5449] hover:text-[#1A1714]'
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#8D6E36]" />
              <span>{lang === 'km' ? 'ពាក្យប្រសិទ្ធពរ' : 'Blessings'}</span>
            </button>
          </div>

          {/* Tab 1: Royal Procession Trays */}
          {activeTab === 'protocol' && (
            <div className="divide-y divide-[#F2EBDC]">
              {ROYAL_CEREMONY_TRAYS.map((tray, idx) => (
                <div key={tray.id} className="py-2.5 first:pt-0 last:pb-0 space-y-0.5 text-left">
                  <p className="text-xs font-semibold text-[#1A1714]">
                    <span className="text-[#8D6E36] tabular-nums mr-1.5">
                      {lang === 'km' ? toKhmerDigits((idx + 1).toString().padStart(2, '0')) : `0${idx + 1}`}.
                    </span>
                    {lang === 'km' ? tray.titleKh : tray.titleEn}
                  </p>
                  <p className="text-[11px] text-[#5C5449] leading-relaxed pl-5">
                    {lang === 'km' ? tray.detailKh : tray.detailEn}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Aristocratic Dress Code Palette */}
          {activeTab === 'dress' && (
            <div className="space-y-3">
              <p className="text-[11px] text-[#5C5449] text-left leading-relaxed">
                {lang === 'km'
                  ? 'ភ្ញៀវកិត្តិយសអាចជ្រើសរើសសម្លៀកបំពាក់ប្រពៃណី ហូល-ផាមួង ឬសម្លៀកបំពាក់សមរម្យតាមពណ៌សិរីមង្គលខាងក្រោម៖'
                  : 'Honored guests are warmly invited to wear traditional Khmer silk or formal attire in these celebratory tones:'}
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {DRESS_CODE_PALETTE.map((swatch) => (
                  <div
                    key={swatch.id}
                    className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#E5D9BF] flex items-center gap-2.5 text-left"
                  >
                    <span
                      className="w-8 h-8 rounded-lg border border-black/10 shrink-0 shadow-2xs"
                      style={{ backgroundColor: swatch.hex }}
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#1A1714] truncate">
                        {lang === 'km' ? swatch.nameKh : swatch.nameEn}
                      </p>
                      <p className="text-[10px] text-[#6E6356] truncate">
                        {lang === 'km' ? swatch.noteKh : swatch.noteEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Classical Khmer Blessings (1-Tap Copy) */}
          {activeTab === 'blessings' && (
            <div className="space-y-2.5">
              {CLASSIC_KHMER_BLESSINGS.map((blessing) => {
                const body = lang === 'km' ? blessing.textKh : blessing.textEn;
                return (
                  <div
                    key={blessing.id}
                    className="p-3 rounded-xl bg-[#FAF7F0] border border-[#E5D9BF] space-y-1.5 text-left"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold text-[#6E511E]">
                        {lang === 'km' ? blessing.titleKh : blessing.titleEn}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyText(
                            body,
                            'បានចម្លងពាក្យប្រសិទ្ធពររួចរាល់!',
                            'Blessing copied to clipboard!'
                          )
                        }
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-[#F3ECDC] border border-[#D8C59B] text-[10.5px] font-medium text-[#1A1714] cursor-pointer transition whitespace-nowrap shrink-0"
                      >
                        <Copy className="w-3 h-3 text-[#8D6E36]" />
                        <span>{lang === 'km' ? 'ចម្លង' : 'Copy'}</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-[#3F3931] leading-relaxed">{body}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom Suite Action: Share VIP Invitation Link */}
          <div className="pt-2 border-t border-[#EFE8D8]">
            <button
              type="button"
              onClick={handleShareInvite}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#7B5518] via-[#A97E32] to-[#7B5518] hover:brightness-105 text-[#FFFDF5] text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition whitespace-nowrap"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>
                {lang === 'km'
                  ? 'ចែករំលែកធៀបអញ្ជើញកិត្តិយស'
                  : 'Share Honored Invitation'}
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
