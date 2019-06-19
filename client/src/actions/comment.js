import {
  GET_USER_COMMENT_SUCCESS,
  GET_USER_COMMENT_FAIL,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAIL
} from "./types";
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

export const submitComment = ({
  movieId,
  text,
  movieRating
}) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({ movieId, text, movieRating });
    const res = await axios.post("/api/comments", body, config);
    dispatch({
      type: POST_COMMENT_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_COMMENT_FAIL,
      payload: err
    });
  }
};
