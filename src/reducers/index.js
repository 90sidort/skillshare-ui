import { combineReducers } from "redux";

import { categories } from "./category";
import { authentication } from "./authentication";

export default combineReducers({
  authentication,
  categories,
});
