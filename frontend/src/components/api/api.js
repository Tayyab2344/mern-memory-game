import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const userdata = JSON.parse(localStorage.getItem("userdata"));
  if (userdata?.token) {
    config.headers.Authorization = `Bearer ${userdata.token}`;
  }
  return config;
});

export default API;
