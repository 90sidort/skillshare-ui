import axios from "axios";

const API_URL = "http://localhost:3000";

const register = (username, name, surname, email, password, retype, about) => {
  return axios.post(API_URL + "/users/signup", {
    username,
    name,
    surname,
    email,
    password,
    retype,
    about,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "/users/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
