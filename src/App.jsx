import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Fleet from './components/Fleet';
import BookingForm from './components/BookingForm';
import Routes from './components/Routes';
import Feedback from './components/Feedback';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

const services = [
  { title: 'Outstation Trips', desc: 'One-way drops and round trips to any city at honest rates.' },
  { title: 'Airport Transfers', desc: 'On-time pickups and drops, any hour of the day.' },
  { title: 'Weddings & Events', desc: 'Decorated cars and buses for your special occasions.' },
  { title: 'Corporate Travel', desc: 'Monthly packages and reliable service for businesses.' },
];

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <section className="services">
          <div className="container services-grid">
            {services.map((s) => (
              <div key={s.title} className="service-card">
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <Fleet />
        <BookingForm />
        <Routes />
        <Feedback />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
