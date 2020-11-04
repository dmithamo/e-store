import React from 'react';
import styled from 'styled-components';

const CoverAllTheThings = () => <StyledCoverAllTheThings />;
const StyledCoverAllTheThings = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 998;
  background-color: var(--veryLightBlack);
`;

export default CoverAllTheThings;
