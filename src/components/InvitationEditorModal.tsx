import { useState } from 'react';
import { Check, Copy, RotateCcw, X } from 'lucide-react';
import { InvitationData, PaperPalette } from '../types/invitation';

interface InvitationEditorModalProps {
  isOpen: boolean;
  data: InvitationData;
  onChange: (next: InvitationData) => void;
  onReset: () => void;
  onClose: () => void;
}

export function InvitationEditorModal({
  isOpen,
  data,
  onChange,
  onReset,
  onClose,
}: InvitationEditorModalProps) {
  const [guestLinkName, setGuestLinkName] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const updateField = <K extends keyof InvitationData>(key: K, value: InvitationData[K]) => {
    onChange({ ...data, [key]: value });
  };

  const personalizedUrl = (() => {
    const base = `${window.location.origin}${window.location.pathname}`;
    const trimmed = guestLinkName.trim();
    return trimmed ? `${base}?to=${encodeURIComponent(trimmed)}` : base;
  })();

  const handleCopyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(personalizedUrl);
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 2200);
    } catch {
      setCopiedLink(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="editor-modal-title"
      className="no-print fixed inset-0 z-[110] flex items-center justify-end bg-black/55 backdrop-blur-xs"
    >
      <div className="w-full max-w-lg h-full bg-[#FCFBF7] border-l border-[#D8CCB4] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-[#E5DEC9]">
          <div>
            <h2 id="editor-modal-title" className="text-base font-semibold text-[#1C1917]">
              កែសម្រួលគំរូធៀប និងបង្កើតតំណអញ្ជើញ
            </h2>
            <p className="text-xs text-[#6B6257]">
              កែប្រែឈ្មោះ កាលបរិច្ឆេទ ឬបង្កើតតំណភ្ជាប់តាមឈ្មោះភ្ញៀវ
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="បិទផ្ទាំងកែសម្រួល"
            className="p-2 rounded-lg text-[#574F45] hover:bg-[#EFE9DC] hover:text-[#1C1917] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
          {/* Personalized Guest Link Generator */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-300/80 space-y-2.5">
            <h3 className="text-xs font-semibold text-amber-950">
              បង្កើតតំណអញ្ជើញសម្រាប់ភ្ញៀវម្នាក់ៗ (?to=ឈ្មោះភ្ញៀវ)
            </h3>
            <input
              type="text"
              value={guestLinkName}
              onChange={(e) => setGuestLinkName(e.target.value)}
              placeholder="វាយឈ្មោះភ្ញៀវ ឧ. លោក សុខ វិបុល"
              className="w-full px-3 py-2 text-xs rounded-lg border border-amber-300 bg-white text-[#1C1917]"
            />
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={personalizedUrl}
                className="flex-1 px-2.5 py-1.5 text-[11px] rounded-lg border border-amber-200 bg-white/80 text-neutral-600 truncate"
              />
              <button
                type="button"
                onClick={handleCopyInviteLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-800 text-white hover:bg-amber-900 cursor-pointer whitespace-nowrap"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'បានចម្លង' : 'ចម្លងតំណ'}</span>
              </button>
            </div>
          </div>

          {/* Paper Theme */}
          <div className="space-y-3 pb-5 border-b border-[#E6DEC8]">
            <h3 className="text-xs font-semibold text-[#8C6226]">រចនាប័ទ្មក្រដាសធៀប</h3>
            <select
              value={data.palette}
              onChange={(e) => updateField('palette', e.target.value as PaperPalette)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6CBB3] bg-white text-[#1C1917]"
            >
              <option value="alabaster">ក្រដាសមាសស្រាល (Warm Alabaster)</option>
              <option value="ivory">សភ្លុករាជវាំង (Royal Ivory)</option>
              <option value="limestone">ថ្មក្រែមបុរាណ (Limestone)</option>
            </select>
          </div>

          {/* Couple & Initials */}
          <div className="space-y-3 pb-5 border-b border-[#E6DEC8]">
            <h3 className="text-xs font-semibold text-[#8C6226]">ចំណងជើង និងគូស្វាមីភរិយា</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-[#292524] mb-1">
                  ចំណងជើងធំ
                </label>
                <input
                  type="text"
                  value={data.ceremonyHeadline}
                  onChange={(e) => updateField('ceremonyHeadline', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6CBB3] bg-white text-[#1C1917]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-[#292524] mb-1">
                  ចំណងជើងរង
                </label>
                <input
                  type="text"
                  value={data.ceremonySubhead}
                  onChange={(e) => updateField('ceremonySubhead', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6CBB3] bg-white text-[#1C1917]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-[#292524] mb-1">
                  កូនប្រុសនាម
                </label>
                <input
                  type="text"
                  value={data.groomName}
                  onChange={(e) => updateField('groomName', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6CBB3] bg-white text-[#1C1917]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-[#292524] mb-1">
                  កូនស្រីនាម
                </label>
                <input
                  type="text"
                  value={data.brideName}
                  onChange={(e) => updateField('brideName', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6CBB3] bg-white text-[#1C1917]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-[#292524] mb-1">
                  អក្សរកាត់កូនប្រុស (មុខសំបុត្រ)
                </label>
                <input
                  type="text"
                  maxLength={2}
                  value={data.groomInitialKh}
                  onChange={(e) => updateField('groomInitialKh', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6CBB3] bg-white text-[#1C1917]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-[#292524] mb-1">
                  អក្សរកាត់កូនស្រី (មុខសំបុត្រ)
                </label>
                <input
                  type="text"
                  maxLength={2}
                  value={data.brideInitialKh}
                  onChange={(e) => updateField('brideInitialKh', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6CBB3] bg-white text-[#1C1917]"
                />
              </div>
            </div>
          </div>

          {/* Parents */}
          <div className="space-y-3 pb-5 border-b border-[#E6DEC8]">
            <h3 className="text-xs font-semibold text-[#8C6226]">មាតាបិតាទាំងសងខាង</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-[#292524] mb-1">
                  ឪពុកខាងប្រុស
                </label>
                <input
                  type="text"
                  value={data.groomFather}
                  onChange={(e) => updateField('groomFather', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6CBB3] bg-white text-[#1C1917]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-[#292524] mb-1">
                  ម្តាយខាងប្រុស
                </label>
                <input
                  type="text"
                  value={data.groomMother}
                  onChange={(e) => updateField('groomMother', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6CBB3] bg-white text-[#1C1917]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-[#292524] mb-1">
                  ឪពុកខាងស្រី
                </label>
                <input
                  type="text"
                  value={data.brideFather}
                  onChange={(e) => updateField('brideFather', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6CBB3] bg-white text-[#1C1917]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-[#292524] mb-1">
                  ម្តាយខាងស្រី
                </label>
                <input
                  type="text"
                  value={data.brideMother}
                  onChange={(e) => updateField('brideMother', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6CBB3] bg-white text-[#1C1917]"
                />
              </div>
            </div>
          </div>

          {/* Date, Times & Address */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-[#8C6226]">កាលបរិច្ឆេទ ម៉ោង និងទីតាំង</h3>
            <div>
              <label className="block text-[11px] font-medium text-[#292524] mb-1">
                ថ្ងៃខែឆ្នាំសកល
              </label>
              <input
                type="text"
                value={data.gregorianDate}
                onChange={(e) => updateField('gregorianDate', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6CBB3] bg-white text-[#1C1917]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-[#292524] mb-1">
                ថ្ងៃខែឆ្នាំចន្ទគតិ
              </label>
              <input
                type="text"
                value={data.lunarDate}
                onChange={(e) => updateField('lunarDate', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6CBB3] bg-white text-[#1C1917]"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-[#292524] mb-1">
                  ម៉ោងពេលព្រឹក
                </label>
                <input
                  type="text"
                  value={data.morningTime}
                  onChange={(e) => updateField('morningTime', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6CBB3] bg-white text-[#1C1917]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-[#292524] mb-1">
                  កម្មវិធីពេលព្រឹក
                </label>
                <input
                  type="text"
                  value={data.morningActivity}
                  onChange={(e) => updateField('morningActivity', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6CBB3] bg-white text-[#1C1917]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-[#292524] mb-1">
                  ម៉ោងថ្ងៃត្រង់
                </label>
                <input
                  type="text"
                  value={data.noonTime}
                  onChange={(e) => updateField('noonTime', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6CBB3] bg-white text-[#1C1917]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-[#292524] mb-1">
                  កម្មវិធីថ្ងៃត្រង់
                </label>
                <input
                  type="text"
                  value={data.noonActivity}
                  onChange={(e) => updateField('noonActivity', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6CBB3] bg-white text-[#1C1917]"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-[#292524] mb-1">
                ទីតាំងប្រារព្ធពិធី
              </label>
              <textarea
                rows={2}
                value={data.venueAddress}
                onChange={(e) => updateField('venueAddress', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6CBB3] bg-white text-[#1C1917]"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-[#292524] mb-1">
                  តំណ Google Maps
                </label>
                <input
                  type="url"
                  value={data.venueMapUrl}
                  onChange={(e) => updateField('venueMapUrl', e.target.value)}
                  placeholder="https://maps.app.goo.gl/..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6CBB3] bg-white text-[#1C1917]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-[#292524] mb-1">
                  កូអរដោនេ GPS (Lat, Lng)
                </label>
                <input
                  type="text"
                  value={data.venueCoordinates}
                  onChange={(e) => updateField('venueCoordinates', e.target.value)}
                  placeholder="12.2769804,105.5644019"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6CBB3] bg-white text-[#1C1917]"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-[#292524] mb-1">
                លេខទូរស័ព្ទទំនាក់ទំនង
              </label>
              <input
                type="tel"
                value={data.contactPhone}
                onChange={(e) => updateField('contactPhone', e.target.value)}
                placeholder="071 947 4667"
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D6CBB3] bg-white text-[#1C1917]"
              />
            </div>
          </div>
        </div>

        <div className="px-5 py-3.5 border-t border-[#E5DEC9] bg-[#F5F0E5] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border border-[#D4C7AE] bg-[#FCFBF7] text-[#574F45] hover:text-[#1C1917] cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>កំណត់ដើមវិញ</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold rounded-lg bg-[#7F1D1D] text-[#FCFBF7] hover:bg-[#691616] cursor-pointer whitespace-nowrap"
          >
            រួចរាល់
          </button>
        </div>
      </div>
    </div>
  );
}
