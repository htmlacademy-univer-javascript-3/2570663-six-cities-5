import { createReducer } from '@reduxjs/toolkit';
import {
  requireAuthorization,
  setCity,
  setOffers,
  setDataLoadingStatus,
  setUserData,
  setFavoriteOffers,
  setNearbyOffers, setComments, setDetailedOffer, addComment,
} from './action';
import {DetailedOffer, Offer} from '../types/offer.ts';
import {AuthorizationStatus} from '../const.ts';
import {UserData} from '../types/user.ts';
import {Review} from '../types/review.ts';

type InitialState = {
  activeCity: string;
  offers: Offer[];
  favoriteOffers: Offer[];
  isDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
  offer: DetailedOffer | null;
  nearbyOffers: Offer[];
  comments: Review[];
}

const initialState: InitialState = {
  activeCity: 'Paris',
  offers: [],
  favoriteOffers: [],
  isDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  offer: null,
  nearbyOffers: [],
  comments: [],
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
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(setDetailedOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(addComment, (state, action) => {
      state.comments.push(action.payload);
    });
});
