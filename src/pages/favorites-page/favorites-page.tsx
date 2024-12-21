import {Helmet} from 'react-helmet-async';
import {FavoritesList} from '../../components/favorites-list/favorites-list.tsx';
import {useAppSelector} from '../../hooks';
import {Header} from '../../components/header/header.tsx';
import {getFavoriteOffers} from '../../store/user-data/selectors.ts';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';

export function FavoritesPage() {
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  return (
    <div className="page">
      <Helmet>
        <title>Favorites - 6 cities</title>
      </Helmet>
      <Header />

      <main className={`page__main page__main--favorites ${favoriteOffers.length === 0 ? 'page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          {favoriteOffers.length > 0 ? (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoritesList offers={favoriteOffers} />
            </section>
          ) : (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future trips.
                </p>
              </div>
            </section>
          )}
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}
