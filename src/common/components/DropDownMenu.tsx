import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

type DropDownMenuProps = {
  icon: () => JSX.Element | JSX.Element[];
  children: JSX.Element | JSX.Element[];
};

const DropDownMenu: React.FC<DropDownMenuProps> = ({
  icon,
  children,
}: DropDownMenuProps): JSX.Element => {
  const routeProps = useRouteMatch();
  const [showMenu, setShowMenu] = useState(false);
  const node = useRef<HTMLDivElement>(null);

  const handleClick = (e: any) => {
    const isCurrentPage = routeProps.path.includes(
      e.target?.textContent?.toLowerCase(),
    );

    if (!node.current?.contains(e.target) || isCurrentPage) {
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
    top: 1.5em;
    right: 1em;
    font-size: 2em;
    cursor: pointer;
    z-index: 3;
    font-weight: normal;
    color: var(--veryLightBlack);
    :hover {
      color: var(--black);
    }
  }

  div.hidden-menu {
    padding: 1.5em 2.5em;
    position: absolute;
    top: 2em;
    right: 1em;
    background-color: var(--white);
    box-shadow: var(--subtleShadow);
    width: 300px;
    height: 35vh;
    border-radius: 5px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    h2 {
      font-size: 1.6em;
    }
  }
`;

export default DropDownMenu;
