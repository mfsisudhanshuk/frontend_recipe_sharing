// src/utils/axiosInstance.ts
import axios from "axios";
import { BASE_URL } from "../utils/constants";


const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
