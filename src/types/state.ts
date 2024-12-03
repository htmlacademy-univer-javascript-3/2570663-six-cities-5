import {store} from '../store';
import {Review} from './review.ts';
import {DetailedOffer, Offer} from './offer.ts';
import {AuthorizationStatus} from '../const.ts';
import {UserInfo} from './user.ts';

export type CityData = {
  activeCity: string;
}

export type CommentsData = {
  comments: Review[];
}

export type OfferData = {
  offer: DetailedOffer | null;
  nearbyOffers: Offer[];
}

export type OffersData = {
  offers: Offer[];
  isDataLoading: boolean;
}

export type UserData = {
  authorizationStatus: AuthorizationStatus;
  userInfo: UserInfo | null;
  favoriteOffers: Offer[];
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
