import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  userID: string;
};

export type InCartItem = {
  item: ShopItem;
  quantity: number;
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
    fetchItemsSuccess(
      state: ShopFrontState,
      { payload }: PayloadAction<{ [category: string]: ShopItem[] }>,
    ) {
      state.items = payload;
    },

    setSelectedCategory(
      state: ShopFrontState,
      { payload }: PayloadAction<any>,
    ) {
      state.selectedCategory = payload;
    },

    setSelectedItemID(state: ShopFrontState, { payload }: PayloadAction<any>) {
      state.selectedItemID = payload;
    },

    fetchItemsFailure(state: ShopFrontState, { payload }: PayloadAction<any>) {
      state.fetchError = payload;
    },

    addItemToCart(
      state: ShopFrontState,
      { payload }: PayloadAction<InCartItem>,
    ) {
      state.inCart = { ...state.inCart, [payload.item.name]: payload };
    },

    removeFromCart(
      state: ShopFrontState,
      { payload }: PayloadAction<InCartItem>,
    ) {
      if (state.inCart[payload.item.name].quantity === payload.quantity) {
        delete state.inCart[payload.item.name];
      } else {
        state.inCart[payload.item.name].quantity -= payload.quantity;
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
