/* eslint-disable react/button-has-type */
import React from 'react';
import styled from 'styled-components';
import colors from '../../assets/colors';

type ButtonProps = {
  // eslint-disable-next-line no-unused-vars
  onClick: (e: any) => void;
  type?: 'button' | 'submit';
  category?: string;
  value?: string;
  children?: JSX.Element | JSX.Element[] | null;
  title?: string;
  disabled?: boolean;
  alignCenter?: boolean;
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
}: ButtonProps): JSX.Element => (
  <StyledButton>
    <button
      title={title}
      className={`${category} ${disabled ? 'disabled' : ''}`}
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
};

const StyledButton = styled.span`
  width: fit-content;
  width: 100%;
  button {
    padding: 0.9em 1.1em;
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
    color: ${colors.white};
    background-color: ${colors.primary};
    border: 1px solid ${colors.veryLightBlack};

    :hover {
      background-color: ${colors.primaryDarker};
    }
  }

  button.secondary {
    font-weight: normal;
    color: ${colors.black};
    background-color: ${colors.white};
    border: 1px solid ${colors.veryLightBlack};

    :hover {
      background-color: ${colors.lightGrey};
      border: 1px solid ${colors.black};
      color: ${colors.black};
    }
  }

  button.outline {
    background: none;
    color: ${colors.white};
    border: 1px solid ${colors.white};

    :hover {
      background-color: ${colors.white};
      border: 1px solid ${colors.white};
      color: ${colors.black};
    }
  }

  button.link {
    padding: 0;
    background: none;
    color: ${colors.lightBlack};
    border: none;

    :hover {
      color: ${colors.black};
    }
  }

  button.disabled {
    cursor: not-allowed;
    color: ${colors.grey};
    background-color: ${colors.lightGrey};
    :hover {
      color: ${colors.grey};
      background-color: ${colors.lightGrey};
    }
  }
`;

export default Button;
