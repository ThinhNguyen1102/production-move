export const AUTH = "AUTH";
export const ALERT = "ALERT";
export const USER = {
  CREATE_USER: "CREATE_USER",
  GET_ALL_USER: "GET_ALL_USER",
  GET_USER_BY_ROLE: "GET_USER_BY_ROLE",
  DELETE_USER_BY_ID: "DELETE_USER_BY_ID",
};

export const PRODUCT_LINE = {
  CREATE_PRODUCT_LINE: "CREATE_PRODUCT_LINE",
  GET_ALL_PRODUCT_LINE: "GET_ALL_PRODUCT_LINE",
  GET_ALL_OWN_PRODUCT_LINE: "GET_ALL_OWN_PRODUCT_LINE",
  DELETE_PRODUCT_LINE: "DELETE_PRODUCT_LINE",
};

export const WAREHOUSE = {
  CREATE_WAREHOUSE: "CREATE_WAREHOUSE",
  GET_ALL_WAREHOUSE: "GET_ALL_WAREHOUSE",
  GET_ALL_OWN_WAREHOUSE: "GET_ALL_OWN_WAREHOUSE",
  GET_ALL_WAREHOUSE_BY_UNIT: "GET_ALL_WAREHOUSE_BY_UNIT",
  DELETE_WAREHOUSE: "DELETE_WAREHOUSE",
  EDIT_WAREHOUSE: "EDIT_WAREHOUSE",
};

export const PACKAGE = {
  GET_ALL_PACKAGE_BY_UNIT: "GET_ALL_PACKAGE_BY_UNIT",
  CREATE_PACKAGE: "CREATE_PACKAGE",
  MOVE_PACKAGE: "MOVE_PACKAGE",
};

export const PRODUCT = {
  GET_ALL_OWN_PRODUCT_BY_PL: "GET_ALL_OWN_PRODUCT_BY_PL",
  GET_ALL_OWN_PRODUCT_SOLD: "GET_ALL_OWN_PRODUCT_SOLD",
  SELL_PRODUCT: "SELL_PRODUCT",
  REPORT_PRODUCT: "REPORT_PRODUCT",
  MOVE_PRODUCT: "MOVE_PRODUCT",
};

export const TRANSPORT = {
  GET_ALL_TRANSPORT_RECEIVE: "GET_ALL_TRANSPORT_RECEIVE",
  GET_ALL_TRANSPORT_SEND: "GET_ALL_TRANSPORT_SEND",
  ACCEPT_PACKAGE: "ACCEPT_PACKAGE",
  ACCEPT_PRODUCT: "ACCEPT_PRODUCT",
};
