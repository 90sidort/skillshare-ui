import { combineReducers } from "redux";

import { categories } from "./category";
import { authentication } from "./authentication";
import { skills } from "./skill";

export default combineReducers({
  authentication,
  categories,
  skills,
});
