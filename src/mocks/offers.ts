import {Offer} from '../types/offer.ts';

export const Offers: Offer[] = [
  {
    id: '97953057-4bb9-46d1-b183-04d69a89b9a4',
    title: 'Perfectly located Castro',
    type: 'apartment',
    price: 160,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/20.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 12
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    isFavorite: true,
    isPremium: true,
    rating: 1.3
  }, {
    id: 'a0583972-eafe-4d05-8f18-4ebce9ee6f37',
    title: 'The Pondhouse - A Magical Place',
    type: 'hotel',
    price: 284,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/19.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 12
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 1.5
  }, {
    id: '53e80763-d661-44df-89f0-d74575d835fa',
    title: 'Penthouse, 4-5 rooms + 5 balconies',
    type: 'apartment',
    price: 129,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/20.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 12
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 11
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.1
  }, {
    id: '4bb721a6-ada6-4f83-8a05-a502719ee093',
    title: 'House in countryside',
    type: 'house',
    price: 403,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/6.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 12
      }
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 11
    },
    isFavorite: true,
    isPremium: false,
    rating: 3.7
  }
];
