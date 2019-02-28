import {
  followUserRequest,
  followUserFailure,
  followUserSuccess,
  unfollowUserRequest,
  unfollowUserFailure,
  unfollowUserSuccess,
} from '../Profile/userProfileAction';
import {
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
} from '../types';

describe('unfollow user actions', () => {
  it('Should send a follow request', () => {
    const expectedAction = {
      type: UNFOLLOW_USER_REQUEST,
    };
    const result = unfollowUserRequest('remmy');
    expect(expectedAction).toEqual(result);
  });
  it('Should unfollow a user successfully', () => {
    const expectedAction = {
      type: UNFOLLOW_USER_SUCCESS,
      payload: {},
    };
    const result = unfollowUserSuccess({});
    expect(expectedAction).toEqual(result);
  });

  it('Should get any errors if they occur when unfollowing', () => {
    const expectedAction = {
      type: UNFOLLOW_USER_FAILURE,
      payload: {},
    };
    const result = unfollowUserFailure({});
    expect(expectedAction).toEqual(result);
  });
});

describe('follow user actions', () => {
  it('Should send a follow request', () => {
    const expectedAction = {
      type: FOLLOW_USER_REQUEST,
    };
    const result = followUserRequest('remmy');
    expect(expectedAction).toEqual(result);
  });
  it('Should follow a user successfully', () => {
    const expectedAction = {
      type: FOLLOW_USER_SUCCESS,
      payload: {},
    };
    const result = followUserSuccess({});
    expect(expectedAction).toEqual(result);
  });

  it('Should get any errors if they occur', () => {
    const expectedAction = {
      type: FOLLOW_USER_FAILURE,
      payload: {},
    };
    const result = followUserFailure({});
    expect(expectedAction).toEqual(result);
  });
});
