import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import { categories } from "./category";

export default combineReducers({
  auth,
  categories,
  message,
});
