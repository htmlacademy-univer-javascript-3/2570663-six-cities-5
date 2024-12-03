import {combineReducers} from '@reduxjs/toolkit';
import {cityReducer} from './slices/city-slice.ts';
import {commentsReducer} from './slices/comments-slice.ts';
import {offerReducer} from './slices/offer-slice.ts';
import {offersReducer} from './slices/offers-slice.ts';
import {userReducer} from './slices/user-slice.ts';
import { NameSpace } from '../const.ts';

export const rootReducer = combineReducers({
  [NameSpace.City]: cityReducer,
  [NameSpace.Comments]: commentsReducer,
  [NameSpace.Offer]: offerReducer,
  [NameSpace.Offers]: offersReducer,
  [NameSpace.User]: userReducer
});
