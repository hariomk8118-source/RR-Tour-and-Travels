import { PHONE, PHONE_LINK, WHATSAPP_LINK } from '../data/vehicles';
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
            Your trusted partner for comfortable bus and car journeys — outstation,
            local, weddings and airport transfers.
          </p>
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
            <li>
              <a href={PHONE_LINK}><PhoneIcon /> {PHONE}</a>
            </li>
            <li>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp Us</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {year} RR.Tour&amp;Travels. All rights reserved.</p>
      </div>
    </footer>
  );
}
