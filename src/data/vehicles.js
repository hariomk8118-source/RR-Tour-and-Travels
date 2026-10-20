export const PHONES = [
  { number: '8709190076', link: 'tel:+918709190076' },
  { number: '7654817892', link: 'tel:+917654817892' },
  { number: '9631071390', link: 'tel:+919631071390' },
];
export const PRIMARY_PHONE = PHONES[0];
export const WHATSAPP_LINK = 'https://wa.me/918709190076';

import crystaImg from '../CarImage/ToyotaCrysta.avif';
import hycrossImg from '../CarImage/Innova Hycross.webp';
import ertigaImg from '../CarImage/Ertiga.avif';
import scorpioImg from '../CarImage/Scarpio.jpg';
import dzireImg from '../CarImage/dzire.jpg';

export const cars = [
  {
    id: 'crysta',
    name: 'Toyota Crysta',
    type: 'Premium MPV',
    seats: '6-7',
    bags: 3,
    fuel: 'Diesel',
    image: crystaImg,
    features: ['Captain Seats', 'Pushback Seats', 'Ample Legroom', 'Powerful AC'],
  },
  {
    id: 'hycross',
    name: 'Innova Hycross',
    type: 'Premium MPV',
    seats: '6-7',
    bags: 3,
    fuel: 'Hybrid',
    image: hycrossImg,
    features: ['Luxury Interiors', 'Silent Hybrid Drive', 'Panoramic Roof', 'Ottoman Seats'],
  },
  {
    id: 'ertiga',
    name: 'Maruti Ertiga',
    type: 'MPV',
    seats: '6-7',
    bags: 2,
    fuel: 'Petrol/CNG',
    image: ertigaImg,
    features: ['Family Friendly', 'Economical', 'Comfortable Ride', 'Foldable Seats'],
  },
  {
    id: 'scorpio',
    name: 'Mahindra Scorpio',
    type: 'SUV',
    seats: '7',
    bags: 3,
    fuel: 'Diesel',
    image: scorpioImg,
    features: ['Rugged Build', 'High Ground Clearance', 'Hill-Ready', 'Spacious Cabin'],
  },
  {
    id: 'dzire',
    name: 'Maruti Dzire',
    type: 'Sedan',
    seats: '4+1',
    bags: 2,
    fuel: 'Petrol/CNG',
    image: dzireImg,
    features: ['Budget Friendly', 'Best Mileage', 'City Rides', 'Comfortable Sedan'],
  },
];

export const buses = [
  { id: 'mini', name: 'Mini Bus / Tempo Traveller', seats: '17-26' },
  { id: 'coach', name: 'Luxury Coach', seats: '35-45' },
  { id: 'volvo', name: 'Volvo / AC Sleeper', seats: '40-49' },
];
