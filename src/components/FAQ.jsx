import { useState } from 'react';

const faqs = [
  {
    q: 'How do I book a cab in Ranchi from RR.Tour&Travels?',
    a: 'You can book a cab by calling us at 8709190076, 7654817892, or 9631071390. You can also book via WhatsApp or fill the booking form on our website. We are available 24x7.',
  },
  {
    q: 'What cars are available for rent in Bariatu, Ranchi?',
    a: 'We have Toyota Crysta, Innova Hycross, Maruti Ertiga, Mahindra Scorpio, and Maruti Dzire available for rent in Bariatu, Ranchi. All cars are well-maintained with experienced drivers.',
  },
  {
    q: 'What is the cab fare from Ranchi to Patna?',
    a: 'The cab fare from Ranchi to Patna starts from ₹3,500 for a sedan (Dzire) and ₹5,500 for an SUV (Crysta/Scorpio). The distance is approximately 330 km and takes 6-7 hours.',
  },
  {
    q: 'Do you provide airport pickup and drop in Ranchi?',
    a: 'Yes, we provide 24x7 airport pickup and drop service to Birsa Munda Airport, Ranchi. Starting from just ₹500 for a sedan. We track your flight and arrive on time.',
  },
  {
    q: 'Can I book a tempo traveller in Ranchi for a group tour?',
    a: 'Yes, we have 17-seater and 26-seater tempo travellers available in Ranchi for group tours, pilgrimages, corporate outings, weddings, and family trips.',
  },
  {
    q: 'Do you offer one-way cab service from Ranchi?',
    a: 'Yes, we offer one-way drops from Ranchi to Patna, Jamshedpur, Dhanbad, Bokaro, Kolkata, Varanasi, and all major cities. No return fare charges for one-way trips.',
  },
  {
    q: 'Is there a car rental service near Bariatu, Ranchi?',
    a: 'Yes! RR.Tour&Travels is based in Bariatu, Ranchi. We are the most trusted car rental service in the area with clean vehicles and verified drivers.',
  },
  {
    q: 'What is the cost of a wedding car in Ranchi?',
    a: 'Wedding car prices depend on the vehicle — Crysta and Innova Hycross are popular choices for weddings in Ranchi. Contact us for special wedding packages with decorated cars.',
  },
  {
    q: 'Do you provide outstation taxi service from Ranchi?',
    a: 'Yes, we provide outstation taxi service from Ranchi to all cities including Patna, Jamshedpur, Dhanbad, Bokaro, Deoghar, Hazaribagh, Kolkata, Varanasi, Gaya, and Netarhat.',
  },
  {
    q: 'How can I get the best cab service in Ranchi?',
    a: 'RR.Tour&Travels offers the best cab service in Ranchi with clean cars, experienced drivers, transparent pricing, and 24x7 availability. Call 8709190076 to book now.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="faq">
      <div className="container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-sub">Common questions about cab booking in Ranchi &amp; Bariatu</p>

        <div className="faq-list">
          {faqs.map((item, i) => (
            <div key={i} className={`faq-item ${openIndex === i ? 'faq-open' : ''}`}>
              <button className="faq-question" onClick={() => toggle(i)}>
                <span>{item.q}</span>
                <span className="faq-icon">{openIndex === i ? '−' : '+'}</span>
              </button>
              {openIndex === i && <p className="faq-answer">{item.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
