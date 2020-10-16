import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../auth/utils/stateMgmt';
import { ShopItem } from '../../shop-front/utils/stateMgmt';

type AdminState = {
  users: User[];
  products: ShopItem[];
  fetchError: any;
  updateError: any;
};

type AdminAction = {
  type: string;
  payload: any;
};

export const initialState: AdminState = {
  users: [],
  products: [],
  fetchError: false,
  updateError: false,
};

const adminState = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    fetchUsersSuccess(state: AdminState, { payload }: AdminAction) {
      state.users = payload;
    },

    fetchUsersFailure(state: AdminState, { payload }) {
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

    fetchProductsSuccess(state: AdminState, { payload }: AdminAction) {
      state.products = payload;
    },

    fetchProductsFailure(state: AdminState, { payload }) {
      state.fetchError = payload;
    },

    updateProductSuccess(state: AdminState, { payload }: AdminAction) {
      state.products = state.products.map((p) =>
        p.id === payload.id ? p : { ...p, ...payload.update },
      );
    },

    updateProductFailure(state: AdminState, { payload }: AdminAction) {
      state.updateError = payload;
    },
  },
});

export const {
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchProductsSuccess,
  fetchProductsFailure,
} = adminState.actions;

export default adminState.reducer;
