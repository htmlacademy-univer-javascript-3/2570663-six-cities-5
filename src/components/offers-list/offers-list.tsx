import {Offer} from '../../types/offer';
import {Card} from '../card/card';

type OffersListProps = {
  offers: Offer[];
  setActiveOfferId: (id: string | null) => void;
}

export function OffersList({offers, setActiveOfferId}: OffersListProps) {
  const handleMouseEnter = (id: string) => {
    setActiveOfferId(id);
  };

  const handleMouseLeave = () => {
    setActiveOfferId(null);
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
