import { ALERT, REQUEST } from "../types";
import { getDataAPI, postDataAPI } from "../../utils/fetchData";

export const getAllRequestReceive =
  ({ auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getDataAPI(`requests/receive`, auth.token);

      dispatch({
        type: REQUEST.GET_ALL_REQUEST_RECEIVE,
        payload: res.data.requests,
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

export const getAllRequestSend =
  ({ auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getDataAPI(`requests/send`, auth.token);

      dispatch({
        type: REQUEST.GET_ALL_REQUEST_SEND,
        payload: res.data.requests,
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

export const createRequest =
  ({ data, auth }) =>
  async (dispatch) => {
    console.log("data: ", data);
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postDataAPI("requests", data, auth.token);
      dispatch({
        type: REQUEST.CREATE_REQUEST,
        payload: res.data.requestSaved,
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

export const acceptRequest =
  ({ data, auth }) =>
  async (dispatch) => {
    console.log("data: ", data);
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postDataAPI("requests/accept", data, auth.token);
      dispatch({
        type: REQUEST.ACCEPT_REQUEST,
        payload: res.data.requestSaved,
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
