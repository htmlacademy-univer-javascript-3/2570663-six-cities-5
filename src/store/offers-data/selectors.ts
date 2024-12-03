import {Offer} from '../../types/offer.ts';
import {NameSpace} from '../../const.ts';
import {State} from '../../types/state.ts';

export const getOffers = (state: State): Offer[] => state[NameSpace.Offers].offers;
export const getDataLoadingStatus = (state: State): boolean => state[NameSpace.Offers].isDataLoading;
