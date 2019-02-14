import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import { signUpReducer } from "./signupReducer";
import socialAuth from './socialAuth'


const rootReducer = combineReducers({
  login: loginReducer,
  data: signUpReducer,
  socialAuth
 });

export default rootReducer;
