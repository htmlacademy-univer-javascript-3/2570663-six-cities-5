import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {CityData} from '../../types/state.ts';
import {NameSpace} from '../../const.ts';

const initialState: CityData = {
  activeCity: 'Paris',
};

const citySlice = createSlice({
  name: NameSpace.City,
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.activeCity = action.payload;
    },
  },
});

export const { setCity } = citySlice.actions;
export const cityReducer = citySlice.reducer;
