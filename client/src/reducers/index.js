import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import movie from "./movie";
import comment from "./comment";

export default combineReducers({
  alert,
  auth,
  movie,
  comment
});
