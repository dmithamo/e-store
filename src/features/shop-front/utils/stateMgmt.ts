import { createSlice } from '@reduxjs/toolkit';

type ShopFrontState = {
  items: { [category: string]: ShopItem[] };

  selectedCategory?: string;
  selectedItemID?: string;

  inCart: { [itemID: string]: InCartItem };
  fetchError: any;
};

export type ShopItem = {
  id: string;
  name: string;
  rate: number;
  category: string;
  quantityAvailable: number;
  dateAvailable: Date;
  img: string;
};

export type InCartItem = {
  item: ShopItem;
  quantity: number;
};

type ShopFrontAction = {
  type: string;
  payload: any;
};

export const initialState: ShopFrontState = {
  items: {},
  selectedCategory: '',
  selectedItemID: '',
  inCart: {},
  fetchError: false,
};

const shopFrontState = createSlice({
  name: 'shopFront',
  initialState,
  reducers: {
    fetchItemsSuccess(state: ShopFrontState, { payload }: ShopFrontAction) {
      state.items = payload;
    },

    setSelectedCategory(state: ShopFrontState, { payload }: ShopFrontAction) {
      state.selectedCategory = payload;
    },

    setSelectedItemID(state: ShopFrontState, { payload }: ShopFrontAction) {
      state.selectedItemID = payload;
    },

    fetchItemsFailure(state: ShopFrontState, { payload }) {
      state.fetchError = payload;
    },

    addItemToCart(state: ShopFrontState, { payload }) {
      state.inCart = { ...state.inCart, [payload.name]: payload.item };
    },

    removeFromCart(state: ShopFrontState, { payload }: ShopFrontAction) {
      if (state.inCart[payload.name].quantity === payload.quantity) {
        delete state.inCart[payload.name];
      } else {
        state.inCart[payload.name].quantity -= payload.quantity;
      }
    },
  },
});

export const {
  fetchItemsSuccess,
  fetchItemsFailure,
  addItemToCart,
  removeFromCart,
  setSelectedCategory,
  setSelectedItemID,
} = shopFrontState.actions;

export default shopFrontState.reducer;
