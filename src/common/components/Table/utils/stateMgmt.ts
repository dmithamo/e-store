import { createSlice } from '@reduxjs/toolkit';

type TableState = {
  tableSelection: Set<any>;
};

type TableAction = {
  type: string;
  payload: any;
};

const initialState: TableState = {
  tableSelection: new Set(),
};

const tableState = createSlice({
  name: 'tableSelection',
  initialState,
  reducers: {
    addToSelection(state: TableState, { payload }: TableAction) {
      state.tableSelection.add(payload);
    },
    removeFromSelection(state: TableState, { payload }: TableAction) {
      state.tableSelection.delete(payload);
    },
    replaceSelection(state: TableState, { payload }: TableAction) {
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
