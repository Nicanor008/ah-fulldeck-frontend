import { BOOKMARK_ARTICLE, UNBOOKMARK_ARTICLE, BOOKMARK_ARTICLE_FAILURE } from './types';
import axiosConfig from '../config/configAxios';
import launchToast from '../helpers/toaster';

export const bookmark = () => ({
  type: BOOKMARK_ARTICLE,
});
export const unbookmark = () => ({
  type: UNBOOKMARK_ARTICLE,
});
export const bookmarkingFailed = error => ({
  type: BOOKMARK_ARTICLE_FAILURE,
  error,
});

export const bookmarkArticle = slug => (dispatch) => {
  const url = `/api/v1/articles/${slug}/bookmark/`;
  axiosConfig
    .put(url, {})
    .then((response) => {
      const icon = document.getElementById('bookmark');

      if (response.data.message === `The article ${slug} has been bookmarked!`) {
        icon.classList.remove('notbookmarked');
        icon.classList.add('bookmarked');
        dispatch(bookmark(response.data.message));
        launchToast('Article added to bookmarks', 'toastSuccess', 'descSuccess', 'success');
      } else if (response.data.message === `The article ${slug} has been removed from bookmarks!`) {
        icon.classList.add('notbookmarked');
        icon.classList.remove('bookmarked');
        dispatch(unbookmark(response.data.message));
        launchToast('Article removed from bookmarks', 'toastFail', 'descFail', 'fail');
      }
    })
    .catch((error) => {
      dispatch(bookmarkingFailed(error.response.data));
    });
};
