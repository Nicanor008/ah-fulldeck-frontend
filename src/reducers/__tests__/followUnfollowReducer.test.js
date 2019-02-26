import usersProfilesReducer from '../Profile/userProfileReducer';
import { FOLLOW_USER_SUCCESS, FOLLOW_USER_REQUEST } from '../../actions/types';

describe('Follow user reducer', () => {
  let payload = '';

  beforeEach(() => {
    payload = 'test';
  });
  it('should return the initial state', () => {
    expect(usersProfilesReducer(FOLLOW_USER_REQUEST, payload)).toEqual(
      'FOLLOW_USER',
    );
  });

    it('should handle FOLLOW_USER_SUCCESS', () => {
      expect(
          usersProfilesReducer(
          { follow: true },
          {
            type: FOLLOW_USER_SUCCESS,
            payload,
          },
        ),
      ).toEqual({
        follow: true,
      });
    });
});
