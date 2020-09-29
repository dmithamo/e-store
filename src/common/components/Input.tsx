/* eslint-disable no-nested-ternary */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../../assets/colors';

type InputProps = {
  type: string;
  label: string;
  name: string;
  value: string | number;
  onChange: any;
  placeholder?: string;
  required?: boolean;
  error?: string;
  hasHideToggle?: boolean;
  disabled?: boolean;
};

const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  name,
  placeholder,
  label,
  required,
  error,
  hasHideToggle,
  disabled,
}: InputProps): JSX.Element => {
  const [showContents, setShowContents] = useState(false);

  return (
    <StyledInputWithLabel htmlFor={name}>
      <div
        style={disabled ? { background: colors.grey } : {}}
        className={`input ${error !== '' ? 'errored' : ''}`}
      >
        <input
          autoComplete="off"
          placeholder={placeholder}
          type={showContents ? (type === 'password' ? 'text' : type) : type}
          value={value}
          onChange={onChange}
          name={name}
          required={required}
          className={error !== '' ? 'errored' : ''}
        />

        {hasHideToggle && (
          <FontAwesomeIcon
            onClick={() => {
              setShowContents(!showContents);
            }}
            icon={showContents ? 'eye-slash' : 'eye'}
          />
        )}
      </div>

      <span>{label}</span>
      {error !== '' && <span className="errors">{error}</span>}
    </StyledInputWithLabel>
  );
};

Input.defaultProps = {
  placeholder: 'Enter something',
  required: false,
  error: '',
  hasHideToggle: false,
  disabled: false,
};

const StyledInputWithLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 0.9em;

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

    :focus-within {
      border: 1px solid ${colors.black};
      background-color: ${colors.white};
    }

    input {
      padding: 0.75em 0.5em;
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

export default Input;
