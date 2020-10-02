import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../common/store/rootReducer';
import defaultAvatar from '../../assets/img/default-avatar.png';

export type ProfileProps = {};

const ProfilePage: React.FC<ProfileProps> = (): JSX.Element => {
  const {
    email,
    userID,
    firstName,
    lastName,
    phoneNumber,
    avatar,
  } = useSelector((state: RootState) => state.auth);
  const fullName = `${firstName || 'John'} ${lastName || 'Lark'}`;
  return (
    <StyledProfile>
      <div className="container">
        <p>
          <img
            src={avatar === '' ? defaultAvatar : avatar}
            alt="user avatar here"
          />
        </p>
        <p>{fullName}</p>
        <p>{email}</p>
        <p>{phoneNumber || '+254711223344'}</p>
        <p>{userID || '000-111-222-333-555'}</p>
      </div>
    </StyledProfile>
  );
};

const StyledProfile = styled.div`
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3em;
  img {
    width: 200px;
    height: auto;
    border-radius: 50%;
    padding: 1em;
    border: 2px solid black;
  }

  div.container {
    width: 95%;
    height: 80vh;
    border-radius: 20px;
    margin: auto;
    background-color: var(--offWhite);
    box-shadow: 0 0 2px 2px var(--lightGrey);
    padding: 1.5em;
  }
`;

export default ProfilePage;
