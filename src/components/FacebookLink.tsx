import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(24, 119, 242, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(24, 119, 242, 0); }
  100% { box-shadow: 0 0 0 0 rgba(24, 119, 242, 0); }
`;

const FacebookContainer = styled.a`
  position: fixed;
  bottom: 25px;
  left: 25px;
  display: flex;
  align-items: center;
  text-decoration: none;
  z-index: 1000;
  gap: 12px;
  padding: 8px;
  border-radius: 30px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const FacebookIcon = styled.div`
  width: 45px;
  height: 45px;
  background: linear-gradient(45deg, #1877f2, #2196f3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: Arial, sans-serif;
  font-weight: 900;
  font-size: 28px;
  transition: all 0.3s ease;
  animation: ${pulse} 2s infinite;
  box-shadow: 0 4px 15px rgba(24, 119, 242, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: 'f';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-45%, -50%);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 50%,
      transparent 100%
    );
  }

  ${FacebookContainer}:hover & {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 6px 20px rgba(24, 119, 242, 0.4);
  }
`;

const FacebookText = styled.span`
  color: #1877f2;
  font-family: Arial, sans-serif;
  font-weight: bold;
  font-size: 17px;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.3s ease;
  white-space: nowrap;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  ${FacebookContainer}:hover & {
    opacity: 1;
    transform: translateX(0);
  }
`;

const FacebookLink = () => {
  return (
    <FacebookContainer 
      href="https://www.facebook.com/profile.php?id=61567812722184"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FacebookIcon />
      <FacebookText>Facebook</FacebookText>
    </FacebookContainer>
  );
};

export default FacebookLink;
