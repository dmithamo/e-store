import * as React from 'react';
import styled from 'styled-components';

export default function NoData() {
  return (
    <StyledNoData>
      <p>No matching records found</p>
    </StyledNoData>
  );
}
const StyledNoData = styled.div``;
