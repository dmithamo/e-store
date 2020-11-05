import { createSlice } from '@reduxjs/toolkit';

export interface User {
  email: string;
  mobileNumber: string;
  firstName: string;
  lastName: string;
  avatar: string;
  userID: string;
  address: string;
  roleId: 0 | 1 | 3; // 1: ADMIN 3: OTHERS
  created: Date;
  isVerified: boolean;
  isLoggedIn: boolean;
}

interface AuthState {
  user: User;
  isRegistered: boolean;
  error: any;
}

type AuthAction = {
  type: string;
  payload: any;
};

export const initialState: AuthState = {
  user: {
    email: '',
    mobileNumber: '',
    firstName: '',
    lastName: '',
    avatar: '',
    userID: '',
    address: '',
    roleId: 0,
    created: new Date(),
    isVerified: false,
    isLoggedIn: false,
  },
  isRegistered: false,
  error: false,
};

const authState = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUserSuccess(state: AuthState, { payload }: AuthAction) {
      state.isRegistered = true;
      state.user = payload;
    },

    registerUserFail(state: AuthState, { payload }: AuthAction) {
      state.error = payload;
    },

    verifyAccountSuccess(state: AuthState, { payload }: AuthAction) {
      state.user.isVerified = true;
      state.user.email = payload;
      state.error = false;
    },

    verifyAccountFail(state: AuthState, { payload }: AuthAction) {
      state.error = payload;
    },

    verifyAccountCancel(state: AuthState) {
      state.user = initialState.user;
      state.isRegistered = false;
    },

    loginUserSuccess(state: AuthState, { payload }: AuthAction) {
      state.user = payload;
      state.user.isLoggedIn = true;
    },

    loginUserFailure(state: AuthState, { payload }: AuthAction) {
      state.error = payload;
    },

    logoutUserSuccess(state: AuthState) {
      state.user = initialState.user;
    },

    clearFormErrs(state: AuthState) {
      state.error = initialState.error;
    },
  },
});

export const {
  registerUserSuccess,
  registerUserFail,
  verifyAccountSuccess,
  loginUserSuccess,
  loginUserFailure,
  logoutUserSuccess,
  verifyAccountFail,
  verifyAccountCancel,
  clearFormErrs,
} = authState.actions;

export default authState.reducer;
