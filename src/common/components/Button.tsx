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
  children?: JSX.Element | JSX.Element[];
  title?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  category,
  value,
  onClick,
  title,
}: ButtonProps): JSX.Element => (
  <StyledButton>
    <button
      title={title}
      className={category}
      onClick={onClick}
      type={type}
      value={value}
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
  children: <></>,
};

const StyledButton = styled.span`
  width: 100%;
  button {
    padding: 0.8em 1.1em;
    font-size: 1em;
    font-weight: bolder;

    outline: none;
    border-radius: 5px;
    width: 100%;
    cursor: pointer;

    display: flex;
    justify-content: space-between;
    align-items: center;

    svg {
      font-size: 1.1em;
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
    color: ${colors.lightBlack};
    background-color: ${colors.white};
    border: 1px solid ${colors.veryLightBlack};

    :hover {
      background-color: ${colors.lightGrey};
      border: 1px solid ${colors.lightBlack};
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
    font-weight: 400;
    background: none;
    color: ${colors.lightBlack};
    border: none;

    :hover {
      color: ${colors.black};
    }
  }
`;

export default Button;
