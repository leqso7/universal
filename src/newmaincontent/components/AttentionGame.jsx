import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext.jsx';
import HomeButton from './HomeButton';

const GameContainer = styled.div`
  position: fixed;
  inset: 0;
  margin: 0;
  padding: 1rem;
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
  background-size: 200% 200%;
  animation: gradientBG 10s linear infinite;
  overflow-y: auto;
  overflow-x: hidden;
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s ease, visibility 0.3s ease;

  &.loading {
    opacity: 0;
    visibility: hidden;
  }

  @media (max-height: 800px) {
    padding: 0.5rem;
  }

  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const Task = styled.h2`
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin: 0;
  text-align: center;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;

  span {
    font-size: clamp(2rem, 5vw, 2.5rem);
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
  }
`;

const Progress = styled.div`
  font-size: clamp(1.1rem, 2.8vw, 1.4rem);
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin: 0;
  text-align: center;
  font-weight: 500;
`;

const GameArea = styled.div`
  width: 100%;
  max-width: min(95vw, 600px);
  margin: 0 auto;
  padding: 10px;
  transform: scale(${props => props.scale});
  transform-origin: center top;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1.5vh;
  opacity: 1;
  visibility: visible;
  transition: all 0.3s ease;

  &.loading {
    opacity: 0;
    visibility: hidden;
  }

  @media (min-width: 1200px) {
    max-width: 550px;
    gap: 2vh;
  }

  @media (max-width: 768px) {
    padding: 5px;
    gap: 1vh;
  }

  @media (max-height: 800px) {
    gap: 1vh;
  }

  @media (max-height: 600px) {
    gap: 0.5vh;
  }
`;

const GameTitle = styled.h1`
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin: 0;
  text-align: center;
  padding-top: 1vh;
`;

const EmojiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 3px;
  background: rgba(255, 255, 255, 0.9);
  padding: 8px;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 95%;
  max-width: min(95vw, 500px);
  aspect-ratio: 1;
  margin: 1vh auto;

  @media (min-width: 1200px) {
    max-width: 480px;
    gap: 4px;
    padding: 10px;
  }

  @media (max-width: 768px) {
    gap: 2px;
    padding: 6px;
    width: 98%;
  }

  @media (max-width: 480px) {
    gap: 1px;
    padding: 4px;
    width: 100%;
  }

  @media (max-height: 800px) {
    max-width: min(95vw, 450px);
    padding: 6px;
  }

  @media (max-height: 600px) {
    max-width: min(95vw, 400px);
    padding: 4px;
    gap: 1px;
  }
`;

const EmojiCell = styled.div`
  font-size: clamp(1rem, 2vw, 1.3rem);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 2px;
  border-radius: 6px;
  transition: all 0.2s ease;
  background-color: ${props => 
    props.isFound ? 'rgba(76, 175, 80, 0.2)' : 
    props.$isWrong ? 'rgba(244, 67, 54, 0.2)' :
    'transparent'
  };
  aspect-ratio: 1;
  opacity: ${props => props.$loading ? '0' : '1'};
  transform: scale(${props => props.$loading ? '0.95' : '1'});
  transition: opacity 0.3s ease, transform 0.3s ease, background-color 0.2s ease;

  &:hover {
    background: ${props => 
      props.isFound ? 'rgba(76, 175, 80, 0.3)' : 
      props.$isWrong ? 'rgba(244, 67, 54, 0.3)' :
      'rgba(0, 0, 0, 0.1)'
    };
    transform: scale(1.05);
  }

  @media (min-width: 1200px) {
    font-size: 1.2rem;
    padding: 3px;
  }

  @media (max-width: 768px) {
    font-size: clamp(0.8rem, 1.8vw, 1.1rem);
    padding: 1px;
  }

  @media (max-height: 800px) {
    font-size: clamp(0.9rem, 1.8vw, 1.1rem);
    padding: 1px;
  }

  @media (max-height: 600px) {
    font-size: clamp(0.7rem, 1.5vw, 0.9rem);
    padding: 0;
  }
`;

const SuccessMessage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(76, 175, 80, 0.9);
  color: white;
  padding: clamp(15px, 4vw, 20px) clamp(20px, 6vw, 40px);
  border-radius: 10px;
  font-size: clamp(1.2rem, 4vw, 24px);
  font-weight: bold;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  white-space: nowrap;
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

const AttentionGame = () => {
  const [emojis, setEmojis] = useState([]);
  const [targetEmojis, setTargetEmojis] = useState({ first: '', second: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [foundPairs, setFoundPairs] = useState(new Set());
  const [foundCount, setFoundCount] = useState(0);
  const [scale, setScale] = useState(1);
  const { updateGameProgress } = usePlayer();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [wrongPair, setWrongPair] = useState(null);

  const allEmojis = [
    // ხილი და ბოსტნეული
    '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍒', '🍑', '🥭', 
    '🍍', '🥥', '🥝', '🍅', '🥑', '🥦', '🥬', '🥒', '🥕', '🌽', '🥗', '🥔',
    '🧄', '🧅', '🥜', '🌶️', '🫑', '🥖', '🥨', '🥯',
    
    // ცხოველები
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮',
    '🐷', '🐸', '🐵', '🐔', '🦆', '🦅', '🦉', '🦇', '🐝', '🦋', '🐌', '🐞',
    
    // სახეები და ჟესტები
    '😀', '😊', '🥰', '😎', '🤓', '🤠', '🤡', '👻', '👾', '🤖', '👋', '🖐️',
    
    // სპორტი და აქტივობები
    '⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🎱', '🎮', '🎲', '🎨', '🎭', '🎪',
    
    // ტრანსპორტი
    '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '✈️', '🚀', '🛸',
    
    // ბუნება და ამინდი
    '🌸', '🌺', '🌻', '🌹', '🌈', '☀️', '🌙', '⭐', '🌟', '❄️', '🌊', '🌴',
    
    // საჭმელი
    '🍕', '🍔', '🌭', '🥪', '🌮', '🌯', '🥙', '🍜', '🍝', '🍣', '🍦', '🍩',
    
    // სხვადასხვა
    '💎', '🎈', '🎁', '🎪', '🎡', '🎢', '🗽', '🎭', '🎨', '🎯', '🎳', '🎸'
  ];

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const createGameBoard = () => {
    const shuffledEmojis = shuffleArray(allEmojis);
    const selectedEmojis = shuffledEmojis.slice(0, 2);
    const [first, second] = selectedEmojis;
    setTargetEmojis({ first, second });

    // ვქმნით ცარიელ დაფას
    const board = new Array(64).fill(null);
    
    // ვირჩევთ პოზიციებს წყვილებისთვის, მაგრამ ვრჩებით დარწმუნებული რომ ისინი საკმარისად დაშორებული არიან
    const availablePositions = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 7; col++) { // 7 რადგან ბოლო სვეტში წყვილი ვერ დაიწყება
        availablePositions.push(row * 8 + col);
      }
    }

    const selectedPositions = [];
    let attempts = 0;
    const maxAttempts = 100;

    while (selectedPositions.length < 7 && attempts < maxAttempts) {
      const pos = availablePositions[Math.floor(Math.random() * availablePositions.length)];
      const row = Math.floor(pos / 8);
      const col = pos % 8;

      // ვამოწმებთ არის თუ არა ეს პოზიცია და მისი მეზობელი პოზიციები თავისუფალი
      let isSafe = true;
      
      // ვამოწმებთ მიმდებარე უჯრებს (ზემოთ, ქვემოთ, მარცხნივ, მარჯვნივ და დიაგონალზე)
      for (let r = Math.max(0, row - 1); r <= Math.min(7, row + 1); r++) {
        for (let c = Math.max(0, col - 1); c <= Math.min(7, col + 2); c++) {
          const checkPos = r * 8 + c;
          if (board[checkPos] !== null) {
            isSafe = false;
            break;
          }
        }
        if (!isSafe) break;
      }

      if (isSafe && col < 7) { // ვრწმუნდებით რომ წყვილი არ გადავა ახალ ხაზზე
        board[pos] = first;
        board[pos + 1] = second;
        selectedPositions.push(pos);
        
        // ვშლით გამოყენებულ პოზიციებს
        const index = availablePositions.indexOf(pos);
        if (index > -1) {
          availablePositions.splice(index, 1);
          if (index < availablePositions.length) {
            availablePositions.splice(index, 1); // ვშლით მეზობელ პოზიციასაც
          }
        }
      }
      attempts++;
    }

    // თუ ვერ მოვახერხეთ 7 წყვილის განთავსება, ვცდით თავიდან
    if (selectedPositions.length < 7) {
      return createGameBoard();
    }

    // ვავსებთ დანარჩენ ცარიელ უჯრებს
    const remainingEmojis = shuffledEmojis.slice(2);
    for (let i = 0; i < 64; i++) {
      if (board[i] === null) {
        board[i] = remainingEmojis[Math.floor(Math.random() * remainingEmojis.length)];
      }
    }

    return board;
  };

  const initializeGame = () => {
    const board = createGameBoard();
    setEmojis(board);
    setFoundPairs(new Set());
    setFoundCount(0);
  };

  useEffect(() => {
    initializeGame();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const checkAdjacentEmojis = (index) => {
    const row = Math.floor(index / 8);
    const col = index % 8;

    // მხოლოდ ჰორიზონტალური შემოწმება
    if (col < 7) {
      const currentPair = `${row}-${col}`;
      const nextPair = `${row}-${col + 1}`;
      
      // ვამოწმებთ არის თუ არა ეს წყვილი უკვე ნაპოვნი
      if (!foundPairs.has(currentPair) && !foundPairs.has(nextPair)) {
        const isCorrectPair = (
          (emojis[index] === targetEmojis.first && emojis[index + 1] === targetEmojis.second) ||
          (emojis[index] === targetEmojis.second && emojis[index + 1] === targetEmojis.first)
        );

        if (isCorrectPair) {
          const newFoundPairs = new Set(foundPairs);
          newFoundPairs.add(currentPair);
          setFoundPairs(newFoundPairs);
          setFoundCount(prev => {
            const newCount = prev + 1;
            if (newCount === 7) {
              setShowSuccess(true);
              updateGameProgress('attention', Date.now(), { score: 100 });
              setTimeout(() => {
                setShowSuccess(false);
                initializeGame();
              }, 2000);
            }
            return newCount;
          });
        } else {
          // არასწორი წყვილის შემთხვევაში
          setWrongPair({ start: index, end: index + 1 });
          setTimeout(() => {
            setWrongPair(null);
          }, 500); // 500მს შემდეგ გაქრება წითელი ფერი
        }
      }
    }
  };

  const isFoundPair = (index) => {
    const row = Math.floor(index / 8);
    const col = index % 8;
    const currentPair = `${row}-${col}`;
    const previousPair = `${row}-${col - 1}`;
    const nextPair = `${row}-${col + 1}`;
    
    // მხოლოდ იმ შემთხვევაში ვაბრუნებთ true-ს, თუ ეს უჯრა არის ნაპოვნი წყვილის ნაწილი
    if (foundPairs.has(currentPair)) {
      return true;
    }
    if (col > 0 && foundPairs.has(previousPair) && 
        ((emojis[index - 1] === targetEmojis.first && emojis[index] === targetEmojis.second) ||
         (emojis[index - 1] === targetEmojis.second && emojis[index] === targetEmojis.first))) {
      return true;
    }
    return false;
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  return (
    <GameContainer className={isLoading ? 'loading' : ''}>
      <HomeButton />
      <GameArea scale={scale} className={isLoading ? 'loading' : ''}>
        <Task>
          იპოვე <span>{targetEmojis.first}</span> და <span>{targetEmojis.second}</span> გვერდიგვერდ
        </Task>
        <Progress>
          ნაპოვნია: {foundCount}/7 წყვილი
        </Progress>
        <EmojiGrid>
          {emojis.map((emoji, index) => (
            <EmojiCell
              key={index}
              onClick={() => checkAdjacentEmojis(index)}
              isFound={isFoundPair(index)}
              $loading={isLoading}
              $isWrong={wrongPair && (index === wrongPair.start || index === wrongPair.end)}
            >
              {emoji}
            </EmojiCell>
          ))}
        </EmojiGrid>
      </GameArea>
      <ZoomControls>
        <ZoomButton onClick={handleZoomOut}>-</ZoomButton>
        <ZoomButton onClick={handleZoomIn}>+</ZoomButton>
      </ZoomControls>
      {showSuccess && (
        <SuccessMessage>
          გილოცავ! ყველა წყვილი იპოვე! 🎉
        </SuccessMessage>
      )}
    </GameContainer>
  );
};

export default AttentionGame; 