import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {DetailedOffer, Offer} from '../../types/offer.ts';
import {OfferData} from '../../types/state.ts';
import {NameSpace} from '../../const.ts';

const initialState: OfferData = {
  offer: null,
  nearbyOffers: [],
};

const offerSlice = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    setDetailedOffer: (state, action: PayloadAction<DetailedOffer>) => {
      state.offer = action.payload;
    },
    setNearbyOffers: (state, action: PayloadAction<Offer[]>) => {
      state.nearbyOffers = action.payload;
    }
  },
});

export const { setDetailedOffer, setNearbyOffers } = offerSlice.actions;
export const offerReducer = offerSlice.reducer;
