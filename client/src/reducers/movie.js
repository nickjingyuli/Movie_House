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
  GET_RATING_SUCCESS,
  GET_RATING_FAIL
} from "../actions/types";
import filterGenres from "../utils/filterGenres";

const initialState = {
  Movies: [],
  MoviesGenres: {},
  currentMovie: {},
  currentRating: null,
  error: {},
  loading: true,
  detailLoading: true,
  ratingLoading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case MOVIE_SUCCESS:
      return {
        ...state,
        MoviesGenres: filterGenres(payload),
        Movies: payload,
        loading: false
      };
    case MOVIE_FAIL:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case LIKE_MOVIE_SUCCESS:
    case UNLIKE_MOVIE_SUCCESS:
    case WISH_MOVIE_SUCCESS:
    case UNWISH_MOVIE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case LIKE_MOVIE_FAIL:
    case UNLIKE_MOVIE_FAIL:
    case WISH_MOVIE_FAIL:
    case UNWISH_MOVIE_FAIL:
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
    case GET_RATING_SUCCESS:
      return {
        ...state,
        currentRating: payload,
        ratingLoading: false
      };
    case GET_RATING_FAIL:
      return {
        ...state,
        currentRating: null,
        error: payload,
        ratingLoading: false
      };
    default:
      return state;
  }
}
