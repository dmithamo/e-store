import { createSlice } from '@reduxjs/toolkit';

type authStateStructure = {
  username: string;
  avatar: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  errors: any[];
};

export const initialState: authStateStructure = {
  username: '',
  avatar: '',
  isLoading: false,
  isAuthenticated: false,
  errors: [],
};

const authState = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    makeAuthRequest(state: authStateStructure) {
      state.isLoading = true;
    },
  },
});

export const { makeAuthRequest } = authState.actions;
export default authState.reducer;
