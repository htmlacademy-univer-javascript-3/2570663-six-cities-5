import {State} from '../../types/state.ts';
import {Offer} from '../../types/offer.ts';
import {AuthorizationStatus, NameSpace} from '../../const.ts';
import {UserInfo} from '../../types/user.ts';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUserInfo = (state: State): UserInfo | null => state[NameSpace.User].userInfo;
export const getFavoriteOffers = (state: State): Offer[] => state[NameSpace.User].favoriteOffers;
