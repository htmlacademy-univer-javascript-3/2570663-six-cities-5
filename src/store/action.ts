import { createAction } from '@reduxjs/toolkit';
import {Offer} from '../types/offer.ts';

export const setCity = createAction<string>('city/setCity');

export const setOffers = createAction<Offer[]>('offers/setOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
