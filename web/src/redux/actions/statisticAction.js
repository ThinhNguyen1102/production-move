import { ALERT, STATISTIC } from "../types";
import { getDataAPI } from "../../utils/fetchData";

export const getAllUnitInfomation =
  ({ auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getDataAPI(`statistics/admin/unit`, auth.token);

      dispatch({
        type: STATISTIC.GET_ALL_UNIT_INFO,
        payload: res.data.unitsByRole,
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

export const getAdminStatisticProduct =
  ({ auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getDataAPI(`statistics/admin/product`, auth.token);

      dispatch({
        type: STATISTIC.GET_ADMIN_STATISTIC_PRODUCT,
        payload: res.data.statisticProduct,
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

export const getAgentStatisticProduct =
  ({ auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getDataAPI(`statistics/agent/product`, auth.token);

      dispatch({
        type: STATISTIC.GET_AGENT_STATISTIC_PRODUCT,
        payload: res.data.statisticProduct,
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

export const getFactoryStatisticProduct =
  ({ auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getDataAPI(`statistics/factory/product`, auth.token);

      dispatch({
        type: STATISTIC.GET_FACTORY_STATISTIC_PRODUCT,
        payload: res.data.statisticProduct,
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

export const getCenterStatisticProduct =
  ({ auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getDataAPI(`statistics/center/product`, auth.token);

      dispatch({
        type: STATISTIC.GET_CENTER_STATISTIC_PRODUCT,
        payload: res.data.statisticProduct,
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
