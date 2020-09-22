import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../../common/components/Button';
import { RootState } from '../../common/store/rootReducer';

const UserAvatar: React.FC = (): JSX.Element => {
  const { avatar, email, userID } = useSelector(
    (state: RootState) => state.auth,
  );
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <StyledUserAvatar>
      {showDropdown ? (
        <div className="user-icon">
          <Button
            category="link"
            onClick={() => {
              setShowDropdown(!showDropdown);
            }}
          >
            <img src={avatar} alt={email} />
          </Button>
        </div>
      ) : (
        <div className="dropdown-card">
          <span>{email}</span>
          <span>{userID}</span>
          <span>user icon here</span>
        </div>
      )}
    </StyledUserAvatar>
  );
};

const StyledUserAvatar = styled.div``;

export default UserAvatar;
