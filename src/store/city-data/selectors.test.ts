import { expect } from 'vitest';
import { NameSpace } from '../../const.ts';
import {getActiveCity} from './selectors.ts';
import {createRandomState} from '../../utils/create-random-state.ts';

describe('Selector: getActiveCity', () => {
  it('should return the active city from the state', () => {
    const state = createRandomState();

    const result = getActiveCity(state);
    expect(result).toBe('Paris');
  });

  it('should return an empty string if activeCity is not set', () => {
    const state = createRandomState();
    state[NameSpace.City].activeCity = '';

    const result = getActiveCity(state);
    expect(result).toBe('');
  });

  it('should return the active city after its change', () => {
    const state = createRandomState();

    const result1 = getActiveCity(state);
    expect(result1).toBe('Paris');

    state[NameSpace.City].activeCity = 'Amsterdam';

    const result2 = getActiveCity(state);
    expect(result2).toBe('Amsterdam');
  });
});
