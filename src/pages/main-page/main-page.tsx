import {Helmet} from 'react-helmet-async';
import {Point} from '../../types/offer.ts';
import {OffersList} from '../../components/offers-list/offers-list.tsx';
import {Map} from '../../components/map/map.tsx';
import {CitiesList} from '../../components/cities-list/cities-list.tsx';
import {CITIES} from '../../const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {setCity} from '../../store/action.ts';
import {useState} from 'react';
import {SortingOption} from '../../types/sorting-option.ts';
import {SortingOptions} from '../../components/sorting-options/sorting-options.tsx';

function getPlacesText(count: number): string {
  if (count === 1) {
    return 'place';
  } else {
    return 'places';
  }
}

export function MainPage(): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [sortingOption, setSortingOption] = useState<SortingOption>('Popular');

  const dispatch = useAppDispatch();
  const activeCity = useAppSelector((state) => state.city);
  const activeOffers = useAppSelector((state) => state.offers);

  const filteredOffers = activeOffers.filter((offer) => offer.city.name === activeCity);

  const sortedOffers = [...filteredOffers].sort((a, b) => {
    switch (sortingOption) {
      case 'Price: low to high':
        return a.price - b.price;
      case 'Price: high to low':
        return b.price - a.price;
      case 'Top rated first':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const points: Point[] = sortedOffers.map((offer) => ({
    id: offer.id,
    city: offer.city,
    location: offer.location,
  }));

  const handleCityChange = (city: string) => {
    dispatch(setCity(city));
  };

  const handleSortChange = (option: SortingOption) => {
    setSortingOption(option);
  };

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList cities={CITIES} activeCity={activeCity} onCityChange={handleCityChange} />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {filteredOffers.length} {getPlacesText(filteredOffers.length)} to stay in {activeCity}
              </b>
              <SortingOptions onSortChange={handleSortChange} />
              <OffersList
                offers={sortedOffers}
                setActiveOfferId={setActiveOfferId}
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map points={points} activePointId={activeOfferId} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
