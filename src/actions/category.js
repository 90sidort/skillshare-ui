import axios from "axios";
import getErrorMessage from "../utils/errorMessage";

import { checkStorage, saveToStorage } from "../utils/storage";

const api = process.env.REACT_APP_BACKEND_URL;

export const addCategoryAction =
  (token, update) => async (dispatch, getState) => {
    dispatch({ type: "ADD_CATEGORY_REQUEST" });
    try {
      const response = await axios({
        method: "POST",
        url: `${api}/category`,
        data: { ...update },
        headers: { Authorization: `Bearer ${token}` },
      });
      const storedCategories = checkStorage("categories");
      storedCategories.categories.push({
        id: response.data.id,
        name: response.data.name,
        skillCount: 0,
      });
      saveToStorage("categories", { categories: storedCategories.categories });
      dispatch({
        type: "GET_CATEGORIES_SUCCESS",
        payload: storedCategories.categories,
      });
    } catch (err) {
      const message = getErrorMessage(err.response);
      dispatch({ type: "GET_CATEGORIES_FAILED", payload: message });
      throw new Error(message);
    }
  };

export const getCategoriesAction = (token) => async (dispatch) => {
  dispatch({ type: "GET_CATEGORIES_REQUEST" });
  try {
    let categories;
    const storedCategories = checkStorage("categories");
    if (storedCategories) categories = storedCategories;
    else {
      const response = await axios.get(`${api}/category`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      categories = {
        categories: response.data,
      };
      saveToStorage("categories", categories);
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
        saveToStorage("categories", { categories: newCategories });
        dispatch({ type: "GET_CATEGORIES_SUCCESS", payload: newCategories });
      } else throw new Error();
    } catch (err) {
      dispatch({ type: "GET_CATEGORIES_FAILED", payload: err });
    }
  };

export const deleteCategoryAction =
  (token, cid) => async (dispatch, getState) => {
    dispatch({ type: "DELETE_CATEGORY_REQUEST" });
    try {
      const response = await axios({
        method: "DELETE",
        url: `${api}/category/${cid}`,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 204) {
        const oldCategories = getState().categories.categories;
        const newCategories = oldCategories.filter(
          (category) => category.id !== parseInt(cid)
        );
        saveToStorage("categories", { categories: newCategories });
        dispatch({ type: "GET_CATEGORIES_SUCCESS", payload: newCategories });
      } else throw new Error();
    } catch (err) {
      dispatch({ type: "GET_CATEGORIES_FAILED", payload: err });
    }
  };
