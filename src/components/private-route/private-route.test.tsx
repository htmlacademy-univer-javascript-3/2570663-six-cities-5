import { render, screen } from '@testing-library/react';
import { PrivateRoute } from './private-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import {createMemoryHistory, MemoryHistory} from 'history';
import {withHistory, withStore} from '../../utils/mock-component.tsx';
import {createRandomUserInfo} from '../../utils/create-random-user-info.ts';
import {createRandomOffer} from '../../utils/create-random-offer.ts';

describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render children when user is authorized', () => {
    const initialState = {
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: createRandomUserInfo(),
        favoriteOffers: [createRandomOffer()],
      },
    };

    const { withStoreComponent } = withStore(
      withHistory(
        <PrivateRoute>
          <div data-testid="test-children">Test Content</div>
        </PrivateRoute>,
        mockHistory
      ),
      initialState
    );

    render(withStoreComponent);

    expect(screen.getByTestId('test-children')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should redirect to login page when user is not authorized', () => {
    const initialState = {
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: null,
        favoriteOffers: [],
      },
    };

    const { withStoreComponent } = withStore(
      withHistory(
        <PrivateRoute>
          <div data-testid="test-children">Test Content</div>
        </PrivateRoute>,
        mockHistory
      ),
      initialState
    );

    render(withStoreComponent);

    expect(mockHistory.location.pathname).toBe(AppRoute.Login);

    expect(screen.queryByTestId('test-children')).not.toBeInTheDocument();
  });
});
