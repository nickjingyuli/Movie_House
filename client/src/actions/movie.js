import axios from "axios";
import { LIKED_MOVIE_FAIL, LIKED_MOVIE_SUCCESS } from "./types";

// load liked movies
export const getLikedMovies = arr => async dispatch => {
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
      type: LIKED_MOVIE_SUCCESS,
      payload: movies
    });
  } catch (err) {
    dispatch({
      type: LIKED_MOVIE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
  if (localStorage.token) {
    axios.defaults.headers.common["x-auth-token"] = localStorage.token;
  }
};
