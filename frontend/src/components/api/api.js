import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-memory-game-git-main-tayyabs-projects-9d235f55.vercel.app/api",
});

API.interceptors.request.use((config) => {
  const userdata = JSON.parse(localStorage.getItem("userdata"));
  if (userdata?.token) {
    config.headers.Authorization = `Bearer ${userdata.token}`;
  }
  return config;
});

export default API;
