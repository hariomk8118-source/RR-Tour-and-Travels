import { useState } from 'react';
import { WHATSAPP_LINK } from '../data/vehicles';

const existingReviews = [
  { name: 'Rahul Kumar', city: 'Ranchi', rating: 5, text: 'Booked a Crysta for a family trip to Deoghar. Very clean car, polite driver, and on-time service. Highly recommended!' },
  { name: 'Priya Singh', city: 'Bariatu', rating: 5, text: 'Used RR Travels for airport drop. Driver arrived 15 minutes early. Very professional service at a great price.' },
  { name: 'Amit Verma', city: 'Ranchi', rating: 4, text: 'Hired an Innova Hycross for a wedding. Excellent condition car, comfortable ride. Will definitely book again.' },
  { name: 'Sneha Kumari', city: 'Doranda', rating: 5, text: 'Best tour and travels in Ranchi! Booked a Dzire for local sightseeing. Very affordable and reliable.' },
];

function Stars({ count }) {
  return (
    <span className="stars" aria-label={`${count} out of 5 stars`}>
      {'★'.repeat(count)}{'☆'.repeat(5 - count)}
    </span>
  );
}

export default function Feedback() {
  const [form, setForm] = useState({ name: '', rating: '5', text: '' });
  const [submitted, setSubmitted] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const message = [
      'New Feedback for RR.Tour&Travels',
      '',
      `Name: ${form.name}`,
      `Rating: ${'★'.repeat(Number(form.rating))}`,
      `Review: ${form.text}`,
    ].join('\n');
    window.open(`${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`, '_blank');
    setSubmitted(true);
    setForm({ name: '', rating: '5', text: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="feedback" className="feedback">
      <div className="container">
        <h2 className="section-title">Customer Reviews</h2>
        <p className="section-sub">What our customers say about us</p>

        <div className="reviews-grid">
          {existingReviews.map((r) => (
            <div key={r.name} className="review-card">
              <div className="review-header">
                <div className="review-avatar">{r.name.charAt(0)}</div>
                <div>
                  <h4 className="review-name">{r.name}</h4>
                  <p className="review-city">{r.city}</p>
                </div>
              </div>
              <Stars count={r.rating} />
              <p className="review-text">{r.text}</p>
            </div>
          ))}
        </div>

        <div className="feedback-form-wrap">
          <h3>Share Your Experience</h3>
          <p className="feedback-sub">Your feedback helps us improve our service</p>
          {submitted && <p className="feedback-success">Thank you for your feedback!</p>}
          <form className="feedback-form" onSubmit={submit}>
            <div className="field">
              <label htmlFor="fb-name">Your Name</label>
              <input id="fb-name" name="name" value={form.name} onChange={update} required placeholder="Full name" />
            </div>
            <div className="field">
              <label htmlFor="fb-rating">Rating</label>
              <select id="fb-rating" name="rating" value={form.rating} onChange={update}>
                <option value="5">★★★★★ Excellent</option>
                <option value="4">★★★★☆ Very Good</option>
                <option value="3">★★★☆☆ Good</option>
                <option value="2">★★☆☆☆ Fair</option>
                <option value="1">★☆☆☆☆ Poor</option>
              </select>
            </div>
            <div className="field field-full">
              <label htmlFor="fb-text">Your Review</label>
              <textarea id="fb-text" name="text" value={form.text} onChange={update} required placeholder="Tell us about your experience..." rows="4" />
            </div>
            <button type="submit" className="btn btn-primary btn-feedback">Submit Feedback</button>
          </form>
        </div>
      </div>
    </section>
  );
}
