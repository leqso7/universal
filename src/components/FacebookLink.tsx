import styled from 'styled-components';

const FacebookContainer = styled.a`
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 40px;
  height: 40px;
  background: #1877f2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  font-family: Arial, sans-serif;
  font-weight: bold;
  font-size: 24px;
  transition: transform 0.2s;
  z-index: 1000;

  &:hover {
    transform: scale(1.1);
  }
`;

const FacebookLink = () => {
  return (
    <FacebookContainer 
      href="https://www.facebook.com/profile.php?id=61567812722184"
      target="_blank"
      rel="noopener noreferrer"
    >
      f
    </FacebookContainer>
  );
};

export default FacebookLink;
