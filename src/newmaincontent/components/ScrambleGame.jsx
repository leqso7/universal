import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import '../styles/ScrambleGame.css';
import { usePlayer } from '../context/PlayerContext.jsx';
import NameModal from './NameModal';
import HomeButton from './HomeButton';

// სურათების იმპორტი
import zebraImg from '../../assets/images/ზებრა.webp';
import spiloImg from '../../assets/images/სპილო.webp';
import lomiImg from '../../assets/images/ლომი.webp';
import datviImg from '../../assets/images/დათვი.webp';
import mgeliImg from '../../assets/images/მგელო.webp';
import iremiImg from '../../assets/images/ირემი.webp';
import txaImg from '../../assets/images/თხა (2).webp';
import kurdgeliImg from '../../assets/images/კურდღელი.webp';
import flamingoImg from '../../assets/images/ფლამინგო.webp';
import selapiImg from '../../assets/images/სელაპი.webp';
import ciyviImg from '../../assets/images/ციყვი.webp';
import enotiImg from '../../assets/images/ენოტი.webp';
import zarmacaImg from '../../assets/images/ზარმაცა.webp';
import zgarbiImg from '../../assets/images/ზღარბი.webp';
import qamelioniImg from '../../assets/images/ქამელეონი.webp';
import oposumiImg from '../../assets/images/ოპოსუმი.webp';
import rvafexaImg from '../../assets/images/რვაფეხა.webp';
import taxviImg from '../../assets/images/თახვი.webp';
import begemotiImg from '../../assets/images/ბეგემოტი.webp';
import lamaImg from '../../assets/images/ლამა.webp';
import jirafiImg from '../../assets/images/ჟირაფი.webp';
import kenguruImg from '../../assets/images/კენგურუ.webp';
import buImg from '../../assets/images/ბუ.webp';
import pandaImg from '../../assets/images/პანდა.webp';
import meliaImg from '../../assets/images/მელია.webp';
import delfiniImg from '../../assets/images/დელფინი.webp';
import koalaImg from '../../assets/images/კოალა.webp';
import pingviniImg from '../../assets/images/პნგვინი.webp';
import kiborchxalaImg from '../../assets/images/კიბორჩხალა.webp';
import obobaImg from '../../assets/images/ობობა.webp';
import gveliImg from '../../assets/images/გველი.webp';
import xvlikiImg from '../../assets/images/ხვლიკი.webp';
import zvigeniImg from '../../assets/images/ზვიგენი.webp';
import farshevangiImg from '../../assets/images/ფარშევანგი.webp';
import kodalaImg from '../../assets/images/კოდალა.webp';
import aqlemiImg from '../../assets/images/აქლემი.webp';
import pepelaImg from '../../assets/images/პეპელა.webp';
import arwiviImg from '../../assets/images/არწივი.webp';

const animals = [
  { name: 'ზებრა', image: zebraImg },
  { name: 'სპილო', image: spiloImg },
  { name: 'ლომი', image: lomiImg },
  { name: 'დათვი', image: datviImg },
  { name: 'მგელი', image: mgeliImg },
  { name: 'ირემი', image: iremiImg },
  { name: 'თხა', image: txaImg },
  { name: 'კურდღელი', image: kurdgeliImg },
  { name: 'ფლამინგო', image: flamingoImg },
  { name: 'სელაპი', image: selapiImg },
  { name: 'ციყვი', image: ciyviImg },
  { name: 'ენოტი', image: enotiImg },
  { name: 'ზარმაცა', image: zarmacaImg },
  { name: 'ზღარბი', image: zgarbiImg },
  { name: 'ქამელეონი', image: qamelioniImg },
  { name: 'ოპოსუმი', image: oposumiImg },
  { name: 'რვაფეხა', image: rvafexaImg },
  { name: 'თახვი', image: taxviImg },
  { name: 'ბეგემოტი', image: begemotiImg },
  { name: 'ლამა', image: lamaImg },
  { name: 'ჟირაფი', image: jirafiImg },
  { name: 'კენგურუ', image: kenguruImg },
  { name: 'ბუ', image: buImg },
  { name: 'პანდა', image: pandaImg },
  { name: 'მელია', image: meliaImg },
  { name: 'დელფინი', image: delfiniImg },
  { name: 'კოალა', image: koalaImg },
  { name: 'პინგვინი', image: pingviniImg },
  { name: 'კიბორჩხალა', image: kiborchxalaImg },
  { name: 'ობობა', image: obobaImg },
  { name: 'გველი', image: gveliImg },
  { name: 'ხვლიკი', image: xvlikiImg },
  { name: 'ზვიგენი', image: zvigeniImg },
  { name: 'ფარშევანგი', image: farshevangiImg },
  { name: 'კოდალა', image: kodalaImg },
  { name: 'აქლემი', image: aqlemiImg },
  { name: 'პეპელა', image: pepelaImg },
  { name: 'არწივი', image: arwiviImg }
];

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-20px); }
`;

const bounceIn = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0.3);
    opacity: 0;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.8;
  }
  70% {
    transform: translate(-50%, -50%) scale(0.9);
    opacity: 0.9;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
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

const Container = styled.div`
  position: relative;
`;

const PraiseMessage = styled.div`
  position: fixed;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  background: rgba(76, 175, 80, 0.95);
  color: white;
  padding: 3rem 4rem;
  border-radius: 1.5rem;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  animation: ${bounceIn} 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  backdrop-filter: blur(10px);
  min-width: 400px;
  max-width: 90vw;

  span {
    display: block;
    font-size: 4rem;
    margin-top: 1.5rem;
    animation: bounce 1s ease infinite;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 2rem 3rem;
    min-width: 300px;

    span {
      font-size: 3rem;
    }
  }
`;

const GameContainer = styled.div`
  position: fixed;
  inset: 0;
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
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: calc(env(safe-area-inset-bottom) + 60px);

  @media (max-height: 800px) {
    padding-bottom: calc(env(safe-area-inset-bottom) + 70px);
  }

  @media (max-height: 700px) {
    padding-bottom: calc(env(safe-area-inset-bottom) + 80px);
  }

  @media (max-height: 600px) {
    padding-bottom: calc(env(safe-area-inset-bottom) + 90px);
  }
`;

const MainContentContainer = styled.div`
  width: 100%;
  max-width: min(600px, 90vw);
  background: rgba(255, 255, 255, 0.9);
  border-radius: clamp(10px, 3vw, 20px);
  padding: clamp(8px, 2vw, 15px);
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 2vw, 15px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto;

  @media (max-width: 480px) {
    padding: 8px;
    gap: 8px;
    max-width: 95vw;
  }
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
    max-height: calc(100vh - 400px);
    object-fit: contain;
  }

  @media (max-height: 700px) {
    margin: 10px auto;
    padding: 8px;
  }

  @media (max-height: 600px) {
    margin: 5px auto;
    padding: 5px;
  }
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
  min-height: calc(100vh - 120px);
  justify-content: flex-start;
  
  @media (max-height: 800px) {
    min-height: calc(100vh - 140px);
  }

  @media (max-height: 700px) {
    min-height: calc(100vh - 160px);
  }

  @media (max-height: 600px) {
    min-height: calc(100vh - 180px);
  }

  .progress-container {
    margin-bottom: clamp(3px, 1vw, 5px);
    font-size: clamp(14px, 3vw, 16px);
  }

  .game-title {
    margin: 5px 0;
    font-size: clamp(1.2em, 4vw, 1.8em);
    text-align: center;
  }

  .game-instructions {
    margin: 0;
    font-size: clamp(0.8em, 3vw, 1em);
    text-align: center;
  }

  @media (max-width: 480px) {
    padding: 5px;
    gap: 8px;
  }
`;

const LettersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(4px, 1.5vw, 8px);
  justify-content: center;
  margin: clamp(5px, 1.5vw, 10px) auto;
  width: 100%;
  padding: clamp(8px, 2vw, 15px);
  background: rgba(135, 206, 235, 0.3);
  border-radius: clamp(8px, 2vw, 15px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .letter {
    width: clamp(30px, 7vw, 40px);
    height: clamp(30px, 7vw, 40px);
    font-size: clamp(16px, 4vw, 22px);
    background: white;
    border: 2px solid #87CEEB;
    border-radius: clamp(4px, 1vw, 8px);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 480px) {
    gap: 4px;
    padding: 8px;
    
    .letter {
      width: clamp(28px, 6vw, 35px);
      height: clamp(28px, 6vw, 35px);
      font-size: clamp(14px, 3.5vw, 20px);
    }
  }
`;

const TargetContainer = styled.div`
  display: flex;
  gap: clamp(4px, 1vw, 8px);
  justify-content: center;
  margin: clamp(5px, 1.5vw, 10px) auto;
  padding: clamp(8px, 2vw, 15px);
  background: rgba(135, 206, 235, 0.3);
  border-radius: clamp(8px, 2vw, 15px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;

  .letter-slot {
    width: clamp(30px, 7vw, 40px);
    height: clamp(30px, 7vw, 40px);
    font-size: clamp(16px, 4vw, 22px);
    background: white;
    border: 2px dashed #87CEEB;
    border-radius: clamp(4px, 1vw, 8px);
    display: flex;
    align-items: center;
    justify-content: center;
    
    &.filled {
      border-style: solid;
    }
    
    &.correct {
      border-color: #4CAF50;
      background: rgba(76, 175, 80, 0.1);
    }
    
    &.wrong {
      border-color: #f44336;
      background: rgba(244, 67, 54, 0.1);
    }
  }

  @media (max-width: 480px) {
    gap: 4px;
    padding: 8px;
    
    .letter-slot {
      width: clamp(28px, 6vw, 35px);
      height: clamp(28px, 6vw, 35px);
      font-size: clamp(14px, 3.5vw, 20px);
    }
  }
`;

const ZoomControls = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: clamp(5px, 1.5vw, 10px);
  z-index: 1000;
`;

const ZoomButton = styled.button`
  width: clamp(35px, 8vw, 40px);
  height: clamp(35px, 8vw, 40px);
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  font-size: clamp(16px, 4vw, 20px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.1);
  }

  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
    font-size: 16px;
  }
`;

const scrambleWord = (word) => {
  const originalLetters = word.split('');
  let scrambledIndices = Array.from({ length: word.length }, (_, i) => i);
  
  for (let i = 0; i < word.length; i++) {
    let currentIndex = scrambledIndices[i];
    if (currentIndex === i) {
      for (let j = i + 1; j < word.length; j++) {
        if (scrambledIndices[j] !== i) {
          [scrambledIndices[i], scrambledIndices[j]] = [scrambledIndices[j], scrambledIndices[i]];
          break;
        }
      }
      if (scrambledIndices[i] === i) {
        for (let j = i - 1; j >= 0; j--) {
          if (scrambledIndices[j] !== j) {
            [scrambledIndices[i], scrambledIndices[j]] = [scrambledIndices[j], scrambledIndices[i]];
            break;
          }
        }
      }
    }
  }
  
  return scrambledIndices.map((index, i) => ({
    id: `letter-${i}`,
    content: originalLetters[index],
    originalIndex: index
  }));
};

const ScrambleGame = () => {
  const { playerName, showNameModal, gameProgress, updateGameProgress, updatePlayerName } = usePlayer();
  const [currentAnimal, setCurrentAnimal] = useState(() => {
    const availableAnimals = animals.filter(animal => 
      !gameProgress?.completedScrambleTasks?.includes(animal.name)
    );
    return availableAnimals.length > 0 
      ? availableAnimals[Math.floor(Math.random() * availableAnimals.length)]
      : animals[Math.floor(Math.random() * animals.length)];
  });
  const [scrambledLetters, setScrambledLetters] = useState(() => 
    currentAnimal ? scrambleWord(currentAnimal.name) : []
  );
  const [placedLetters, setPlacedLetters] = useState(() => 
    currentAnimal ? Array(currentAnimal.name.length).fill(null) : []
  );
  const [correctPositions, setCorrectPositions] = useState([]);
  const [wrongPosition, setWrongPosition] = useState(null);
  const [showGame, setShowGame] = useState(false);
  const lettersContainerRef = useRef(null);
  const targetContainerRef = useRef(null);
  const [draggedLetter, setDraggedLetter] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastClosing, setIsToastClosing] = useState(false);
  const [showPraise, setShowPraise] = useState(false);
  const [praiseMessage, setPraiseMessage] = useState('');
  const [scale, setScale] = useState(1);

  const selectRandomAnimal = () => {
    const availableAnimals = animals.filter(animal => 
      !gameProgress?.completedScrambleTasks?.includes(animal.name)
    );
    
    if (availableAnimals.length === 0) {
      showNotification('გილოცავთ! თქვენ ყველა ამოცანა შეასრულეთ! 🎉');
      updateGameProgress('scramble', [], {});
      const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
      initializeAnimal(randomAnimal);
      setShowGame(true);
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * availableAnimals.length);
    const randomAnimal = availableAnimals[randomIndex];
    initializeAnimal(randomAnimal);
    setShowGame(true);
  };

  const initializeAnimal = (animal) => {
    setCurrentAnimal(animal);
    setScrambledLetters(scrambleWord(animal.name));
    setPlacedLetters(Array(animal.name.length).fill(null));
    setCorrectPositions([]);
  };

  const handleDragStart = (e, letter, index) => {
    if (!letter) return;
    
    setDraggedLetter({
      letter: letter,
      index: index
    });
    e.target.classList.add('dragging');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const getRandomPraise = () => {
    const praises = [
      { text: 'ყოჩაღ! შესანიშნავად გაართვი თავი! 🌟', emoji: '🎉' },
      { text: 'ბრავო! ძალიან კარგად შეასრულე! 🏆', emoji: '⭐' },
      { text: 'არაჩვეულებრივია! გააგრძელე ასე! 🌈', emoji: '🌟' },
      { text: 'საოცარი ხარ! კიდევ ერთი წარმატება! 🎯', emoji: '🏆' },
      { text: 'შესანიშნავია! ნამდვილი გენიოსი ხარ! 🎨', emoji: '✨' }
    ];
    return praises[Math.floor(Math.random() * praises.length)];
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (!draggedLetter) return;

    if (draggedLetter.letter.content !== currentAnimal.name[targetIndex]) {
      setWrongPosition(targetIndex);
      setTimeout(() => {
        setWrongPosition(null);
      }, 500);
      return;
    }

    const newPlacedLetters = [...placedLetters];
    const newScrambledLetters = [...scrambledLetters];

    newPlacedLetters[targetIndex] = draggedLetter.letter;
    newScrambledLetters.splice(draggedLetter.index, 1);

    setPlacedLetters(newPlacedLetters);
    setScrambledLetters(newScrambledLetters);

    const newCorrectPositions = [];
    newPlacedLetters.forEach((letter, index) => {
      if (letter && letter.content === currentAnimal.name[index]) {
        newCorrectPositions.push(index);
      }
    });

    setCorrectPositions(newCorrectPositions);

    if (newCorrectPositions.length === currentAnimal.name.length) {
      const newCompletedTasks = [...gameProgress.completedScrambleTasks, currentAnimal.name];
      updateGameProgress('scramble', newCompletedTasks, {
        ...gameProgress.scrambleScores,
        [currentAnimal.name]: 3
      });
      
      const praise = getRandomPraise();
      setPraiseMessage(praise);
      setShowPraise(true);
      
      setTimeout(() => {
        setShowPraise(false);
        if (newCompletedTasks.length === animals.length) {
          showNotification('გილოცავთ! თქვენ ყველა ამოცანა შეასრულეთ! 🎉');
          updateGameProgress('scramble', [], {});
          const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
          initializeAnimal(randomAnimal);
        } else {
          const availableAnimals = animals.filter(animal => !newCompletedTasks.includes(animal.name));
          const randomIndex = Math.floor(Math.random() * availableAnimals.length);
          const randomAnimal = availableAnimals[randomIndex];
          initializeAnimal(randomAnimal);
        }
      }, 5000);
    }
  };

  const startNewGame = () => {
    const availableAnimals = animals.filter(animal => !gameProgress.completedScrambleTasks.includes(animal.name));
    
    if (availableAnimals.length === 0) {
      showNotification('გილოცავთ! თქვენ ყველა ამოცანა შეასრულეთ! 🎉');
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * availableAnimals.length);
    const randomAnimal = availableAnimals[randomIndex];
    initializeAnimal(randomAnimal);
    setShowGame(true);
  };

  const handleReset = () => {
    showNotification('თამაში იწყება თავიდან! 🎮');
    updateGameProgress('scramble', [], {});
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    initializeAnimal(randomAnimal);
    setShowGame(true);
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

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  useEffect(() => {
    const initializeGame = () => {
      const availableAnimals = animals.filter(animal => 
        !gameProgress?.completedScrambleTasks?.includes(animal.name)
      );
      if (availableAnimals.length === 0) {
        setShowGame(false);
        return;
    }

      const randomAnimal = availableAnimals[Math.floor(Math.random() * availableAnimals.length)];
      initializeAnimal(randomAnimal);
      setShowGame(true);
    };

    initializeGame();
  }, []);

  return (
    <GameContainer>
      <HomeButton />
      <GameArea scale={scale}>
        <div className="progress-container">
          <span className="progress-text">
            შესრულებულია: {gameProgress?.completedScrambleTasks?.length || 0} / 50
          </span>
        </div>
        <p className="game-instructions">გადმოიტანე ასოები და ჩასვი სწორ ადგილას</p>
        
        <MainContentContainer>
          <ImageContainer>
            <img src={currentAnimal.image} alt={currentAnimal.name} />
          </ImageContainer>
          
          <TargetContainer>
            {placedLetters.map((letter, index) => (
              <div
                key={index}
                className={`letter-slot ${correctPositions.includes(index) ? 'correct' : ''} 
                          ${letter ? 'filled' : ''} 
                          ${wrongPosition === index ? 'wrong' : ''}`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
                {letter && letter.content}
              </div>
            ))}
          </TargetContainer>
          
          <LettersContainer>
            {scrambledLetters.map((letter, index) => (
              <div
                key={letter.id}
                data-id={letter.id}
                className="letter"
                draggable={true}
                onDragStart={(e) => handleDragStart(e, letter, index)}
              >
                {letter.content}
              </div>
            ))}
          </LettersContainer>
        </MainContentContainer>
      </GameArea>
      
      <ZoomControls>
        <ZoomButton onClick={handleZoomOut}>-</ZoomButton>
        <ZoomButton onClick={handleZoomIn}>+</ZoomButton>
      </ZoomControls>
      {showNameModal && <NameModal onSubmit={updatePlayerName} />}
      {showToast && (
        <Toast isClosing={isToastClosing}>
          {toastMessage}
        </Toast>
      )}
      {showPraise && (
        <PraiseMessage>
          {praiseMessage.text}
          <span>{praiseMessage.emoji}</span>
        </PraiseMessage>
      )}
    </GameContainer>
  );
};

export default ScrambleGame; 