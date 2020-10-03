import React from 'react';
import styled from 'styled-components';

type AmountSpentPreviewProps = {
  amount: number;
};

const AmountSpentPreview: React.FC<AmountSpentPreviewProps> = ({
  amount,
}: AmountSpentPreviewProps): JSX.Element => (
  <StyledAmountSpentPreview>
    <p>You have spent</p>
    <h2 className="title">{`KES ${`${amount}.00`}`}</h2>
  </StyledAmountSpentPreview>
);

const StyledAmountSpentPreview = styled.div`
  p {
    opacity: 0.9;
  }

  h2 {
    font-size: 2em;
  }
`;

export default AmountSpentPreview;
