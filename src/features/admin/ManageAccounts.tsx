import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../common/store/rootReducer';

const ManageAccounts: React.FC = (): JSX.Element => {
  const { users } = useSelector((state: RootState) => state.admin);
  return (
    <StyledManageAccounts>
      <h2>Users</h2>
      <pre>{JSON.stringify(users, null, 4)}</pre>
    </StyledManageAccounts>
  );
};

const StyledManageAccounts = styled.div``;

export default ManageAccounts;
