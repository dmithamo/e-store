import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../../assets/colors';

type InputProps = {
  label: string;
  name: string;
  value: string | number;
  onChange: any;
  placeholder?: string;
  error?: string;
};

const PasswordInput: React.FC<InputProps> = ({
  value,
  onChange,
  name,
  placeholder,
  label,
  error,
}: InputProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <StyledInputWithLabel htmlFor={name}>
      <div className={`input ${error !== '' ? 'errored' : ''}`}>
        <input
          placeholder={placeholder}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          name={name}
          required
        />
        <FontAwesomeIcon
          onClick={() => {
            setShowPassword(!showPassword);
          }}
          icon={showPassword ? 'eye-slash' : 'eye'}
        />
      </div>

      <span>{label}</span>
      {error !== '' && <span className="errors">{error}</span>}
    </StyledInputWithLabel>
  );
};

PasswordInput.defaultProps = {
  placeholder: 'eg strongerTha3nThisx3',
  error: '',
};

const StyledInputWithLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 0.8em;

  :focus-within {
    span {
      color: ${colors.black};
    }
  }

  div.input {
    padding: 0;
    margin: 0;
    border: 1px solid ${colors.veryLightBlack};
    border-radius: 5px;
    position: relative;

    input {
      padding: 1em 0.5em;
      background-color: ${colors.offWhite};
      border: none;
      outline: none;
    }

    svg {
      font-size: 1.5em;
      padding: 0.1em;
      position: absolute;
      right: 5px;
      cursor: pointer;
      color: ${colors.lightBlack};
      :hover {
        color: ${colors.black};
      }
    }
  }

  div.errored {
    border: 1px solid ${colors.red};
  }

  span {
    color: ${colors.lightBlack};
    padding: 0.2em 0.5em;
  }
  span.errors {
    color: ${colors.red};
  }
`;

export default PasswordInput;
