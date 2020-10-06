import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import InlineImage from '../../common/components/InlineImage';
import Button from '../../common/components/Button';
import DropDownMenu from '../../common/components/DropDownMenu';
import LogoutButton from '../../common/components/LogoutButton';
import { RootState } from '../../common/store/rootReducer';
import defaultAvatar from '../../assets/img/default-avatar.png';

const UserDetails: React.FC = (): JSX.Element => {
  const history = useHistory();
  const {
    user: { email, firstName = 'Deniece', lastName = 'Muthoni', avatar },
  } = useSelector((state: RootState) => state.auth);
  const fullName = `${firstName} ${lastName}`;
  const icon = () => <InlineImage src={avatar || defaultAvatar} size="small" />;

  return (
    <DropDownMenu icon={icon}>
      <InlineImage src={avatar || defaultAvatar} size="medium" />
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

      <LogoutButton />
    </DropDownMenu>
  );
};

export default UserDetails;
