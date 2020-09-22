import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import DropDownMenu from '../../common/components/DropDownMenu';
import { RootState } from '../../common/store/rootReducer';

const UserAvatar: React.FC = (): JSX.Element => {
  const { email } = useSelector((state: RootState) => state.auth);
  const icon = () => (
    <FontAwesomeIcon
      style={{ fontSize: '1.5em' }}
      icon={['far', 'user-circle']}
    />
  );
  return (
    <DropDownMenu icon={icon}>
      <p>{email}</p>
      <p>&lt;more user details here/&gt;</p>
      <p>&lt;logout button here/&gt;</p>
    </DropDownMenu>
  );
};

export default UserAvatar;
