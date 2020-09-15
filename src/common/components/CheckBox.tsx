/* eslint-disable no-unused-vars */
import React, { FormEvent } from 'react';
import styled from 'styled-components';

type CheckBoxProps = {
  name: string;
  label: string;
  checked: boolean;
  value: string;
  onChange: (e: FormEvent) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  checked,
  label,
  onChange,
  value,
  name,
}: CheckBoxProps) => (
  <StyledCheckBox>
    <input
      name={name}
      value={value}
      type="checkbox"
      onChange={onChange}
      checked={checked}
    />
    <span>{label}</span>
  </StyledCheckBox>
);

const StyledCheckBox = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: fit-content;
  padding: 1em;
  input {
    margin-right: 1em;
  }
  span {
    flex-grow: 1;
  }
`;

export default CheckBox;
