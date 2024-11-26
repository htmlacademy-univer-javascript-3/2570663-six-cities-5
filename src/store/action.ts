import { createAction } from '@reduxjs/toolkit';
import {DetailedOffer, Offer} from '../types/offer.ts';
import {AppRoute, AuthorizationStatus} from '../const.ts';
import {UserData} from '../types/user.ts';
import {Review} from '../types/review.ts';

export const setCity = createAction<string>('city/setCity');

export const setOffers = createAction<Offer[]>('offers/setOffers');

export const setDataLoadingStatus = createAction<boolean>('data/setDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setUserData = createAction<UserData | null>('user/setUserData');

export const setFavoriteOffers = createAction<Offer[]>('user/setFavoriteOffers');

export const redirectToRoute = createAction<AppRoute>('auth/redirectToRoute');

export const setDetailedOffer = createAction<DetailedOffer>('offer/setDetailedOffer');

export const setNearbyOffers = createAction<Offer[]>('offers/setNearbyOffers');

export const setComments = createAction<Review[]>('comments/setComments');

export const addComment = createAction<Review>('comments/addComment');
