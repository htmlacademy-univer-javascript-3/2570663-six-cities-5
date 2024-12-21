import { Offer } from '../../types/offer';
import { Card } from '../card/card';

type OffersListProps = {
  offers: Offer[];
  setActiveOfferId: (id: string | null) => void;
  parentOfferId?: string;
}

export function OffersList({ offers, setActiveOfferId, parentOfferId = undefined }: OffersListProps) {
  const handleMouseEnter = (id: string) => {
    setActiveOfferId(id);
  };

  const handleMouseLeave = () => {
    setActiveOfferId(null);
  };

  const containerName = parentOfferId ? 'near-places__list places__list' : 'cities__places-list places__list tabs__content';

  return (
    <div className={containerName}>
      {offers.map((offer) => (
        <Card
          offer={offer}
          key={offer.id}
          onMouseEnter={() => handleMouseEnter(offer.id)}
          onMouseLeave={handleMouseLeave}
          parentOfferId={parentOfferId}
        />
      ))}
    </div>
  );
}
