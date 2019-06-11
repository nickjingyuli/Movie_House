import { LIKED_MOVIE_FAIL, LIKED_MOVIE_SUCCESS } from "../actions/types";

const initialState = {
  likedMovies: [],
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
