import axios from "axios";

const api = process.env.REACT_APP_BACKEND_URL;

export const getSkillsAction = (token, cid) => async (dispatch) => {
  dispatch({ type: "GET_SKILLS_REQUEST" });
  try {
    let skills;
    const storedSkills = localStorage.getItem("skills")
      ? JSON.parse(localStorage.getItem("skills"))
      : null;
    if (storedSkills) skills = storedSkills;
    else {
      const response = await axios.get(`${api}/skills?categoryId=${cid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      skills = {
        skills: response.data,
      };
      localStorage.setItem("skills", JSON.stringify(skills));
    }
    dispatch({ type: "GET_SKILLS_SUCCESS", payload: skills.skills });
  } catch (err) {
    dispatch({ type: "GET_SKILLS_FAILED", payload: err });
  }
};
