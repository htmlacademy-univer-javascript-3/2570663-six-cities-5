import { CommentsData } from '../../types/state.ts';
import { Review } from '../../types/review.ts';
import { addComment, commentsReducer, setComments } from './comments-slice.ts';
import faker from 'faker';

function createRandomReview(): Review {
  return {
    id: faker.datatype.uuid(),
    user: {
      name: faker.name.findName(),
      avatarUrl: faker.image.avatar(),
      isPro: faker.datatype.boolean(),
    },
    rating: faker.datatype.number({ min: 1, max: 5 }),
    comment: faker.lorem.sentence(),
    date: faker.date.recent().toISOString(),
  };
}

describe('commentsReducer', () => {
  it('should return the initial state', () => {
    const initialState: CommentsData = {
      comments: [],
    };

    expect(commentsReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle setComments action', () => {
    const initialState: CommentsData = {
      comments: [],
    };

    const mockComments: Review[] = [
      createRandomReview(),
      createRandomReview(),
    ];

    const action = setComments(mockComments);
    const newState = commentsReducer(initialState, action);

    expect(newState.comments).toEqual(mockComments);
  });

  it('should handle addComment action', () => {
    const initialState: CommentsData = {
      comments: [createRandomReview()],
    };

    const newComment: Review = createRandomReview();

    const action = addComment(newComment);
    const newState = commentsReducer(initialState, action);

    expect(newState.comments).toEqual([...initialState.comments, newComment]);
  });

  it('should not modify state for unknown action', () => {
    const initialState: CommentsData = {
      comments: [createRandomReview()],
    };

    const action = { type: 'UNKNOWN_ACTION' };
    const newState = commentsReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
