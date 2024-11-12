import {MainPage} from '../../pages/main-page/main-page';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {AppRoute} from '../../const.ts';
import {LoginPage} from '../../pages/login-page/login-page.tsx';
import {PrivateRoute} from '../private-route/private-route.tsx';
import {OfferPage} from '../../pages/offer-page/offer-page.tsx';
import {NotFoundPage} from '../../pages/404-not-found-page/not-found-page.tsx';
import {AuthorizationStatus} from '../../const.ts';
import {FavoritesPage} from '../../pages/favorites-page/favorites-page.tsx';
import {useAppDispatch} from '../../hooks';
import {setOffers} from '../../store/action.ts';
import {Offers} from '../../mocks/offers.ts';

function App() : JSX.Element {
  const dispatch = useAppDispatch();
  dispatch(setOffers(Offers));

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={
              <MainPage />
            }
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              >
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.OfferWithId}
            element={<OfferPage />}
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
