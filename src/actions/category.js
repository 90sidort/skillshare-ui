import axios from "axios";

const api = process.env.REACT_APP_BACKEND_URL;

export const getCategoriesAction = (token) => async (dispatch) => {
  dispatch({ type: "GET_CATEGORIES_REQUEST" });
  try {
    let categories;
    const storedCategories = localStorage.getItem("categories")
      ? JSON.parse(localStorage.getItem("categories"))
      : null;
    if (storedCategories) categories = storedCategories;
    else {
      const response = await axios.get(`${api}/category`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      categories = {
        categories: response.data,
      };
      localStorage.setItem("categories", JSON.stringify(categories));
    }
    dispatch({
      type: "GET_CATEGORIES_SUCCESS",
      payload: categories.categories,
    });
  } catch (err) {
    dispatch({ type: "GET_CATEGORIES_FAILED", payload: err });
  }
};

export const updateCategoryAction =
  (token, cid, updates) => async (dispatch, getState) => {
    dispatch({ type: "UPDATE_CATEGORY_REQUEST" });
    try {
      const response = await axios({
        method: "PATCH",
        url: `${api}/category/${cid}`,
        data: { ...updates },
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data === true) {
        const newCategories = getState().categories.categories;
        const updateIndex = newCategories.findIndex(
          (category) => category.id === parseInt(cid)
        );
        newCategories[updateIndex].name = updates.name;
        localStorage.setItem(
          "categories",
          JSON.stringify({ categories: newCategories })
        );
        dispatch({ type: "GET_CATEGORIES_SUCCESS", payload: newCategories });
      } else throw new Error();
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
