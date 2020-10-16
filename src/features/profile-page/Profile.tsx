import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../common/store/rootReducer';
import defaultAvatar from '../../assets/img/default-avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../common/components/Button';
import LogoutButton from '../../common/components/LogoutButton';
import ProfileHistory from './ProfileHistory';
import EditProfile from './EditProfile';

export type ProfileProps = {};

const ProfilePage: React.FC<ProfileProps> = (): JSX.Element => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const {
    user: { email, firstName, lastName, phoneNumber, avatar, created },
  } = useSelector((state: RootState) => state.auth);
  const fullName = `${firstName} ${lastName}`;
  return (
    <StyledProfile>
      <div className="container">
        <div className="user-info">
          <div className="prof-pic">
            <img
              src={avatar === '' ? defaultAvatar : avatar}
              alt="user avatar here"
            />
            <h2 className="username">{fullName}</h2>
          </div>
          <div className="meta-data">
            <p className="meta-item">
              <FontAwesomeIcon icon="envelope-open" />
              <span>{email}</span>
            </p>
            <p className="meta-item">
              <FontAwesomeIcon icon="mobile-alt" />
              <span>{phoneNumber || '+254711223344'}</span>
            </p>
            <p className="meta-item">
              <FontAwesomeIcon icon="calendar-alt" />
              <span>
                Since&nbsp;
                {created.toDateString()}
              </span>
            </p>
          </div>

          <div className="actions">
            <Button
              category="primary"
              onClick={() => {
                setIsEditingProfile(!isEditingProfile);
              }}
            >
              <span>{isEditingProfile ? 'Back' : 'Edit profile'}</span>
              <FontAwesomeIcon
                icon={isEditingProfile ? 'arrow-left' : 'arrow-right'}
              />
            </Button>
            <LogoutButton />
          </div>
        </div>
        <div className="main-container">
          {isEditingProfile ? <EditProfile /> : <ProfileHistory />}
        </div>
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
  background-color: var(--grey);
  img {
    width: 200px;
    height: auto;
    border-radius: 50%;
    padding: 1em;
  }

  div.container {
    background-color: var(--white);
    color: var(--black);
    width: 80%;
    height: 80vh;
    border-radius: 20px;
    margin: auto;
    box-shadow: var(--subtleShadow);

    display: flex;

    div.main-container,
    div.user-info {
      padding: 2em;
    }

    div.user-info {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      div {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
      }

      div.prof-pic {
        justify-content: center;
        align-items: center;
        .username {
          font-size: 1.6em;
          font-family: var(--primaryBold);
        }
      }

      div.meta-data {
        padding: 1.5em;
        background-color: var(--lightGrey);

        p.meta-item {
          padding: 0.75em 0;
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-size: 1.1em;

          svg {
            font-size: 1.2em;
            width: 20px;
            margin: auto;
            margin-right: 0.2em;
            color: var(--primaryBlueDarker);
          }

          span {
            font-weight: bold;
            flex-grow: 1;
          }
        }
      }

      div.actions {
        button:first-of-type {
          margin-bottom: 2em;
        }
      }
    }

    div.main-container {
      background-color: var(--lightGrey);
      flex-grow: 1;
      border-radius: 0 20px 20px 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default ProfilePage;
