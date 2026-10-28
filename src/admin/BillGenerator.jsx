import { useState } from 'react';

const vehicles = [
  'Toyota Crysta', 'Innova Hycross', 'Maruti Ertiga',
  'Mahindra Scorpio', 'Maruti Dzire', 'Mini Bus (17-26 seats)',
  'Luxury Coach (35-45 seats)', 'Volvo/AC Sleeper (40-49 seats)',
];

const emptyForm = {
  customerName: '',
  customerPhone: '',
  customerAddress: '',
  customerGstin: '',
  state: 'Ranchi',
  stateCode: '20',
  vehicle: vehicles[0],
  vehicleNo: '',
  fromPlace: 'Ranchi',
  toPlace: '',
  startDate: '',
  endDate: '',
  days: '1',
  ratePerDay: '1800',
  totalKm: '',
  mileage: '8',
  fuelRate: '94',
  foodingPerDay: '300',
  tollParking: '0',
};

const round2 = (n) => Math.round(n * 100) / 100;

export default function BillGenerator({ onBillCreated }) {
  const [form, setForm] = useState(emptyForm);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const days = Number(form.days) || 0;
  const ratePerDay = Number(form.ratePerDay) || 0;
  const totalKm = Number(form.totalKm) || 0;
  const mileage = Number(form.mileage) || 1;
  const fuelRate = Number(form.fuelRate) || 0;
  const foodingPerDay = Number(form.foodingPerDay) || 0;
  const toll = Number(form.tollParking) || 0;

  const daysAmount = round2(days * ratePerDay);
  const dieselLitres = round2(totalKm / mileage);
  const dieselAmount = round2(dieselLitres * fuelRate);
  const foodingAmount = round2(foodingPerDay * days);
  const taxable = round2(daysAmount + dieselAmount + foodingAmount);
  const total = round2(taxable + toll);

  const submit = (e) => {
    e.preventDefault();
    const bill = {
      ...form,
      days,
      ratePerDay,
      totalKm,
      mileage,
      fuelRate,
      foodingPerDay,
      tollParking: toll,
      daysAmount,
      dieselLitres,
      dieselAmount,
      foodingAmount,
      taxable,
      total,
      billNo: `RR-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString(),
    };
    setForm(emptyForm);
    onBillCreated(bill);
  };

  return (
    <div className="bill-gen">
      <h3>Generate New Bill</h3>
      <form className="bill-form" onSubmit={submit}>
        <fieldset>
          <legend>Customer Details</legend>
          <div className="bill-row">
            <div className="field">
              <label>Company / Customer Name (M/S)</label>
              <input name="customerName" value={form.customerName} onChange={update} required placeholder="e.g. MAHINDRA & MAHINDRA LTD" />
            </div>
            <div className="field">
              <label>Phone Number</label>
              <input name="customerPhone" value={form.customerPhone} onChange={update} required placeholder="10-digit number" />
            </div>
          </div>
          <div className="bill-row">
            <div className="field">
              <label>Address</label>
              <input name="customerAddress" value={form.customerAddress} onChange={update} placeholder="e.g. MAIN ROAD RANCHI 834001" />
            </div>
            <div className="field">
              <label>Customer GSTIN (optional)</label>
              <input name="customerGstin" value={form.customerGstin} onChange={update} placeholder="GSTIN if applicable" />
            </div>
          </div>
          <div className="bill-row">
            <div className="field">
              <label>State</label>
              <input name="state" value={form.state} onChange={update} />
            </div>
            <div className="field">
              <label>State Code</label>
              <input name="stateCode" value={form.stateCode} onChange={update} />
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
              <label>Vehicle No.</label>
              <input name="vehicleNo" value={form.vehicleNo} onChange={update} required placeholder="e.g. JH01FE7949" />
            </div>
          </div>
          <div className="bill-row">
            <div className="field">
              <label>From</label>
              <input name="fromPlace" value={form.fromPlace} onChange={update} required placeholder="e.g. Ranchi" />
            </div>
            <div className="field">
              <label>To</label>
              <input name="toPlace" value={form.toPlace} onChange={update} required placeholder="e.g. Deoghar" />
            </div>
          </div>
          <div className="bill-row">
            <div className="field">
              <label>Start Date</label>
              <input type="date" name="startDate" value={form.startDate} onChange={update} required />
            </div>
            <div className="field">
              <label>End Date</label>
              <input type="date" name="endDate" value={form.endDate} onChange={update} />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Charges</legend>
          <div className="bill-row">
            <div className="field">
              <label>Days</label>
              <input type="number" name="days" value={form.days} onChange={update} required min="1" />
            </div>
            <div className="field">
              <label>Rate per Day (₹)</label>
              <input type="number" name="ratePerDay" value={form.ratePerDay} onChange={update} required />
            </div>
          </div>
          <div className="bill-row">
            <div className="field">
              <label>Total Km</label>
              <input type="number" name="totalKm" value={form.totalKm} onChange={update} required placeholder="e.g. 878" />
            </div>
            <div className="field">
              <label>Mileage (km/l)</label>
              <input type="number" name="mileage" value={form.mileage} onChange={update} required />
            </div>
          </div>
          <div className="bill-row">
            <div className="field">
              <label>Fuel Rate (₹/l)</label>
              <input type="number" name="fuelRate" value={form.fuelRate} onChange={update} required />
            </div>
            <div className="field">
              <label>Fooding per Day (₹)</label>
              <input type="number" name="foodingPerDay" value={form.foodingPerDay} onChange={update} />
            </div>
          </div>
          <div className="bill-row">
            <div className="field">
              <label>Toll / Parking / State Tax (₹)</label>
              <input type="number" name="tollParking" value={form.tollParking} onChange={update} />
            </div>
            <div className="field bill-summary-inline">
              <div className="bill-calc">
                <span>Days: {days} x ₹{ratePerDay} = ₹{daysAmount.toLocaleString('en-IN')}</span>
                <span>Diesel: {totalKm}/{mileage} = {dieselLitres}L x ₹{fuelRate} = ₹{dieselAmount.toLocaleString('en-IN')}</span>
                <span>Fooding: ₹{foodingAmount.toLocaleString('en-IN')}</span>
                <span>Toll: ₹{toll.toLocaleString('en-IN')}</span>
                <strong>Total: ₹{total.toLocaleString('en-IN')}</strong>
              </div>
            </div>
          </div>
        </fieldset>

        <button type="submit" className="btn btn-primary bill-submit">
          Generate Bill
        </button>
      </form>
    </div>
  );
}
