import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import userReducer from "./userReducer";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  user: userReducer,
});
