import commentsReducer from '../commentsReducer';
import { COMMENT_REQUEST } from '../../actions/types';

describe('commentsReducer', () => {
  let payload = '';

  beforeEach(() => {
    payload = 'comment-is-here';
  });
  it('should return the initial state', () => {
    expect(commentsReducer({ isLoading: false }, {})).toEqual(
      {
        isLoading: false,
      },
    );
  });

  it('should handle COMMENT_REQUEST', () => {
    expect(
      commentsReducer({ isLoading: true }, {
        type: COMMENT_REQUEST,
        payload,
      }),
    ).toEqual(
      {
        isLoading: true,
      },
    );
  });
});
