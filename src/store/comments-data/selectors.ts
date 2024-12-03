import {State} from '../../types/state.ts';
import {NameSpace} from '../../const.ts';
import {Review} from '../../types/review.ts';

export const getComments = (state: State): Review[] => state[NameSpace.Comments].comments;
