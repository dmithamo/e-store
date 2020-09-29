import { createSlice } from '@reduxjs/toolkit';

type AuthState = {
  email: string;
  phoneNumber: string;
  avatar: string;
  userID: string;
  isAuthenticated: boolean;
};

type AuthAction = {
  type: string;
  payload: {
    email: string;
    avatar: string;
    phoneNumber: string;
    userID: string;
  };
};

export const initialState: AuthState = {
  email: '',
  avatar: '',
  phoneNumber: '',
  userID: '',
  isAuthenticated: false,
};

const authState = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUserSuccess(state: AuthState, { payload }: AuthAction) {
      state.isAuthenticated = true;
      state.email = payload.email;
      state.avatar = payload.avatar;
      state.phoneNumber = payload.phoneNumber;
      state.userID = payload.userID;
    },

    logoutUserSuccess(state: AuthState) {
      state.isAuthenticated = false;
      state.email = initialState.email;
      state.avatar = initialState.avatar;
      state.phoneNumber = initialState.phoneNumber;
      state.userID = initialState.userID;
    },
  },
});

export const { loginUserSuccess, logoutUserSuccess } = authState.actions;
export default authState.reducer;
