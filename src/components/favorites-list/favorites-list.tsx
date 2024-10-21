import {Offer} from '../../types/offer.ts';
import OffersList from '../offers-list/offers-list.tsx';

type FavoritesListProps = {
  offers: Offer[];
}

function FavoritesList({offers} : FavoritesListProps) {
  const groupedOffers = offers.reduce((acc, offer) => {
    if (offer.isFavorite) {
      const cityName = offer.city.name;

      if (!acc[cityName]) {
        acc[cityName] = [];
      }

      acc[cityName].push(offer);
    }
    return acc;
  }, {} as Record<string, Offer[]>);

  return (
    <ul className="favorites__list">
      {Object.entries(groupedOffers).map(([city, cityOffers]) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{city}</span>
              </a>
            </div>
          </div>
          <OffersList offers={cityOffers} isFavorite />
        </li>
      ))}
    </ul>
  );
}

export default FavoritesList;