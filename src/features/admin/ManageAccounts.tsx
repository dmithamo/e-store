import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ErrorPage from '../../common/components/ErrorPage';
import Table from '../../common/components/Table';
import { RootState } from '../../common/store/rootReducer';
import { fetchUsers } from './utils/businessLogic';
import { fetchUsersSuccess, fetchUsersFailure } from './utils/stateMgmt';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      align: 'left',
      Header: 'Email',
      accessor: 'email',
      modifier: (value: string) => value.toLowerCase(),
    },
    {
      align: 'left',
      Header: 'Internal ID',
      accessor: 'userID',
      modifier: (value: string) => value.slice(0, 8),
    },
    {
      align: 'left',
      Header: 'First Name',
      accessor: 'firstName',
    },
    {
      align: 'left',
      Header: 'Last Name',
      accessor: 'lastName',
    },
    {
      align: 'left',
      Header: 'Phone No.',
      accessor: 'phoneNumber',
    },
    {
      align: 'center',
      Header: 'User Type',
      accessor: 'role',
      modifier: (value: string) => {
        const isAdmin = value === 'ADMIN';
        return (
          <span
            style={{
              fontWeight: 'bold',
              color: isAdmin ? 'red' : 'grey',
              fontSize: '1.2em',
            }}
          >
            <FontAwesomeIcon
              title={isAdmin ? 'Admin' : 'Standard user'}
              icon={isAdmin ? 'user-shield' : 'user-alt'}
            />
          </span>
        );
      },
    },
    {
      align: 'left',
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
      align: 'center',
      Header: 'Verified?',
      accessor: 'isVerified',
      modifier: (isVerified: boolean) => (
        <span
          style={{
            fontWeight: 'bold',
            color: isVerified ? 'green' : 'red',
            fontSize: '1.2em',
          }}
        >
          <FontAwesomeIcon
            title={isVerified ? 'Verified account' : 'Unverified account'}
            icon={isVerified ? 'check-circle' : 'minus-circle'}
          />
        </span>
      ),
    },
    {
      align: 'center',
      Header: 'Online?',
      accessor: 'isLoggedIn',
      modifier: (isLoggedIn: boolean) => (
        <span
          style={{
            fontWeight: 'bold',
            color: isLoggedIn ? 'green' : 'red',
            fontSize: '1.2em',
          }}
        >
          <FontAwesomeIcon
            title={isLoggedIn ? 'Online now' : 'Offline'}
            icon="dot-circle"
          />
        </span>
      ),
    },
  ];

  const actions = [];
  return (
    <StyledManageAccounts>
      <h2>Users</h2>
      <Table tableActions={actions} tableColumns={columns} tableData={users} />
    </StyledManageAccounts>
  );
};

const StyledManageAccounts = styled.div``;

export default ManageAccounts;
