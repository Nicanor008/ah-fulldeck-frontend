import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import { signUpReducer } from "./signupReducer";
import socialAuth from './socialAuth'

import ArticleReducer from "./ArticleReducer";
import singleArticleReducer from "./singleArticleReducer";
import UserProfileReducer from "./Profile/userProfileReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  data: signUpReducer,
  articles: ArticleReducer,
  article: singleArticleReducer,
  socialAuth,
  profile: UserProfileReducer
});

export default rootReducer;
