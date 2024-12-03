import {Helmet} from 'react-helmet-async';
import {FavoritesList} from '../../components/favorites-list/favorites-list.tsx';
import {useAppSelector} from '../../hooks';
import {Header} from '../../components/header/header.tsx';
import {getFavoriteOffers} from '../../store/user-data/selectors.ts';

export function FavoritesPage() {
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  return (
    <div className="page">
      <Helmet>
        <title>Favorites - 6 cities</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList offers={favoriteOffers} />
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}
