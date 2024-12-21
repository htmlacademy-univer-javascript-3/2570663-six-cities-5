import {State} from '../types/state.ts';
import {AuthorizationStatus, NameSpace} from '../const.ts';
import {createRandomReview} from './create-random-review.ts';
import {createRandomDetailedOffer} from './create-random-detailed-offer.ts';
import {createRandomOffer} from './create-random-offer.ts';
import {createRandomUserInfo} from './create-random-user-info.ts';

export function createRandomState() : State {
  return {
    [NameSpace.City]: {
      activeCity: 'Paris',
    },
    [NameSpace.Comments]: {
      comments: [createRandomReview()],
    },
    [NameSpace.Offer]: {
      offer: createRandomDetailedOffer(),
      nearbyOffers: [createRandomOffer(), createRandomOffer()],
    },
    [NameSpace.Offers]: {
      offers: [createRandomOffer(), createRandomOffer(), createRandomOffer()],
      isDataLoading: false,
    },
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      userInfo: createRandomUserInfo(),
      favoriteOffers: [createRandomOffer(), createRandomOffer()],
    },
  };
}
