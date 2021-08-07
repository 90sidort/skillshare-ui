import axios from "axios";

const api = process.env.REACT_APP_BACKEND_URL;

export const getSkills = (token) => async (dispatch) => {
  dispatch({ type: "GET_SKILLS_REQUEST" });
  try {
    const response = await axios.get(`${api}/category`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "GET_SKILLS_SUCCESS", payload: response.data });
  } catch (err) {
    dispatch({ type: "GET_SKILLS_FAILED", payload: err });
  }
};
