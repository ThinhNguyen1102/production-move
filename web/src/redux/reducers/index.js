import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import userReducer from "./userReducer";
import productLineReducer from "./productLineReducer";
import warehouseReducer from "./warehouseReducer";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  user: userReducer,
  productLine: productLineReducer,
  warehouse: warehouseReducer,
});
