import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Avatar from '../../common/components/Avatar';
import Button from '../../common/components/Button';
import DropDownMenu from '../../common/components/DropDownMenu';
import { RootState } from '../../common/store/rootReducer';
import { logoutUserSuccess } from '../auth/utils/stateMgmt';

const UserDetails: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { email, firstName = 'John', lastName = 'Lark', avatar } = useSelector(
    (state: RootState) => state.auth,
  );
  const fullName = `${firstName} ${lastName}`;
  const icon = () => <Avatar size="small" />;

  function handleLogout() {
    // logout from api?
    sessionStorage.clear();
    dispatch(logoutUserSuccess());
  }

  return (
    <DropDownMenu icon={icon}>
      <Avatar src={avatar === '' ? undefined : avatar} size="medium" />
      <h2 className="username">{fullName}</h2>
      <p className="email">{email}</p>
      <Button
        category="primary"
        onClick={() => {
          history.push('/profile');
        }}
      >
        <span>Profile</span>
        <FontAwesomeIcon icon="arrow-right" />
      </Button>
      <Button category="secondary" onClick={handleLogout}>
        <span>Logout</span>
        <FontAwesomeIcon icon="sign-out-alt" />
      </Button>
    </DropDownMenu>
  );
};

export default UserDetails;
