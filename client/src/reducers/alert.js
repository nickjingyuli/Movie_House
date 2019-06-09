import { SET_ALERT, CLEAR_ALERT } from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      if (state.filter(alert => alert.msg === payload.msg).length === 0) {
        return [...state, payload];
      } else {
        return state;
      }
    case CLEAR_ALERT:
      state = [];
      return state;
    default:
      return state;
  }
}
