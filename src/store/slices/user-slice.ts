import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const.ts';
import { Offer } from '../../types/offer.ts';
import { UserData } from '../../types/state.ts';
import { UserInfo } from '../../types/user.ts';

const initialState: UserData = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
  favoriteOffers: [] as Offer[],
};

const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    requireAuthorization: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setUserData: (state, action: PayloadAction<UserInfo | null>) => {
      state.userInfo = action.payload;
    },
    setFavoriteOffers: (state, action: PayloadAction<Offer[]>) => {
      state.favoriteOffers = action.payload;
    },
    addFavoriteOffer: (state, action: PayloadAction<Offer>) => {
      state.favoriteOffers.push(action.payload);
    },
    removeFavoriteOffer: (state, action: PayloadAction<string>) => {
      state.favoriteOffers = state.favoriteOffers.filter((offer) => offer.id !== action.payload);
    },
  },
});

export const {
  requireAuthorization,
  setUserData,
  setFavoriteOffers,
  addFavoriteOffer,
  removeFavoriteOffer,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
