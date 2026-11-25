import { Copy, MapPin, Navigation, Phone, Sun, Utensils } from 'lucide-react';
import { InvitationData, Lang } from '../types/invitation';

interface ScheduleAndVenueProps {
  data: InvitationData;
  lang: Lang;
  onToast: (msg: string) => void;
}

export function ScheduleAndVenue({ data, lang, onToast }: ScheduleAndVenueProps) {
  const cleanAddress = data.venueAddress.replace(/^នៅ/, '');
  const coords = (data.venueCoordinates || '').trim();
  const mapsQuery = coords
    ? encodeURIComponent(coords)
    : encodeURIComponent(`${cleanAddress} Cambodia`);
  const mapsUrl =
    data.venueMapUrl?.trim() || `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${mapsQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const phoneDigits = (data.contactPhone || '0719474667').replace(/[^\d+]/g, '');

  const handleCopyAddress = async () => {
    const addr = lang === 'km' ? data.venueAddress : data.venueAddressEn;
    try {
      await navigator.clipboard.writeText(`${addr}\n${mapsUrl}`);
    } catch {
      // Fallback ignored
    }
    onToast(
      lang === 'km'
        ? 'បានចម្លងអាសយដ្ឋាន និងតំណផែនទីរួចរាល់!'
        : 'Venue address & Google Maps link copied!'
    );
  };

  return (
    <div className="no-print space-y-7">
      {/* Itinerary Section */}
      <section id="itinerary-section" className="scroll-mt-6 space-y-3.5">
        <div className="text-center">
          <p className="text-[10px] tracking-[0.2em] uppercase font-editorial text-[#8D6E36]">
            Programme
          </p>
          <h3 className="font-moul text-base champagne-title mt-0.5">
            {lang === 'km' ? 'កម្មវិធីពិធីភ្ជាប់ពាក្យ' : 'Ceremony Program'}
          </h3>
          <p className="text-[11px] text-[#5C5449] mt-0.5">
            {lang === 'km' ? 'កាលវិភាគកម្មវិធីសិរីមង្គល' : 'Schedule of Events'}
          </p>
        </div>

        {/* Morning Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2D6BD] couture-card-shadow">
          <div className="flex items-center gap-3 pb-3 mb-3 border-b border-[#EFE8D8]">
            <span className="w-8 h-8 rounded-lg bg-[#FAF7F0] border border-[#E2D6BD] flex items-center justify-center text-[#8D6E36] shrink-0">
              <Sun className="w-4 h-4" strokeWidth={1.6} />
            </span>
            <div>
              <h4 className="font-moul text-xs text-[#1A1714]">
                {lang === 'km' ? 'កម្មវិធីពេលព្រឹក' : 'Morning Traditional Ceremony'}
              </h4>
              <p className="text-[10px] text-[#8D6E36]">
                {lang === 'km' ? data.gregorianDate : data.gregorianDateEn}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-xs">
            <span className="bg-[#1A1714] text-[#F4E6C4] font-medium px-2.5 py-1 rounded-md text-[10px] whitespace-nowrap shrink-0 tabular-nums">
              {lang === 'km' ? data.morningTime : data.morningTimeEn}
            </span>
            <div>
              <p className="font-semibold text-[#1A1714]">
                {lang === 'km' ? data.morningActivity : data.morningActivityEn}
              </p>
              <p className="text-[11px] text-[#5C5449] mt-1 leading-relaxed">
                {lang === 'km'
                  ? 'ជួបជុំញាតិមិត្តស្រុកភូមិ ហែជំនូន ចូលស្តីដណ្តឹង បំពាក់ចិញ្ចៀនភ្ជាប់ពាក្យ និងប្រសិទ្ធពរជ័យ។'
                  : 'Gathering of village kin and honored guests, traditional betrothal procession, ring exchange, and elder blessings.'}
              </p>
            </div>
          </div>
        </div>

        {/* Midday Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2D6BD] couture-card-shadow">
          <div className="flex items-center gap-3 pb-3 mb-3 border-b border-[#EFE8D8]">
            <span className="w-8 h-8 rounded-lg bg-[#FAF7F0] border border-[#E2D6BD] flex items-center justify-center text-[#8D6E36] shrink-0">
              <Utensils className="w-4 h-4" strokeWidth={1.6} />
            </span>
            <div>
              <h4 className="font-moul text-xs text-[#1A1714]">
                {lang === 'km' ? 'ពិសាអាហារសាមគ្គី' : 'Fellowship Luncheon'}
              </h4>
              <p className="text-[10px] text-[#8D6E36]">
                {lang === 'km' ? data.venueAddress : data.venueAddressEn}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-xs">
            <span className="bg-[#1A1714] text-[#F4E6C4] font-medium px-2.5 py-1 rounded-md text-[10px] whitespace-nowrap shrink-0 tabular-nums">
              {lang === 'km' ? data.noonTime : data.noonTimeEn}
            </span>
            <div>
              <p className="font-semibold text-[#1A1714]">
                {lang === 'km' ? data.noonActivity : data.noonActivityEn}
              </p>
              <p className="text-[11px] text-[#5C5449] mt-1 leading-relaxed">
                {lang === 'km'
                  ? 'អញ្ជើញភ្ញៀវកិត្តិយសពិសាអាហារសាមគ្គីក្រោមបរិយាកាសស្រុកស្រែដ៏កក់ក្តៅ និងថតរូបអនុស្សាវរីយ៍។'
                  : 'Celebratory midday meal in warm countryside hospitality with family, neighbors, and honored guests.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location-section" className="scroll-mt-6 space-y-3.5">
        <div className="text-center">
          <p className="text-[10px] tracking-[0.2em] uppercase font-editorial text-[#8D6E36]">
            Location
          </p>
          <h3 className="font-moul text-base champagne-title mt-0.5">
            {lang === 'km' ? 'ទីតាំងប្រារព្ធពិធី' : 'Ceremony Venue'}
          </h3>
          <p className="text-[11px] text-[#5C5449] mt-0.5">
            {lang === 'km' ? 'ផែនទី និងទិសដៅធ្វើដំណើរ' : 'Location & Directions'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2D6BD] couture-card-shadow space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FAF7F0] border border-[#E2D6BD] flex items-center justify-center text-[#5B1418] shrink-0 mt-0.5">
              <MapPin className="w-4 h-4" strokeWidth={1.7} />
            </div>
            <div>
              <h4 className="font-moul text-xs text-[#1A1714] leading-relaxed">
                {lang === 'km'
                  ? 'គេហដ្ឋានភូមិក្តុលលើ · ស្រុកក្រូចឆ្មារ'
                  : 'Kdol Leu Village Residence · Tbong Khmum'}
              </h4>
                <p className="text-xs text-[#5C5449] mt-1 leading-relaxed">
                {lang === 'km' ? data.venueAddress : data.venueAddressEn}
              </p>
              {coords && (
                <p className="text-[10px] text-[#8D6E36] mt-1 tabular-nums">
                  GPS: {coords}
                </p>
              )}
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-[#DFD2B6] relative aspect-[16/9] bg-[#FAF7F0]">
            <iframe
              className="w-full h-full border-0"
              loading="lazy"
              src={mapsEmbedUrl}
              title="Ceremony Location Map"
              allowFullScreen
            />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-0.5">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#1A1714] hover:bg-[#2F2A24] text-[#FAF7F0] rounded-xl font-medium text-xs transition cursor-pointer whitespace-nowrap"
            >
              <Navigation className="w-3.5 h-3.5 text-[#DFC282]" />
              <span>{lang === 'km' ? 'បើកក្នុង Maps' : 'Open in Maps'}</span>
            </a>

            <button
              type="button"
              onClick={handleCopyAddress}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#FAF7F0] border border-[#D8C59B] text-[#1A1714] rounded-xl font-medium text-xs hover:bg-[#F3ECDC] transition cursor-pointer whitespace-nowrap"
            >
              <Copy className="w-3.5 h-3.5 text-[#8D6E36]" />
              <span>{lang === 'km' ? 'ចម្លងទីតាំង & Maps' : 'Copy Address & Map'}</span>
            </button>
          </div>

          {data.contactPhone && (
            <div className="pt-3 border-t border-[#EFE8D8] flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#FAF7F0] border border-[#E2D6BD] flex items-center justify-center text-[#8D6E36] shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </span>
                <div>
                  <p className="text-[10px] text-[#8D6E36]">
                    {lang === 'km' ? 'លេខទូរស័ព្ទទំនាក់ទំនង' : 'Contact Phone'}
                  </p>
                  <p className="text-xs font-semibold text-[#1A1714] tabular-nums">
                    {data.contactPhone}
                  </p>
                </div>
              </div>

              <a
                href={`tel:${phoneDigits}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#FAF7F0] hover:bg-[#F3ECDC] border border-[#D8C59B] text-[11px] font-medium text-[#1A1714] transition whitespace-nowrap"
              >
                <Phone className="w-3 h-3 text-[#8D6E36]" />
                <span>{lang === 'km' ? 'តេសួរ' : 'Call'}</span>
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
