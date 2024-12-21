import {getAuthorizationStatus, getFavoriteOffers, getUserInfo} from './selectors.ts';
import {createRandomState} from '../../utils/create-random-state.ts';
import {AuthorizationStatus, NameSpace} from '../../const.ts';
import {createRandomUserInfo} from '../../utils/create-random-user-info.ts';
import {createRandomOffer} from '../../utils/create-random-offer.ts';

describe('Selector: getAuthorizationStatus', () => {
  it('should return the authorization status from the state', () => {
    const state = createRandomState();

    const result = getAuthorizationStatus(state);
    expect(Object.values(AuthorizationStatus)).toContain(result);
  });

  it('should return "NoAuth" if authorization status is not set', () => {
    const state = createRandomState();

    state[NameSpace.User].authorizationStatus = AuthorizationStatus.NoAuth;

    const result = getAuthorizationStatus(state);
    expect(result).toBe(AuthorizationStatus.NoAuth);
  });

  it('should return the updated authorization status after its change', () => {
    const state = createRandomState();

    const initialStatus = getAuthorizationStatus(state);
    expect(Object.values(AuthorizationStatus)).toContain(initialStatus);

    state[NameSpace.User].authorizationStatus = AuthorizationStatus.NoAuth;

    const updatedStatus = getAuthorizationStatus(state);
    expect(updatedStatus).toBe(AuthorizationStatus.NoAuth);
  });
});

describe('Selector: getUserInfo', () => {
  it('should return the user info from the state', () => {
    const state = createRandomState();

    const result = getUserInfo(state);
    expect(result).toBeInstanceOf(Object);
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('avatarUrl');
    expect(result).toHaveProperty('isPro');
  });

  it('should return null if user info is not set', () => {
    const state = createRandomState();

    state[NameSpace.User].userInfo = null;

    const result = getUserInfo(state);
    expect(result).toBeNull();
  });

  it('should return the updated user info after its change', () => {
    const state = createRandomState();

    const initialUserInfo = getUserInfo(state);
    expect(initialUserInfo).toBeInstanceOf(Object);

    const newUserInfo = createRandomUserInfo();
    state[NameSpace.User].userInfo = newUserInfo;

    const updatedUserInfo = getUserInfo(state);
    expect(updatedUserInfo).toEqual(newUserInfo);
  });
});

describe('Selector: getFavoriteOffers', () => {
  it('should return the favorite offers from the state', () => {
    const state = createRandomState();

    const result = getFavoriteOffers(state);
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('title');
    expect(result[0]).toHaveProperty('isFavorite');
  });

  it('should return an empty array if favorite offers are not set', () => {
    const state = createRandomState();

    state[NameSpace.User].favoriteOffers = [];

    const result = getFavoriteOffers(state);
    expect(result).toEqual([]);
  });

  it('should return the updated favorite offers after their change', () => {
    const state = createRandomState();

    const initialFavoriteOffers = getFavoriteOffers(state);
    expect(initialFavoriteOffers.length).toBeGreaterThan(0);

    const newFavoriteOffer = createRandomOffer();
    state[NameSpace.User].favoriteOffers = [...initialFavoriteOffers, newFavoriteOffer];

    const updatedFavoriteOffers = getFavoriteOffers(state);
    expect(updatedFavoriteOffers.length).toBe(initialFavoriteOffers.length + 1);
    expect(updatedFavoriteOffers).toContainEqual(newFavoriteOffer);
  });
});
