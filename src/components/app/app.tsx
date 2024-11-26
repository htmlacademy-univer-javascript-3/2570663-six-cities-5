import {MainPage} from '../../pages/main-page/main-page';
import {Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {AppRoute} from '../../const.ts';
import {LoginPage} from '../../pages/login-page/login-page.tsx';
import {PrivateRoute} from '../private-route/private-route.tsx';
import {OfferPage} from '../../pages/offer-page/offer-page.tsx';
import {NotFoundPage} from '../../pages/404-not-found-page/not-found-page.tsx';
import {FavoritesPage} from '../../pages/favorites-page/favorites-page.tsx';
import {useAppSelector} from '../../hooks';
import {Spinner} from '../spinner/spinner.tsx';
import {HistoryRouter} from '../history-route/history-route.tsx';
import {browserHistory} from '../../browser-history.ts';
import {PrivateLoginRoute} from '../private-login-route/private-login-route.tsx';

export function App(): JSX.Element {
  const isOffersDataLoading = useAppSelector((state) => state.isDataLoading);

  if (isOffersDataLoading) {
    return (
      <Spinner/>
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage/>}
          />
          <Route
            path={AppRoute.Login}
            element={
              <PrivateLoginRoute>
                <LoginPage/>
              </PrivateLoginRoute>
            }
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute>
                <FavoritesPage/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.OfferWithId}
            element={<OfferPage/>}
          />
          <Route
            path="*"
            element={<NotFoundPage/>}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}
