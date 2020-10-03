import React from 'react';
import styled from 'styled-components';

const VisaDetailsForm: React.FC = (): JSX.Element => (
  <StyledVisaDetails>
    {1 + 1 === 2 && '<EditVisaDetails />'}
    <p>Working on IT &trade;</p>
  </StyledVisaDetails>
);

const StyledVisaDetails = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default VisaDetailsForm;
