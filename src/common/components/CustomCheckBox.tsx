/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type CheckBoxProps = {
  isChecked: boolean;
};

const CustomCheckBox: React.FC<CheckBoxProps> = ({
  isChecked,
}: CheckBoxProps): JSX.Element => (
  <FontAwesomeIcon
    style={{
      cursor: 'pointer',
    }}
    icon={isChecked ? 'minus-circle' : ['far', 'circle']}
  />
);

export default CustomCheckBox;
