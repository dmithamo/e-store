import React from 'react';
import styled from 'styled-components';
import colors from '../../assets/colors';

type Props = {
  title: string;
  subtitle: string;
};
export default function EmailSentBanner({ title, subtitle }: Props) {
  return (
    <StyledEmailSentBanner>
      <h2 className="title">{title}</h2>
      <p className="subtitle">{subtitle}</p>
    </StyledEmailSentBanner>
  );
}

const StyledEmailSentBanner = styled.div`
  padding: 2em;
  box-shadow: 0 0 2px 2px ${colors.grey};

  .title {
  }

  .subtitle {
  }
`;
