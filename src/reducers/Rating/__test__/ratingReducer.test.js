import ratingReducer from '../ratingReducer';
import {
  SUCCESSFUL_RATING,
  RATING_ERROR,
  RATING_REQUEST,
} from '../../../actions/types';
import initialState from '../../initialState';

describe('rating', () => {
  let payload = '';

  beforeEach(() => {
    payload = 'tepetepe';
  });
  it('should return the initial state', () => {
    expect(ratingReducer({ isLoading: true }, {})).toEqual({
      isLoading: true,
    });
  });

  it('should handle RATING_REQUEST', () => {
    expect(
      ratingReducer(
        { isLoading: true },
        {
          type: RATING_REQUEST,
          payload,
        },
      ),
    ).toEqual({
      isLoading: true,
    });
  });
});
