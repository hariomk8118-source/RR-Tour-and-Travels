import { PHONES, WHATSAPP_LINK } from '../data/vehicles';
import { PhoneIcon, WhatsAppIcon } from './Header';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="container footer-grid">
        <div>
          <div className="brand footer-brand">
            <span className="brand-badge">RR</span>
            <span className="brand-name">.Tour<span className="brand-amp">&amp;</span>Travels</span>
          </div>
          <p className="footer-text">
            Your trusted partner for comfortable bus and car journeys in Bariatu, Ranchi —
            outstation, local, weddings and airport transfers across Jharkhand.
          </p>
          <p className="footer-address">Bariatu, Ranchi, Jharkhand 834009</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#fleet">Our Fleet</a></li>
            <li><a href="#booking">Book Now</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact Us</h4>
          <ul className="footer-links">
            {PHONES.map((p) => (
              <li key={p.number}>
                <a href={p.link}><PhoneIcon /> {p.number}</a>
              </li>
            ))}
            <li>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp Us</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {year} RR.Tour&amp;Travels. All rights reserved.</p>
        <a href="/admin" className="footer-admin-link">Admin</a>
      </div>
    </footer>
  );
}
