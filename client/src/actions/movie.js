import axios from "axios";
import {
  DB_MOVIE_FAIL,
  DB_MOVIE_SUCCESS,
  NO_MOVIES,
  GET_ONE_MOVIE_FAIL,
  GET_ONE_MOVIE_SUCCESS
} from "./types";

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
  arr.forEach(movie => {
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
