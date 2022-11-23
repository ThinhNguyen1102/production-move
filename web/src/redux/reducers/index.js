import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import userReducer from "./userReducer";
import productLineReducer from "./productLineReducer";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  user: userReducer,
  productLine: productLineReducer,
});
