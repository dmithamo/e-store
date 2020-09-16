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
  id?: string;
  required?: boolean;
};

const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  id,
  name,
  placeholder,
  label,
  required,
}: InputProps): JSX.Element => (
  <StyledInputWithLabel htmlFor={name}>
    <input
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      id={id}
      name={name}
      required={required}
    />

    <span>{label}</span>
  </StyledInputWithLabel>
);

Input.defaultProps = {
  placeholder: 'Enter something',
  id: '',
  required: false,
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

  span {
    color: ${colors.lightBlack};
    padding: 0.2em 0.5em;
  }
`;

export default Input;
