// services/authAxiosInstance.ts
import axios from "axios";
import { BASE_URL } from "../utils/constants";

// Create an authenticated Axios instance
export const authAxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor to include Bearer Token
authAxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor for 401 Unauthorized
authAxiosInstance.interceptors.response.use(
  (response: any) => {
    if (response?.data?.httpStatus === 401) {
      window.location.href = "/login";
    }
    return response;
  },
  (error) => {
    if (error.response?.httpStatus === 401) {
      // Redirect to login if not authenticated
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
