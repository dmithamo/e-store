import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ErrorPage from '../../common/components/ErrorPage';
import Table from '../../common/components/Table';
import { RootState } from '../../common/store/rootReducer';
import { fetchUsers } from './utils/businessLogic';
import { fetchUsersSuccess, fetchUsersFailure } from './utils/stateMgmt';
import { format } from 'date-fns';

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

  const columns = [
    {
      Header: 'Internal ID',
      accessor: 'userID',
      modifier: (value: string) => value.slice(0, 8),
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'First Name',
      accessor: 'firstName',
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
    },
    {
      Header: 'Phone No.',
      accessor: 'phoneNumber',
    },
    {
      Header: 'User Type',
      accessor: 'role',
    },
    {
      Header: 'Member Since',
      accessor: 'created',
      modifier: (date: Date) => (
        <p title={date.toDateString()}>
          {/* {`${formatDistance(date, new Date())
            .replace('less than a minute', '< 1 min')
            .replace('minute', 'min')} ago`} */}
          {format(date, 'dd MMMM yyyy')}
        </p>
      ),
    },
    {
      Header: 'Verified?',
      accessor: 'isVerified',
      modifier: (value: boolean) => (value ? 'YES' : 'NOPE'),
    },
    {
      Header: 'Online?',
      accessor: 'isLoggedIn',
      modifier: (value: boolean) => (value ? 'ONLINE' : 'OFFLINE'),
    },
  ];
  return (
    <StyledManageAccounts>
      <h2>Users</h2>
      <Table tableColumns={columns} tableData={users} />
    </StyledManageAccounts>
  );
};

const StyledManageAccounts = styled.div``;

export default ManageAccounts;
