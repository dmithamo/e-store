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
        background: 'var(--lightBlack)',
        zIndex: 999,
      }}
    >
      <StyledGAContainer>
        <div className="header">
          <h2>Work on multiple items</h2>
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
            <div className="item">
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
          <h2>ACTIONS</h2>
          <pre>{JSON.stringify(actions, null, 4)}</pre>
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

  background-color: var(--white);
  box-shadow: var(--subtleShadow);

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
    overflow: auto;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-gap: 10px;

    div.item {
      width: 250px;
      background-color: var(--grey);
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
    display: flex;
  }
`;
export default GroupActionsContainer;
