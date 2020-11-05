import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TableState = {
  tableSelection: Set<any>;
};

const initialState: TableState = {
  tableSelection: new Set(),
};

const tableState = createSlice({
  name: 'tableSelection',
  initialState,
  reducers: {
    addToSelection(state: TableState, { payload }: PayloadAction<any>) {
      state.tableSelection.add(payload);
    },
    removeFromSelection(state: TableState, { payload }: PayloadAction<any>) {
      state.tableSelection.delete(payload);
    },
    replaceSelection(state: TableState, { payload }: PayloadAction<any>) {
      state.tableSelection = payload;
    },
    clearSelection(state: TableState) {
      state.tableSelection.clear();
    },
  },
});

export const {
  addToSelection,
  removeFromSelection,
  clearSelection,
  replaceSelection,
} = tableState.actions;

export default tableState.reducer;
