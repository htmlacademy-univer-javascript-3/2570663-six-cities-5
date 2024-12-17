import { render, screen } from '@testing-library/react';
import { MainPage } from './main-page';
import { Offer } from '../../types/offer';
import { expect } from 'vitest';
import {withHistory, withStore} from '../../utils/mock-component.tsx';
import {AuthorizationStatus} from '../../const.ts';

const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Beautiful apartment',
    type: 'apartment',
    price: 100,
    rating: 4.5,
    previewImage: 'https://example.com/image1.jpg',
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
    isFavorite: true,
  },
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

const initialState = {
  OFFERS: {
    offers: mockOffers,
    isDataLoading: false,
  },
  CITY: {
    activeCity: 'Paris',
  },
  USER: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userInfo: null,
    favoriteOffers: [],
  },
};

describe('MainPage Component', () => {
  it('should render the main page with offers', () => {
    const { withStoreComponent } = withStore(
      withHistory(<MainPage />),
      initialState
    );

    render(withStoreComponent);

    expect(screen.getByText('Cities')).toBeInTheDocument();
    expect(screen.getByText('Places')).toBeInTheDocument();
    expect(screen.getByText('2 places to stay in Paris')).toBeInTheDocument();
    expect(screen.getByText('Beautiful apartment')).toBeInTheDocument();
    expect(screen.getByText('Cozy house')).toBeInTheDocument();
  });

  it('should render the main page without offers', () => {
    const { withStoreComponent } = withStore(
      withHistory(<MainPage />),
      {
        OFFERS: {
          offers: [],
          isDataLoading: false,
        },
        CITY: {
          activeCity: 'Paris',
        },
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userInfo: null,
          favoriteOffers: [],
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByText('Cities')).toBeInTheDocument();
    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.queryByText('Beautiful apartment')).not.toBeInTheDocument();
    expect(screen.queryByText('Cozy house')).not.toBeInTheDocument();
  });

  it('should render the cities list', () => {
    const { withStoreComponent } = withStore(
      withHistory(<MainPage />),
      initialState
    );

    render(withStoreComponent);

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Brussels')).toBeInTheDocument();
  });

  it('should render the sorting options', () => {
    const { withStoreComponent } = withStore(
      withHistory(<MainPage />),
      initialState
    );

    render(withStoreComponent);

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Popular/i })).toBeInTheDocument();
    expect(screen.getByText('Price: low to high')).toBeInTheDocument();
    expect(screen.getByText('Price: high to low')).toBeInTheDocument();
    expect(screen.getByText('Top rated first')).toBeInTheDocument();
  });

  it('should render the map', () => {
    const { withStoreComponent } = withStore(
      withHistory(<MainPage />),
      initialState
    );

    render(withStoreComponent);

    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
