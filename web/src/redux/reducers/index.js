import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import userReducer from "./userReducer";
import productLineReducer from "./productLineReducer";
import warehouseReducer from "./warehouseReducer";
import packageReducer from "./packageReducer";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  user: userReducer,
  productLine: productLineReducer,
  warehouse: warehouseReducer,
  package: packageReducer,
});
