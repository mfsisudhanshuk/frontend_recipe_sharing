import axiosInstance from "./axiosInstance";
import { authActions } from "../store";
import { AppDispatch } from "../store";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// NOTE: Add auth service
export const loginUser = async (loginData: LoginData, dispatch: AppDispatch) => {
  try {
    const response = await axiosInstance.post("/auth/login", loginData);
   
    const token = response?.data?.data?.token;

    // Dispatch login action
    dispatch(authActions.login(token));

    return { success: true, message: "Login successful" };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Error during login";
    return { success: false, message: errorMessage };
  }
};



export const registerUser = async (userData: RegisterData) => {
  try {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  } catch (error: any) {
    // Check if the error response contains validation errors
    if (error.response && error.response.data.errors) {
      const emailError = error.response.data.errors.find(
        (err: { path: string; msg: string }) => err.path === "email" && err.msg === "Email already in use"
      );

      if (emailError) {
        throw new Error(emailError.msg);
      }
    }
    // General error fallback
    throw new Error(error.response ? error.response.data.errors || 'Error registering user' : 'Error registering user');
  }
};

