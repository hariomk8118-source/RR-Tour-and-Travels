import { WHATSAPP_LINK } from '../data/vehicles';

const SEDAN_RATE = 12; // per km
const SUV_RATE = 14; // per km

const routeData = [
  { from: 'Ranchi', to: 'Patna', km: 330, time: '6-7 hrs' },
  { from: 'Ranchi', to: 'Jamshedpur', km: 130, time: '2.5 hrs' },
  { from: 'Ranchi', to: 'Dhanbad', km: 170, time: '3-4 hrs' },
  { from: 'Ranchi', to: 'Bokaro', km: 120, time: '2.5 hrs' },
  { from: 'Ranchi', to: 'Deoghar', km: 250, time: '5-6 hrs' },
  { from: 'Ranchi', to: 'Hazaribagh', km: 100, time: '2 hrs' },
  { from: 'Ranchi', to: 'Kolkata', km: 400, time: '7-8 hrs' },
  { from: 'Ranchi', to: 'Varanasi', km: 420, time: '8-9 hrs' },
  { from: 'Ranchi', to: 'Gaya', km: 280, time: '5-6 hrs' },
  { from: 'Ranchi', to: 'Birsa Munda Airport', km: 7, time: '20 min' },
  { from: 'Bariatu', to: 'Ranchi Railway Station', km: 5, time: '15 min' },
  { from: 'Ranchi', to: 'Netarhat', km: 155, time: '4-5 hrs' },
];

const fmt = (n) => n.toLocaleString('en-IN');
const routes = routeData.map((r) => ({
  ...r,
  distance: `${r.km} km`,
  sedan: fmt(r.km * SEDAN_RATE),
  suv: fmt(r.km * SUV_RATE),
}));

export default function Routes() {
  return (
    <section id="routes" className="routes">
      <div className="container">
        <h2 className="section-title">Popular Routes &amp; Pricing</h2>
        <p className="section-sub">
          Affordable cab booking from Ranchi, Bariatu to all major cities in Jharkhand and nearby states
        </p>

        <div className="routes-table-wrap">
          <table className="routes-table">
            <thead>
              <tr>
                <th>Route</th>
                <th>Distance</th>
                <th>Time</th>
                <th>Sedan ₹12/km</th>
                <th>SUV ₹14/km</th>
                <th>Book</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((r) => (
                <tr key={`${r.from}-${r.to}`}>
                  <td className="route-name">{r.from} → {r.to}</td>
                  <td>{r.distance}</td>
                  <td>{r.time}</td>
                  <td>₹{r.sedan}</td>
                  <td>₹{r.suv}</td>
                  <td>
                    <a
                      className="btn btn-book-route"
                      href={`${WHATSAPP_LINK}?text=${encodeURIComponent(
                        `Hi RR.Tour&Travels! I want to book a cab from ${r.from} to ${r.to}.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Book
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="routes-note">
          * Prices are approximate and may vary based on vehicle, season, and availability.
          Call us for exact quotes. We also offer round-trip discounts.
        </p>

        <div className="routes-services">
          <h3>Our Services in Ranchi &amp; Bariatu</h3>
          <div className="routes-services-grid">
            <div className="route-service">
              <h4>Cab Booking in Ranchi</h4>
              <p>Book affordable cabs in Ranchi for local travel, shopping, hospital visits, and city tours. Dzire, Ertiga, Crysta available.</p>
            </div>
            <div className="route-service">
              <h4>Cab Booking in Bariatu</h4>
              <p>Reliable cab service from Bariatu to anywhere in Ranchi and beyond. Airport drops, railway station pickup, and outstation trips.</p>
            </div>
            <div className="route-service">
              <h4>Outstation Taxi from Ranchi</h4>
              <p>One-way and round-trip outstation taxi service from Ranchi to Patna, Jamshedpur, Kolkata, Varanasi, Dhanbad, Bokaro, and all cities.</p>
            </div>
            <div className="route-service">
              <h4>Airport Transfer Ranchi</h4>
              <p>Pickup and drop to Birsa Munda Airport, Ranchi. On-time service, flight tracking, 24x7 availability. Starting from just ₹500.</p>
            </div>
            <div className="route-service">
              <h4>Wedding Car Rental Ranchi</h4>
              <p>Luxury cars for weddings — decorated Crysta, Innova Hycross, Scorpio. Also buses and tempo travellers for baarat and guests.</p>
            </div>
            <div className="route-service">
              <h4>Tempo Traveller in Ranchi</h4>
              <p>17 to 26 seater tempo traveller on rent in Ranchi for group tours, pilgrimages, corporate outings, and family trips.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
