import {
  // GET_USER_COMMENT_FAIL,
  // GET_USER_COMMENT_SUCCESS,
  POST_COMMENT_FAIL,
  POST_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_SUCCESS,
  UPDATE_LIKES_FAIL,
  UPDATE_LIKES_SUCCESS,
  GET_ALL_COMMENT_FAIL,
  GET_ALL_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAIL,
  UPDATE_COMMENT_SUCCESS,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAIL
} from "../actions/types";

const initialState = {
  // userComment: null,
  currComment: null,
  allComments: [],
  error: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_COMMENT_SUCCESS:
      return {
        ...state,
        allComments: payload,
        loading: false
      };
    case GET_ALL_COMMENT_FAIL:
      return {
        ...state,
        error: payload,
        loading: false
      };
    // case GET_USER_COMMENT_SUCCESS:
    //   return {
    //     ...state,
    //     userComment: payload,
    //     loading: false
    //   };
    // case GET_USER_COMMENT_FAIL:
    //   return {
    //     ...state,
    //     error: payload,
    //     loading: false
    //   };
    case POST_COMMENT_SUCCESS:
      return {
        ...state,
        userComment: payload,
        allComments: [payload, ...state.allComments],
        loading: false
      };
    case POST_COMMENT_FAIL:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        allComments: state.allComments.filter(cmt => cmt._id !== payload),
        loading: false
      };
    case DELETE_COMMENT_FAIL:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_LIKES_SUCCESS:
      return {
        ...state,
        allComments: state.allComments.map(cmt =>
          cmt._id === payload.id ? { ...cmt, likes: payload.likes } : cmt
        ),
        loading: false
      };
    case UPDATE_LIKES_FAIL:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        allComments: state.allComments.map(cmt =>
          cmt._id === payload.id ? { ...cmt, comments: payload.data } : cmt
        )
      };
    case UPDATE_COMMENT_FAIL:
      return {
        ...state,
        errors: payload,
        loading: false
      };
    case GET_COMMENT_SUCCESS:
      return {
        ...state,
        currComment: payload,
        loading: false
      };
    case GET_COMMENT_FAIL:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
