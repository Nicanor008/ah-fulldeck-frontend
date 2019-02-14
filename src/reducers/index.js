import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import { signUpReducer } from "./signupReducer";
import socialAuth from './socialAuth'

import ArticleReducer from "./ArticleReducer";
import singleArticleReducer from "./singleArticleReducer";
import UserProfileReducer from "./Profile/userProfileReducer";
import resetPassword from "./resetPassword";
import updateReducer from './updateReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  data: signUpReducer,
  articles: ArticleReducer,
  article: singleArticleReducer,
  socialAuth,
  profile: UserProfileReducer,
  resetPassword,
  updateReducer
});

export default rootReducer;
