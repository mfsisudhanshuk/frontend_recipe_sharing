import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLogin: boolean;
  token: string | null;
}

//NOTE: Initial state type
const initialState: AuthState = {
  isLogin: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
};

//NOTE: Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state: AuthState, action: PayloadAction<string>) {
      state.isLogin = true;
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logout(state: AuthState) {
      state.isLogin = false;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

// Export actions
export const authActions = authSlice.actions;

//NOTE: Preloaded state
const preloadedState = {
  auth: initialState,
};

//NOTE: Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//NOTE: Configure and export the store
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState,
});
