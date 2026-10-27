import { WHATSAPP_LINK } from '../data/vehicles';

const routes = [
  { from: 'Ranchi', to: 'Patna', distance: '330 km', time: '6-7 hrs', sedan: '3,500', suv: '5,500' },
  { from: 'Ranchi', to: 'Jamshedpur', distance: '130 km', time: '2.5 hrs', sedan: '1,800', suv: '2,800' },
  { from: 'Ranchi', to: 'Dhanbad', distance: '170 km', time: '3-4 hrs', sedan: '2,200', suv: '3,500' },
  { from: 'Ranchi', to: 'Bokaro', distance: '120 km', time: '2.5 hrs', sedan: '1,600', suv: '2,500' },
  { from: 'Ranchi', to: 'Deoghar', distance: '250 km', time: '5-6 hrs', sedan: '3,000', suv: '4,500' },
  { from: 'Ranchi', to: 'Hazaribagh', distance: '100 km', time: '2 hrs', sedan: '1,400', suv: '2,200' },
  { from: 'Ranchi', to: 'Kolkata', distance: '400 km', time: '7-8 hrs', sedan: '5,000', suv: '7,500' },
  { from: 'Ranchi', to: 'Varanasi', distance: '420 km', time: '8-9 hrs', sedan: '5,500', suv: '8,000' },
  { from: 'Ranchi', to: 'Gaya', distance: '280 km', time: '5-6 hrs', sedan: '3,200', suv: '5,000' },
  { from: 'Ranchi', to: 'Birsa Munda Airport', distance: '7 km', time: '20 min', sedan: '500', suv: '800' },
  { from: 'Bariatu', to: 'Ranchi Railway Station', distance: '5 km', time: '15 min', sedan: '300', suv: '500' },
  { from: 'Ranchi', to: 'Netarhat', distance: '155 km', time: '4-5 hrs', sedan: '2,500', suv: '3,800' },
];

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
                <th>Sedan (Dzire)</th>
                <th>SUV (Crysta/Scorpio)</th>
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
