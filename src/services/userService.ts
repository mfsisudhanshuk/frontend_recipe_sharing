import axiosInstance from "./axiosInstance";

// NOTE: Add auth service
export const loginUser = async () => {
   
};


export const registerUser = async (userData: { name: string, email: string, password: string }) => {
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

