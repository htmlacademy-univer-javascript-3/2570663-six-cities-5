import {State} from '../../types/state.ts';
import {DetailedOffer, Offer} from '../../types/offer.ts';
import {NameSpace} from '../../const.ts';

export const getOffer = (state: State): DetailedOffer | null => state[NameSpace.Offer].offer;
export const getNearbyOffers = (state: State): Offer[] => state[NameSpace.Offer].nearbyOffers;
