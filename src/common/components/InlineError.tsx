import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import styled from 'styled-components';
import Button from './Button';

type InlineErrorProps = {
  error: string;
  onClose: Function;
};

const InlineError: React.FC<InlineErrorProps> = ({
  error,
  onClose,
}: InlineErrorProps): JSX.Element => (
  <StyledInlineError>
    <span>{error}</span>
    <Button
      title="Clear error"
      onClick={() => {
        onClose();
      }}
      category="link"
      classes="close-btn"
    >
      <FontAwesomeIcon icon={['far', 'times-circle']} />
    </Button>
  </StyledInlineError>
);

const StyledInlineError = styled.div`
  position: relative;
  width: 100%;
  border-radius: 10px;
  padding: 1.2em;
  color: var(--red);
  background-color: var(--reddishBrown);
  border: 2px solid var(--red);

  span.button {
    width: fit-content;
    z-index: 100;
    position: absolute;
    color: var(--offWhite);
    right: 1em;
    svg {
      font-size: 1.7em;
    }
  }
`;

export default InlineError;
