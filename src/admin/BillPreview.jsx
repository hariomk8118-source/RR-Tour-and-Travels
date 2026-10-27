const WHATSAPP_BASE = 'https://wa.me/91';

function formatDate(d) {
  if (!d) return '-';
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function BillPreview({ bill, onClose }) {
  if (!bill) return null;

  const billText = [
    '═══════════════════════',
    '  RR.Tour&Travels',
    '  Bariatu, Ranchi',
    '  Ph: 8709190076',
    '═══════════════════════',
    '',
    `Bill No: ${bill.billNo}`,
    `Date: ${formatDate(bill.createdAt)}`,
    '',
    '--- Customer ---',
    `Name: ${bill.customerName}`,
    `Phone: ${bill.customerPhone}`,
    '',
    '--- Trip Details ---',
    `Vehicle: ${bill.vehicle}`,
    `Trip: ${bill.tripType}`,
    `From: ${bill.pickup}`,
    `To: ${bill.drop}`,
    `Date: ${formatDate(bill.date)}`,
    bill.returnDate ? `Return: ${formatDate(bill.returnDate)}` : '',
    '',
    '--- Pricing ---',
    `Distance: ${bill.distanceKm} km`,
    `Rate: ₹${bill.ratePerKm}/km`,
    `Base Amount: ₹${Number(bill.baseAmount).toLocaleString('en-IN')}`,
    Number(bill.extraCharges) ? `Extra Charges: ₹${Number(bill.extraCharges).toLocaleString('en-IN')}` : '',
    Number(bill.discount) ? `Discount: -₹${Number(bill.discount).toLocaleString('en-IN')}` : '',
    `Total: ₹${Number(bill.totalAmount).toLocaleString('en-IN')}`,
    `Advance Paid: ₹${Number(bill.advancePaid).toLocaleString('en-IN')}`,
    `Balance Due: ₹${Number(bill.balanceDue).toLocaleString('en-IN')}`,
    '',
    bill.driverName ? `Driver: ${bill.driverName} (${bill.driverPhone})` : '',
    bill.notes ? `Notes: ${bill.notes}` : '',
    '',
    '═══════════════════════',
    '  Thank you for choosing',
    '  RR.Tour&Travels!',
    '  rrtourandtravels.com',
    '═══════════════════════',
  ].filter(Boolean).join('\n');

  const sendWhatsApp = () => {
    const phone = bill.customerPhone.replace(/\D/g, '');
    const url = `${WHATSAPP_BASE}${phone}?text=${encodeURIComponent(billText)}`;
    window.open(url, '_blank');
  };

  const printBill = () => {
    const win = window.open('', '_blank');
    win.document.write(`
      <html>
      <head>
        <title>Bill ${bill.billNo} - RR.Tour&Travels</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: Arial, sans-serif; padding: 32px; color: #222; }
          .bill { max-width: 600px; margin: 0 auto; border: 2px solid #0b1f3a; padding: 28px; }
          .header { text-align: center; border-bottom: 2px solid #f5a623; padding-bottom: 16px; margin-bottom: 16px; }
          .header h1 { font-size: 22px; color: #0b1f3a; }
          .header p { font-size: 13px; color: #666; }
          .bill-no { display: flex; justify-content: space-between; margin-bottom: 16px; font-size: 13px; color: #666; }
          h3 { font-size: 14px; color: #0b1f3a; border-bottom: 1px solid #ddd; padding-bottom: 4px; margin: 16px 0 8px; }
          .row { display: flex; justify-content: space-between; padding: 4px 0; font-size: 14px; }
          .row .label { color: #666; }
          .total-row { font-weight: bold; font-size: 16px; border-top: 2px solid #0b1f3a; padding-top: 8px; margin-top: 8px; }
          .balance { color: ${Number(bill.balanceDue) > 0 ? '#c0392b' : '#27ae60'}; }
          .footer { text-align: center; margin-top: 24px; padding-top: 16px; border-top: 2px solid #f5a623; font-size: 12px; color: #888; }
          @media print { body { padding: 0; } .bill { border: none; } }
        </style>
      </head>
      <body>
        <div class="bill">
          <div class="header">
            <h1>RR.Tour&Travels</h1>
            <p>Bariatu, Ranchi, Jharkhand 834009</p>
            <p>Ph: 8709190076 | 7654817892 | 9631071390</p>
          </div>
          <div class="bill-no">
            <span>Bill No: <strong>${bill.billNo}</strong></span>
            <span>Date: ${formatDate(bill.createdAt)}</span>
          </div>

          <h3>Customer Details</h3>
          <div class="row"><span class="label">Name</span><span>${bill.customerName}</span></div>
          <div class="row"><span class="label">Phone</span><span>${bill.customerPhone}</span></div>

          <h3>Trip Details</h3>
          <div class="row"><span class="label">Vehicle</span><span>${bill.vehicle}</span></div>
          <div class="row"><span class="label">Trip Type</span><span>${bill.tripType}</span></div>
          <div class="row"><span class="label">From</span><span>${bill.pickup}</span></div>
          <div class="row"><span class="label">To</span><span>${bill.drop}</span></div>
          <div class="row"><span class="label">Travel Date</span><span>${formatDate(bill.date)}</span></div>
          ${bill.returnDate ? `<div class="row"><span class="label">Return Date</span><span>${formatDate(bill.returnDate)}</span></div>` : ''}
          ${bill.driverName ? `<div class="row"><span class="label">Driver</span><span>${bill.driverName} (${bill.driverPhone})</span></div>` : ''}

          <h3>Pricing</h3>
          <div class="row"><span class="label">Distance</span><span>${bill.distanceKm} km</span></div>
          <div class="row"><span class="label">Rate</span><span>₹${bill.ratePerKm}/km</span></div>
          <div class="row"><span class="label">Base Amount</span><span>₹${Number(bill.baseAmount).toLocaleString('en-IN')}</span></div>
          ${Number(bill.extraCharges) ? `<div class="row"><span class="label">Extra Charges</span><span>₹${Number(bill.extraCharges).toLocaleString('en-IN')}</span></div>` : ''}
          ${Number(bill.discount) ? `<div class="row"><span class="label">Discount</span><span>-₹${Number(bill.discount).toLocaleString('en-IN')}</span></div>` : ''}
          <div class="row total-row"><span>Total Amount</span><span>₹${Number(bill.totalAmount).toLocaleString('en-IN')}</span></div>
          <div class="row"><span class="label">Advance Paid</span><span>₹${Number(bill.advancePaid).toLocaleString('en-IN')}</span></div>
          <div class="row total-row"><span>Balance Due</span><span class="balance">₹${Number(bill.balanceDue).toLocaleString('en-IN')}</span></div>
          ${bill.notes ? `<p style="margin-top:12px;font-size:13px;color:#666;"><strong>Notes:</strong> ${bill.notes}</p>` : ''}

          <div class="footer">
            <p>Thank you for choosing RR.Tour&Travels!</p>
            <p>www.rrtourandtravels.com</p>
          </div>
        </div>
        <script>window.print();</script>
      </body>
      </html>
    `);
    win.document.close();
  };

  return (
    <div className="bill-preview-overlay" onClick={onClose}>
      <div className="bill-preview" onClick={(e) => e.stopPropagation()}>
        <button className="bill-close" onClick={onClose}>&times;</button>
        <div className="bill-preview-header">
          <h2>RR.Tour&Travels</h2>
          <p>Bariatu, Ranchi, Jharkhand 834009</p>
        </div>
        <div className="bill-meta">
          <span>Bill No: <strong>{bill.billNo}</strong></span>
          <span>{formatDate(bill.createdAt)}</span>
        </div>

        <h4>Customer</h4>
        <div className="bp-row"><span>Name</span><span>{bill.customerName}</span></div>
        <div className="bp-row"><span>Phone</span><span>{bill.customerPhone}</span></div>

        <h4>Trip</h4>
        <div className="bp-row"><span>Vehicle</span><span>{bill.vehicle}</span></div>
        <div className="bp-row"><span>Type</span><span>{bill.tripType}</span></div>
        <div className="bp-row"><span>From</span><span>{bill.pickup}</span></div>
        <div className="bp-row"><span>To</span><span>{bill.drop}</span></div>
        <div className="bp-row"><span>Date</span><span>{formatDate(bill.date)}</span></div>
        {bill.returnDate && <div className="bp-row"><span>Return</span><span>{formatDate(bill.returnDate)}</span></div>}
        {bill.driverName && <div className="bp-row"><span>Driver</span><span>{bill.driverName} ({bill.driverPhone})</span></div>}

        <h4>Pricing</h4>
        <div className="bp-row"><span>{bill.distanceKm} km x ₹{bill.ratePerKm}</span><span>₹{Number(bill.baseAmount).toLocaleString('en-IN')}</span></div>
        {Number(bill.extraCharges) > 0 && <div className="bp-row"><span>Extra Charges</span><span>₹{Number(bill.extraCharges).toLocaleString('en-IN')}</span></div>}
        {Number(bill.discount) > 0 && <div className="bp-row"><span>Discount</span><span>-₹{Number(bill.discount).toLocaleString('en-IN')}</span></div>}
        <div className="bp-row bp-total"><span>Total</span><span>₹{Number(bill.totalAmount).toLocaleString('en-IN')}</span></div>
        <div className="bp-row"><span>Advance Paid</span><span>₹{Number(bill.advancePaid).toLocaleString('en-IN')}</span></div>
        <div className={`bp-row bp-total ${Number(bill.balanceDue) > 0 ? 'text-red' : 'text-green'}`}>
          <span>Balance Due</span><span>₹{Number(bill.balanceDue).toLocaleString('en-IN')}</span>
        </div>
        {bill.notes && <p className="bp-notes"><strong>Notes:</strong> {bill.notes}</p>}

        <div className="bill-actions">
          <button className="btn btn-whatsapp" onClick={sendWhatsApp}>Send via WhatsApp</button>
          <button className="btn btn-primary" onClick={printBill}>Print / Download</button>
        </div>
      </div>
    </div>
  );
}
