import { LIKED_MOVIE_FAIL, LIKED_MOVIE_SUCCESS } from "../actions/types";
import filterGenres from "../utils/filterGenres";

const initialState = {
  likedMovies: [],
  likedMoviesGenres: {},
  watchLater: [],
  currentResults: [],
  error: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LIKED_MOVIE_SUCCESS:
      return {
        ...state,
        likedMoviesGenres: filterGenres(payload),
        likedMovies: payload,
        loading: false
      };
    case LIKED_MOVIE_FAIL:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
