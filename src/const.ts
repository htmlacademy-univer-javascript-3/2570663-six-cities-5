export const Data = {
  OffersNumber: 312
};

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  OfferWithId = '/offer/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export enum SORTING_OPTIONS {
  Popular = 'Popular',
  Increasing = 'Price: low to high',
  Decreasing = 'Price: high to low',
  Rating = 'Top rated first',
}
