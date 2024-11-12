import { createReducer } from '@reduxjs/toolkit';
import { setCity, setOffers } from './action';
import {Offer} from '../types/offer.ts';

const initialState = {
  activeCity: 'Paris',
  offers: [] as Offer[]
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });
});
