import { UserData } from '../../types/state.ts';
import { AuthorizationStatus } from '../../const.ts';
import {
  userReducer,
  requireAuthorization,
  setUserData,
  setFavoriteOffers,
  addFavoriteOffer,
  removeFavoriteOffer,
} from './user-slice.ts';
import {createRandomUserInfo} from '../../utils/create-random-user-info.ts';
import {createRandomOffer} from '../../utils/create-random-offer.ts';

describe('userReducer', () => {
  it('should return the initial state', () => {
    const initialState: UserData = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userInfo: null,
      favoriteOffers: [],
    };

    expect(userReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle requireAuthorization action', () => {
    const initialState: UserData = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userInfo: null,
      favoriteOffers: [],
    };

    const action = requireAuthorization(AuthorizationStatus.Auth);
    const newState = userReducer(initialState, action);

    expect(newState.authorizationStatus).toEqual(AuthorizationStatus.Auth);
  });

  it('should handle setUserData action', () => {
    const initialState: UserData = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userInfo: null,
      favoriteOffers: [],
    };

    const mockUserInfo = createRandomUserInfo();

    const action = setUserData(mockUserInfo);
    const newState = userReducer(initialState, action);

    expect(newState.userInfo).toEqual(mockUserInfo);
  });

  it('should handle setFavoriteOffers action', () => {
    const initialState: UserData = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userInfo: null,
      favoriteOffers: [],
    };

    const mockFavoriteOffers = [createRandomOffer(), createRandomOffer()];

    const action = setFavoriteOffers(mockFavoriteOffers);
    const newState = userReducer(initialState, action);

    expect(newState.favoriteOffers).toEqual(mockFavoriteOffers);
  });

  it('should handle addFavoriteOffer action', () => {
    const initialState: UserData = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userInfo: null,
      favoriteOffers: [createRandomOffer()],
    };

    const newFavoriteOffer = createRandomOffer();

    const action = addFavoriteOffer(newFavoriteOffer);
    const newState = userReducer(initialState, action);

    expect(newState.favoriteOffers).toEqual([...initialState.favoriteOffers, newFavoriteOffer]);
  });

  it('should handle removeFavoriteOffer action', () => {
    const mockOffer = createRandomOffer();
    const initialState: UserData = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userInfo: null,
      favoriteOffers: [mockOffer],
    };

    const action = removeFavoriteOffer(mockOffer.id);
    const newState = userReducer(initialState, action);

    expect(newState.favoriteOffers).toEqual([]);
  });

  it('should not modify state for unknown action', () => {
    const initialState: UserData = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userInfo: null,
      favoriteOffers: [createRandomOffer()],
    };

    const action = { type: 'UNKNOWN_ACTION' };
    const newState = userReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
