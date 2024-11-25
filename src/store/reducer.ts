import { createReducer } from '@reduxjs/toolkit';
import {requireAuthorization, setCity, setOffers, setDataLoadingStatus, setUserData, setFavoriteOffers} from './action';
import {Offer} from '../types/offer.ts';
import {AuthorizationStatus} from '../const.ts';
import {UserData} from '../types/user.ts';

type InitialState = {
  activeCity: string;
  offers: Offer[];
  favoriteOffers: Offer[];
  isDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
}

const initialState: InitialState = {
  activeCity: 'Paris',
  offers: [],
  favoriteOffers: [],
  isDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setFavoriteOffers, (state, action) => {
      state.favoriteOffers = action.payload;
    })
    .addCase(setDataLoadingStatus, (state, action) => {
      state.isDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
      console.log(state.authorizationStatus);
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
});
