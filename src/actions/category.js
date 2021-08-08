import axios from "axios";

const api = process.env.REACT_APP_BACKEND_URL;

export const getCategoriesAction = (token) => async (dispatch) => {
  dispatch({ type: "GET_CATEGORIES_REQUEST" });
  try {
    const response = await axios.get(`${api}/category`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "GET_CATEGORIES_SUCCESS", payload: response.data });
  } catch (err) {
    dispatch({ type: "GET_CATEGORIES_FAILED", payload: err });
  }
};

export const getCategoryAction = (token, cid) => async (dispatch) => {
  dispatch({ type: "GET_CATEGORY_REQUEST" });
  try {
    const response = await axios.get(`${api}/category/${cid}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "GET_CATEGORY_SUCCESS", payload: response.data });
  } catch (err) {
    dispatch({ type: "GET_CATEGORY_FAILED", payload: err });
  }
};

export const updateCategoryAction =
  (token, cid, updates) => async (dispatch, getState) => {
    dispatch({ type: "UPDATE_CATEGORY_REQUEST" });
    try {
      const response = await axios.post(`${api}/category/${cid}`, {
        data: { ...updates },
        headers: { Authorization: `Bearer ${token}` },
      });
      const categories = getState().categories.categories;
      dispatch({ type: "UPDATE_CATEGORY_SUCCESS", payload: response.data });
    } catch (err) {
      dispatch({ type: "UPDATE_CATEGORY_FAILED", payload: err });
    }
  };
