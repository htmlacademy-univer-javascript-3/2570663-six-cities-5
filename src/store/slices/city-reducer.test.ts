import { CityData } from '../../types/state.ts';
import {cityReducer, setCity} from './city-slice.ts';

describe('cityReducer', () => {
  it('should return the initial state', () => {
    const initialState: CityData = {
      activeCity: 'Paris',
    };

    expect(cityReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle setCity action', () => {
    const initialState: CityData = {
      activeCity: 'Paris',
    };

    const newCity = 'Amsterdam';

    const action = setCity(newCity);
    const newState = cityReducer(initialState, action);

    expect(newState.activeCity).toEqual(newCity);
  });

  it('should not modify state for unknown action', () => {
    const initialState: CityData = {
      activeCity: 'Paris',
    };

    const action = { type: 'UNKNOWN_ACTION' };
    const newState = cityReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
