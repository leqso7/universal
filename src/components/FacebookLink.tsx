import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(24, 119, 242, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(24, 119, 242, 0); }
  100% { box-shadow: 0 0 0 0 rgba(24, 119, 242, 0); }
`;

interface FacebookContainerProps {
  $isBlurred?: boolean;
}

const FacebookContainer = styled.a<FacebookContainerProps>`
  position: fixed;
  bottom: 25px;
  left: 25px;
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 12px;
  padding: 8px;
  border-radius: 30px;
  transition: all 0.3s ease;
  pointer-events: ${props => props.$isBlurred ? 'none' : 'auto'};
  z-index: 10;
  filter: blur(${props => props.$isBlurred ? '8px' : '0px'});
  opacity: ${props => props.$isBlurred ? '0' : '1'};
  transform: translateY(${props => props.$isBlurred ? '20px' : '0'});
  visibility: ${props => props.$isBlurred ? 'hidden' : 'visible'};
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const FacebookIcon = styled.span`
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

interface FacebookLinkProps {
  isBlurred?: boolean;
}

const FacebookLink: React.FC<FacebookLinkProps> = ({ isBlurred = false }) => {
  return (
    <FacebookContainer 
      href="https://www.facebook.com/profile.php?id=61567812722184"
      target="_blank"
      rel="noopener noreferrer"
      $isBlurred={isBlurred}
    >
      <FacebookIcon>f</FacebookIcon>
      <FacebookText>Facebook</FacebookText>
    </FacebookContainer>
  );
};

export default FacebookLink;
