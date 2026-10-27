import { jsPDF } from 'jspdf';

const fmt = (n) => `Rs. ${Number(n).toLocaleString('en-IN')}`;

function formatDate(d) {
  if (!d) return '-';
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

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
  const size = Math.min(img.width, img.height);
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.globalAlpha = alpha;
  ctx.drawImage(img, 0, 0, size, size);
  return { data: canvas.toDataURL('image/png'), ratio: size / size };
}

export async function buildBillPdf(bill) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const W = 210;
  const L = 20;
  const R = 190;

  // Watermark logo (faded, centered)
  try {
    const logo = await fadedLogo(0.08);
    const w = 120;
    doc.addImage(logo.data, 'PNG', (W - w) / 2, 85, w, w);
  } catch { /* logo optional */ }

  // Header bar
  doc.setFillColor(11, 31, 58);
  doc.rect(0, 0, W, 32, 'F');
  doc.setTextColor(245, 166, 35);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('RR.Tour&Travels', W / 2, 14, { align: 'center' });
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Bariatu, Ranchi, Jharkhand 834009', W / 2, 21, { align: 'center' });
  doc.text('Ph: 8709190076  |  7654817892  |  9631071390', W / 2, 27, { align: 'center' });

  // Amber divider
  doc.setFillColor(245, 166, 35);
  doc.rect(0, 32, W, 2, 'F');

  // Bill meta
  doc.setFontSize(10);
  doc.setTextColor(107, 122, 143);
  doc.text(`Bill No: ${bill.billNo}`, L, 42);
  doc.text(`Date: ${formatDate(bill.createdAt)}`, R, 42, { align: 'right' });
  doc.setDrawColor(229, 234, 241);
  doc.line(L, 45, R, 45);

  let y = 52;
  const section = (title) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(11, 31, 58);
    doc.text(title.toUpperCase(), L, y);
    doc.setDrawColor(245, 166, 35);
    doc.setLineWidth(0.6);
    doc.line(L, y + 1.5, L + doc.getTextWidth(title.toUpperCase()), y + 1.5);
    y += 7;
  };

  const row = (label, value, strong = false) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(107, 122, 143);
    doc.text(label, L, y);
    doc.setFont('helvetica', strong ? 'bold' : 'normal');
    doc.setTextColor(30, 30, 30);
    doc.text(String(value), R, y, { align: 'right' });
    y += 6;
  };

  section('Customer Details');
  row('Name', bill.customerName);
  row('Phone', bill.customerPhone);
  y += 3;

  section('Trip Details');
  row('Vehicle', bill.vehicle);
  row('Trip Type', bill.tripType);
  row('From', bill.pickup);
  row('To', bill.drop);
  row('Travel Date', formatDate(bill.date));
  if (bill.returnDate) row('Return Date', formatDate(bill.returnDate));
  if (bill.driverName) row('Driver', `${bill.driverName} (${bill.driverPhone})`);
  y += 3;

  section('Pricing');
  row(`Distance  ${bill.distanceKm} km x Rs. ${bill.ratePerKm}/km`, fmt(bill.baseAmount));
  if (Number(bill.extraCharges) > 0) row('Extra Charges', fmt(bill.extraCharges));
  if (Number(bill.discount) > 0) row('Discount', `- ${fmt(bill.discount)}`);

  // Total band
  y += 2;
  doc.setDrawColor(11, 31, 58);
  doc.setLineWidth(0.8);
  doc.line(L, y - 3, R, y - 3);
  row('Total Amount', fmt(bill.totalAmount), true);
  row('Advance Paid', fmt(bill.advancePaid));
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(11, 31, 58);
  doc.text('Balance Due', L, y + 1);
  doc.setTextColor(Number(bill.balanceDue) > 0 ? 192 : 39, Number(bill.balanceDue) > 0 ? 57 : 174, Number(bill.balanceDue) > 0 ? 43 : 96);
  doc.text(fmt(bill.balanceDue), R, y + 1, { align: 'right' });
  y += 10;

  if (bill.notes) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(107, 122, 143);
    const lines = doc.splitTextToSize(`Notes: ${bill.notes}`, R - L);
    doc.text(lines, L, y);
    y += lines.length * 5;
  }

  // Footer
  const footerY = 275;
  doc.setDrawColor(245, 166, 35);
  doc.setLineWidth(1);
  doc.line(60, footerY, 150, footerY);
  doc.setFontSize(10);
  doc.setTextColor(11, 31, 58);
  doc.setFont('helvetica', 'bold');
  doc.text('Thank you for choosing RR.Tour&Travels!', W / 2, footerY + 6, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(136, 136, 136);
  doc.text('www.rrtourandtravels.com', W / 2, footerY + 12, { align: 'center' });

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
      text: `Your trip bill from RR.Tour&Travels. Total: Rs. ${Number(bill.totalAmount).toLocaleString('en-IN')}`,
    });
    return 'shared';
  }

  // Fallback: download PDF + open WhatsApp text
  doc.save(`RR-Bill-${bill.billNo}.pdf`);
  return 'downloaded';
}
