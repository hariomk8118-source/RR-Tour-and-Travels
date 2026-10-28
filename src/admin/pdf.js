import { jsPDF } from 'jspdf';

const COMPANY = {
  name: 'R.R TOUR & TRAVEL\'S',
  tagline: 'WE PROVIDE THE BEST DRIVER\'S',
  subtitle: 'ALL TYPES OF TOURIST CARS AVAILABLE',
  address: 'ADD: INDRAPARAST COLONY JORA TALAB BARIYATU, RANCHI 834009 (JHARKHAND)',
  gstin: '20FLIPP3966G1ZX',
  pan: 'FLIPP3966G',
  bank: 'HDFC BANK',
  account: '50200053840791',
  ifsc: 'HDFC0002728',
};

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function fadedLogo(alpha = 0.08) {
  const img = await loadImage('/icons/Logo.png');
  const size = Math.min(img.width, img.height, 600);
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);
  ctx.globalAlpha = alpha;
  ctx.drawImage(img, 0, 0, size, size);
  return { data: canvas.toDataURL('image/jpeg', 0.9) };
}

let logoPromise;
function getLogo() {
  if (!logoPromise) {
    logoPromise = fadedLogo(0.22).catch(() => {
      logoPromise = null;
      return null;
    });
  }
  return logoPromise;
}

export function warmupPdf() {
  getLogo();
}

const ONES = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

function twoDigit(n) {
  return n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? '-' + ONES[n % 10] : '');
}

function threeDigit(n) {
  const h = Math.floor(n / 100);
  const r = n % 100;
  return (h ? ONES[h] + ' hundred' + (r ? ' ' : '') : '') + (r ? twoDigit(r) : '');
}

export function numToWords(n) {
  n = Math.floor(n);
  if (!n) return 'zero';
  const crore = Math.floor(n / 1e7);
  const lakh = Math.floor((n % 1e7) / 1e5);
  const thou = Math.floor((n % 1e5) / 1e3);
  const rest = n % 1e3;
  let s = '';
  if (crore) s += threeDigit(crore) + ' crore ';
  if (lakh) s += twoDigit(lakh) + ' lakh ';
  if (thou) s += twoDigit(thou) + ' thousand ';
  if (rest) s += threeDigit(rest);
  return s.trim().replace(/\s+/g, ' ');
}

function rupeesInWords(total) {
  const rs = Math.floor(total);
  const paise = Math.round((total - rs) * 100);
  let out = numToWords(rs);
  if (paise > 0) out += ` & ${numToWords(paise)} paisa`;
  return out;
}

function fmtDate(d) {
  if (!d) return '';
  const dt = new Date(d);
  const dd = String(dt.getDate()).padStart(2, '0');
  const mm = String(dt.getMonth() + 1).padStart(2, '0');
  const yy = String(dt.getFullYear()).slice(2);
  return `${dd}/${mm}/${yy}`;
}

const round2 = (n) => Math.round(n * 100) / 100;
const splitAmt = (v) => {
  const r = round2(v);
  const rs = Math.floor(r);
  const p = Math.round((r - rs) * 100);
  return { rs, p: p ? String(p) : '' };
};

export async function buildBillPdf(bill) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const L = 8, R = 202, W = R - L, TOP = 10;
  // Column separators (absolute x): DATE [8,28] VEH [28,46] PART [46,146] RATE [146,172] AMT [172,192] P [192,202]
  const CX = { veh: 28, part: 46, rate: 146, amt: 172, p: 192 };
  const partCX = (CX.part + CX.rate) / 2; // particulars centre

  // Watermark behind content
  try {
    const logo = await getLogo();
    if (logo) {
      const w = 130;
      doc.addImage(logo.data, 'JPEG', (210 - w) / 2, 100, w, w);
    }
  } catch { /* optional */ }

  const hline = (yy) => doc.line(L, yy, R, yy);
  const txt = (t, x, yy, o = {}) => doc.text(String(t), x, yy, o);
  doc.setLineWidth(0.3);
  doc.setDrawColor(11, 31, 58);

  let y = TOP;

  // ---- GSTIN | TAX INVOICE | PAN (navy bar) ----
  doc.setFillColor(11, 31, 58);
  doc.rect(L, y, W, 6.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  txt(`GSTIN:${COMPANY.gstin}`, L + 2, y + 4.5);
  doc.setTextColor(245, 166, 35);
  txt('TAX INVOICE', L + W / 2, y + 4.5, { align: 'center' });
  doc.setTextColor(255, 255, 255);
  txt(`PAN NO:${COMPANY.pan}`, R - 2, y + 4.5, { align: 'right' });
  doc.setTextColor(0, 0, 0);
  doc.setDrawColor(255, 255, 255);
  doc.line(L + W / 3, y, L + W / 3, y + 6.5);
  doc.line(R - W / 3, y, R - W / 3, y + 6.5);
  doc.setDrawColor(11, 31, 58);
  y += 6.5;

  // ---- Company title ----
  doc.setFont('times', 'bolditalic');
  doc.setFontSize(24);
  doc.setTextColor(11, 31, 58);
  txt(COMPANY.name, L + W / 2, y + 9, { align: 'center' });
  y += 11;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(212, 136, 15);
  txt(COMPANY.tagline, L + W / 2, y + 2.5, { align: 'center' });
  const tagW = doc.getTextWidth(COMPANY.tagline);
  doc.setDrawColor(245, 166, 35);
  doc.line(L + W / 2 - tagW / 2, y + 3.3, L + W / 2 + tagW / 2, y + 3.3);
  doc.setDrawColor(11, 31, 58);
  y += 5.5;

  doc.setFontSize(10);
  doc.setTextColor(11, 31, 58);
  txt(COMPANY.subtitle, L + W / 2, y + 3, { align: 'center' });
  y += 6;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 90, 105);
  txt(COMPANY.address, L + W / 2, y + 2.5, { align: 'center' });
  y += 6;
  hline(y);

  // ---- S.NO / DATE (light amber row) ----
  doc.setFillColor(253, 243, 221);
  doc.rect(L, y, W, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(11, 31, 58);
  txt(`S.NO. ${bill.billNo}`, L + 2, y + 4.5);
  txt(`DATE:-${fmtDate(bill.createdAt)}`, R - 2, y + 4.5, { align: 'right' });
  y += 7;
  hline(y);

  // ---- Customer block ----
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  txt('M/S', L + 2, y + 4.5);
  doc.setFont('helvetica', 'normal');
  txt(`Company nam:- ${String(bill.customerName).toUpperCase()}`, L + 2, y + 9.5);
  txt(`Address:- ${String(bill.customerAddress || '').toUpperCase()}`, L + 2, y + 14.5);
  txt(`GSTIN : ${String(bill.customerGstin || '').toUpperCase()}`, L + 2, y + 19.5);
  txt(`STATE:${String(bill.state || 'RANCHI').toUpperCase()}`, L + 105, y + 19.5);
  txt(`STATE CODE:${bill.stateCode || '20'}`, R - 2, y + 19.5, { align: 'right' });
  y += 22;
  hline(y);

  // ---- Table header (amber-tinted) ----
  const tableTop = y;
  doc.setFillColor(253, 238, 205);
  doc.rect(L, y, W, 9, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(11, 31, 58);
  txt('DATE', L + 2, y + 4.5);
  txt('VEH', CX.veh + 2, y + 4.5);
  txt('NO.', CX.veh + 2, y + 8);
  txt('PARTICULARS', CX.part + 2, y + 4.5);
  txt('RATE', CX.rate + 2, y + 4.5);
  txt('AMOUNT', CX.amt + 2, y + 4.5);
  txt('RS.', CX.amt + 6, y + 8);
  txt('P.', CX.p + 2, y + 8);
  y += 9;
  hline(y);

  // ---- Table rows ----
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 30, 30);
  const putAmt = (v, yy) => {
    const a = splitAmt(v);
    if (a.rs) txt(a.rs, CX.p - 2, yy, { align: 'right' });
    if (a.p) txt(a.p, CX.p + 2, yy);
  };
  const dateStr = bill.endDate && bill.endDate !== bill.startDate
    ? `${fmtDate(bill.startDate)} & ${fmtDate(bill.endDate)}`
    : fmtDate(bill.startDate);

  // Row 1: trip
  let rowY = y + 4;
  doc.setFontSize(8);
  doc.splitTextToSize(dateStr, 16).forEach((l, i) => txt(l, L + 2, rowY + i * 3.5));
  doc.splitTextToSize(String(bill.vehicleNo || ''), 16).forEach((l, i) => txt(l, CX.veh + 2, rowY + i * 3.5));
  [`${bill.fromPlace} to ${bill.toPlace}`, `Total km:${bill.totalKm}`, `(${String(bill.vehicle).toUpperCase()})`]
    .forEach((l, i) => txt(l, partCX, rowY + i * 3.5, { align: 'center' }));
  txt(`${bill.ratePerDay}X${bill.days}`, CX.rate + 2, rowY);
  putAmt(bill.daysAmount, rowY);
  y += 11;
  hline(y);

  // Row 2: diesel
  rowY = y + 4;
  txt(`${bill.totalKm}/${bill.mileage}=${bill.dieselLitres}X${bill.fuelRate}=${bill.dieselAmount}`, partCX, rowY, { align: 'center' });
  txt('DIESEL', CX.rate + 2, rowY);
  putAmt(bill.dieselAmount, rowY);
  y += 9;
  hline(y);

  // Row 3: fooding
  rowY = y + 4;
  txt(`FOODING CHARGE=${bill.foodingPerDay}X${bill.days}=${bill.foodingAmount}`, partCX, rowY, { align: 'center' });
  txt(bill.foodingAmount, CX.rate + 2, rowY);
  putAmt(bill.foodingAmount, rowY);
  y += 9;
  hline(y);

  // Empty rows to fill the page
  for (let i = 0; i < 13; i++) {
    y += 9;
    hline(y);
  }

  // Vertical column separators
  [CX.veh, CX.part, CX.rate, CX.amt, CX.p].forEach((x) => doc.line(x, tableTop, x, y));

  // ---- Footer ----
  const footTop = y;
  const rightX = 132;
  const footH = 42;

  // Left: rupees in words
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  txt('RUPEEA IN WORDS:-', L + 2, footTop + 5);
  doc.setFont('helvetica', 'normal');
  doc.splitTextToSize(rupeesInWords(bill.total), 85).forEach((l, i) => txt(l, L + 36, footTop + 5 + i * 4));

  // Bank details
  txt(`BANK NAME:${COMPANY.bank}`, L + 2, footTop + 16);
  txt(`BANK A/C NO:${COMPANY.account}`, L + 2, footTop + 20);
  txt(`BANK IFSC CODE:${COMPANY.ifsc}`, L + 2, footTop + 24);

  // E.&O.E + terms
  txt('E.&O.E.', L + 60, footTop + 30, { align: 'center' });
  doc.setFontSize(7);
  doc.setTextColor(80, 90, 105);
  txt('1.Amount not paid within 15day will bear interest@24%', L + 2, footTop + 35);
  txt('2.All disputer are subject to ranchi jurisdiction', L + 2, footTop + 39);
  doc.setTextColor(30, 30, 30);

  // "For." signature — bottom-right of the left panel
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  txt('For.', rightX - 6, footTop + 38, { align: 'right' });

  // Total row highlight
  doc.setFillColor(253, 243, 221);
  doc.rect(rightX, footTop + 35, R - rightX, 7, 'F');

  // Right column mini-table
  doc.line(rightX, footTop, rightX, footTop + footH);
  doc.line(rightX + 38, footTop, rightX + 38, footTop + footH);
  for (let i = 1; i <= 5; i++) doc.line(rightX, footTop + i * 7, R, footTop + i * 7);
  hline(footTop + footH);

  doc.setFontSize(6.8);
  doc.setTextColor(11, 31, 58);
  const rf = (i, label, v, bold = false) => {
    const yy = footTop + i * 7 - 2.5;
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    const lines = Array.isArray(label) ? label : [label];
    lines.forEach((l, li) => txt(l, rightX + 2, yy - (lines.length - 1) * 2 + li * 3.4));
    if (v !== undefined && v !== '') {
      const a = splitAmt(v);
      txt(a.rs, R - 14, yy, { align: 'right' });
      if (a.p) txt(a.p, R - 6, yy);
    }
    doc.setFont('helvetica', 'normal');
  };

  rf(1, ['TATAL TAXABLE VALUE OF', 'GOODS AND SEVICE'], bill.taxable);
  rf(2, 'Add: CGST@...............');
  rf(3, 'Add : SGST @...............');
  rf(4, 'Add :IGST @...............');
  rf(5, 'Toll parking / State tax', bill.tollParking || '');
  rf(6, 'Total amount:', bill.total, true);

  // Outer border
  doc.rect(L, TOP, W, footTop + footH - TOP);

  return doc;
}

export async function downloadBillPdf(bill) {
  const doc = await buildBillPdf(bill);
  doc.save(`RR-Bill-${bill.billNo}.pdf`);
}

export async function shareBillPdf(bill) {
  const doc = await buildBillPdf(bill);
  const blob = doc.output('blob');
  const file = new File([blob], `RR-Bill-${bill.billNo}.pdf`, { type: 'application/pdf' });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    await navigator.share({
      files: [file],
      title: `Bill ${bill.billNo} - RR.Tour&Travels`,
      text: `Your trip bill from RR.Tour&Travels. Total: Rs. ${Number(bill.total).toLocaleString('en-IN')}`,
    });
    return 'shared';
  }

  doc.save(`RR-Bill-${bill.billNo}.pdf`);
  return 'downloaded';
}
