import {Offer} from '../../types/offer';
import Card from '../card/card';

type OffersListProps = {
  offers: Offer[];
  setActiveOfferId: (id: string | null) => void;
  isFavorite?: boolean;
}

function OffersList({offers, setActiveOfferId, isFavorite = false}: OffersListProps) {
  const handleMouseEnter = (id: string) => {
    setActiveOfferId(id);
  };

  const handleMouseLeave = () => {
    setActiveOfferId(null);
  };

  const containerClassName = isFavorite ? 'favorites__places' :
    'cities__places-list places__list tabs__content';

  return (
    <div className={containerClassName}>
      {offers.map((offer) => (
        <Card
          offer={offer}
          key={offer.id}
          onMouseEnter={() => handleMouseEnter(offer.id)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
}

export default OffersList;
