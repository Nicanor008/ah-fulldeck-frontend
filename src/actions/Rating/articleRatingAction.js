import { RATING_ERROR, SUCCESSFUL_RATING, RATING_REQUEST } from '../types';
import axiosConfig from '../../config/configAxios';
import { getSingleArticle } from '../articleActions';
import launchToast from '../../helpers/toaster';

// eslint-disable-next-line import/prefer-default-export
export const userRatingArticle = (slug, value) => async dispatch => {
  dispatch({ type: RATING_REQUEST });
  await axiosConfig
    .post(`/api/v1/articles/${slug}/rate/`, {
      rating: {
        rating: value,
      },
    })
    .then(res => {
      if (res) {
        dispatch(getSingleArticle(slug));
        dispatch({
          type: SUCCESSFUL_RATING,
          payload: { ...res.data, success: true },
        });
        const { message } = res.data.ratings;
        launchToast(message, 'toastSuccess', 'descSuccess', 'success');
      }
    })
    .catch(e => {
      const err = JSON.parse(e.request.response);
      const { errors } = err.ratings;
      dispatch({
        type: RATING_ERROR,
        payload: err.ratings.errors,
      });
      launchToast(errors, 'toastFail', 'descFail', 'fail');
    });
};
