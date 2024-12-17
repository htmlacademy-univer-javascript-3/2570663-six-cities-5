import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Header} from './header';
import {AuthorizationStatus} from '../../const';
import {logoutAction} from '../../store/api-actions';
import {Offer} from '../../types/offer';
import {withHistory, withStore} from '../../utils/mock-component.tsx';
import {createRandomUserInfo} from '../../utils/create-random-user-info.ts';
import {createRandomOffer} from '../../utils/create-random-offer.ts';

const mockUserInfo = createRandomUserInfo();
const mockFavoriteOffers: Offer[] = [createRandomOffer()];

describe('Header Component', () => {
  it('should render logo and login link when user is not logged in', () => {
    const { withStoreComponent } = withStore(
      withHistory(<Header />),
      {
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userInfo: null,
          favoriteOffers: [],
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.queryByText('Log out')).not.toBeInTheDocument();
  });

  it('should render user info and favorite count when user is logged in', () => {
    const { withStoreComponent } = withStore(
      withHistory(<Header />),
      {
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userInfo: mockUserInfo,
          favoriteOffers: mockFavoriteOffers,
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.getByText(mockUserInfo.email)).toBeInTheDocument();
    expect(screen.getByText(mockFavoriteOffers.length.toString())).toBeInTheDocument();
    expect(screen.getByText('Log out')).toBeInTheDocument();
  });

  it('should dispatch logoutAction when "Log out" is clicked', async () => {
    const { withStoreComponent, mockStore } = withStore(
      withHistory(<Header />),
      {
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userInfo: mockUserInfo,
          favoriteOffers: mockFavoriteOffers,
        },
      }
    );

    render(withStoreComponent);

    const logoutLink = screen.getByText('Log out');
    await userEvent.click(logoutLink);

    const actions = mockStore.getActions();
    expect(actions[0].type).toBe(logoutAction.pending.type);
  });
});
