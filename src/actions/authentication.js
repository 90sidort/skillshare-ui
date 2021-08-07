import axios from "axios";
import getErrorMessage from "../utils/errorMessage";

const api = process.env.REACT_APP_BACKEND_URL;

export const registerUserAction = (user) => async (dispatch) => {
  dispatch({ type: "REGISTER_USER_REQUEST" });
  try {
    const response = await axios.post(`${api}/users/signup`, { ...user });
    dispatch({ type: "REGISTER_USER_SUCCESS", payload: response.data });
  } catch (err) {
    const message = getErrorMessage(err.response);
    dispatch({
      type: "REGISTER_USER_FAILED",
      payload: message,
    });
  }
};

export const loginUserAction = (user) => async (dispatch) => {
  dispatch({ type: "LOGIN_USER_REQUEST" });
  try {
    const response = await axios.post(`${api}/users/signin`, { ...user });
    dispatch({ type: "LOGIN_USER_SUCCESS", payload: response.data });
  } catch (err) {
    const message = getErrorMessage(err.response);
    dispatch({
      type: "LOGIN_USER_FAILED",
      payload: message,
    });
  }
};

export const logoutUserAction = () => (dispatch) => {
  dispatch({ type: "LOGOUT_USER_SUCCESS" });
};
