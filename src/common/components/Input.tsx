/* eslint-disable no-nested-ternary */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';

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
}: InputProps): JSX.Element => {
  const [showContents, setShowContents] = useState(false);

  return (
    <StyledInputWithLabel htmlFor={name}>
      <div className={`input ${error !== '' ? 'errored' : ''}`}>
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
};

const StyledInputWithLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 0.9em;

  :focus-within {
    span {
      color: var(--black);
    }
  }

  div.input {
    padding: 0;
    margin: 0;
    border: 1px solid var(--veryLightBlack);
    border-radius: 5px;
    position: relative;

    :focus-within {
      border: 1px solid var(--black);
      background-color: var(--white);
    }

    input {
      padding: 0.75em 0.5em;
      background-color: var(--offWhite);
      border: none;
      outline: none;
    }

    svg {
      font-size: 1.5em;
      padding: 0.1em;
      position: absolute;
      right: 5px;
      cursor: pointer;
      color: var(--lightBlack);
      :hover {
        color: var(--black);
      }
    }
  }

  div.errored {
    border: 1px solid var(--red);
  }

  span {
    color: var(--lightBlack);
    padding: 0.2em 0.5em;
  }
  span.errors {
    color: var(--red);
  }
`;

export default Input;
