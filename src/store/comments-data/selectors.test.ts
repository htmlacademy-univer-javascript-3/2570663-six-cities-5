import { expect } from 'vitest';
import { getComments } from './selectors.ts';
import { createRandomState } from '../../utils/create-random-state.ts';
import { NameSpace } from '../../const.ts';
import { Review } from '../../types/review.ts';

describe('Selector: getComments', () => {
  it('should return the comments from the state', () => {
    const state = createRandomState();

    const result = getComments(state);
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should return an empty array if comments are not set', () => {
    const state = createRandomState();

    state[NameSpace.Comments].comments = [];

    const result = getComments(state);
    expect(result).toEqual([]);
  });

  it('should return the updated comments after their change', () => {
    const state = createRandomState();

    const initialComments = getComments(state);
    expect(initialComments.length).toBeGreaterThan(0);

    const newComment: Review = {
      id: '123',
      comment: 'New comment',
      rating: 5,
      date: '2023-10-01T12:00:00.000Z',
      user: {
        name: 'John Doe',
        avatarUrl: 'https://example.com/avatar.png',
        isPro: true,
      },
    };
    state[NameSpace.Comments].comments = [...initialComments, newComment];

    const updatedComments = getComments(state);
    expect(updatedComments.length).toBe(initialComments.length + 1);
    expect(updatedComments).toContainEqual(newComment);
  });
});
