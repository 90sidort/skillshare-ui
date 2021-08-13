import axios from "axios";
import { createURL } from "../utils/createUrl";
import getErrorMessage from "../utils/errorMessage";

import { checkStorage, saveToStorage } from "../utils/storage";

const api = process.env.REACT_APP_BACKEND_URL;

export const addSkillsAction = (token, update) => async (dispatch) => {
  dispatch({ type: "ADD_SKILLS_REQUEST" });
  try {
    await axios({
      method: "POST",
      url: `${api}/skills`,
      data: { ...update },
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: "ADD_SKILLS_SUCCESS",
    });
  } catch (err) {
    const message = getErrorMessage(err.response);
    dispatch({ type: "ADD_SKILLS_FAILED", payload: message });
    throw new Error(message);
  }
};

export const getSkillsAction =
  (token, search) => async (dispatch, getState) => {
    dispatch({ type: "GET_SKILLS_REQUEST" });
    const url = createURL(search);
    const prevCid = getState().skills.cid;
    try {
      let skills;
      const storedSkills = localStorage.getItem("skills")
        ? JSON.parse(localStorage.getItem("skills"))
        : null;
      if (
        search.cid &&
        String(search.cid) === String(prevCid) &&
        storedSkills
      ) {
        skills = storedSkills;
      } else {
        const response = await axios.get(`${api}/skills${url}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        skills = {
          skills: response.data,
        };
        localStorage.setItem("skills", JSON.stringify(skills));
      }
      dispatch({
        type: "GET_SKILLS_SUCCESS",
        payload: { skills: skills.skills, cid: search.cid ? search.cid : null },
      });
    } catch (err) {
      dispatch({ type: "GET_SKILLS_FAILED", payload: err });
    }
  };
