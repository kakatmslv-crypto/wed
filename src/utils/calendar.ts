import { InvitationData } from '../types/invitation';

function escapeIcsText(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}

export function downloadEngagementIcs(data: InvitationData): void {
  const startDate = new Date(data.eventIsoStart);
  const validStart = Number.isNaN(startDate.getTime())
    ? new Date('2027-02-06T07:00:00+07:00')
    : startDate;
  const endDate = new Date(validStart.getTime() + 7 * 60 * 60 * 1000);

  const toIcsUtc = (d: Date) =>
    d
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}Z$/, 'Z');

  const summary = `${data.ceremonySubhead} — ${data.groomName} & ${data.brideName}`;
  const description = [
    `${data.ceremonyHeadline} (${data.ceremonySubhead})`,
    `${data.morningTime}: ${data.morningActivity}`,
    `${data.noonTime}: ${data.noonActivity}`,
    `មាតាបិតាខាងប្រុស: ${data.groomFather} និង ${data.groomMother}`,
    `មាតាបិតាខាងស្រី: ${data.brideFather} និង ${data.brideMother}`,
    data.venueMapUrl ? `ផែនទី Google Maps: ${data.venueMapUrl}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const geoLine = data.venueCoordinates
    ? `GEO:${data.venueCoordinates.replace(',', ';').replace(/\s+/g, '')}`
    : '';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//SereyMongkol//EngagementInvitation//KM',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:engagement-${validStart.getTime()}@sereymongkol`,
    `DTSTAMP:${toIcsUtc(new Date())}`,
    `DTSTART:${toIcsUtc(validStart)}`,
    `DTEND:${toIcsUtc(endDate)}`,
    `SUMMARY:${escapeIcsText(summary)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    `LOCATION:${escapeIcsText(data.venueAddress)}`,
    geoLine,
    data.venueMapUrl ? `URL:${data.venueMapUrl}` : '',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'engagement-ceremony-2027-02-06.ics';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
