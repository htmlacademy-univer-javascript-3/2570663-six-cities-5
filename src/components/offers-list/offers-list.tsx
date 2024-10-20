import { Offer } from "../../types/offer";
import Card from "../card/card";

function OffersList(offers : Offer[]) {
  return (
    <div className={'cities__places-list places__list tabs__content'}>
      {offers.map((offer) => {
        return (
            <Card 
                offer={offer}
                key={offer.id}
            />
        );
      })}
    </div>
  );
}

export default OffersList;