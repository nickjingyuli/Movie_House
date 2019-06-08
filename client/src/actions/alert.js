import { SET_ALERT } from "./types";
import uuid from "uuid";

//setAlert is action creator. Then make the action as a thunk function which will be called
// use "dispatch" to dispatch new action
export const setAlert = (msg, alertType) => dispatch => {
  dispatch({
    type: SET_ALERT,
    payload: {
      msg,
      alertType
    }
  });
};
