import { createReducer } from '@reduxjs/toolkit';
import {setCity, setOffers, setOffersDataLoadingStatus} from './action';
import {Offer} from '../types/offer.ts';

type InitialState = {
  activeCity: string;
  offers: Offer[];
  isOffersDataLoading: boolean;
}

const initialState: InitialState = {
  activeCity: 'Paris',
  offers: [],
  isOffersDataLoading: false
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});
