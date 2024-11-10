import {DetailedOffer} from '../types/offer.ts';

export const FullOffer: DetailedOffer = {
  id: '0d851bba-99f2-44ba-bf6c-2791541533f3',
  title: 'Canal View Prinsengracht',
  description: 'I am happy to welcome you to my apartment in the city center! Three words: location, cosy and chic!',
  type: 'room',
  price: 142,
  images: [
    'https://14.design.htmlacademy.pro/static/hotel/3.jpg',
    'https://14.design.htmlacademy.pro/static/hotel/11.jpg',
    'https://14.design.htmlacademy.pro/static/hotel/18.jpg',
    'https://14.design.htmlacademy.pro/static/hotel/2.jpg',
    'https://14.design.htmlacademy.pro/static/hotel/4.jpg',
    'https://14.design.htmlacademy.pro/static/hotel/1.jpg'
  ],
  city: {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13
    }
  },
  location: {
    latitude: 52.39754,
    longitude: 4.909976,
    zoom: 16
  },
  goods: [
    'Fridge',
    'Laptop friendly workspace',
    'Dishwasher',
    'Heating',
    'Air conditioning',
    'Baby seat',
    'Breakfast',
    'Washer'
  ],
  host: {
    isPro: true,
    name: 'Angelina',
    avatarUrl: 'https://14.design.htmlacademy.pro/static/host/avatar-angelina.jpg'
  },
  isPremium: true,
  isFavorite: false,
  rating: 2.4,
  bedrooms: 1,
  maxAdults: 3
};
