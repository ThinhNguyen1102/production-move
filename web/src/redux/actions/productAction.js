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
        payload: res.data.products,
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

export const getAllOwnProductSold =
  ({ auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getDataAPI(`products/sold/own`, auth.token);
      dispatch({
        type: PRODUCT.GET_ALL_OWN_PRODUCT_SOLD,
        payload: res.data.products,
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
        payload: res.data.product,
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

export const reportErrorProduct =
  ({ data, auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postDataAPI(`products/guarentee`, data, auth.token);
      console.log("res.data.soldStatusSaved: ", res.data.soldStatusSaved);
      dispatch({
        type: PRODUCT.REPORT_PRODUCT,
        payload: res.data.soldStatusSaved,
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

export const moveProduct =
  ({ data, auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postDataAPI(`products/move`, data, auth.token);
      console.log("res.data.soldStatusSaved: ", res.data.soldStatusSaved);
      dispatch({
        type: PRODUCT.MOVE_PRODUCT,
        payload: res.data.transportSaved,
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
