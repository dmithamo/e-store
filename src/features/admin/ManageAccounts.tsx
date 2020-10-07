import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ErrorPage from '../../common/components/ErrorPage';
import { RootState } from '../../common/store/rootReducer';
import { fetchUsers } from './utils/businessLogic';
import { fetchUsersSuccess, fetchUsersFailure } from './utils/stateMgmt';

const ManageAccounts: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false);
  const { users, fetchError } = useSelector((state: RootState) => state.admin);

  useEffect(() => {
    async function fetchHelper() {
      setIsloading(true);
      const [isFetchedSuccessfully, res] = await fetchUsers();
      if (isFetchedSuccessfully) {
        dispatch(fetchUsersSuccess(res));
        setIsloading(false);
      } else {
        dispatch(fetchUsersFailure(res));
        setIsloading(false);
      }
    }

    fetchHelper();
  }, []);

  if (isLoading) {
    return <p>Fetching users...</p>;
  }

  if (fetchError) {
    return <ErrorPage error={fetchError} />;
  }

  return (
    <StyledManageAccounts>
      <h2>Users</h2>
      <pre>{JSON.stringify(users, null, 4)}</pre>
    </StyledManageAccounts>
  );
};

const StyledManageAccounts = styled.div``;

export default ManageAccounts;
