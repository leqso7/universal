import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <MenuButton onClick={toggleMenu}>
        <MenuIcon isOpen={isOpen}>
          <span></span>
          <span></span>
          <span></span>
        </MenuIcon>
      </MenuButton>

      <MenuOverlay isOpen={isOpen} onClick={toggleMenu}>
        <MenuContent isOpen={isOpen} onClick={e => e.stopPropagation()}>
          {user ? (
            <>
              <MenuItem>
                <MenuLink to="/" onClick={toggleMenu}>მთავარი</MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink to="/tasks" onClick={toggleMenu}>დავალებები</MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink to="/puzzle" onClick={toggleMenu}>ფაზლი</MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink to="/scramble" onClick={toggleMenu}>სიტყვები</MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink to="/colors" onClick={toggleMenu}>ფერები</MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink to="/memory-game" onClick={toggleMenu}>მეხსიერება</MenuLink>
              </MenuItem>
            </>
          ) : (
            <MenuItem>
              <MenuLink to="/request" onClick={toggleMenu}>მოითხოვე წვდომა</MenuLink>
            </MenuItem>
          )}
        </MenuContent>
      </MenuOverlay>
    </>
  );
};

const MenuButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
`;

const MenuIcon = styled.div`
  width: 30px;
  height: 20px;
  position: relative;
  
  span {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    background: #333;
    border-radius: 3px;
    transition: all 0.3s ease;

    &:first-child {
      top: ${props => props.isOpen ? '50%' : '0'};
      transform: ${props => props.isOpen ? 'rotate(45deg)' : 'none'};
    }

    &:nth-child(2) {
      top: 50%;
      transform: translateY(-50%);
      opacity: ${props => props.isOpen ? '0' : '1'};
    }

    &:last-child {
      bottom: ${props => props.isOpen ? '50%' : '0'};
      transform: ${props => props.isOpen ? 'rotate(-45deg)' : 'none'};
    }
  }
`;

const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  transition: all 0.3s ease;
  z-index: 999;
`;

const MenuContent = styled.div`
  position: fixed;
  top: 0;
  left: ${props => props.isOpen ? '0' : '-300px'};
  width: 300px;
  height: 100%;
  background: white;
  padding: 60px 20px;
  transition: all 0.3s ease;
  z-index: 1000;
`;

const MenuItem = styled.div`
  margin: 10px 0;
`;

const MenuLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-size: 18px;
  
  &:hover {
    color: #666;
  }
`;

export default HamburgerMenu;