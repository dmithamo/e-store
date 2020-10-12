import styled from 'styled-components';
import React from 'react';
import { TableActions, TableColumn } from './types';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { removeFromSelection } from './utils/stateMgmt';

type GAProps = {
  actions: TableActions;
  data: any;
  primaryColumn: TableColumn;
  onClose: Function;
};

const GroupActionsContainer: React.FC<GAProps> = ({
  actions,
  data,
  primaryColumn,
  onClose,
}: GAProps): JSX.Element => {
  const dispatch = useDispatch();
  if (data.length === 0) onClose();
  return (
    <div
      style={{
        position: 'fixed',
        left: '0',
        top: '0',
        width: '100%',
        height: '100vh',
        background: 'var(--overlayBlack)',
        zIndex: 999,
      }}
    >
      <StyledGAContainer>
        <div className="header">
          <h2>{`${data.length} selected items `}</h2>
          <Button
            classes="close-btn"
            category="outline"
            onClick={() => {
              onClose();
            }}
          >
            <FontAwesomeIcon icon="arrow-alt-circle-left" />
            <span>Back</span>
          </Button>
        </div>
        <div className="selected-items">
          {data.map((d: any) => (
            <div key={d[primaryColumn.accessor]} className="item">
              <p>{d[primaryColumn.accessor]}</p>
              <FontAwesomeIcon
                onClick={() => {
                  dispatch(removeFromSelection(d));
                }}
                className="close-btn"
                icon={['far', 'times-circle']}
              />
            </div>
          ))}
        </div>
        <div className="actions">
          {actions
            .filter((action) => (data.length > 1 ? action.allowBulk : action))
            .map((action) => (
              <Button
                alignCenter
                key={action.name}
                category="primary"
                onClick={() => action.onClick(data)}
                value={action.name}
              />
            ))}
        </div>
      </StyledGAContainer>
    </div>
  );
};

const StyledGAContainer = styled.div`
  position: fixed;
  top: 2em;
  left: 12.5%;
  z-index: 1000;
  width: 75%;
  height: 60vh;
  background-color: var(--white);
  box-shadow: var(--subtleShadow);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  div {
    padding: 2em;
  }

  div.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: var(--navyBlue);
    color: var(--white);

    span.button {
      width: 20%;
    }
  }

  div.selected-items {
    width: 100%;
    padding: 4em;
    overflow: auto;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-gap: 10px;

    div.item {
      width: 250px;
      background-color: var(--veryLightBlack);
      padding: 1em 1.2em;

      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      :hover {
        filter: brightness(105%);
        box-shadow: var(--subtleShadow2);
      }

      p {
        width: 80%;
        margin-right: 1em;
        font-weight: bold;
        font-size: 0.9em;
      }

      svg.close-btn {
        opacity: 0.6;
        font-size: 1.5em;
        cursor: pointer;
        :hover {
          opacity: 1;
        }
      }
    }
  }

  div.actions {
    background-color: var(--grey);
    display: flex;
    justify-content: space-around;
    padding: 2em;
    margin-top: 2em;
    width: 100%;
    overflow: auto;
    span.button {
      margin: 1em;
      width: 20%;
    }
  }
`;
export default GroupActionsContainer;
