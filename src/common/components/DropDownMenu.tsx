import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import colors from '../../assets/colors';

type DropDownMenuProps = {
  icon: () => JSX.Element | JSX.Element[];
  children: JSX.Element | JSX.Element[];
};

const DropDownMenu: React.FC<DropDownMenuProps> = ({
  icon,
  children,
}: DropDownMenuProps): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false);
  const node = useRef<HTMLDivElement>(null);

  const handleClick = (e: any) => {
    if (node.current?.contains(e.target)) {
      return;
    }

    setShowMenu(false);
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
      <p
        className="icon"
        onClick={() => {
          setShowMenu(!showMenu);
        }}
        aria-hidden
      >
        {icon()}
      </p>
      {showMenu && (
        <div ref={node} className="hidden-menu">
          {children}
        </div>
      )}
    </StyledDropDownMenu>
  );
};

const StyledDropDownMenu = styled.div`
  position: relative;
  padding: 0 2em;
  p.icon {
    cursor: pointer;
  }

  div.hidden-menu {
    padding: 1.5em;
    position: absolute;
    top: 2em;
    right: 1em;
    background-color: ${colors.white};
    box-shadow: 0 0 2px 2px ${colors.darkGrey};
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
