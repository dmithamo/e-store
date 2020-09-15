import React from 'react';
import styled from 'styled-components';
import BackgroudImage from '../../assets/shopping-cart.jpg';

type FullPageImageBackgroundProps = {
  children: JSX.Element | JSX.Element[];
};

const FullPageImageBackground: React.FC<FullPageImageBackgroundProps> = ({
  children,
}: FullPageImageBackgroundProps): JSX.Element => (
  <StyledContainer>{children}</StyledContainer>
);

const StyledContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.8),
      rgba(0, 0, 0, 0.8)
    ),
    url(${BackgroudImage});
`;
export default FullPageImageBackground;
