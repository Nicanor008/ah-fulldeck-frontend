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
});

export default rootReducer;
