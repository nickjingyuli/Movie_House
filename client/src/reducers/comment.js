import {
  GET_USER_COMMENT_FAIL,
  GET_USER_COMMENT_SUCCESS
} from "../actions/types";

const initialState = {
  userComment: null,
  allComments: [],
  error: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_COMMENT_SUCCESS:
      return {
        ...state,
        userComment: payload,
        loading: false
      };
    case GET_USER_COMMENT_FAIL:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
