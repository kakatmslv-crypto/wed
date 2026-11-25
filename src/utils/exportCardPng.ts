import { InvitationData, Lang } from '../types/invitation';

function wrapLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (ctx.measureText(candidate).width <= maxWidth) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export async function exportInvitationCardPng(
  data: InvitationData,
  lang: Lang
): Promise<void> {
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  const width = 1080;
  const height = 1920;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Base warm ivory gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
  bgGrad.addColorStop(0, '#FCF8F0');
  bgGrad.addColorStop(0.5, '#FFFDF9');
  bgGrad.addColorStop(1, '#F6EFE1');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Load 9:16 golden Khmer Kbach & satin stationery artwork (full-frame crop)
  await new Promise<void>((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const bleed = 0.07;
      const sx = img.width * bleed;
      const sy = img.height * bleed;
      const sw = img.width * (1 - bleed * 2);
      const sh = img.height * (1 - bleed * 2);
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, width, height);
      resolve();
    };
    img.onerror = () => resolve();
    img.src = '/src/assets/images/gold_stationery_back_9x16_1795572611798.jpg';
  });

  // Subtle luminous gold-ivory center veil so text remains crisp inside the carved gold frame
  const veil = ctx.createRadialGradient(
    width / 2,
    height / 2,
    110,
    width / 2,
    height / 2,
    660
  );
  veil.addColorStop(0, 'rgba(255, 250, 236, 0.72)');
  veil.addColorStop(0.6, 'rgba(250, 238, 206, 0.42)');
  veil.addColorStop(1, 'rgba(250, 238, 206, 0)');
  ctx.fillStyle = veil;
  ctx.fillRect(0, 0, width, height);

  // Subtle inner hairline accent inside the embossed frame
  ctx.strokeStyle = 'rgba(176, 134, 58, 0.35)';
  ctx.lineWidth = 1.4;
  ctx.strokeRect(112, 118, width - 224, height - 236);

  // Top Khmer decorative lotus flourish
  ctx.save();
  ctx.translate(width / 2, 235);
  ctx.strokeStyle = '#A8823B';
  ctx.fillStyle = 'rgba(182, 144, 75, 0.16)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, -24);
  ctx.quadraticCurveTo(14, -4, 0, 18);
  ctx.quadraticCurveTo(-14, -4, 0, -24);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 18);
  ctx.quadraticCurveTo(18, 12, 28, -8);
  ctx.quadraticCurveTo(10, -2, 0, 18);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 18);
  ctx.quadraticCurveTo(-18, 12, -28, -8);
  ctx.quadraticCurveTo(-10, -2, 0, 18);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-95, 26);
  ctx.lineTo(-34, 26);
  ctx.moveTo(34, 26);
  ctx.lineTo(95, 26);
  ctx.stroke();
  ctx.restore();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Gold lettering gradient helper
  const makeGoldGrad = (yTop: number, yBottom: number) => {
    const g = ctx.createLinearGradient(width * 0.25, yTop, width * 0.75, yBottom);
    g.addColorStop(0, '#7F5D22');
    g.addColorStop(0.35, '#B6904B');
    g.addColorStop(0.55, '#CFAF6E');
    g.addColorStop(1, '#75551E');
    return g;
  };

  // Main Heading
  ctx.fillStyle = makeGoldGrad(300, 390);
  ctx.font = '46px "Moul", serif';
  ctx.fillText(
    lang === 'km' ? data.ceremonyHeadline : data.ceremonyHeadlineEn,
    width / 2,
    345
  );

  // Subtle English subtitle
  ctx.fillStyle = '#8A6B34';
  ctx.font = 'italic 22px "Playfair Display", Georgia, serif';
  ctx.fillText(
    lang === 'km' ? 'Engagement Ceremony' : data.ceremonyHeadline,
    width / 2,
    415
  );

  // Bilateral Parents
  ctx.fillStyle = '#4E4438';
  ctx.font = '500 22px "Kantumruy Pro", sans-serif';
  ctx.fillText(
    lang === 'km'
      ? `${data.groomFather} និង ${data.groomMother}   ·   ${data.brideFather} និង ${data.brideMother}`
      : `${data.groomFatherEn} & ${data.groomMotherEn}   ·   ${data.brideFatherEn} & ${data.brideMotherEn}`,
    width / 2,
    490
  );

  // Center Gold Names
  ctx.fillStyle = makeGoldGrad(590, 860);
  ctx.font = '66px "Moul", serif';
  ctx.fillText(lang === 'km' ? data.groomName : data.groomNameEn, width / 2, 650);

  ctx.fillStyle = '#B08944';
  ctx.font = 'italic 44px "Playfair Display", Georgia, serif';
  ctx.fillText('&', width / 2, 745);

  ctx.fillStyle = makeGoldGrad(590, 860);
  ctx.font = '66px "Moul", serif';
  ctx.fillText(lang === 'km' ? data.brideName : data.brideNameEn, width / 2, 840);

  // Ornamental thin gold divider
  ctx.strokeStyle = 'rgba(182, 144, 75, 0.55)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 170, 935);
  ctx.lineTo(width / 2 + 170, 935);
  ctx.stroke();

  // Invitation Message
  ctx.fillStyle = '#8A6B34';
  ctx.font = '600 32px "Kantumruy Pro", sans-serif';
  ctx.fillText(
    lang === 'km' ? data.guestHonorific : 'Cordially Invited',
    width / 2,
    1005
  );

  ctx.fillStyle = '#3B332A';
  ctx.font = '400 27px "Kantumruy Pro", sans-serif';
  const leadText = lang === 'km' ? data.invitationLead : data.invitationLeadEn;
  const leadLines = wrapLines(ctx, leadText, 760);
  leadLines.forEach((line, i) => {
    ctx.fillText(line, width / 2, 1070 + i * 44);
  });

  // Event Details Box
  const boxY = 1200;
  ctx.fillStyle = 'rgba(255, 253, 249, 0.78)';
  ctx.strokeStyle = 'rgba(182, 144, 75, 0.45)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(145, boxY, width - 290, 315, 20);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#2C251D';
  ctx.font = '600 30px "Kantumruy Pro", sans-serif';
  ctx.fillText(
    lang === 'km' ? data.gregorianDate : data.gregorianDateEn,
    width / 2,
    boxY + 62
  );

  ctx.fillStyle = '#6B5D4D';
  ctx.font = '400 22px "Kantumruy Pro", sans-serif';
  ctx.fillText(`(${data.lunarDate})`, width / 2, boxY + 108);

  ctx.fillStyle = '#8A6B34';
  ctx.font = '600 26px "Kantumruy Pro", sans-serif';
  ctx.fillText(
    lang === 'km'
      ? `វេលាម៉ោង ${data.morningTime} · ${data.noonTime}`
      : `${data.morningTimeEn} · ${data.noonTimeEn}`,
    width / 2,
    boxY + 168
  );

  ctx.fillStyle = '#3B332A';
  ctx.font = '500 24px "Kantumruy Pro", sans-serif';
  const venueLine =
    lang === 'km'
      ? `ទីតាំង៖ ${data.venueAddress}`
      : `Venue: ${data.venueAddressEn}`;
  const venueWrapped = wrapLines(ctx, venueLine, 700);
  venueWrapped.forEach((line, i) => {
    ctx.fillText(line, width / 2, boxY + 225 + i * 38);
  });

  // Footer Blessing
  ctx.fillStyle = '#5C4B32';
  ctx.font = '500 25px "Kantumruy Pro", sans-serif';
  const closingLines = wrapLines(
    ctx,
    lang === 'km' ? data.closingMessage : data.closingMessageEn,
    740
  );
  closingLines.forEach((line, i) => {
    ctx.fillText(line, width / 2, 1605 + i * 40);
  });

  // Trigger download
  const dataUrl = canvas.toDataURL('image/png', 1.0);
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = 'khmer-engagement-invitation-9x16.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
