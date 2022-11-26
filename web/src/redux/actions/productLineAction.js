import { ALERT, PRODUCT_LINE } from "../types";
import { postDataAPI, getDataAPI, deleteDataAPI } from "../../utils/fetchData";

export const createProductLine =
  ({ data, auth }) =>
  async (dispatch) => {
    console.log("PRODUCT_LINE: ", data);
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postDataAPI("productlines", data, auth.token);
      dispatch({
        type: PRODUCT_LINE.CREATE_PRODUCT_LINE,
        payload: res.data.newProductLine,
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

export const getAllProductLine =
  ({ auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getDataAPI(`productlines`, auth.token);
      dispatch({
        type: PRODUCT_LINE.GET_ALL_PRODUCT_LINE,
        payload: res.data.productLines,
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
export const getAllOwnProductLine =
  ({ auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getDataAPI(`productlines/own`, auth.token);
      dispatch({
        type: PRODUCT_LINE.GET_ALL_OWN_PRODUCT_LINE,
        payload: res.result.map((item) => ({
          ...item.productLine,
          quantity: item.amount,
        })),
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

export const deleteProductLineById =
  ({ id, auth }) =>
  async (dispatch) => {
    try {
      const res = await deleteDataAPI(`productlines/${id}`, auth.token);
      console.log(res);
      dispatch({
        type: PRODUCT_LINE.DELETE_PRODUCT_LINE,
        payload: id,
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
        payload: { error: err.response.data.msg },
      });
    }
  };
