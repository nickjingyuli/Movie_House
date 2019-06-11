import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import movie from "./movie";

export default combineReducers({
  alert,
  auth,
  movie
});
