import * as React from 'react';
import styled from 'styled-components';
import Button from './Button';
import FullPageOverlay from './FullPageOverlay';

type Props = {
  title: string;
  subtitle: string;
  children?: JSX.Element | JSX.Element[];
  primaryAction: () => void;
  primaryActionName?: string;
  secondaryAction?: () => void;
  secondaryActionName?: string;
  showImageBg?: boolean;
};
export default function FullPageModal({
  title,
  subtitle,
  children,
  primaryAction,
  primaryActionName,
  secondaryAction,
  secondaryActionName,
  showImageBg,
}: Props) {
  return (
    <FullPageOverlay showImageBg={showImageBg}>
      <StyledFullPageModal>
        <div className="header">
          <h2 className="title">{title}</h2>
          <p className="subtitle">{subtitle}</p>
        </div>

        <div className="children">{children}</div>

        <div className="actions">
          {secondaryAction ? (
            <Button category="secondary" onClick={secondaryAction}>
              <span>{secondaryActionName}</span>
            </Button>
          ) : (
            <></>
          )}

          <Button alignCenter category="primary" onClick={primaryAction}>
            <span>{primaryActionName}</span>
          </Button>
        </div>
      </StyledFullPageModal>
    </FullPageOverlay>
  );
}

const StyledFullPageModal = styled.div`
  box-shadow: 0 0 4px 4px var(--veryLightBlack);
  background-color: var(--white);
  border-radius: 10px;
  width: 650px;
  height: 40vh;
  padding: 4em;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;

  div.header,
  div.children,
  div.actions {
    width: 80%;
    margin: auto;
  }

  div.header {
    font-size: 1.2em;
    margin-bottom: 1em;
    .title {
    }

    .subtitle {
      color: var(--black);
      font-size: 0.8em;
      margin-bottom: 1em;
      border-bottom: 1px dotted var(--veryLightBlack);
    }
  }

  div.children {
    font-size: 1.2em;
    height: 75%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
  }

  div.actions {
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

FullPageModal.defaultProps = {
  primaryActionName: 'Confirm',
  secondaryAction: null,
  secondaryActionName: 'Cancel',
  children: null,
  showImageBg: true,
};
