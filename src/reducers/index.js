import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import { signUpReducer } from './signupReducer';
import socialAuth from './socialAuth';

import ArticleReducer from './ArticleReducer';
import singleArticleReducer from './singleArticleReducer';
import UserProfileReducer from './Profile/userProfileReducer';
import resetPassword from './resetPassword';
import commentsReducer from './commentsReducer';
import updateReducer from './updateReducer';
import { likeDislike } from './likeDislikeReducer';
import ratingReducer from './Rating/ratingReducer';
import bookmarkArticlesReducer from './bookmarkReducer';
import reportReducer from './Report/reportReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  data: signUpReducer,
  articles: ArticleReducer,
  article: singleArticleReducer,
  profile: UserProfileReducer,
  comment: commentsReducer,
  resetPassword,
  updateReducer,
  socialAuth,
  likeDislike,
  rating: ratingReducer,
  bookmark: bookmarkArticlesReducer,
  report: reportReducer,
});

export default rootReducer;
