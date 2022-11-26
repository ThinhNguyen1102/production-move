import { getDataAPI, postDataAPI } from "../../utils/fetchData";
import { ALERT, PRODUCT } from "../types";

export const getAllOwnProductByPl =
  ({ data, auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getDataAPI(
        `products/productline/${data.productLineId}`,
        auth.token
      );
      dispatch({
        type: PRODUCT.GET_ALL_OWN_PRODUCT_BY_PL,
        payload: res.result,
      });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err) {
      dispatch({
        type: ALERT,
        payload: {
          error: err.response.data.message,
        },
      });
    }
  };

export const sellProduct =
  ({ data, auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postDataAPI(`products/sell`, data, auth.token);
      dispatch({
        type: PRODUCT.SELL_PRODUCT,
        payload: res.result,
      });
      dispatch({
        type: ALERT,
        payload: {
          success: res.message,
        },
      });
    } catch (err) {
      dispatch({
        type: ALERT,
        payload: {
          error: err.response.data.message,
        },
      });
    }
  };
