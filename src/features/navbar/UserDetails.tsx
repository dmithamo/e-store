import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import defaultAvatar from '../../assets/img/default-avatar.png';
import Button from '../../common/components/Button';
import DropDownMenu from '../../common/components/DropDownMenu';
import InlineImage from '../../common/components/InlineImage';
import LogoutButton from '../../common/components/LogoutButton';
import { RootState } from '../../common/store/rootReducer';

const UserDetails: React.FC = (): JSX.Element => {
  const history = useHistory();
  const {
    user: {
      email,
      firstName = 'Deniece',
      lastName = 'Muthoni',
      avatar,
      roleId,
    },
  } = useSelector((state: RootState) => state.auth);
  const fullName = `${firstName} ${lastName}`;
  const icon = () => <InlineImage src={avatar || defaultAvatar} size="small" />;

  const isAdmin = roleId === 1;
  return (
    <DropDownMenu icon={icon}>
      <InlineImage src={avatar || defaultAvatar} size="medium" />
      <h2 className="username">{fullName}</h2>
      <p className="email">{email}</p>
      {!isAdmin ? (
        <Button
          category="primary"
          onClick={() => {
            history.push('/profile');
          }}
        >
          <span>Profile</span>
          <FontAwesomeIcon icon="arrow-right" />
        </Button>
      ) : (
        <></>
      )}

      <LogoutButton />
    </DropDownMenu>
  );
};

export default UserDetails;
