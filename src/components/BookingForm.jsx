import { useState } from 'react';
import { cars, buses, WHATSAPP_LINK, PHONE, PHONE_LINK } from '../data/vehicles';
import { PhoneIcon, WhatsAppIcon } from './Header';

const initial = {
  name: '',
  phone: '',
  vehicle: 'Toyota Crysta',
  tripType: 'One Way',
  pickup: '',
  drop: '',
  date: '',
  passengers: '',
};

export default function BookingForm() {
  const [form, setForm] = useState(initial);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const message = [
      'Hi RR.Tour&Travels! I want to make a booking.',
      '',
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Vehicle: ${form.vehicle}`,
      `Trip: ${form.tripType}`,
      `Pickup: ${form.pickup}`,
      `Drop: ${form.drop || 'N/A'}`,
      `Date: ${form.date}`,
      `Passengers: ${form.passengers}`,
    ].join('\n');
    window.open(`${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="booking" className="booking">
      <div className="container booking-inner">
        <div className="booking-info">
          <h2 className="section-title">Book Your Ride</h2>
          <p className="section-sub">
            Fill the form and we&apos;ll confirm your booking on WhatsApp, or call us directly.
          </p>
          <div className="booking-contact">
            <a href={PHONE_LINK} className="btn btn-primary">
              <PhoneIcon /> Call {PHONE}
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
              <WhatsAppIcon /> WhatsApp
            </a>
          </div>
          <ul className="booking-perks">
            <li>Outstation &amp; one-way drops</li>
            <li>Local city tours &amp; airport transfers</li>
            <li>Wedding &amp; group bookings</li>
            <li>Corporate travel</li>
          </ul>
        </div>

        <form className="booking-form" onSubmit={submit}>
          <div className="field">
            <label htmlFor="name">Your Name</label>
            <input id="name" name="name" value={form.name} onChange={update} required placeholder="Full name" />
          </div>
          <div className="field">
            <label htmlFor="phone">Mobile Number</label>
            <input id="phone" name="phone" type="tel" pattern="[0-9]{10}" value={form.phone} onChange={update} required placeholder="10-digit mobile" />
          </div>
          <div className="field">
            <label htmlFor="vehicle">Select Vehicle</label>
            <select id="vehicle" name="vehicle" value={form.vehicle} onChange={update}>
              <optgroup label="Cars">
                {cars.map((c) => (
                  <option key={c.id} value={c.name}>{c.name} ({c.seats} seats)</option>
                ))}
              </optgroup>
              <optgroup label="Buses">
                {buses.map((b) => (
                  <option key={b.id} value={b.name}>{b.name} ({b.seats} seats)</option>
                ))}
              </optgroup>
            </select>
          </div>
          <div className="field">
            <label htmlFor="tripType">Trip Type</label>
            <select id="tripType" name="tripType" value={form.tripType} onChange={update}>
              <option>One Way</option>
              <option>Round Trip</option>
              <option>Local / Hourly</option>
              <option>Airport Transfer</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="pickup">Pickup City</label>
            <input id="pickup" name="pickup" value={form.pickup} onChange={update} required placeholder="e.g. Patna" />
          </div>
          <div className="field">
            <label htmlFor="drop">Drop City</label>
            <input id="drop" name="drop" value={form.drop} onChange={update} placeholder="e.g. Varanasi" />
          </div>
          <div className="field">
            <label htmlFor="date">Travel Date</label>
            <input id="date" name="date" type="date" value={form.date} onChange={update} required />
          </div>
          <div className="field">
            <label htmlFor="passengers">Passengers</label>
            <input id="passengers" name="passengers" type="number" min="1" max="60" value={form.passengers} onChange={update} required placeholder="e.g. 4" />
          </div>
          <button type="submit" className="btn btn-whatsapp btn-submit">
            <WhatsAppIcon /> Confirm on WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}
