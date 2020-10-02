import React from 'react';
import styled from 'styled-components';
import BackgroudImage from '../../assets/shopping-cart.jpg';

type FullPageOverlayProps = {
  children: JSX.Element | JSX.Element[];
  showImageBg?: boolean;
};

const FullPageOverlay: React.FC<FullPageOverlayProps> = ({
  children,
  showImageBg,
}: FullPageOverlayProps): JSX.Element => (
  <>
    {showImageBg ? (
      <WrapWithImage>{children}</WrapWithImage>
    ) : (
      <NoImageWrapper>{children}</NoImageWrapper>
    )}
  </>
);

FullPageOverlay.defaultProps = {
  showImageBg: true,
};

const NoImageWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 15em;
`;

const WrapWithImage = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 15em;

  background-image: linear-gradient(
      rgba(255, 255, 255, 0.8),
      rgba(0, 0, 0, 0.8)
    ),
    url(${BackgroudImage});
`;

export default FullPageOverlay;
