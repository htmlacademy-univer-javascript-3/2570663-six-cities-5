import { createReducer } from '@reduxjs/toolkit';
import { setCity, setOffers } from './action';
import {Offer} from '../types/offer.ts';

const initialState = {
  city: 'Paris',
  offers: [] as Offer[]
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });
});
