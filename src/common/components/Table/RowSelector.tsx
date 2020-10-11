import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store/rootReducer';
import CustomCheckBox from '../CustomCheckBox';
import { TableData, ALL_ROWS } from './types';
import {
  addToSelection,
  clearSelection,
  removeFromSelection,
  replaceSelection,
} from './utils/stateMgmt';

type RowSelectorProps = { row: any; allRows: TableData; title?: string };

const RowSelector: React.FC<RowSelectorProps> = ({
  row,
  allRows,
  title,
}: RowSelectorProps): JSX.Element => {
  const dispatch = useDispatch();
  const { tableSelection } = useSelector(
    (state: RootState) => state.tableSelection,
  );

  function handleSelectorClick() {
    switch (true) {
      case row === ALL_ROWS:
        dispatch(
          tableSelection.size === allRows.length
            ? clearSelection()
            : replaceSelection(new Set(allRows)),
        );
        break;

      case tableSelection.has(row):
        dispatch(removeFromSelection(row));
        break;

      default:
        dispatch(addToSelection(row));
    }
  }

  return (
    <StyledRowSelector title={title} onClick={handleSelectorClick}>
      <CustomCheckBox
        isChecked={
          tableSelection.has(row) || tableSelection.size === allRows.length
        }
      />
    </StyledRowSelector>
  );
};

RowSelector.defaultProps = {
  title: '',
};

const StyledRowSelector = styled.span``;

export default RowSelector;
