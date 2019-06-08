import { SET_ALERT } from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  if (type === SET_ALERT) {
    if (state.filter(alert => alert.msg === payload.msg).length === 0) {
      return [...state, payload];
    } else {
      return state;
    }
  } else {
    return state;
  }
}
