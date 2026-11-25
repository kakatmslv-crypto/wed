import { Phone } from 'lucide-react';
import { Lang } from '../types/invitation';

interface RsvpWishesSectionProps {
  groomName: string;
  brideName: string;
  contactPhone?: string;
  lang: Lang;
  onToast?: (msg: string) => void;
}

export function RsvpWishesSection({
  groomName,
  brideName,
  contactPhone = '071 947 4667',
  lang,
}: RsvpWishesSectionProps) {
  const phoneDigits = contactPhone.replace(/[^\d+]/g, '');

  return (
    <section id="rsvp-section" className="no-print scroll-mt-6 space-y-4">
      <div className="text-center">
        <p className="text-[10px] tracking-[0.2em] uppercase font-editorial text-[#8D6E36]">
          Contact
        </p>
        <h3 className="font-moul text-base champagne-title mt-0.5">
          {lang === 'km' ? 'ទំនាក់ទំនងម្ចាស់ពិធី' : 'Host Contact'}
        </h3>
        <p className="text-[11px] text-[#5C5449] mt-0.5">
          {lang === 'km'
            ? `ទំនាក់ទំនងសាកសួរព័ត៌មានពិធីរបស់ ${groomName} និង ${brideName}`
            : `Contact ${groomName} & ${brideName}'s family directly by phone`}
        </p>
      </div>

      {contactPhone && (
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2D6BD] couture-card-shadow flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[10px] text-[#8D6E36]">
                {lang === 'km' ? 'លេខទូរស័ព្ទទំនាក់ទំនង' : 'Direct Phone'}
              </p>
              <p className="text-sm font-semibold text-[#1A1714] tabular-nums mt-0.5">
                {contactPhone}
              </p>
            </div>
            <a
              href={`tel:${phoneDigits}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2B241C] hover:bg-[#3F352A] text-[#FAF6EE] text-xs font-medium transition whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-[#DFC282]" />
              <span>{lang === 'km' ? 'ហៅទូរស័ព្ទ' : 'Call Now'}</span>
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
