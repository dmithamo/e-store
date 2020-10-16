import React from 'react';
import styled from 'styled-components';
import { TableActions, TableColumn, TableData } from './types';

type ActionsModalProps = {
  actions: TableActions;
  columns: TableColumn;
  item: TableData;
};

const ActionsModal: React.FC<ActionsModalProps> = ({
  actions,
  columns,
  item,
}: ActionsModalProps): JSX.Element => (
  <StyledActionsModal>what have YOU</StyledActionsModal>
);

const StyledActionsModal = styled.div``;

export default ActionsModal;
