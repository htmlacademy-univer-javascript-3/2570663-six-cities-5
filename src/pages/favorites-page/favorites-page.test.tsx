import { render, screen } from '@testing-library/react';
import { FavoritesPage } from './favorites-page';
import { Offer } from '../../types/offer';
import { expect } from 'vitest';
import {withHistory, withStore} from '../../utils/mock-component.tsx';
import {AuthorizationStatus} from '../../const.ts';
import {createRandomUserInfo} from '../../utils/create-random-user-info.ts';
import {createRandomOffer} from '../../utils/create-random-offer.ts';

const mockFavoriteOffers: Offer[] = [
  createRandomOffer(),
  createRandomOffer(),
];

describe('FavoritesPage Component', () => {
  it('should render "Favorites" title and offers if there are favorite offers', () => {
    const { withStoreComponent } = withStore(
      withHistory(<FavoritesPage />),
      {
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userInfo: createRandomUserInfo(),
          favoriteOffers: mockFavoriteOffers,
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByText(mockFavoriteOffers[0].title)).toBeInTheDocument();
    expect(screen.getByText(mockFavoriteOffers[1].title)).toBeInTheDocument();
  });

  it('should render "Favorites (empty)" message if there are no favorite offers', () => {
    const { withStoreComponent } = withStore(
      withHistory(<FavoritesPage />),
      {
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userInfo: createRandomUserInfo(),
          favoriteOffers: [],
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(screen.getByText('Save properties to narrow down search or plan your future trips.')).toBeInTheDocument();
  });
});
