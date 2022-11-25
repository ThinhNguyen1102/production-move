import { PACKAGE } from "../types";

const initialState = {
  packages: [],
};

const packageReducer = (state = initialState, action) => {
  switch (action.type) {
    case PACKAGE.CREATE_PACKAGE:
      return {
        ...state,
      };
    case PACKAGE.GET_ALL_PACKAGE_BY_UNIT:
      return {
        ...state,
        packages: action.payload,
      };
    default:
      return state;
  }
};

export default packageReducer;
