import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '../../common/components/Button';
import DropDownMenu from '../../common/components/DropDownMenu';
import { RootState } from '../../common/store/rootReducer';
import { logoutUserSuccess } from '../auth/utils/stateMgmt';

const UserAvatar: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { email } = useSelector((state: RootState) => state.auth);
  const icon = () => (
    <FontAwesomeIcon
      style={{ fontSize: '1.5em' }}
      icon={['far', 'user-circle']}
    />
  );

  function handleLogout() {
    // logout from api?
    sessionStorage.clear();
    dispatch(logoutUserSuccess());
  }

  return (
    <DropDownMenu icon={icon}>
      <p>{email}</p>
      <p>&lt;more user details here/&gt;</p>
      <Button
        category="link"
        onClick={() => {
          history.push('/profile');
        }}
      >
        <span>Profile</span>
        <FontAwesomeIcon icon="sign-out-alt" />
      </Button>
      <Button category="secondary" onClick={handleLogout}>
        <span>Logout</span>
        <FontAwesomeIcon icon="sign-out-alt" />
      </Button>
    </DropDownMenu>
  );
};

export default UserAvatar;
