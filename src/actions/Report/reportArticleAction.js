// eslint-disable-next-line import/named
import {
  REPORT_ARTICLE_SUCCESS,
  REPORT_ARTICLE_ERROR,
  REPORT_ARTICLE_REQUEST,
} from '../types';
import axiosConfig from '../../config/configAxios';
import launchToast from '../../helpers/toaster';

const reportArticle = (slug, report) => async dispatch => {
  dispatch({ type: REPORT_ARTICLE_REQUEST });
  axiosConfig.defaults.headers.Authorization = `Token ${localStorage.getItem(
    'token',
  )}`;
  await axiosConfig
    .post(`/api/v1/articles/${slug}/report/`, report)
    .then(res => {
      if (res) {
        const { message } = res.data.article;
        dispatch({
          type: REPORT_ARTICLE_SUCCESS,
          payload: { success: true },
        });
        launchToast(message, 'toastSuccess', 'descSuccess', 'success');
      }
    })
    .catch(e => {
      const err = JSON.parse(e.request.response);
      const { errors } = err.article;
      dispatch({
        type: REPORT_ARTICLE_ERROR,
        payload: err.article,
      });
      launchToast(errors, 'toastFail', 'descFail', 'fail');
    });
};

export default reportArticle;
