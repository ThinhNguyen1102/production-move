import { ALERT, PACKAGE } from "../types";
import { postDataAPI, getDataAPI, deleteDataAPI } from "../../utils/fetchData";

export const createPackage =
  ({ data, auth }) =>
  async (dispatch) => {
    console.log("PACKAGE: ", data);
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postDataAPI("products", data, auth.token);
      dispatch({
        type: PACKAGE.CREATE_PACKAGE,
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

export const getAllPackageByUnit =
  ({ data, auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getDataAPI(
        `packages/own/${data.productLineId}`,
        auth.token
      );
      dispatch({
        type: PACKAGE.GET_ALL_PACKAGE_BY_UNIT,
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

export const movePackage =
  ({ data, auth }) =>
  async (dispatch) => {
    console.log("PACKAGE: ", data);
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postDataAPI("packages/move", data, auth.token);
      dispatch({
        type: PACKAGE.MOVE_PACKAGE,
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
