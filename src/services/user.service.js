import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000";

const getUsers = () => {
  return axios.get(API_URL + "/users", { headers: authHeader() });
};

const getUser = (id) => {
  return axios.get(API_URL + `/users/${id}`, { headers: authHeader() });
};

export default {
  getUsers,
  getUser,
};
