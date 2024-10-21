import {Offer} from '../../types/offer';
import Card from '../card/card';
import {useState} from 'react';

type OffersListProps = {
  offers: Offer[];
  isFavorite?: boolean;
}

function OffersList({offers, isFavorite = false}: OffersListProps) {
  const [, setActiveCard] = useState<string | null>(null);

  const handleMouseEnter = (id: string) => {
    setActiveCard(id);
  };

  const handleMouseLeave = () => {
    setActiveCard(null);
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
