import reportReducer from '../reportReducer';
import {
  REPORT_ARTICLE_REQUEST,
  REPORT_ARTICLE_SUCCESS,
  REPORT_ARTICLE_ERROR,
} from '../../../actions/types';

describe('reporting an article reducer test', () => {
  let payload = '';

  beforeEach(() => {
    payload = 'welcome';
  });
  it('should return the initial state', () => {
    expect(reportReducer({ isLoading: true }, {})).toEqual({
      isLoading: true,
    });
  });

  it('should handle REPORT_ARTICLE_REQUEST', () => {
    expect(
      reportReducer(
        { isLoading: true },
        {
          type: REPORT_ARTICLE_REQUEST,
          payload,
        },
      ),
    ).toEqual({
      isLoading: true,
    });
  });
});
