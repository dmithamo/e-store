import { createSlice } from '@reduxjs/toolkit';

type AuthState = {
  email: string;
  phoneNumber: string;
  avatar: string;
  userID: string;
  isAuthenticated: boolean;
  isRegistered: boolean;
  isConfirmed: boolean;
  error: any;
};

type AuthAction = {
  type: string;
  // payload: {
  //   email: string;
  //   phoneNumber: string;
  //   avatar?: string;
  //   userID?: string;
  // };
  payload: any;
};

export const initialState: AuthState = {
  email: '',
  avatar: '',
  phoneNumber: '',
  userID: '',
  isAuthenticated: false,
  isRegistered: false,
  isConfirmed: false,
  error: false,
};

const authState = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUserSuccess(state: AuthState, { payload }: AuthAction) {
      state.isRegistered = true;
      state.email = payload.email;
    },

    registerUserFail(state: AuthState, { payload }: AuthAction) {
      state.error = payload;
    },

    confirmAccountSuccess(state: AuthState, { payload }: AuthAction) {
      state.isConfirmed = true;
      state.email = payload.email;
    },

    loginUserSuccess(state: AuthState, { payload }: AuthAction) {
      state.isAuthenticated = true;
      state.email = payload.email;
      state.avatar = payload.avatar || '';
      state.phoneNumber = payload.phoneNumber;
      state.userID = payload.userID || '';
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

export const {
  registerUserSuccess,
  registerUserFail,
  confirmAccountSuccess,
  loginUserSuccess,
  logoutUserSuccess,
} = authState.actions;

export default authState.reducer;
