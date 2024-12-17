import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoriteCard } from './favorite-card';
import { Offer } from '../../types/offer';
import { changeFavoriteAction } from '../../store/api-actions';
import {withHistory, withStore} from '../../utils/mock-component.tsx';
import {AuthorizationStatus} from '../../const.ts';
import {createRandomUserInfo} from '../../utils/create-random-user-info.ts';
import {createRandomOffer} from '../../utils/create-random-offer.ts';

const mockOffer: Offer = {
  id: '1',
  title: 'Beautiful apartment',
  type: 'apartment',
  price: 100,
  rating: 4.5,
  previewImage: 'https://example.com/image.jpg',
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
};

describe('FavoriteCard', () => {
  it('should render the offer details correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(<FavoriteCard offer={mockOffer} />),
      {}
    );

    render(withStoreComponent);

    expect(screen.getByText('Beautiful apartment')).toBeInTheDocument();
    expect(screen.getByText('€100')).toBeInTheDocument();
    expect(screen.getByText('Apartment')).toBeInTheDocument();
    expect(screen.getByAltText('Place image')).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should dispatch changeFavoriteAction on favorite button click', async () => {
    const { withStoreComponent, mockStore } = withStore(
      <FavoriteCard offer={mockOffer} />,
      {
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userInfo: createRandomUserInfo(),
          favoriteOffers: [createRandomOffer()],
        },
      }
    );

    render(withHistory(withStoreComponent));

    const favoriteButton = screen.getByRole('button', { name: /In bookmarks/i });
    await userEvent.click(favoriteButton);

    const actions = mockStore.getActions();
    expect(actions[0].type).toBe(changeFavoriteAction.pending.type);
  });

  it('should not render "Premium" mark if offer is not premium', () => {
    const nonPremiumOffer: Offer = {
      ...mockOffer,
      isPremium: false,
    };

    const { withStoreComponent } = withStore(
      withHistory(<FavoriteCard offer={nonPremiumOffer} />),
      {}
    );

    render(withStoreComponent);

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });
});
