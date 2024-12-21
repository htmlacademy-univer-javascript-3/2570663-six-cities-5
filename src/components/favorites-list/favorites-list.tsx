import {useCallback, useMemo} from 'react';
import {Offer} from '../../types/offer.ts';
import {FavoriteCard} from '../favorite-card/favorite-card.tsx';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {setCity} from '../../store/slices/city-slice.ts';
import {useAppDispatch} from '../../hooks';

type FavoritesListProps = {
  offers: Offer[];
}

export function FavoritesList({offers}: FavoritesListProps) {
  const groupedOffers = useMemo(() => offers.reduce((acc, offer) => {
    const cityName = offer.city.name;

    if (!acc[cityName]) {
      acc[cityName] = [];
    }

    acc[cityName].push(offer);

    return acc;
  }, {} as Record<string, Offer[]>), [offers]);

  const dispatch = useAppDispatch();

  const handleCityClick = useCallback((city: string) => {
    dispatch(setCity(city));
  }, [dispatch]);

  return (
    <ul className="favorites__list">
      {Object.entries(groupedOffers).map(([city, cityOffers]) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.Main}
                onClick={() => handleCityClick(city)}
              >
                <span>{city}</span>
              </Link>
            </div>
          </div>
          <div className={'favorites__places'}>
            {cityOffers.map((offer) => (
              <FavoriteCard
                offer={offer}
                key={offer.id}
              />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
