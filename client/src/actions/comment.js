import {
  // GET_USER_COMMENT_SUCCESS,
  // GET_USER_COMMENT_FAIL,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAIL,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  UPDATE_LIKES_SUCCESS,
  UPDATE_LIKES_FAIL,
  GET_ALL_COMMENT_SUCCESS,
  GET_ALL_COMMENT_FAIL,
  UPDATE_COMMENT_FAIL,
  UPDATE_COMMENT_SUCCESS,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAIL
} from "./types";
import axios from "axios";

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

// export const getUserComment = id => async dispatch => {
//   try {
//     const res = await axios.get(`/api/comments/me/${id}`);
//     dispatch({
//       type: GET_USER_COMMENT_SUCCESS,
//       payload: res.data[0]
//     });
//   } catch (err) {
//     dispatch({
//       type: GET_USER_COMMENT_FAIL,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

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

export const getComment = id => async dispatch => {
  try {
    const res = await axios.get(`/api/comments/comment/${id}`);
    dispatch({
      type: GET_COMMENT_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_COMMENT_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addDis = ({ cmtId, text }) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({ text });
    const res = await axios.post(
      `/api/comments/comment/${cmtId}`,
      body,
      config
    );
    dispatch({
      type: UPDATE_COMMENT_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: UPDATE_COMMENT_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteDis = (cmtId, disId) => async dispatch => {
  try {
    const res = await axios.delete(`/api/comments/comment/${cmtId}/${disId}`);
    dispatch({
      type: UPDATE_COMMENT_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: UPDATE_COMMENT_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
