import {
  DB_MOVIE_FAIL,
  DB_MOVIE_SUCCESS,
  NO_MOVIES,
  GET_ONE_MOVIE_FAIL,
  GET_ONE_MOVIE_SUCCESS
} from "../actions/types";
import filterGenres from "../utils/filterGenres";

const initialState = {
  DBMovies: [],
  DBMoviesGenres: {},
  currentMovie: {},
  error: {},
  loading: true,
  detailLoading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case DB_MOVIE_SUCCESS:
      return {
        ...state,
        DBMoviesGenres: filterGenres(payload),
        DBMovies: payload,
        loading: false
      };
    case DB_MOVIE_FAIL:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case NO_MOVIES:
      return {
        ...state,
        loading: false
      };
    case GET_ONE_MOVIE_SUCCESS:
      return {
        ...state,
        currentMovie: payload,
        detailLoading: false
      };
    case GET_ONE_MOVIE_FAIL:
      return {
        ...state,
        error: payload,
        detailLoading: false
      };
    default:
      return state;
  }
}
