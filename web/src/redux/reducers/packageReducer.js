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
    case PACKAGE.GET_ALL_PACKAGE_BY_PL_UNIT:
      return {
        ...state,
        packages: action.payload,
      };
    case PACKAGE.GET_ALL_PACKAGE_BY_UNIT:
      return {
        ...state,
        packages: action.payload,
      };
    case PACKAGE.MOVE_PACKAGE:
      return {
        ...state,
        packages: state.packages.filter(
          (pk) => pk.package_id !== action.payload.package_id
        ),
      };
    default:
      return state;
  }
};

export default packageReducer;
