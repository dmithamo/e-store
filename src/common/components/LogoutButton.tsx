import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUserSuccess } from '../../features/auth/utils/stateMgmt';
import Button from './Button';

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();

  function handleLogout() {
    // logout from api?
    sessionStorage.clear();
    dispatch(logoutUserSuccess());
  }

  return (
    <Button category="secondary" onClick={handleLogout}>
      <span>Logout</span>
      <FontAwesomeIcon icon="sign-out-alt" />
    </Button>
  );
};

export default LogoutButton;
