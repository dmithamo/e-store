import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import styled from 'styled-components';
import Button from '../../../common/components/Button';

type FormNavProps = {
  onClickPrev: Function;
  onClickNext: Function;
  nextIsDisabled: boolean;
  showPrev: boolean;
  pageNumber: number;
};

const FormNav: React.FC<FormNavProps> = ({
  onClickPrev,
  onClickNext,
  nextIsDisabled,
  showPrev,
  pageNumber,
}: FormNavProps): JSX.Element => (
  <StyledFormNav style={{ display: showPrev ? 'grid' : 'flex' }}>
    {showPrev ? (
      <Button
        classes="back-btn"
        title="Previous step"
        category="secondary"
        type="button"
        onClick={() => {
          onClickPrev();
        }}
      >
        <FontAwesomeIcon icon="arrow-alt-circle-left" />
        <span>Back</span>
      </Button>
    ) : (
      <></>
    )}
    <Button
      type="submit"
      onClick={() => {
        onClickNext();
      }}
      disabled={nextIsDisabled}
    >
      <span>{pageNumber === 3 ? 'Create your account' : 'Next'}</span>
      <FontAwesomeIcon icon="arrow-right" />
    </Button>
  </StyledFormNav>
);

const StyledFormNav = styled.nav`
  button.back-btn {
  }
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 10px;
`;

export default FormNav;
