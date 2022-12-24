import { REQUEST } from "../types";

const initialState = {
  requests: [],
};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST.GET_ALL_REQUEST_RECEIVE:
      return {
        ...state,
        requests: action.payload,
      };
    case REQUEST.GET_ALL_REQUEST_SEND:
      return {
        ...state,
        requests: action.payload,
      };
    case REQUEST.CREATE_REQUEST:
      return {
        ...state,
        requests: [...state.requests, action.payload],
      };
    default:
      return state;
  }
};

export default requestReducer;
