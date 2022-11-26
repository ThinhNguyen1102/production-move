import { PRODUCT } from "../types";

const initialState = {
  products: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT.GET_ALL_OWN_PRODUCT_BY_PL:
      return {
        ...state,
        products: action.payload,
      };
    case PRODUCT.SELL_PRODUCT:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default productReducer;
