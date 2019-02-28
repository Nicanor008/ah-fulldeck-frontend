import {
  REPORT_ARTICLE_SUCCESS,
  REPORT_ARTICLE_ERROR,
  REPORT_ARTICLE_REQUEST,
} from '../../actions/types';

const reportReducer = (state = { reporting: {} }, action) => {
  switch (action.type) {
    case REPORT_ARTICLE_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    case REPORT_ARTICLE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case REPORT_ARTICLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        reporting: action.payload,
      };
    default:
      return state;
  }
};

export default reportReducer;
