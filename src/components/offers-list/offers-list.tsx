import {Offer} from '../../types/offer';
import {Card} from '../card/card';
import {useState} from 'react';

type OffersListProps = {
  offers: Offer[];
}

export function OffersList({offers}: OffersListProps) {
  const [, setActiveCard] = useState<string | null>(null);

  const handleMouseEnter = (id: string) => {
    setActiveCard(id);
  };

  const handleMouseLeave = () => {
    setActiveCard(null);
  };

  return (
    <div className={'cities__places-list places__list tabs__content'}>
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
