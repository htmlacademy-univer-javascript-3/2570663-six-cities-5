import {createRandomState} from '../../utils/create-random-state.ts';
import {getDataLoadingStatus, getOffers} from './selectors.ts';
import {NameSpace} from '../../const.ts';
import {createRandomOffer} from '../../utils/create-random-offer.ts';

describe('Selector: getOffers', () => {
  it('should return the offers from the state', () => {
    const state = createRandomState();

    const result = getOffers(state);
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('title');
    expect(result[0]).toHaveProperty('isPremium');
  });

  it('should return an empty array if offers are not set', () => {
    const state = createRandomState();

    state[NameSpace.Offers].offers = [];

    const result = getOffers(state);
    expect(result).toEqual([]);
  });

  it('should return the updated offers after their change', () => {
    const state = createRandomState();

    const initialOffers = getOffers(state);
    expect(initialOffers.length).toBeGreaterThan(0);

    const newOffer = createRandomOffer();
    state[NameSpace.Offers].offers = [...initialOffers, newOffer];

    const updatedOffers = getOffers(state);
    expect(updatedOffers.length).toBe(initialOffers.length + 1);
    expect(updatedOffers).toContainEqual(newOffer);
  });
});

describe('Selector: getDataLoadingStatus', () => {
  it('should return the data loading status from the state', () => {
    const state = createRandomState();

    const result = getDataLoadingStatus(state);
    expect(typeof result).toBe('boolean');
  });

  it('should return false if data loading status is not set', () => {
    const state = createRandomState();

    const result = getDataLoadingStatus(state);
    expect(result).toBe(false);
  });

  it('should return the updated data loading status after its change', () => {
    const state = createRandomState();

    const initialStatus = getDataLoadingStatus(state);
    expect(typeof initialStatus).toBe('boolean');

    state[NameSpace.Offers].isDataLoading = !initialStatus;

    const updatedStatus = getDataLoadingStatus(state);
    expect(updatedStatus).toBe(!initialStatus);
  });
});
