import {State} from '../../types/state.ts';
import {NameSpace} from '../../const.ts';

export const getActiveCity = (state: State): string => state[NameSpace.City].activeCity;
