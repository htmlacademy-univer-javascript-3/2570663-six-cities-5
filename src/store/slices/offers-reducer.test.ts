import { OffersData } from '../../types/state.ts';
import { offersReducer } from './offers-slice.ts';
import { fetchOffersAction, changeFavoriteAction } from '../api-actions.ts';
import {createRandomOffer} from '../../utils/create-random-offer.ts';

describe('offersReducer', () => {
  it('should return the initial state', () => {
    const initialState: OffersData = {
      offers: [],
      isDataLoading: false,
    };

    expect(offersReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle fetchOffersAction.pending', () => {
    const initialState: OffersData = {
      offers: [],
      isDataLoading: false,
    };

    const action = fetchOffersAction.pending;
    const newState = offersReducer(initialState, action);

    expect(newState.isDataLoading).toBe(true);
  });

  it('should handle fetchOffersAction.fulfilled', () => {
    const initialState: OffersData = {
      offers: [],
      isDataLoading: true,
    };

    const mockOffers = [createRandomOffer(), createRandomOffer()];

    const action = fetchOffersAction.fulfilled(mockOffers, '', undefined);
    const newState = offersReducer(initialState, action);

    expect(newState.offers).toEqual(mockOffers);
    expect(newState.isDataLoading).toBe(false);
  });

  it('should handle changeFavoriteAction.fulfilled', () => {
    const mockOffer = createRandomOffer();
    const initialState: OffersData = {
      offers: [mockOffer],
      isDataLoading: false,
    };

    const updatedOffer = { ...mockOffer, isFavorite: !mockOffer.isFavorite };
    const action = changeFavoriteAction.fulfilled(
      { offerId: mockOffer.id, status: updatedOffer.isFavorite ? 1 : 0 },
      '',
      { offerId: mockOffer.id, status: updatedOffer.isFavorite ? 1 : 0 }
    );
    const newState = offersReducer(initialState, action);

    expect(newState.offers[0].isFavorite).toBe(updatedOffer.isFavorite);
  });

  it('should not modify state for unknown action', () => {
    const initialState: OffersData = {
      offers: [createRandomOffer()],
      isDataLoading: false,
    };

    const action = { type: 'UNKNOWN_ACTION' };
    const newState = offersReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
