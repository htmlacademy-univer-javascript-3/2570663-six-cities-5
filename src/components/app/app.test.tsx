import { render, screen } from '@testing-library/react';
import { App } from './app';
import { AppRoute, AuthorizationStatus } from '../../const';
import { createMemoryHistory } from 'history';
import {withHistory, withStore} from '../../utils/mock-component.tsx';
import {createRandomDetailedOffer} from '../../utils/create-random-detailed-offer.ts';

const makeFakeStore = () => ({
  CITY: {
    activeCity: 'Paris',
  },
  COMMENTS: {
    comments: [],
  },
  OFFER: {
    offer: createRandomDetailedOffer(),
    nearbyOffers: [],
  },
  OFFERS: {
    offers: [],
    isDataLoading: false,
  },
  USER: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userInfo: null,
    favoriteOffers: [],
  },
});

describe('Application Routing', () => {
  let mockHistory = createMemoryHistory();

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainPage" when user navigates to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigates to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
  });

  it('should render "FavoritesPage" when user navigates to "/favorites" and is authorized', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, {
      ...makeFakeStore(),
      USER: {
        ...makeFakeStore().USER,
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
  });

  it('should render "OfferPage" when user navigates to "/offer/:id"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(`${AppRoute.Offer}/1`);

    render(withStoreComponent);

    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigates to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push('/non-existent-route');

    render(withStoreComponent);

    expect(screen.getByText(/404 Page Not Found/i)).toBeInTheDocument();
  });

  it('should render "Spinner" when offers data is loading', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, {
      ...makeFakeStore(),
      OFFERS: {
        ...makeFakeStore().OFFERS,
        isDataLoading: true,
      },
    });

    render(withStoreComponent);

    expect(screen.getByTestId('spinner-container')).toBeInTheDocument();
  });

  it('should redirect to "/login" when unauthorized user navigates to "/favorites"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
  });

  it('should redirect to "/" when authorized user navigates to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, {
      ...makeFakeStore(),
      USER: {
        ...makeFakeStore().USER,
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });
});
