import { configureStore, Middleware } from '@reduxjs/toolkit';
import { rootReducer } from '../root-reducer';
import { redirect } from './redirect';
import { browserHistory } from '../../browser-history';
import { vi } from 'vitest';

export type RootState = ReturnType<typeof rootReducer>;
const middleware: Middleware<unknown, RootState>[] = [redirect];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

vi.mock('../../browser-history', () => ({
  browserHistory: {
    push: vi.fn(),
  },
}));

describe('redirect middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should redirect to the specified URL when action type is "auth/redirectToRoute"', () => {
    const action = {
      type: 'auth/redirectToRoute',
      payload: '/login',
    };

    store.dispatch(action);

    expect(browserHistory.push).toHaveBeenCalledWith('/login');
  });

  it('should pass other actions to the next middleware', () => {
    const action = {
      type: 'some/otherAction',
      payload: 'somePayload',
    };

    store.dispatch(action);

    expect(browserHistory.push).not.toHaveBeenCalled();
  });
});
