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
