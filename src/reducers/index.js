import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import { signUpReducer } from "./signupReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  data: signUpReducer
});

export default rootReducer;
