import { render, screen } from '@testing-library/react';
import { OfferPage } from './offer-page';
import { Offer, DetailedOffer } from '../../types/offer';
import { Review } from '../../types/review';
import { AuthorizationStatus } from '../../const';
import { expect } from 'vitest';
import {withHistory, withStore} from '../../utils/mock-component.tsx';
import {createRandomUserInfo} from '../../utils/create-random-user-info.ts';
import {createMemoryHistory} from 'history';

const mockOffer: DetailedOffer = {
  id: '1',
  title: 'Beautiful apartment',
  type: 'apartment',
  price: 100,
  rating: 4.5,
  images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13,
  },
  isPremium: true,
  isFavorite: false,
  description: 'A beautiful apartment in the heart of Paris.',
  bedrooms: 2,
  goods: ['Wi-Fi', 'Kitchen'],
  host: {
    name: 'John Doe',
    avatarUrl: 'https://example.com/avatar.jpg',
    isPro: true,
  },
  maxAdults: 4,
};

const mockNearbyOffers: Offer[] = [
  {
    id: '2',
    title: 'Cozy house',
    type: 'house',
    price: 150,
    rating: 4.8,
    previewImage: 'https://example.com/image2.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.86661,
      longitude: 2.361499,
      zoom: 13,
    },
    isPremium: false,
    isFavorite: true,
  },
];

const mockComments: Review[] = [
  {
    id: '1',
    comment: 'Great place!',
    date: '2023-10-01T12:00:00.000Z',
    rating: 5,
    user: {
      name: 'Alice',
      avatarUrl: 'https://example.com/avatar1.jpg',
      isPro: false,
    },
  },
];

describe('OfferPage Component', () => {
  it('should render the offer details correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(<OfferPage />, createMemoryHistory({ initialEntries: [`/offer/${mockOffer.id}`] })),
      {
        OFFER: {
          offer: mockOffer,
          nearbyOffers: mockNearbyOffers,
        },
        COMMENTS: {
          comments: mockComments,
        },
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userInfo: createRandomUserInfo(),
          favoriteOffers: [],
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByText('Beautiful apartment')).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText('€100')).toBeInTheDocument();
    expect(screen.getByText('A beautiful apartment in the heart of Paris.')).toBeInTheDocument();
    expect(screen.getByText('Great place!')).toBeInTheDocument();
    expect(screen.getByText('Cozy house')).toBeInTheDocument();
  });

  it('should render the map with correct points', () => {
    const { withStoreComponent } = withStore(
      withHistory(<OfferPage />, createMemoryHistory({ initialEntries: [`/offer/${mockOffer.id}`] })),
      {
        OFFER: {
          offer: mockOffer,
          nearbyOffers: mockNearbyOffers,
        },
        COMMENTS: {
          comments: mockComments,
        },
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userInfo: createRandomUserInfo(),
          favoriteOffers: [],
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
