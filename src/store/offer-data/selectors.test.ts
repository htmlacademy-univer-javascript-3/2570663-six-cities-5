import {createRandomState} from '../../utils/create-random-state.ts';
import {getNearbyOffers, getOffer} from './selectors.ts';
import {NameSpace} from '../../const.ts';
import {createRandomDetailedOffer} from '../../utils/create-random-detailed-offer.ts';
import {createRandomOffer} from '../../utils/create-random-offer.ts';

describe('Selector: getOffer', () => {
  it('should return the detailed offer from the state', () => {
    const state = createRandomState();

    const result = getOffer(state);
    expect(result).toBeInstanceOf(Object);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('title');
    expect(result).toHaveProperty('description');
  });

  it('should return null if the detailed offer is not set', () => {
    const state = createRandomState();

    state[NameSpace.Offer].offer = null;

    const result = getOffer(state);
    expect(result).toBeNull();
  });

  it('should return the updated offer after its change', () => {
    const state = createRandomState();

    const initialOffer = getOffer(state);
    expect(initialOffer).toBeInstanceOf(Object);

    const newOffer = createRandomDetailedOffer();
    state[NameSpace.Offer].offer = newOffer;

    const updatedOffer = getOffer(state);
    expect(updatedOffer).toEqual(newOffer);
  });
});

describe('Selector: getNearbyOffers', () => {
  it('should return the nearby offers from the state', () => {
    const state = createRandomState();

    const result = getNearbyOffers(state);
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('title');
    expect(result[0]).toHaveProperty('type');
  });

  it('should return an empty array if nearby offers are not set', () => {
    const state = createRandomState();

    state[NameSpace.Offer].nearbyOffers = [];

    const result = getNearbyOffers(state);
    expect(result).toEqual([]);
  });

  it('should return the updated nearby offers after their change', () => {
    const state = createRandomState();

    const initialNearbyOffers = getNearbyOffers(state);
    expect(initialNearbyOffers.length).toBeGreaterThan(0);

    const newNearbyOffer = createRandomOffer();
    state[NameSpace.Offer].nearbyOffers = [...initialNearbyOffers, newNearbyOffer];

    const updatedNearbyOffers = getNearbyOffers(state);
    expect(updatedNearbyOffers.length).toBe(initialNearbyOffers.length + 1);
    expect(updatedNearbyOffers).toContainEqual(newNearbyOffer);
  });
});
