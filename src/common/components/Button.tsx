/* eslint-disable react/button-has-type */
import React from 'react';
import styled from 'styled-components';

type ButtonProps = {
  // eslint-disable-next-line no-unused-vars
  onClick: (e: any) => void;
  type?: 'button' | 'submit';
  category?: 'primary' | 'secondary' | 'outline' | 'link';
  value?: string;
  children?: JSX.Element | JSX.Element[] | null;
  title?: string;
  disabled?: boolean;
  alignCenter?: boolean;
  classes?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  category,
  value,
  onClick,
  title,
  disabled,
  alignCenter,
  classes,
}: ButtonProps): JSX.Element => (
  <StyledButton>
    <button
      title={title}
      className={`${classes} ${category} ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      type={type}
      value={value}
      disabled={disabled}
      style={{ justifyContent: `${alignCenter ? 'center' : 'space-between'}` }}
    >
      {value || children}
    </button>
  </StyledButton>
);

Button.defaultProps = {
  type: 'button',
  category: 'primary',
  value: '',
  title: '',
  children: null,
  disabled: false,
  alignCenter: false,
  classes: '',
};

const StyledButton = styled.span`
  width: 100%;
  button {
    padding: 0.85em 1.1em;
    font-size: 1em;
    font-weight: bolder;
    outline: none;
    border-radius: 5px;
    cursor: pointer;

    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    svg {
      font-size: 1.3em;
    }
  }

  button.primary {
    color: var(--white);
    background-color: var(--primaryBlue);
    border: 1px solid var(--veryLightBlack);

    :hover {
      background-color: var(--primaryBlueDarker);
    }
  }

  button.secondary {
    font-weight: normal;
    color: var(--black);
    background-color: var(--white);
    border: 1px solid var(--veryLightBlack);

    :hover {
      background-color: var(--lightGrey);
      border: 1px solid var(--black);
      color: var(--black);
    }
  }

  button.outline {
    background: none;
    color: var(--white);
    border: 1px solid var(--white);

    :hover {
      background-color: var(--white);
      border: 1px solid var(--white);
      color: var(--black);
    }
  }

  button.selected {
    background-color: var(--white);
    border: 1px solid var(--white);
    color: var(--black);
    .checkmark {
      color: var(--primaryBlue);
      padding: 0 1em;
    }
  }

  button.link {
    padding: 0;
    background: none;
    color: var(--lightBlack);
    border: none;

    :hover {
      color: var(--black);
    }
  }

  button.disabled {
    cursor: not-allowed;
    opacity: 0.55;
    :hover {
      opacity: 0.56;
    }
  }
`;

export default Button;
