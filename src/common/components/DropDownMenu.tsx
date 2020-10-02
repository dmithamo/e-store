import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

type DropDownMenuProps = {
  icon: () => JSX.Element | JSX.Element[];
  children: JSX.Element | JSX.Element[];
};

const DropDownMenu: React.FC<DropDownMenuProps> = ({
  icon,
  children,
}: DropDownMenuProps): JSX.Element => {
  const [showMenu, setShowMenu] = useState(true);
  const node = useRef<HTMLDivElement>(null);

  const handleClick = (e: any) => {
    if (!node.current?.contains(e.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') setShowMenu(false);
    });

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <StyledDropDownMenu>
      <span
        className="icon"
        onClick={() => {
          setShowMenu(!showMenu);
        }}
        aria-hidden
      >
        {icon()}
      </span>
      {showMenu && (
        <>
          <FontAwesomeIcon
            className="close-icon"
            icon={['far', 'times-circle']}
          />
          <div ref={node} className="hidden-menu">
            {children}
          </div>
        </>
      )}
    </StyledDropDownMenu>
  );
};

const StyledDropDownMenu = styled.div`
  position: relative;
  padding: 0 2em;
  span.icon {
    cursor: pointer;
  }

  svg.close-icon {
    position: absolute;
    top: 1.9em;
    right: 1em;
    font-size: 1.5em;
    cursor: pointer;
    z-index: 3;
    opacity: 0.6;
    font-weight: normal;
    :hover {
      opacity: 1;
    }
  }

  div.hidden-menu {
    padding: 1.5em 2em;
    position: absolute;
    top: 2em;
    right: 1em;
    background-color: var(--white);
    box-shadow: 0 0 2px 2px var(--grey);
    width: 300px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    z-index: 2;
  }
`;

export default DropDownMenu;
