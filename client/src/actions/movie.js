import axios from "axios";
import {
  DB_MOVIE_FAIL,
  DB_MOVIE_SUCCESS,
  NO_MOVIES,
  GET_ONE_MOVIE_FAIL,
  GET_ONE_MOVIE_SUCCESS,
  LIKE_MOVIE_SUCCESS,
  LIKE_MOVIE_FAIL,
  UNLIKE_MOVIE_SUCCESS,
  UNLIKE_MOVIE_FAIL,
  WISH_MOVIE_SUCCESS,
  WISH_MOVIE_FAIL,
  UNWISH_MOVIE_SUCCESS,
  UNWISH_MOVIE_FAIL
} from "./types";

import { loadUser } from "./auth";

// load Dashboard movies
export const getDBMovies = arr => async dispatch => {
  if (arr.length === 0) {
    dispatch({
      type: NO_MOVIES
    });
  }
  if (localStorage.token) {
    delete axios.defaults.headers.common["x-auth-token"];
  }
  let movieIds = [];
  Array.from(arr).forEach(movie => {
    movieIds.push(movie.movieId);
  });
  const promises = movieIds.map(id =>
    axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=57597e10d2a4be7b31ce5f3098929194&language=en-US`
    )
  );
  try {
    const results = await axios.all(promises);
    const movies = results.map(item => item.data);
    dispatch({
      type: DB_MOVIE_SUCCESS,
      payload: movies
    });
  } catch (err) {
    dispatch({
      type: DB_MOVIE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
  if (localStorage.token) {
    axios.defaults.headers.common["x-auth-token"] = localStorage.token;
  }
};

export const getOneMovie = id => async dispatch => {
  if (localStorage.token) {
    delete axios.defaults.headers.common["x-auth-token"];
  }
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=57597e10d2a4be7b31ce5f3098929194&language=en-US`
    );
    dispatch({
      type: GET_ONE_MOVIE_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_ONE_MOVIE_FAIL,
      payload: err
    });
  }
  if (localStorage.token) {
    axios.defaults.headers.common["x-auth-token"] = localStorage.token;
  }
};

export const likeAMovie = id => async dispatch => {
  try {
    const res = await axios.put(`/api/users/likedmovies/${id}`);
    await dispatch(getDBMovies(res));
    dispatch({
      type: LIKE_MOVIE_SUCCESS
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    dispatch({
      type: LIKE_MOVIE_FAIL,
      payload: err
    });
  }
};
export const unlikeAMovie = id => async dispatch => {
  try {
    const res = await axios.put(`/api/users/likedmovies/remove/${id}`);
    await dispatch(getDBMovies(res));
    dispatch({
      type: UNLIKE_MOVIE_SUCCESS
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    dispatch({
      type: UNLIKE_MOVIE_FAIL,
      payload: err
    });
  }
};
export const wishAMovie = id => async dispatch => {
  try {
    const res = await axios.put(`/api/users/watchlater/${id}`);
    await dispatch(getDBMovies(res));
    dispatch({
      type: WISH_MOVIE_SUCCESS
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    dispatch({
      type: WISH_MOVIE_FAIL,
      payload: err
    });
  }
};
export const unwishAMovie = id => async dispatch => {
  try {
    const res = await axios.put(`/api/users/watchlater/remove/${id}`);
    await dispatch(getDBMovies(res));
    dispatch({
      type: UNWISH_MOVIE_SUCCESS
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    dispatch({
      type: UNWISH_MOVIE_FAIL,
      payload: err
    });
  }
};
