import React from 'react';
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
}: InputProps): JSX.Element => (
  <StyledInputWithLabel htmlFor={name}>
    <input
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      name={name}
      required={required}
      className={error !== '' ? 'errored' : ''}
    />

    <span>{label}</span>
    {error !== '' && <span className="errors">{error}</span>}
  </StyledInputWithLabel>
);

Input.defaultProps = {
  placeholder: 'Enter something',
  required: false,
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

    input {
      :focus {
        border: 1px solid ${colors.black};
        background-color: ${colors.white};
      }
    }
  }

  input {
    padding: 1em 0.5em;
    border: 1px solid ${colors.veryLightBlack};
    background-color: ${colors.offWhite};
    outline: none;
    border-radius: 5px;
  }

  input.errored {
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
