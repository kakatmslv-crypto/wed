export type Lang = 'km' | 'en';
export type PaperPalette = 'alabaster' | 'ivory' | 'limestone';

export interface InvitationData {
  ceremonyHeadline: string;
  ceremonyHeadlineEn: string;
  ceremonySubhead: string;
  ceremonySubheadEn: string;
  groomFather: string;
  groomMother: string;
  groomFatherEn: string;
  groomMotherEn: string;
  brideFather: string;
  brideMother: string;
  brideFatherEn: string;
  brideMotherEn: string;
  guestHonorific: string;
  guestName: string;
  invitationLead: string;
  invitationLeadEn: string;
  groomName: string;
  groomNameEn: string;
  groomInitialKh: string;
  brideName: string;
  brideNameEn: string;
  brideInitialKh: string;
  gregorianDate: string;
  gregorianDateEn: string;
  lunarDate: string;
  eventIsoStart: string;
  morningTime: string;
  morningTimeEn: string;
  morningActivity: string;
  morningActivityEn: string;
  noonTime: string;
  noonTimeEn: string;
  noonActivity: string;
  noonActivityEn: string;
  venueAddress: string;
  venueAddressEn: string;
  venueMapUrl: string;
  venueCoordinates: string;
  closingMessage: string;
  closingMessageEn: string;
  thankYouLine: string;
  thankYouLineEn: string;
  showBilingual: boolean;
  palette: PaperPalette;
  contactPhone: string;
}

export type RsvpStatus = 'attending' | 'wishing';

export interface GuestEntry {
  id: string;
  name: string;
  guestCount: number;
  status: RsvpStatus;
  side: 'groom' | 'bride' | 'both';
  message: string;
  createdAt: string;
}

export interface GalleryPhoto {
  id: number;
  src: string;
  captionKh: string;
  captionEn: string;
  span: 1 | 2;
  aspect: 'aspect-[4/5]' | 'aspect-[16/10]' | 'aspect-[3/4]';
}
