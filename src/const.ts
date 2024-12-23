import {SortingOption} from './types/sorting-option.ts';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  OfferWithId = '/offer/:id',
  NotFound = '/not-found',
}

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorite',
  Comments = '/comments',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const SORTING_OPTIONS : SortingOption[] = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

export enum NameSpace {
  City = 'CITY',
  Comments = 'COMMENTS',
  Offer = 'OFFER',
  Offers = 'OFFERS',
  User = 'USER'
}
