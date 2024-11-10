import {Offer} from '../types/offer.ts';

export const NearbyOffers: Offer[] = [
  {
    id: '5d32900d-3583-4ef0-b77e-c299c0b72a34',
    title: 'Canal View Prinsengracht',
    type: 'room',
    price: 133,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/11.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.36554,
      longitude: 4.911976,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 3.5
  },
  {
    id: '83298921-9b04-4d8c-a445-ce76c4f724c1',
    title: 'Perfectly located Castro',
    type: 'house',
    price: 927,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/14.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.38554,
      longitude: 4.902976,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 1.6
  },
  {
    id: '3efe514f-98fd-412d-a3b7-8f040e5cb393',
    title: 'Amazing and Extremely Central Flat',
    type: 'house',
    price: 404,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/20.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.37454,
      longitude: 4.881976,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 2.2
  }
];
