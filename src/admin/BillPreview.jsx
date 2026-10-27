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
        // Desktop fallback: PDF downloaded, open WhatsApp text so user can attach it
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
