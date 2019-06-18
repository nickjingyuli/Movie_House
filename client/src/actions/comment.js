import { GET_USER_COMMENT_SUCCESS, GET_USER_COMMENT_FAIL } from "./types";
import axios from "axios";

export const getUserComment = id => async dispatch => {
  try {
    const res = await axios.get(`/api/comments/me/${id}`);
    dispatch({
      type: GET_USER_COMMENT_SUCCESS,
      payload: res.data[0]
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_USER_COMMENT_FAIL,
      payload: err
    });
  }
};
