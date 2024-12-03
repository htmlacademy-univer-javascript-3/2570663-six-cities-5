import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Review } from '../../types/review.ts';
import {CommentsData} from '../../types/state.ts';
import {NameSpace} from '../../const.ts';

const initialState: CommentsData = {
  comments: [] as Review[],
};

const commentsSlice = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Review[]>) => {
      state.comments = action.payload;
    },
    addComment: (state, action: PayloadAction<Review>) => {
      state.comments.push(action.payload);
    },
  },
});

export const { setComments, addComment } = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;
