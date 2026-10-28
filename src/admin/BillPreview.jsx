import { useState, useEffect } from 'react';

const WHATSAPP_BASE = 'https://wa.me/91';

function formatDate(d) {
  if (!d) return '-';
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function BillPreview({ bill, onClose }) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  // Preload PDF module + logo so sharing stays inside the tap gesture window
  useEffect(() => {
    import('./pdf').then((m) => m.warmupPdf());
  }, []);

  if (!bill) return null;

  const sendWhatsApp = async () => {
    setBusy(true);
    setMsg('');
    try {
      const { shareBillPdf } = await import('./pdf');
      const result = await shareBillPdf(bill);
      if (result === 'downloaded') {
        const phone = bill.customerPhone.replace(/\D/g, '');
        const text = `Your trip bill ${bill.billNo} from RR.Tour&Travels is ready. Please find the attached PDF.`;
        window.open(`${WHATSAPP_BASE}${phone}?text=${encodeURIComponent(text)}`, '_blank');
        setMsg('PDF downloaded. Attach it in the WhatsApp chat that just opened.');
      }
    } catch (err) {
      if (err?.name !== 'AbortError') {
        setMsg('Could not share. Try Download instead.');
      }
    } finally {
      setBusy(false);
    }
  };

  const download = async () => {
    setBusy(true);
    try {
      const { downloadBillPdf } = await import('./pdf');
      await downloadBillPdf(bill);
    } finally {
      setBusy(false);
    }
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
        {bill.customerAddress && <div className="bp-row"><span>Address</span><span>{bill.customerAddress}</span></div>}
        {bill.customerGstin && <div className="bp-row"><span>GSTIN</span><span>{bill.customerGstin}</span></div>}

        <h4>Trip</h4>
        <div className="bp-row"><span>Vehicle</span><span>{bill.vehicle} ({bill.vehicleNo})</span></div>
        <div className="bp-row"><span>Route</span><span>{bill.fromPlace} → {bill.toPlace}</span></div>
        <div className="bp-row"><span>Dates</span><span>{formatDate(bill.startDate)}{bill.endDate ? ` → ${formatDate(bill.endDate)}` : ''}</span></div>
        <div className="bp-row"><span>Days</span><span>{bill.days}</span></div>
        <div className="bp-row"><span>Total Km</span><span>{bill.totalKm} km</span></div>

        <h4>Charges</h4>
        <div className="bp-row"><span>Days {bill.days} x ₹{bill.ratePerDay}</span><span>₹{Number(bill.daysAmount).toLocaleString('en-IN')}</span></div>
        <div className="bp-row"><span>Diesel {bill.dieselLitres}L x ₹{bill.fuelRate}</span><span>₹{Number(bill.dieselAmount).toLocaleString('en-IN')}</span></div>
        <div className="bp-row"><span>Fooding {bill.days} x ₹{bill.foodingPerDay}</span><span>₹{Number(bill.foodingAmount).toLocaleString('en-IN')}</span></div>
        {Number(bill.tollParking) > 0 && <div className="bp-row"><span>Toll / Parking</span><span>₹{Number(bill.tollParking).toLocaleString('en-IN')}</span></div>}
        <div className="bp-row bp-total"><span>Total Amount</span><span>₹{Number(bill.total).toLocaleString('en-IN')}</span></div>

        {msg && <p className="bill-msg">{msg}</p>}

        <div className="bill-actions">
          <button className="btn btn-whatsapp" onClick={sendWhatsApp} disabled={busy}>
            {busy ? 'Preparing...' : 'Send PDF (WhatsApp)'}
          </button>
          <button className="btn btn-primary" onClick={download} disabled={busy}>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
