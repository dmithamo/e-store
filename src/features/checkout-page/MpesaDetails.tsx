import React from 'react';
import styled from 'styled-components';

const MpesaDetailsForm: React.FC = (): JSX.Element => (
  <StyledMpesaDetails>
    {1 + 1 === 2 && '<EditMpesaDetails />'}
    <p>Working on IT &trade;</p>
  </StyledMpesaDetails>
);

const StyledMpesaDetails = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default MpesaDetailsForm;
