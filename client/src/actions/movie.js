import axios from "axios";
import {
  MOVIE_FAIL,
  MOVIE_SUCCESS,
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
  UNWISH_MOVIE_FAIL,
  GET_RATING_FAIL,
  GET_RATING_SUCCESS
} from "./types";

import { loadUser } from "./auth";

// load Dashboard movies
export const getMovies = arr => async dispatch => {
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
      type: MOVIE_SUCCESS,
      payload: movies
    });
  } catch (err) {
    dispatch({
      type: MOVIE_FAIL,
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
    dispatch({
      type: GET_ONE_MOVIE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
  if (localStorage.token) {
    axios.defaults.headers.common["x-auth-token"] = localStorage.token;
  }
};

export const likeAMovie = id => async dispatch => {
  try {
    const res = await axios.put(`/api/users/likedmovies/${id}`);
    await dispatch(getMovies(res));
    dispatch({
      type: LIKE_MOVIE_SUCCESS
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: LIKE_MOVIE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const unlikeAMovie = id => async dispatch => {
  try {
    const res = await axios.put(`/api/users/likedmovies/remove/${id}`);
    await dispatch(getMovies(res));
    dispatch({
      type: UNLIKE_MOVIE_SUCCESS
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: UNLIKE_MOVIE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const wishAMovie = id => async dispatch => {
  try {
    const res = await axios.put(`/api/users/watchlater/${id}`);
    await dispatch(getMovies(res));
    dispatch({
      type: WISH_MOVIE_SUCCESS
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: WISH_MOVIE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const unwishAMovie = id => async dispatch => {
  try {
    const res = await axios.put(`/api/users/watchlater/remove/${id}`);
    await dispatch(getMovies(res));
    dispatch({
      type: UNWISH_MOVIE_SUCCESS
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: UNWISH_MOVIE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get current movie rating
export const getRating = id => async dispatch => {
  try {
    const res = await axios.get(`/api/movie-rating/${id}`);
    dispatch({
      type: GET_RATING_SUCCESS,
      payload: res.data.avgRating
    });
  } catch (err) {
    dispatch({
      type: GET_RATING_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get popular movies
export const getPopMovies = () => async dispatch => {
  if (localStorage.token) {
    delete axios.defaults.headers.common["x-auth-token"];
  }
  const pages = [1, 2, 3, 4, 5];

  const promises = pages.map(page =>
    axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=57597e10d2a4be7b31ce5f3098929194&language=en-US&page=${page}`
    )
  );
  try {
    const results = await axios.all(promises);
    const movies = results.map(item => item.data.results).flat();
    dispatch({
      type: MOVIE_SUCCESS,
      payload: movies
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: MOVIE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
  if (localStorage.token) {
    axios.defaults.headers.common["x-auth-token"] = localStorage.token;
  }
};
