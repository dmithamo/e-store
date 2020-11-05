import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutUserSuccess } from '../../features/auth/utils/stateMgmt';
import Button from './Button';

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  function handleLogout() {
    // logout from api?
    sessionStorage.clear();
    history.push('/');
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
