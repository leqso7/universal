import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import HomeButton from './HomeButton';
import { usePlayer } from '../context/PlayerContext.jsx';
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

const shapes = [
  // ძირითადი ფიგურები
  { id: 1, src: '⭕', name: 'წრე' },
  { id: 2, src: '⬛', name: 'კვადრატი' },
  { id: 3, src: '🔺', name: 'სამკუთხედი' },
  { id: 4, src: '🔷', name: 'ექვსკუთხედი' },
  { id: 5, src: '⭐', name: 'ვარსკვლავი' },
  { id: 6, src: '💠', name: 'რომბი' },
  
  // ფერადი კვადრატები
  { id: 7, src: '🟥', name: 'წითელი კვადრატი' },
  { id: 8, src: '🟦', name: 'ლურჯი კვადრატი' },
  { id: 9, src: '🟨', name: 'ყვითელი კვადრატი' },
  { id: 10, src: '🟩', name: 'მწვანე კვადრატი' },
  { id: 11, src: '🟧', name: 'ნარინჯისფერი კვადრატი' },
  { id: 12, src: '🟪', name: 'იისფერი კვადრატი' },
  { id: 13, src: '⬜', name: 'თეთრი კვადრატი' },
  
  // რომბები და სამკუთხედები
  { id: 14, src: '🔶', name: 'ნარინჯისფერი რომბი' },
  { id: 15, src: '🔸', name: 'პატარა რომბი' },
  { id: 16, src: '🔹', name: 'პატარა ლურჯი რომბი' },
  { id: 17, src: '🔻', name: 'წითელი სამკუთხედი' },
  { id: 18, src: '🔲', name: 'შავი კვადრატი თეთრი ჩარჩოთი' },
  { id: 19, src: '🔳', name: 'თეთრი კვადრატი შავი ჩარჩოთი' },
  
  // ვარსკვლავები და მსგავსი ფორმები
  { id: 20, src: '✡️', name: 'ექვსქიმიანი ვარსკვლავი' },
  { id: 21, src: '✴️', name: 'რვაქიმიანი ვარსკვლავი' },
  { id: 22, src: '✳️', name: 'რვაქიმიანი ვარსკვლავი 2' },
  { id: 23, src: '❇️', name: 'მბზინავი ვარსკვლავი' },
  { id: 24, src: '⚜️', name: 'ჰერალდიკური შროშანი' },
  
  // წრეები და დისკები
  { id: 25, src: '⚫', name: 'შავი წრე' },
  { id: 26, src: '⚪', name: 'თეთრი წრე' },
  { id: 27, src: '🔴', name: 'წითელი წრე' },
  { id: 28, src: '🔵', name: 'ლურჯი წრე' },
  { id: 29, src: '⭕', name: 'წითელი წრიული ჩარჩო' },
  
  // მათემატიკური სიმბოლოები
  { id: 30, src: '➕', name: 'პლუსი' },
  { id: 31, src: '➖', name: 'მინუსი' },
  { id: 32, src: '✖️', name: 'გამრავლება' },
  { id: 33, src: '➗', name: 'გაყოფა' },
  { id: 34, src: '〰️', name: 'ტალღოვანი ხაზი' },
  
  // ისრები
  { id: 35, src: '⬆️', name: 'ზემოთ ისარი' },
  { id: 36, src: '➡️', name: 'მარჯვნივ ისარი' },
  { id: 37, src: '⬇️', name: 'ქვემოთ ისარი' },
  { id: 38, src: '⬅️', name: 'მარცხნივ ისარი' },
  { id: 39, src: '↗️', name: 'დიაგონალური ისარი ზემოთ' },
  { id: 40, src: '↘️', name: 'დიაგონალური ისარი ქვემოთ' },
  
  // დამატებითი სიმბოლოები
  { id: 41, src: '🎯', name: 'სამიზნე' },
  { id: 42, src: '🔆', name: 'მზის სიმბოლო' },
  { id: 43, src: '✨', name: 'ნაპერწკლები' },
  { id: 44, src: '💫', name: 'მბრუნავი ვარსკვლავი' },
  { id: 45, src: '🌟', name: 'მბზინავი ვარსკვლავი' },
  
  // ახალი ემოჯი სიმბოლოები
  { id: 46, src: '🎨', name: 'პალიტრა' },
  { id: 47, src: '🎭', name: 'თეატრის ნიღბები' },
  { id: 48, src: '🎪', name: 'ცირკის კარავი' },
  { id: 49, src: '🎡', name: 'ბორბალი' },
  { id: 50, src: '🎢', name: 'ამერიკული მთები' }
];

const getImages = () => {
  const images = [
    { id: 1, src: zebraImg },
    { id: 2, src: spiloImg },
    { id: 3, src: lomiImg },
    { id: 4, src: datviImg },
    { id: 5, src: mgeliImg },
    { id: 6, src: iremiImg },
    { id: 7, src: txaImg },
    { id: 8, src: kurdgeliImg },
    { id: 9, src: flamingoImg },
    { id: 10, src: selapiImg },
    { id: 11, src: ciyviImg },
    { id: 12, src: enotiImg },
    { id: 13, src: zarmacaImg },
    { id: 14, src: zgarbiImg },
    { id: 15, src: qamelioniImg },
    { id: 16, src: oposumiImg },
    { id: 17, src: rvafexaImg },
    { id: 18, src: taxviImg },
    { id: 19, src: begemotiImg },
    { id: 20, src: lamaImg },
    { id: 21, src: jirafiImg },
    { id: 22, src: kenguruImg },
    { id: 23, src: buImg },
    { id: 24, src: pandaImg },
    { id: 25, src: meliaImg },
    { id: 26, src: delfiniImg },
    { id: 27, src: koalaImg },
    { id: 28, src: pingviniImg },
    { id: 29, src: kiborchxalaImg },
    { id: 30, src: obobaImg },
    { id: 31, src: gveliImg },
    { id: 32, src: xvlikiImg },
    { id: 33, src: zvigeniImg },
    { id: 34, src: farshevangiImg },
    { id: 35, src: kodalaImg },
    { id: 36, src: aqlemiImg },
    { id: 37, src: pepelaImg },
    { id: 38, src: arwiviImg }
  ];
  return images;
};

const shuffleArray = (array) => {
  const shuffled = JSON.parse(JSON.stringify(array));
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const shakeAnimation = keyframes`
  0% { transform: translateX(0); background-color: rgba(255, 0, 0, 0.3); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); background-color: transparent; }
`;

const ImageContainer = styled.div`
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
  aspect-ratio: 1;
  &.wrong {
    animation: ${shakeAnimation} 0.5s ease-in-out;
  }
`;

const PerceptionGame = () => {
  const [topImages, setTopImages] = useState([]);
  const [bottomImages, setBottomImages] = useState([]);
  const [selectedTopIndex, setSelectedTopIndex] = useState(null);
  const [selectedBottomIndex, setSelectedBottomIndex] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [hiddenBottomIndices, setHiddenBottomIndices] = useState([]);
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [scale, setScale] = useState(1);
  const [isShapesMode, setIsShapesMode] = useState(false);
  const [wrongPair, setWrongPair] = useState(null);
  const { updateGameProgress } = usePlayer();

  useEffect(() => {
    loadNewRound();
  }, []);

  const loadNewRound = () => {
    if (isShapesMode) {
      const availableShapes = [...shapes];
      const randomShapes = [];
      while (randomShapes.length < 4) {
        const randomIndex = Math.floor(Math.random() * availableShapes.length);
        const shape = availableShapes[randomIndex];
        randomShapes.push({
          id: shape.id,
          name: shape.name,
          src: shape.src
        });
        availableShapes.splice(randomIndex, 1);
      }
      
      setTopImages(randomShapes);
      const bottomShapes = [...randomShapes];
      
      // დავრწმუნდეთ რომ სწორი წყვილები არ არის ერთმანეთის მოპირდაპირედ
      for (let i = 0; i < bottomShapes.length; i++) {
        if (bottomShapes[i].id === randomShapes[i].id) {
          const swapIndex = (i + Math.floor(bottomShapes.length / 2)) % bottomShapes.length;
          [bottomShapes[i], bottomShapes[swapIndex]] = [bottomShapes[swapIndex], bottomShapes[i]];
        }
      }
      
      setBottomImages(bottomShapes);
    } else {
      const allImages = getImages();
      const randomIndices = [];
      while (randomIndices.length < 4) {
        const randomIndex = Math.floor(Math.random() * allImages.length);
        if (!randomIndices.includes(randomIndex)) {
          randomIndices.push(randomIndex);
        }
      }
      
      const selectedImages = randomIndices.map(index => allImages[index]);
      setTopImages(selectedImages);
      
      const bottomImages = [...selectedImages];
      // დავრწმუნდეთ რომ სწორი წყვილები არ არის ერთმანეთის მოპირდაპირედ
      for (let i = 0; i < bottomImages.length; i++) {
        if (bottomImages[i] === selectedImages[i]) {
          const swapIndex = (i + Math.floor(bottomImages.length / 2)) % bottomImages.length;
          [bottomImages[i], bottomImages[swapIndex]] = [bottomImages[swapIndex], bottomImages[i]];
        }
      }
      
      setBottomImages(bottomImages);
    }
    
    setSelectedTopIndex(null);
    setSelectedBottomIndex(null);
    setMatchedPairs([]);
    setHiddenBottomIndices([]);
  };

  useEffect(() => {
    loadNewRound();
  }, [isShapesMode]);

  const handleTopImageClick = (index) => {
    if (matchedPairs.includes(index)) return;
    setSelectedTopIndex(index);
  };

  const handleBottomImageClick = (index) => {
    if (selectedTopIndex === null || hiddenBottomIndices.includes(index)) return;

    setSelectedBottomIndex(index);
    setTotalAttempts(prev => prev + 1);

    const isMatch = isShapesMode
      ? bottomImages[index].id === topImages[selectedTopIndex].id
      : bottomImages[index].id === topImages[selectedTopIndex].id;

    if (isMatch) {
      setMatchedPairs(prev => [...prev, selectedTopIndex]);
      setHiddenBottomIndices(prev => [...prev, index]);
      setScore(prev => prev + 1);
      setSelectedTopIndex(null);
      setSelectedBottomIndex(null);

      if (matchedPairs.length + 1 === topImages.length) {
        setTimeout(() => {
          updateGameProgress('perception', score + 1, totalAttempts + 1);
          loadNewRound();
        }, 1000);
      }
    } else {
      setWrongPair({ top: selectedTopIndex, bottom: index });
      setTimeout(() => {
        setSelectedTopIndex(null);
        setSelectedBottomIndex(null);
        setWrongPair(null);
      }, 1000);
    }
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  return (
    <GameContainer>
      <HomeButton />
      <>
        <Title>აღქმის განსავითარებელი სავარჯიშოები</Title>
        <div>
          <ModeButton 
            onClick={() => {
              setIsShapesMode(false);
              loadNewRound();
            }}
            className={!isShapesMode ? 'active' : ''}
          >
            ცხოველები
          </ModeButton>
          <ModeButton 
            onClick={() => {
              setIsShapesMode(true);
              loadNewRound();
            }}
            className={isShapesMode ? 'active' : ''}
          >
            ფიგურები
          </ModeButton>
        </div>
        <GameArea scale={scale}>
          <TopArea>
            <TopImages>
              {topImages.map((item, index) => (
                <ImageContainer 
                  key={`top-${index}`} 
                  isClickable={!matchedPairs.includes(index)}
                  onClick={() => handleTopImageClick(index)}
                  isMatched={matchedPairs.includes(index)}
                  className={wrongPair?.top === index ? 'wrong' : ''}
                  style={{ 
                    border: selectedTopIndex === index ? '3px solid #4CAF50' : 'none',
                    padding: '5px',
                    opacity: selectedTopIndex === index ? 0.7 : 1
                  }}
                >
                  {isShapesMode ? (
                    <ShapeText
                      isBottom={false}
                      isMatched={matchedPairs.includes(index)}
                    >
                      {item.src}
                    </ShapeText>
                  ) : (
                    <Image 
                      id={`top-${index}`}
                      src={item.src}
                      alt={`Top half ${index + 1}`}
                      isBottom={false}
                      isMatched={matchedPairs.includes(index)}
                    />
                  )}
                </ImageContainer>
              ))}
            </TopImages>
          </TopArea>
          <BottomArea>
            <BottomImages>
              {bottomImages.map((item, index) => (
                <ImageContainer 
                  key={`bottom-${index}`}
                  isClickable={selectedTopIndex !== null}
                  onClick={() => handleBottomImageClick(index)}
                  isHidden={hiddenBottomIndices.includes(index)}
                  className={wrongPair?.bottom === index ? 'wrong' : ''}
                  style={{
                    border: selectedBottomIndex === index ? '3px solid #4CAF50' : 'none',
                    padding: '5px',
                    opacity: hiddenBottomIndices.includes(index) ? 0 : 1
                  }}
                >
                  {isShapesMode ? (
                    <ShapeText
                      isBottom={true}
                      isMatched={false}
                    >
                      {item.src}
                    </ShapeText>
                  ) : (
                    <Image 
                      id={`bottom-${index}`}
                      src={item.src}
                      alt={`Bottom half ${index + 1}`}
                      isBottom={true}
                      isSelected={selectedBottomIndex === index}
                    />
                  )}
                </ImageContainer>
              ))}
            </BottomImages>
          </BottomArea>
        </GameArea>
        <ZoomControls>
          <ZoomButton onClick={handleZoomOut}>-</ZoomButton>
          <ZoomButton onClick={handleZoomIn}>+</ZoomButton>
        </ZoomControls>
      </>
    </GameContainer>
  );
};

const gradientBG = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const GameContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(-45deg, #64ccf0cc, #80d0c7cc, #56bcbdcc, #52b69acc);
  background-size: 400% 400%;
  animation: ${gradientBG} 10s linear infinite;
  overflow: auto;
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  margin: 20px 0;
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const Score = styled.div`
  color: white;
  text-align: center;
  font-size: 1.5rem;
  margin: 10px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const GameArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 800px;
  margin: 0 auto;
  padding: 20px;
  transform: scale(${props => props.scale});
  transform-origin: center top;
`;

const TopArea = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 180px;
  display: flex;
  align-items: center;
`;

const BottomArea = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 180px;
  display: flex;
  align-items: center;
`;

const TopImages = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
`;

const BottomImages = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 200%;
  object-fit: cover;
  border-radius: 8px;
  object-position: center;
  clip-path: ${props => props.isBottom ? 'inset(50% 0 0 0)' : 'inset(0 0 50% 0)'};
  transform: ${props => props.isBottom ? 'translateY(-50%)' : 'none'};
  transition: all 0.3s ease;
  ${props => props.isMatched && `
    clip-path: none;
    height: 100%;
    transform: none;
    object-position: center;
  `}
`;

const ShapeText = styled.div`
  width: 100%;
  height: 200%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8rem;
  clip-path: ${props => props.isBottom ? 'inset(50% 0 0 0)' : 'inset(0 0 50% 0)'};
  transform: ${props => props.isBottom ? 'translateY(-50%)' : 'none'};
  transition: all 0.3s ease;
  position: absolute;
  top: 0;
  ${props => props.isMatched && `
    clip-path: none;
    height: 100%;
    position: relative;
    transform: none;
  `}
`;

const ZoomControls = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
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

const ModeButton = styled.button`
  padding: 10px 20px;
  margin: 10px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-2px);
  }

  &.active {
    background: #4CAF50;
    color: white;
  }
`;

const PlayerInfo = styled.div`
  color: white;
  text-align: center;
  font-size: 1.2rem;
  margin: 10px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 16px;
  border-radius: 8px;
  backdrop-filter: blur(4px);
`;

export default PerceptionGame;
