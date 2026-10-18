import { cars, buses, WHATSAPP_LINK } from '../data/vehicles';

export default function Fleet() {
  return (
    <section id="fleet" className="fleet">
      <div className="container">
        <h2 className="section-title">Our Fleet</h2>
        <p className="section-sub">Choose the perfect vehicle for your journey</p>

        <h3 className="fleet-group-title">Cars</h3>
        <div className="fleet-grid">
          {cars.map((car) => (
            <article key={car.id} className="card">
              <div className="card-visual">
                <CarIcon />
              </div>
              <div className="card-body">
                <div className="card-head">
                  <h4>{car.name}</h4>
                  <span className="chip">{car.type}</span>
                </div>
                <p className="card-meta">
                  {car.seats} Seats &bull; {car.bags} Bags &bull; {car.fuel}
                </p>
                <ul className="card-features">
                  {car.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <a
                  className="btn btn-card"
                  href={`${WHATSAPP_LINK}?text=${encodeURIComponent(
                    `Hi RR.Tour&Travels! I want to book a ${car.name}.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Book {car.name}
                </a>
              </div>
            </article>
          ))}
        </div>

        <h3 className="fleet-group-title">Buses</h3>
        <div className="fleet-grid bus-grid">
          {buses.map((bus) => (
            <article key={bus.id} className="card card-bus">
              <div className="card-visual bus-visual">
                <BusIcon />
              </div>
              <div className="card-body">
                <h4>{bus.name}</h4>
                <p className="card-meta">{bus.seats} Seats</p>
                <a
                  className="btn btn-card"
                  href={`${WHATSAPP_LINK}?text=${encodeURIComponent(
                    `Hi RR.Tour&Travels! I want to book a ${bus.name} (${bus.seats} seats).`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Enquire Now
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CarIcon() {
  return (
    <svg viewBox="0 0 200 90" aria-hidden="true">
      <path d="M30 55c0-4 3-8 8-9l28-4 18-16c4-3 9-5 14-5h34c7 0 13 3 17 8l14 17 20 4c6 1 10 6 10 12v8H30v-15z" fill="#fff" opacity="0.9" />
      <circle cx="65" cy="70" r="13" fill="#0b1f3a" />
      <circle cx="65" cy="70" r="5" fill="#fff" />
      <circle cx="150" cy="70" r="13" fill="#0b1f3a" />
      <circle cx="150" cy="70" r="5" fill="#fff" />
    </svg>
  );
}

function BusIcon() {
  return (
    <svg viewBox="0 0 200 90" aria-hidden="true">
      <rect x="20" y="18" width="150" height="52" rx="10" fill="#fff" opacity="0.9" />
      <rect x="30" y="28" width="22" height="16" rx="3" fill="#0b1f3a" />
      <rect x="58" y="28" width="22" height="16" rx="3" fill="#0b1f3a" />
      <rect x="86" y="28" width="22" height="16" rx="3" fill="#0b1f3a" />
      <rect x="114" y="28" width="22" height="16" rx="3" fill="#0b1f3a" />
      <rect x="142" y="28" width="20" height="34" rx="3" fill="#0b1f3a" />
      <circle cx="55" cy="72" r="12" fill="#0b1f3a" />
      <circle cx="55" cy="72" r="5" fill="#fff" />
      <circle cx="140" cy="72" r="12" fill="#0b1f3a" />
      <circle cx="140" cy="72" r="5" fill="#fff" />
    </svg>
  );
}
