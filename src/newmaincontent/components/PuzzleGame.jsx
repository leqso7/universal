import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import PuzzleBoard from './PuzzleBoard';
import DifficultySelector from './DifficultySelector';
import { usePlayer } from '../context/PlayerContext.jsx';
import NameModal from './NameModal';
import HomeButton from './HomeButton';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: #98D8AA;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  overflow-y: auto;
  z-index: 1;
  margin: 0;
  box-sizing: border-box;

  * {
    box-sizing: border-box;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  max-width: 64rem;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;
  gap: 1rem;
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2196F3;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: 640px) {
    font-size: 1.875rem;
  }
`;

const GameIcon = styled.span`
  font-size: 1.5rem;
  
  @media (min-width: 640px) {
    font-size: 2rem;
  }
`;

const Main = styled.main`
  max-width: 64rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1rem;
  padding-bottom: 2rem;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 1rem;
`;

const DifficultyCard = styled(Card)`
  text-align: center;
`;

const DifficultyTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const DifficultyButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
`;

const DifficultyButton = styled.button`
  height: 2.5rem;
  width: 4rem;
  font-size: 1rem;
  border-radius: 0.75rem;
  transition: transform 0.2s;
  background: ${props => props.isSelected ? '#2196F3' : 'transparent'};
  color: ${props => props.isSelected ? 'white' : '#2196F3'};
  border: 2px solid ${props => props.isSelected ? 'transparent' : '#2196F3'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.7 : 1};

  &:hover {
    transform: ${props => props.disabled ? 'none' : 'scale(1.05)'};
  }

  &:disabled {
    background: ${props => props.isSelected ? '#90CAF9' : 'rgba(33, 150, 243, 0.1)'};
    border-color: ${props => props.isSelected ? 'transparent' : '#90CAF9'};
    color: ${props => props.isSelected ? 'white' : '#90CAF9'};
  }
`;

const UploadButton = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #2196F3;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;
  margin-left: auto;

  &:hover {
    background: #1976D2;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  input {
    display: none;
  }
`;

const PasteButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #2196F3;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;

  &:hover {
    background: #1976D2;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #2196F3;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-20px); }
`;

const Toast = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(76, 175, 80, 0.9);
  color: white;
  padding: 1rem 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 1000;
  animation: ${props => props.isClosing ? fadeOut : fadeIn} 0.5s ease forwards;
  backdrop-filter: blur(10px);
`;

const SuccessMessage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
  font-size: 1.5rem;
  color: #2196F3;
  z-index: 1000;
  animation: popIn 0.5s ease-out;

  @keyframes popIn {
    0% {
      transform: translate(-50%, -50%) scale(0.5);
      opacity: 0;
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }
`;

const PuzzleGame = () => {
  const { playerName } = usePlayer();
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState(3);
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastClosing, setIsToastClosing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const getRandomPraise = () => {
    const praises = [
      `ყოჩაღ ${playerName}! შენ ეს შეძელი! 🎉`,
      `საოცარი ხარ ${playerName}! გააგრძელე ასე! 🌟`,
      `ბრავო ${playerName}! შესანიშნავად გაართვი თავი! 👏`,
      `არაჩვეულებრივია ${playerName}! შენ ნამდვილი გენიოსი ხარ! 🎯`,
      `გილოცავ ${playerName}! კიდევ ერთი ამოცანა გადალახე! 🏆`,
      `${playerName}, შენ მართლაც ნიჭიერი ხარ! 🌈`,
      `დიდებულია ${playerName}! ასე განაგრძე! ⭐`,
      `${playerName}, შენ ნამდვილი გმირი ხარ! 🦸‍♂️`,
    ];
    return praises[Math.floor(Math.random() * praises.length)];
  };

  const showNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setIsToastClosing(true);
      setTimeout(() => {
        setShowToast(false);
        setIsToastClosing(false);
      }, 500);
    }, 3000);
  };

  const handleComplete = (errors) => {
    const progress = {
      date: new Date().toISOString(),
      errors: errors || 0,
      imageUrl: image
    };
    // updateGameProgress('puzzle', image, progress);
    const displayName = playerName || 'მოთამაშე';
    showNotification(`გილოცავთ ${displayName}! თქვენ წარმატებით დაასრულეთ პაზლი ${errors || 0} შეცდომით! 🎉`);
    setTimeout(() => {
      setShowToast(false);
      setIsToastClosing(false);
      navigate('/');
    }, 3500);
  };

  const handleError = () => {
    setErrors(prev => prev + 1);
  };

  const handleImageChange = (newImage) => {
    setImage(newImage);
    setErrors(0);
  };

  const handleBackToMenu = () => {
    navigate('/');
  };

  const handlePaste = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      for (const clipboardItem of clipboardItems) {
        if (clipboardItem.types.includes('image/png')) {
          const blob = await clipboardItem.getType('image/png');
          const url = URL.createObjectURL(blob);
          handleImageChange(url);
          break;
        }
      }
    } catch (error) {
      console.error('Error handling pasted image:', error);
    }
  };

  const handleDifficultyChange = async (newDifficulty) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setDifficulty(newDifficulty);
    setIsLoading(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCorrectAnswer = () => {
    setShowSuccess(true);
    setSuccessMessage(getRandomPraise());
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  useEffect(() => {
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  return (
    <Container>
      <HomeButton />
      {showToast && (
        <Toast isClosing={isToastClosing}>
          {toastMessage}
        </Toast>
      )}
      {showSuccess && (
        <SuccessMessage>
          {successMessage}
        </SuccessMessage>
      )}
      <Header>
        <Title>
          <GameIcon>🎮</GameIcon>
          გამარჯობა, {playerName}! 👋
        </Title>
        <HeaderButtons>
          <PasteButton onClick={handlePaste}>
            <span>📋</span>
            ჩასმა (Ctrl+V)
          </PasteButton>
          <UploadButton>
            <span>📤</span>
            სურათის ატვირთვა
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="imageUpload"
              name="imageUpload"
            />
          </UploadButton>
        </HeaderButtons>
      </Header>

      <Main>
        <DifficultyCard>
          <DifficultyTitle>აირჩიე სირთულის დონე</DifficultyTitle>
          <DifficultyButtons>
            {[3, 4, 5].map((size) => (
              <DifficultyButton
                key={size}
                isSelected={difficulty === size}
                onClick={() => handleDifficultyChange(size)}
                disabled={isLoading}
              >
                {size}x{size}
              </DifficultyButton>
            ))}
          </DifficultyButtons>
        </DifficultyCard>

        <div style={{ position: 'relative' }}>
          {isLoading && (
            <LoadingOverlay>
              <LoadingSpinner />
            </LoadingOverlay>
          )}
          {image && (
            <PuzzleBoard
              image={image}
              difficulty={difficulty}
              onProgress={setProgress}
              onComplete={(errors) => handleComplete(errors)}
              onBackToMenu={handleBackToMenu}
              onImageChange={handleImageChange}
              onError={handleError}
              onCorrectAnswer={handleCorrectAnswer}
            />
          )}
        </div>
      </Main>
    </Container>
  );
};

export default PuzzleGame;