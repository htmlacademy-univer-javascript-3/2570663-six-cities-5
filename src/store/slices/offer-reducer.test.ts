import { OfferData } from '../../types/state.ts';
import { DetailedOffer, Offer } from '../../types/offer.ts';
import { offerReducer, setDetailedOffer, setNearbyOffers } from './offer-slice.ts';
import {createRandomDetailedOffer} from '../../utils/create-random-detailed-offer.ts';
import {createRandomOffer} from '../../utils/create-random-offer.ts';

describe('offerReducer', () => {
  it('should return the initial state', () => {
    const initialState: OfferData = {
      offer: null,
      nearbyOffers: [],
    };

    expect(offerReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle setDetailedOffer action', () => {
    const initialState: OfferData = {
      offer: null,
      nearbyOffers: [],
    };

    const mockDetailedOffer: DetailedOffer = createRandomDetailedOffer();

    const action = setDetailedOffer(mockDetailedOffer);
    const newState = offerReducer(initialState, action);

    expect(newState.offer).toEqual(mockDetailedOffer);
  });

  it('should handle setNearbyOffers action', () => {
    const initialState: OfferData = {
      offer: null,
      nearbyOffers: [],
    };

    const mockNearbyOffers: Offer[] = [
      createRandomOffer(),
      createRandomOffer(),
    ];

    const action = setNearbyOffers(mockNearbyOffers);
    const newState = offerReducer(initialState, action);

    expect(newState.nearbyOffers).toEqual(mockNearbyOffers);
  });

  it('should not modify state for unknown action', () => {
    const initialState: OfferData = {
      offer: null,
      nearbyOffers: [],
    };

    const action = { type: 'UNKNOWN_ACTION' };
    const newState = offerReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
