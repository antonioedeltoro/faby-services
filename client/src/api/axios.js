import axios from "axios";
import { getAuthToken } from "../utils/authToken";

const api = axios.create({
  baseURL: "/api",
});

// Automatically attach token if available
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
