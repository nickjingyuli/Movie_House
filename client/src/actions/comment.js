import {
  GET_USER_COMMENT_SUCCESS,
  GET_USER_COMMENT_FAIL,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAIL,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  UPDATE_LIKES_SUCCESS,
  UPDATE_LIKES_FAIL,
  GET_ALL_COMMENT_SUCCESS,
  GET_ALL_COMMENT_FAIL
} from "./types";
import axios from "axios";
import store from "../store";
import { getRating } from "./movie";

export const getAllComments = movieId => async dispatch => {
  try {
    const res = await axios.get(`/api/comments/${movieId}`);
    dispatch({
      type: GET_ALL_COMMENT_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_COMMENT_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getUserComment = id => async dispatch => {
  try {
    const res = await axios.get(`/api/comments/me/${id}`);
    dispatch({
      type: GET_USER_COMMENT_SUCCESS,
      payload: res.data[0]
    });
  } catch (err) {
    dispatch({
      type: GET_USER_COMMENT_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
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
    store.dispatch(getRating(movieId));
  } catch (err) {
    dispatch({
      type: POST_COMMENT_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteAComment = id => async dispatch => {
  try {
    await axios.delete(`/api/comments/${id}`);
    dispatch({
      type: DELETE_COMMENT_SUCCESS,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: DELETE_COMMENT_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const likeAComment = id => async dispatch => {
  try {
    const res = await axios.put(`/api/comments/like/${id}`);
    dispatch({
      type: UPDATE_LIKES_SUCCESS,
      payload: { id: id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: UPDATE_LIKES_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const unlikeAComment = id => async dispatch => {
  try {
    const res = await axios.put(`/api/comments/unlike/${id}`);
    dispatch({
      type: UPDATE_LIKES_SUCCESS,
      payload: { id: id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: UPDATE_LIKES_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
