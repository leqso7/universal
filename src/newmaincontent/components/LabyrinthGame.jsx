import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import HomeButton from './HomeButton';
import { useNavigate } from 'react-router-dom';

const mazes = [
  // პირველი ლაბირინთი
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  // მეორე ლაბირინთი
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  // მესამე ლაბირინთი
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
];

const mazeCharacters = [
  { 
    char1: '🐱', char2: '🐶',
    target1: '🐟', target2: '🦴',
    description: 'კატა ეძებს თევზს, ძაღლი - ძვალს'
  },
  { 
    char1: '🐭', char2: '🐰',
    target1: '🧀', target2: '🥕',
    description: 'თაგვი ეძებს ყველს, კურდღელი - სტაფილოს'
  },
  { 
    char1: '🦊', char2: '🐻',
    target1: '🍗', target2: '🍯',
    description: 'მელია ეძებს ქათამს, დათვი - თაფლს'
  }
];

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(-45deg, #64ccf0cc, #80d0c7cc, #56bcbdcc, #52b69acc);
`;

const MazeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(15, 30px);
  gap: 1px;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 10px;
  margin: 20px 0;
`;

const Cell = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background-color: ${props => props.isWall ? '#4a90e2' : 'white'};
  border-radius: 4px;
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  margin: 20px 0;
  font-size: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const CharacterSelector = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;
`;

const CharacterButton = styled.button`
  padding: 10px 20px;
  font-size: 1.2rem;
  background: ${props => props.isSelected ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.7);
  }
`;

const WinMessage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.9);
  padding: 20px 40px;
  border-radius: 10px;
  font-size: 1.5rem;
  color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  text-align: center;
`;
const TestButton = styled.button`
  padding: 10px 20px;
  font-size: 1.2rem;
  background: rgba(100, 100, 255, 0.7);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 20px;

  &:hover {
    background: rgba(100, 100, 255, 0.9);
  }
`;
const LabyrinthGame = () => {
  const navigate = useNavigate();
  const [currentMaze, setCurrentMaze] = useState(0);
  const [char1Pos, setChar1Pos] = useState(null);
  const [char2Pos, setChar2Pos] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState('char1');
  const [target1Pos, setTarget1Pos] = useState(null);
  const [target2Pos, setTarget2Pos] = useState(null);
  const [char1ReachedTarget, setChar1ReachedTarget] = useState(false);
  const [char2ReachedTarget, setChar2ReachedTarget] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const currentCharacters = mazeCharacters[currentMaze];

  // თავისუფალი პოზიციის პოვნა მანძილის გათვალისწინებით
  const findFreePosition = useCallback((excludePositions = [], minDistance = 0) => {
    const freeCells = [];
    const currentMazeData = mazes[currentMaze];
    
    const calculateDistance = (pos1, pos2) => {
      return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
    };
    
    for (let y = 0; y < currentMazeData.length; y++) {
      for (let x = 0; x < currentMazeData[y].length; x++) {
        if (currentMazeData[y][x] === 0) {
          const pos = { x, y };
          const isExcluded = excludePositions.some(
            excl => excl && excl.x === x && excl.y === y
          );
          
          // შევამოწმოთ მინიმალური მანძილი ყველა არსებულ პოზიციასთან
          const hasMinDistance = excludePositions.every(excl => 
            !excl || calculateDistance(pos, excl) >= minDistance
          );
          
          if (!isExcluded && hasMinDistance) {
            freeCells.push(pos);
          }
        }
      }
    }
    
    if (freeCells.length === 0) {
      // თუ ვერ ვიპოვეთ საკმარისად დაშორებული პოზიცია, ვცადოთ ნაკლები მანძილით
      if (minDistance > 1) {
        return findFreePosition(excludePositions, minDistance - 1);
      }
      return null;
    }
    
    // დავალაგოთ უჯრები ცენტრიდან დაშორების მიხედვით
    const center = { x: 7, y: 5 };
    freeCells.sort((a, b) => {
      const distA = calculateDistance(a, center);
      const distB = calculateDistance(b, center);
      return distB - distA; // უფრო შორი უჯრები წინ
    });
    
    return freeCells[Math.floor(Math.random() * Math.min(3, freeCells.length))];
  }, [currentMaze]);

  // პოზიციების ინიციალიზაცია
  useEffect(() => {
    const initPositions = () => {
      // პირველი პერსონაჟის პოზიცია
      const char1 = findFreePosition([], 0);
      if (!char1) return;
      setChar1Pos(char1);

      // მეორე პერსონაჟის პოზიცია
      const char2 = findFreePosition([char1], 3);
      if (!char2) return;
      setChar2Pos(char2);

      // პირველი სამიზნის პოზიცია
      const target1 = findFreePosition([char1, char2], 4);
      if (!target1) return;
      setTarget1Pos(target1);

      // მეორე სამიზნის პოზიცია
      const target2 = findFreePosition([char1, char2, target1], 4);
      if (!target2) return;
      setTarget2Pos(target2);
    };

    initPositions();
  }, [currentMaze, findFreePosition]);

  // მოძრაობის ფუნქცია
  const moveCharacter = useCallback((dx, dy) => {
    const currentPos = selectedCharacter === 'char1' ? char1Pos : char2Pos;
    
    if ((selectedCharacter === 'char1' && char1ReachedTarget) || 
        (selectedCharacter === 'char2' && char2ReachedTarget)) {
      return;
    }

    const newX = currentPos.x + dx;
    const newY = currentPos.y + dy;

    if (
      newX >= 0 &&
      newX < mazes[currentMaze][0].length &&
      newY >= 0 &&
      newY < mazes[currentMaze].length &&
      mazes[currentMaze][newY][newX] === 0
    ) {
      if (selectedCharacter === 'char1') {
        setChar1Pos({ x: newX, y: newY });
      } else {
        setChar2Pos({ x: newX, y: newY });
      }
    }
  }, [selectedCharacter, char1Pos, char2Pos, char1ReachedTarget, char2ReachedTarget, currentMaze]);

  // კლავიატურის ივენთების დამუშავება
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp' || event.key === 'w' || 
          event.key === 'ArrowDown' || event.key === 's' || 
          event.key === 'ArrowLeft' || event.key === 'a' || 
          event.key === 'ArrowRight' || event.key === 'd') {
        event.preventDefault();
      }
      
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
          moveCharacter(0, -1);
          break;
        case 'ArrowDown':
        case 's':
          moveCharacter(0, 1);
          break;
        case 'ArrowLeft':
        case 'a':
          moveCharacter(-1, 0);
          break;
        case 'ArrowRight':
        case 'd':
          moveCharacter(1, 0);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveCharacter]);

  // მიზნის მიღწევის შემოწმება
  useEffect(() => {
    if (char1Pos && target1Pos && char1Pos.x === target1Pos.x && char1Pos.y === target1Pos.y) {
      setChar1ReachedTarget(true);
    }
    if (char2Pos && target2Pos && char2Pos.x === target2Pos.x && char2Pos.y === target2Pos.y) {
      setChar2ReachedTarget(true);
    }
    if (char1ReachedTarget && char2ReachedTarget) {
      setGameWon(true);
      if (currentMaze < mazes.length - 1) {
        setTimeout(() => {
          setCurrentMaze(prev => prev + 1);
          setChar1Pos(null);
          setChar2Pos(null);
          setTarget1Pos(null);
          setTarget2Pos(null);
          setChar1ReachedTarget(false);
          setChar2ReachedTarget(false);
          setGameWon(false);
        }, 1000);
      } else {
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    }
  }, [char1Pos, char2Pos, target1Pos, target2Pos, currentMaze, navigate, char1ReachedTarget, char2ReachedTarget]);

  return (
    <GameContainer>
      <HomeButton />
      <Title>ლაბირინთი</Title>
      {gameWon && currentMaze === mazes.length - 1 && (
        <WinMessage>
          გილოცავთ! თქვენ გაიარეთ ყველა დონე! 🎉
        </WinMessage>
      )}
      {gameWon && currentMaze < mazes.length - 1 && (
        <WinMessage>
          გილოცავთ! გადადიხართ შემდეგ დონეზე! 🎮
        </WinMessage>
      )}
      <CharacterSelector>
        <CharacterButton
          isSelected={selectedCharacter === 'char1'}
          onClick={() => setSelectedCharacter('char1')}
        >
          {currentCharacters.char1}
        </CharacterButton>
        <CharacterButton
          isSelected={selectedCharacter === 'char2'}
          onClick={() => setSelectedCharacter('char2')}
        >
          {currentCharacters.char2}
        </CharacterButton>
      </CharacterSelector>
      <MazeContainer>
        {mazes[currentMaze].map((row, y) => (
          row.map((cell, x) => (
            <Cell
              key={`${x}-${y}`}
              isWall={cell === 1}
            >
              {char1Pos && char1Pos.x === x && char1Pos.y === y ? currentCharacters.char1 :
               char2Pos && char2Pos.x === x && char2Pos.y === y ? currentCharacters.char2 :
               target1Pos && target1Pos.x === x && target1Pos.y === y && !char1ReachedTarget ? currentCharacters.target1 :
               target2Pos && target2Pos.x === x && target2Pos.y === y && !char2ReachedTarget ? currentCharacters.target2 :
               ''}
               
            </Cell>
          ))
        ))}
      </MazeContainer>
    </GameContainer>
  );
};

export default LabyrinthGame;