import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../auth/utils/stateMgmt';

type AdminState = {
  users: User[];
  fetchError: any;
  updateError: any;
};

type AdminAction = {
  type: string;
  payload: any;
};

export const initialState: AdminState = {
  users: [],
  fetchError: false,
  updateError: false,
};

const adminState = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    fetchItemsSuccess(state: AdminState, { payload }: AdminAction) {
      state.users = payload;
    },

    fetchItemsFailure(state: AdminState, { payload }) {
      state.fetchError = payload;
    },

    updateUserSuccess(state: AdminState, { payload }: AdminAction) {
      state.users = state.users.map((u) =>
        u.userID === payload.userID ? u : { ...u, ...payload.update },
      );
    },

    updateUserFailure(state: AdminState, { payload }: AdminAction) {
      state.updateError = payload;
    },
  },
});

export const { fetchItemsSuccess, fetchItemsFailure } = adminState.actions;

export default adminState.reducer;
