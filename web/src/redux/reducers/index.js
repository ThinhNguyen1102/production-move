import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import userReducer from "./userReducer";
import productLineReducer from "./productLineReducer";
import warehouseReducer from "./warehouseReducer";
import packageReducer from "./packageReducer";
import productReducer from "./productReducer";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  user: userReducer,
  productLine: productLineReducer,
  warehouse: warehouseReducer,
  packageReducer: packageReducer,
  product: productReducer,
});
