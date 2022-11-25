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

    default:
      return state;
  }
};

export default packageReducer;
