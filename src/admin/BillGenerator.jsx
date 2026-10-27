import { useState } from 'react';
import { createBill } from './api';

const vehicles = [
  'Toyota Crysta', 'Innova Hycross', 'Maruti Ertiga',
  'Mahindra Scorpio', 'Maruti Dzire', 'Mini Bus (17-26 seats)',
  'Luxury Coach (35-45 seats)', 'Volvo/AC Sleeper (40-49 seats)',
];

const emptyForm = {
  customerName: '',
  customerPhone: '',
  vehicle: vehicles[0],
  tripType: 'One Way',
  pickup: '',
  drop: '',
  date: '',
  returnDate: '',
  distanceKm: '',
  ratePerKm: '12',
  extraCharges: '0',
  discount: '0',
  advancePaid: '0',
  driverName: '',
  driverPhone: '',
  notes: '',
};

export default function BillGenerator({ onBillCreated }) {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const distance = Number(form.distanceKm) || 0;
  const rate = Number(form.ratePerKm) || 0;
  const extra = Number(form.extraCharges) || 0;
  const disc = Number(form.discount) || 0;
  const advance = Number(form.advancePaid) || 0;
  const baseAmount = distance * rate;
  const totalAmount = baseAmount + extra - disc;
  const balanceDue = totalAmount - advance;

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const bill = await createBill({
        ...form,
        baseAmount,
        totalAmount,
        advancePaid: advance,
        balanceDue,
      });
      setForm(emptyForm);
      onBillCreated(bill);
    } catch {
      setError('Failed to create bill. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bill-gen">
      <h3>Generate New Bill</h3>
      {error && <p className="admin-error">{error}</p>}
      <form className="bill-form" onSubmit={submit}>
        <fieldset>
          <legend>Customer Details</legend>
          <div className="bill-row">
            <div className="field">
              <label>Customer Name</label>
              <input name="customerName" value={form.customerName} onChange={update} required placeholder="Full name" />
            </div>
            <div className="field">
              <label>Phone Number</label>
              <input name="customerPhone" value={form.customerPhone} onChange={update} required placeholder="10-digit number" />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Trip Details</legend>
          <div className="bill-row">
            <div className="field">
              <label>Vehicle</label>
              <select name="vehicle" value={form.vehicle} onChange={update}>
                {vehicles.map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Trip Type</label>
              <select name="tripType" value={form.tripType} onChange={update}>
                <option>One Way</option>
                <option>Round Trip</option>
                <option>Local</option>
                <option>Airport Transfer</option>
                <option>Wedding</option>
              </select>
            </div>
          </div>
          <div className="bill-row">
            <div className="field">
              <label>Pickup Location</label>
              <input name="pickup" value={form.pickup} onChange={update} required placeholder="Pickup address" />
            </div>
            <div className="field">
              <label>Drop Location</label>
              <input name="drop" value={form.drop} onChange={update} required placeholder="Drop address" />
            </div>
          </div>
          <div className="bill-row">
            <div className="field">
              <label>Travel Date</label>
              <input type="date" name="date" value={form.date} onChange={update} required />
            </div>
            <div className="field">
              <label>Return Date (if round trip)</label>
              <input type="date" name="returnDate" value={form.returnDate} onChange={update} />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Pricing</legend>
          <div className="bill-row">
            <div className="field">
              <label>Distance (km)</label>
              <input type="number" name="distanceKm" value={form.distanceKm} onChange={update} required placeholder="Total km" />
            </div>
            <div className="field">
              <label>Rate per km (₹)</label>
              <input type="number" name="ratePerKm" value={form.ratePerKm} onChange={update} required />
            </div>
          </div>
          <div className="bill-row">
            <div className="field">
              <label>Extra Charges (₹)</label>
              <input type="number" name="extraCharges" value={form.extraCharges} onChange={update} placeholder="Tolls, parking, etc." />
            </div>
            <div className="field">
              <label>Discount (₹)</label>
              <input type="number" name="discount" value={form.discount} onChange={update} />
            </div>
          </div>
          <div className="bill-row">
            <div className="field">
              <label>Advance Paid (₹)</label>
              <input type="number" name="advancePaid" value={form.advancePaid} onChange={update} />
            </div>
            <div className="field bill-summary-inline">
              <div className="bill-calc">
                <span>Base: ₹{baseAmount.toLocaleString('en-IN')}</span>
                <span>+ Extra: ₹{extra.toLocaleString('en-IN')}</span>
                <span>- Discount: ₹{disc.toLocaleString('en-IN')}</span>
                <strong>Total: ₹{totalAmount.toLocaleString('en-IN')}</strong>
                <strong className={balanceDue > 0 ? 'text-red' : 'text-green'}>
                  Balance: ₹{balanceDue.toLocaleString('en-IN')}
                </strong>
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Driver (Optional)</legend>
          <div className="bill-row">
            <div className="field">
              <label>Driver Name</label>
              <input name="driverName" value={form.driverName} onChange={update} placeholder="Driver name" />
            </div>
            <div className="field">
              <label>Driver Phone</label>
              <input name="driverPhone" value={form.driverPhone} onChange={update} placeholder="Driver number" />
            </div>
          </div>
        </fieldset>

        <div className="field">
          <label>Notes</label>
          <textarea name="notes" value={form.notes} onChange={update} rows="2" placeholder="Any additional notes..." />
        </div>

        <button type="submit" className="btn btn-primary bill-submit" disabled={loading}>
          {loading ? 'Creating...' : 'Generate Bill'}
        </button>
      </form>
    </div>
  );
}
