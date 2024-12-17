import {render, screen} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {PrivateLoginRoute} from './private-login-route';
import {AppRoute, AuthorizationStatus} from '../../const';
import {withStore} from '../../utils/mock-component.tsx';
import {createRandomUserInfo} from '../../utils/create-random-user-info.ts';
import {createRandomOffer} from '../../utils/create-random-offer.ts';

describe('PrivateLoginRoute Component', () => {
  it('should render children if user is not authorized', () => {
    const {withStoreComponent} = withStore(
      <MemoryRouter initialEntries={[AppRoute.Login]}>
        <Routes>
          <Route
            path={AppRoute.Login}
            element={
              <PrivateLoginRoute>
                <div>Login Page</div>
              </PrivateLoginRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
      {
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userInfo: null,
          favoriteOffers: [],
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('should redirect to main page if user is authorized', () => {
    const {withStoreComponent} = withStore(
      <MemoryRouter initialEntries={[AppRoute.Login]}>
        <Routes>
          <Route
            path={AppRoute.Login}
            element={
              <PrivateLoginRoute>
                <div>Login Page</div>
              </PrivateLoginRoute>
            }
          />
          <Route path={AppRoute.Main} element={<div>Main Page</div>}/>
        </Routes>
      </MemoryRouter>,
      {
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userInfo: createRandomUserInfo(),
          favoriteOffers: [createRandomOffer()],
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByText('Main Page')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });
});
