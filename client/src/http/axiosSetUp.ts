import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

const PORT = 5000;
export const API_URL = `http://localhost:${PORT}`;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      const { data } = await axios.get<AuthResponse>(
        `${API_URL}/auth/refresh`,
        {
          withCredentials: true,
        }
      );

      localStorage.setItem("accessToken", data.accessToken);
      return $api.request(originalRequest);
    }
    throw error;
  }
);

export default $api;
