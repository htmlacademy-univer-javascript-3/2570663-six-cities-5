import {Helmet} from 'react-helmet-async';
import {Point} from '../../types/offer.ts';
import {OffersList} from '../../components/offers-list/offers-list.tsx';
import {Map} from '../../components/map/map.tsx';
import {CitiesList} from '../../components/cities-list/cities-list.tsx';
import {CITIES} from '../../const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useCallback, useMemo, useState} from 'react';
import {SortingOption} from '../../types/sorting-option.ts';
import {SortingOptions} from '../../components/sorting-options/sorting-options.tsx';
import {Header} from '../../components/header/header.tsx';
import {getOffers} from '../../store/offers-data/selectors.ts';
import {setCity} from '../../store/slices/city-slice.ts';
import {getActiveCity} from '../../store/city-data/selectors.ts';

function getPlacesText(count: number): string {
  if (count === 1) {
    return 'place';
  } else {
    return 'places';
  }
}

export function MainPage() {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [sortingOption, setSortingOption] = useState<SortingOption>('Popular');

  const dispatch = useAppDispatch();
  const activeCity = useAppSelector(getActiveCity);
  const offers = useAppSelector(getOffers);

  const { filteredOffers, sortedOffers, points } = useMemo(() => {
    const filtered = offers.filter((offer) => offer.city.name === activeCity);

    const sorted = [...filtered].sort((a, b) => {
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

    const mapPoints: Point[] = sorted.map((offer) => ({
      id: offer.id,
      city: offer.city,
      location: offer.location,
    }));

    return { filteredOffers: filtered, sortedOffers: sorted, points: mapPoints };
  }, [offers, activeCity, sortingOption]);

  const handleCityChange = useCallback((city: string) => {
    dispatch(setCity(city));
  }, [dispatch]);

  const handleSortChange = useCallback((option: SortingOption) => {
    setSortingOption(option);
  }, []);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header />

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
                <Map points={points} activePointId={activeOfferId} height={700} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
