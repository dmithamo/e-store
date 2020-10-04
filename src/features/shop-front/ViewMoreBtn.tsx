import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../common/components/Button';

type ViewMoreButtonProps = {
  category: string;
};

const ViewMoreButton: React.FC<ViewMoreButtonProps> = ({
  category,
}: ViewMoreButtonProps): JSX.Element => {
  const history = useHistory();
  return (
    <StyledViewMoreButton>
      <Button
        category="link"
        value={`More ${category}`}
        onClick={() => {
          history.push(`/shop/${category}`);
        }}
      />
    </StyledViewMoreButton>
  );
};

const StyledViewMoreButton = styled.div`
  width: 100%;
  text-decoration: underline;
`;

export default ViewMoreButton;
