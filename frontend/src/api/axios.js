import axios from "axios";

const api = axios.create({
  baseURL: "https://life-log-8tmc-navg3p1y8-atiba-s-projects.vercel.app/api",
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("habitUser"));

  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

export default api;