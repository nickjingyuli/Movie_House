import axios from "axios";
import { LIKED_MOVIE_FAIL, LIKED_MOVIE_SUCCESS } from "./types";

// load liked movies
export const getLikedMovies = () => async dispatch => {
  // const allLikeIds = auth.user.likedMovies.forEach(movie => movie.movieId);
  try {
    const res = await axios.get("/api/profile/me");
  } catch (err) {}
};
