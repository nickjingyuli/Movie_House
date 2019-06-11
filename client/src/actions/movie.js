import axios from "axios";
import { LIKED_MOVIE_FAIL, LIKED_MOVIE_SUCCESS } from "./types";

// load liked movies
export const getLikedMovies = arr => async dispatch => {
  const movies = [];
  const movieIds = [];
  arr.forEach(movie => {
    movieIds.push(movie.movieId);
  });

  try {
    for (const id of movieIds) {
      await (() => {
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${id}/?api_key=57597e10d2a4be7b31ce5f3098929194&language=en-US`
          )
          .then(res => {
            movies.push(res.data);
          });
      })();
    }
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
};
