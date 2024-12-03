import { createSlice } from '@reduxjs/toolkit';
import { OffersData } from '../../types/state.ts';
import { NameSpace } from '../../const.ts';
import { fetchOffersAction, changeFavoriteAction } from '../api-actions.ts';

const initialState: OffersData = {
  offers: [],
  isDataLoading: false
};

const offersSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isDataLoading = false;
      })
      .addCase(changeFavoriteAction.fulfilled, (state, action) => {
        const { offerId, status } = action.payload;
        const offer = state.offers.find((o) => o.id === offerId);
        if (offer) {
          offer.isFavorite = status === 1;
        }
      });
  },
});

export const offersReducer = offersSlice.reducer;
