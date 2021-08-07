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
