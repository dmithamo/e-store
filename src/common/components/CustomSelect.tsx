import * as React from 'react';
import styled from 'styled-components';

type Option = { label: string; value: string };
type CustomSelectProps = {
  options: Option[];
  label: string;
  error: string;
  onChange: any;
  name: string;
  value: string;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  label,
  error,
  onChange,
  name,
  value,
}: CustomSelectProps) => (
  <StyledSelect htmlFor={name}>
    <select
      className={error === '' ? '' : 'errored'}
      aria-label={label}
      onChange={onChange}
      name={name}
      defaultValue={value}
    >
      <option>Select your gender</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    <span>{label}</span>
    {error !== '' && <span className="errors">{error}</span>}
  </StyledSelect>
);

const StyledSelect = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 0.9em;

  select {
    border: 1px solid var(--veryLightBlack);
    border-radius: 5px;

    width: 100%;
    padding: 0.75em 0.5em;
    outline: none;
    background-color: var(--white);
    option {
      width: 100%;
    }

    :focus-within {
      border: 1px solid var(--black);
      background-color: var(--white);
    }
  }

  select.errored {
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

export default CustomSelect;

// TODO: define a multi-select. When the time is right
