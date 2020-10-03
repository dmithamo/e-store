import React from 'react';
import styled from 'styled-components';

type sizeProp = 'small' | 'medium' | 'large';
type InlineImageProps = {
  size: sizeProp;
  src: string;
  alt?: string;
};

const InlineImage: React.FC<InlineImageProps> = ({
  size: category,
  src,
  alt,
}: InlineImageProps): JSX.Element => (
  <StyledAvatarContainer>
    <img className={category} src={src} alt={alt} />
  </StyledAvatarContainer>
);

InlineImage.defaultProps = {
  alt: 'some inline art',
};

const StyledAvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 150px;
    height: auto;
    border-radius: 50%;
    padding: 0 0.5em;
    filter: brightness(0.9);

    :hover {
      filter: brightness(1.1);
    }
  }

  img.small {
    width: 50px;
  }
  img.medium {
    width: 150px;
  }
  img.large {
    width: 300px;
  }
`;

export default InlineImage;
