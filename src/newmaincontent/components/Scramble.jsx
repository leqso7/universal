import React, { useState } from 'react';
import styled from 'styled-components';

// დავამატოთ styled კომპონენტები
const GameContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(-45deg, 
    rgba(100, 204, 240, 0.8), 
    rgba(128, 208, 199, 0.8), 
    rgba(86, 188, 189, 0.8), 
    rgba(82, 182, 154, 0.8)
  );
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
  overflow: hidden;
`;

const GameArea = styled.div`
  width: 100%;
  max-width: min(800px, 95vw);
  margin: 0 auto;
  padding: 10px;
  transform: scale(${props => props.scale});
  transform-origin: center top;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
  padding: 10px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
`;

const LettersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin: 20px auto;
  max-width: 500px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const AnswerContainer = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
  margin: 15px auto;
  padding: 10px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 500px;
`;

const ZoomControls = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  z-index: 1000;
`;

const ZoomButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.1);
  }
`;

// კომპონენტში დავამატოთ მასშტაბირების state და ფუნქციები
const Scramble = () => {
  // ... existing state ...
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  return (
    <GameContainer>
      <HomeButton />
      <GameArea scale={scale}>
        <Score>შესრულებულია: {score} / {totalAttempts}</Score>
        <ImageContainer>
          <img src={currentImage} alt="სურათი" />
        </ImageContainer>
        <AnswerContainer>
          {/* ... answer slots ... */}
        </AnswerContainer>
        <LettersContainer>
          {/* ... letter buttons ... */}
        </LettersContainer>
      </GameArea>
      <ZoomControls>
        <ZoomButton onClick={handleZoomOut}>-</ZoomButton>
        <ZoomButton onClick={handleZoomIn}>+</ZoomButton>
      </ZoomControls>
    </GameContainer>
  );
};

export default Scramble; 