import { PHONE, PHONE_LINK, WHATSAPP_LINK } from '../data/vehicles';
import { PhoneIcon, WhatsAppIcon } from './Header';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero-inner">
        <div className="hero-text">
          <p className="hero-tag">Bus &amp; Car Rental Service</p>
          <h1>
            Travel Comfortably with <span>RR.Tour&amp;Travels</span>
          </h1>
          <p className="hero-sub">
            Book cars and buses for outstation trips, local sightseeing, weddings and
            airport transfers. Clean vehicles, experienced drivers, best prices.
          </p>
          <div className="hero-cta">
            <a href="#booking" className="btn btn-primary">Book Now</a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
              <WhatsAppIcon /> WhatsApp Us
            </a>
            <a href={PHONE_LINK} className="btn btn-outline">
              <PhoneIcon /> {PHONE}
            </a>
          </div>
          <ul className="hero-points">
            <li>24x7 Service</li>
            <li>Verified Drivers</li>
            <li>Transparent Pricing</li>
          </ul>
        </div>
        <div className="hero-art" aria-hidden="true">
          <svg viewBox="0 0 400 240" className="hero-svg">
            <rect x="40" y="120" width="230" height="70" rx="14" fill="#f5a623" />
            <rect x="50" y="135" width="40" height="28" rx="6" fill="#0b1f3a" />
            <rect x="100" y="135" width="40" height="28" rx="6" fill="#0b1f3a" />
            <rect x="150" y="135" width="40" height="28" rx="6" fill="#0b1f3a" />
            <rect x="200" y="135" width="40" height="28" rx="6" fill="#0b1f3a" />
            <rect x="270" y="135" width="60" height="55" rx="10" fill="#f8bd55" />
            <circle cx="100" cy="195" r="18" fill="#0b1f3a" />
            <circle cx="100" cy="195" r="8" fill="#fff" />
            <circle cx="230" cy="195" r="18" fill="#0b1f3a" />
            <circle cx="230" cy="195" r="8" fill="#fff" />
            <circle cx="310" cy="195" r="18" fill="#0b1f3a" />
            <circle cx="310" cy="195" r="8" fill="#fff" />
            <path d="M20 215h360" stroke="#0b1f3a" strokeWidth="6" strokeLinecap="round" />
            <circle cx="330" cy="50" r="26" fill="#ffd97a" />
            <path d="M60 80l30-30 30 30M120 70l20-20 20 20" stroke="#ffffff" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
