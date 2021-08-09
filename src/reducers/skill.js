const currentSkills = localStorage.getItem("skills")
  ? JSON.parse(localStorage.getItem("skills"))
  : null;

const initialState = {
  skills: currentSkills ? currentSkills.skills : [],
  skill: {},
  loading: false,
  error: null,
};

export const skills = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SKILLS_REQUEST":
      return {
        ...state,
        error: null,
        loading: true,
      };
    case "GET_SKILLS_SUCCESS":
      return {
        loading: false,
        skills: action.payload,
      };
    case "GET_SKILLS_FAILED":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
