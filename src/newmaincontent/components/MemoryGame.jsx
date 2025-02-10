import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext.jsx';
import HomeButton from './HomeButton';
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
  overflow: ${props => props.isSetup ? 'auto' : 'hidden'};

  * {
    max-width: 100vw;
    box-sizing: border-box;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SetupContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 40px auto;
  background: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  animation: fadeIn 0.5s ease-out;

  @media (max-width: 768px) {
    padding: 30px;
    margin: 20px auto;
  }

  @media (max-width: 480px) {
    padding: 20px;
    margin: 10px auto;
  }

  h1 {
    color: #2c3e50;
    font-size: 2.5em;
    margin-bottom: 30px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }

  h2 {
    color: #34495e;
    font-size: 1.5em;
    margin-bottom: 25px;
    font-weight: 500;
  }
`;

const NumberSelect = styled.select`
  padding: 15px 25px;
  margin: 20px;
  font-size: 18px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  background-color: white;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;
  width: 80%;
  max-width: 300px;
  color: #2c3e50;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 15px;

  &:hover {
    border-color: #4CAF50;
    box-shadow: 0 2px 8px rgba(76, 175, 80, 0.2);
  }

  &:focus {
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
  }
`;

const GameModeToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin: 30px 0;
  padding: 5px;
  background: #f5f5f5;
  border-radius: 15px;
  width: 90%;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

const ToggleButton = styled.button`
  padding: 12px 24px;
  background-color: ${props => props.active ? '#4CAF50' : 'transparent'};
  color: ${props => props.active ? 'white' : '#666'};
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  flex: 1;

  &:hover {
    background-color: ${props => props.active ? '#45a049' : '#e0e0e0'};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const StartButton = styled.button`
  padding: 16px 40px;
  margin: 30px;
  font-size: 20px;
  background: linear-gradient(45deg, #4CAF50, #45a049);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
  width: 80%;
  max-width: 300px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;

  &:hover {
    background: linear-gradient(45deg, #45a049, #4CAF50);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 10px rgba(76, 175, 80, 0.3);
  }
`;

const GameTitle = styled.h1`
  font-size: 3em;
  color: #2c3e50;
  margin-bottom: 40px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  font-weight: 700;
  letter-spacing: -1px;
  
  span {
    color: #4CAF50;
  }
`;

const ImagesGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => {
    if (props.imageCount <= 3) return 'repeat(3, 1fr)';
    if (props.imageCount === 4) return 'repeat(4, 1fr)';
    return 'repeat(5, 1fr)';
  }};
  gap: 6px;
  width: 100%;
  max-width: ${props => {
    if (props.imageCount <= 3) return '700px';
    if (props.imageCount === 4) return '850px';
    return '1000px';
  }};
  justify-items: center;
  align-items: center;
  padding: 6px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: ${props => {
      if (props.imageCount <= 3) return 'repeat(3, 1fr)';
      return 'repeat(auto-fit, minmax(140px, 1fr))';
    }};
    gap: 5px;
    padding: 5px;
  }

  @media (max-width: 480px) {
    grid-template-columns: ${props => {
      if (props.imageCount <= 3) return 'repeat(3, 1fr)';
      return 'repeat(auto-fit, minmax(110px, 1fr))';
    }};
    gap: 4px;
    padding: 3px;
  }
`;

const SuccessAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const OrderAnimation = keyframes`
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ReorderAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  20% {
    transform: scale(1.1);
  }
  40% {
    transform: scale(1.1) translateY(-20px);
  }
  100% {
    transform: scale(1) translateY(0);
  }
`;

const ImageCard = styled.div`
  border: 2px solid ${props => props.isSelected ? '#4CAF50' : '#ddd'};
  border-radius: 10px;
  padding: 6px;
  cursor: ${props => props.isPlayable ? 'pointer' : 'not-allowed'};
  transition: all 0.3s ease;
  position: relative;
  width: 100%;
  max-width: ${props => {
    if (props.imageCount <= 3) return '200px';
    if (props.imageCount === 4) return '180px';
    return '160px';
  }};
  min-width: 110px;
  height: auto;
  aspect-ratio: 3/4;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  animation: ${props => {
    if (props.showSuccessAnimation) return SuccessAnimation;
    if (props.isReordering) return ReorderAnimation;
    return 'none';
  }} 0.5s ease;
  animation-delay: ${props => props.$reorderDelay}s;
  animation-fill-mode: forwards;

  @media (max-width: 768px) {
    max-width: 160px;
    padding: 5px;
  }

  @media (max-width: 480px) {
    max-width: 130px;
    padding: 4px;
  }

  img {
    width: 100%;
    height: auto;
    max-height: 75%;
    object-fit: contain;
    margin-bottom: 4px;
  }

  p {
    margin: 3px 0;
    font-size: 14px;
    text-align: center;
    
    @media (max-width: 480px) {
      font-size: 12px;
    }
  }

  .order-number {
    position: absolute;
    top: -15px;
    right: -15px;
    width: 35px;
    height: 35px;
    background-color: #4CAF50;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 18px;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    animation: ${OrderAnimation} 0.5s ease forwards;
  }
`;

const Timer = styled.div`
  font-size: 32px;
  margin: 30px;
  color: #333;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;

  .hourglass {
    font-size: 36px;
    animation: rotate 2s infinite linear;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Message = styled.div`
  font-size: 24px;
  margin: 20px 10px;
  color: #333;
  font-weight: bold;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 0.3s ease;

  @media (max-width: 768px) {
    font-size: 20px;
    margin: 15px 8px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    margin: 10px 5px;
  }
`;

const SuccessMessage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(76, 175, 80, 0.9);
  color: white;
  padding: 20px 40px;
  border-radius: 10px;
  font-size: 24px;
  font-weight: bold;
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ErrorMessage = styled(SuccessMessage)`
  background-color: rgba(244, 67, 54, 0.9);
`;

const OptionCard = styled(ImageCard)`
  cursor: pointer;
  opacity: ${props => props.disabled ? 0.5 : 1};
  transform: ${props => props.selected ? 'scale(1.02)' : 'none'};
  border-color: ${props => props.selected ? '#4CAF50' : '#ddd'};
  margin: 0;
  min-width: unset;
  width: 100%;
  max-width: 160px;
  flex: 1;
  transition: all 0.2s ease;

  &:hover {
    transform: ${props => props.disabled ? 'none' : 'scale(1.02)'};
    border-color: #4CAF50;
  }

  img {
    height: 200px;
    object-fit: contain;
  }

  p {
    margin: 8px 0;
    font-size: 18px;
  }

  @media (max-width: 768px) {
    max-width: 140px;
  }

  @media (max-width: 480px) {
    max-width: 120px;
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 6px;
  width: 100%;
  max-width: 90%;
  background: rgba(255, 255, 255, 0.9);
  padding: 6px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  justify-items: center;
  margin: 6px auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 5px;
    padding: 5px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
    gap: 4px;
    padding: 4px;
    max-width: 95%;
  }
`;

const AnimatedImageCard = styled(ImageCard)`
  animation: ${ReorderAnimation} 0.5s ease forwards;
`;

const GameArea = styled.div`
  width: 100%;
  max-width: min(1000px, 98vw);
  margin: 0 auto;
  padding: 5px;
  transform: scale(${props => props.scale});
  transform-origin: center top;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 5px;
    max-width: 98vw;
  }
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

const LoadingMessage = styled.div`
  font-size: 1.5rem;
  color: white;
  text-align: center;
  margin: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const getImages = () => {
  // მხოლოდ საჭირო სურათების ჩატვირთვა
  const allImages = [
    { name: 'ზებრა', url: zebraImg, loaded: false },
    { name: 'სპილო', url: spiloImg, loaded: false },
    { name: 'ლომი', url: lomiImg, loaded: false },
    { name: 'დათვი', url: datviImg, loaded: false },
    { name: 'მგელი', url: mgeliImg, loaded: false },
    { name: 'ირემი', url: iremiImg, loaded: false },
    { name: 'თხა', url: txaImg, loaded: false },
    { name: 'კურდღელი', url: kurdgeliImg, loaded: false },
    { name: 'ფლამინგო', url: flamingoImg, loaded: false },
    { name: 'სელაპი', url: selapiImg, loaded: false },
    { name: 'ციყვი', url: ciyviImg, loaded: false },
    { name: 'ენოტი', url: enotiImg, loaded: false },
    { name: 'ზარმაცა', url: zarmacaImg, loaded: false },
    { name: 'ზღარბი', url: zgarbiImg, loaded: false },
    { name: 'ქამელეონი', url: qamelioniImg, loaded: false },
    { name: 'ოპოსუმი', url: oposumiImg, loaded: false },
    { name: 'რვაფეხა', url: rvafexaImg, loaded: false },
    { name: 'თახვი', url: taxviImg, loaded: false },
    { name: 'ბეგემოტი', url: begemotiImg, loaded: false },
    { name: 'ლამა', url: lamaImg, loaded: false },
    { name: 'ჟირაფი', url: jirafiImg, loaded: false },
    { name: 'კენგურუ', url: kenguruImg, loaded: false },
    { name: 'ბუ', url: buImg, loaded: false },
    { name: 'პანდა', url: pandaImg, loaded: false },
    { name: 'მელია', url: meliaImg, loaded: false },
    { name: 'დელფინი', url: delfiniImg, loaded: false },
    { name: 'კოალა', url: koalaImg, loaded: false },
    { name: 'პინგვინი', url: pingviniImg, loaded: false },
    { name: 'კიბორჩხალა', url: kiborchxalaImg, loaded: false },
    { name: 'ობობა', url: obobaImg, loaded: false },
    { name: 'გველი', url: gveliImg, loaded: false },
    { name: 'ხვლიკი', url: xvlikiImg, loaded: false },
    { name: 'ზვიგენი', url: zvigeniImg, loaded: false },
    { name: 'ფარშევანგი', url: farshevangiImg, loaded: false },
    { name: 'კოდალა', url: kodalaImg, loaded: false },
    { name: 'აქლემი', url: aqlemiImg, loaded: false },
    { name: 'პეპელა', url: pepelaImg, loaded: false },
    { name: 'არწივი', url: arwiviImg, loaded: false }
  ];

  // მხოლოდ საჭირო რაოდენობის სურათების დაბრუნება
  return allImages.slice(0, 10); // ვინახავთ პირველ 10 სურათს
};

const MemoryGame = () => {
  const [gameState, setGameState] = useState('setup');
  const [numberOfImages, setNumberOfImages] = useState(3);
  const [selectedImages, setSelectedImages] = useState([]);
  const [shuffledImages, setShuffledImages] = useState([]);
  const [timer, setTimer] = useState(5);
  const [userSequence, setUserSequence] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [gameMode, setGameMode] = useState('sequence'); // sequence or missing
  const [missingImage, setMissingImage] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [optionImages, setOptionImages] = useState([]);
  const { updateGameProgress } = usePlayer();
  const navigate = useNavigate();
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [isReordering, setIsReordering] = useState(false);
  const [reorderedImages, setReorderedImages] = useState([]);
  const [showCorrectImageAnimation, setShowCorrectImageAnimation] = useState(false);
  const [scale, setScale] = useState(1);
  const [loadedImages, setLoadedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // სურათების ჩატვირთვის ოპტიმიზაცია
  const loadImages = useCallback(async () => {
    setIsLoading(true);
    try {
      const images = getImages();
      const loadPromises = images.map(img => {
        return new Promise((resolve, reject) => {
          const image = new Image();
          image.onload = () => resolve({ ...img, loaded: true });
          image.onerror = () => reject(new Error(`Failed to load image: ${img.name}`));
          image.src = img.url;
        });
      });

      const loadedImgs = await Promise.all(loadPromises);
      setLoadedImages(loadedImgs);
      setIsLoading(false);
      return loadedImgs;
    } catch (error) {
      console.error('Error loading images:', error);
      setIsLoading(false);
      return [];
    }
  }, []);

  // Fisher-Yates shuffle ალგორითმი
  const shuffleArray = useCallback((array) => {
    const shuffled = [...array];
    let attempts = 0;
    const maxAttempts = 10;

    do {
      // Fisher-Yates shuffle
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      // Check if the shuffled array is different from the original
      const isDifferent = shuffled.some((item, index) => item !== array[index]);
      if (isDifferent) {
        return shuffled;
      }

      attempts++;
    } while (attempts < maxAttempts);

    // If we couldn't get a different arrangement after maxAttempts, 
    // just return the last shuffled version
    return shuffled;
  }, []);

  // სურათების არჩევის ოპტიმიზაცია
  const selectRandomImages = useCallback(async () => {
    let images = loadedImages;
    if (images.length === 0) {
      images = await loadImages();
    }
    if (images.length === 0) {
      console.error('Failed to load images');
      return;
    }
    
    const shuffled = shuffleArray(images);
    const selected = shuffled.slice(0, numberOfImages);
    setSelectedImages(selected);
    setShuffledImages([...selected]);

    if (gameMode === 'missing') {
      const remainingImages = shuffled.slice(numberOfImages, numberOfImages + 3);
      const randomIndex = Math.floor(Math.random() * selected.length);
      const missingImg = selected[randomIndex];
      setMissingImage(missingImg);
      const options = shuffleArray([...remainingImages, missingImg]);
      setOptionImages(options);
    }
  }, [numberOfImages, gameMode, loadedImages, loadImages, shuffleArray]);

  // თამაშის დაწყების ოპტიმიზაცია
  const startGame = useCallback(async () => {
    setIsLoading(true);
    try {
      await selectRandomImages();
      setGameState('showing');
      setTimer(5);
      setSelectedOption(null);
    } catch (error) {
      console.error('Error starting game:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectRandomImages]);

  // მომხმარებლის არჩევანის დამუშავება
  const handleImageClick = useCallback((image, index) => {
    if (gameState !== 'playing') return;

    if (gameMode === 'sequence') {
      setUserSequence(prev => {
        const newSequence = [...prev, { image, index }];
        
        if (newSequence.length === selectedImages.length) {
          const isCorrect = selectedImages.every((img, idx) => 
            newSequence[idx].image.name === img.name
          );
          
          if (isCorrect) {
            setShowSuccessAnimation(true);
            updateGameProgress('memory', Date.now(), { score: 100 });
            setShowSuccess(true);
            
            // დავიწყოთ გადალაგების ანიმაცია
            setIsReordering(true);
            setReorderedImages([...selectedImages]);
            
            // ანიმაციის შემდეგ თამაშის დასრულება - 7 წამიანი დაყოვნებით
            setTimeout(() => {
              setShowSuccess(false);
              setShowSuccessAnimation(false);
              setIsReordering(false);
              setGameState('setup');
              setUserSequence([]);
              setReorderedImages([]);
            }, 7000); // შეიცვალა 2000-დან 7000-მდე (7 წამი)
          } else {
            setShowError(true);
            setTimeout(() => {
              setShowError(false);
              setUserSequence([]);
            }, 2000);
          }
        }
        
        return newSequence;
      });
    }
  }, [gameState, gameMode, selectedImages, updateGameProgress]);

  // ოფციის არჩევა
  const handleOptionSelect = useCallback((image) => {
    if (gameState !== 'playing') return;
    
    setSelectedOption(image);
    const isCorrect = image.name === missingImage.name;
    
    if (isCorrect) {
      updateGameProgress('memory', Date.now(), { score: 100 });
      setShowSuccess(true);
      setShowCorrectImageAnimation(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        setShowCorrectImageAnimation(false);
        setGameState('setup');
        setSelectedOption(null);
      }, 5000); // შეიცვალა 2000-დან 5000-მდე (5 წამი)
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        setSelectedOption(null);
      }, 2000);
    }
  }, [gameState, missingImage, updateGameProgress]);

  // ფოტოების არევა
  const shuffleImages = useCallback(() => {
    setShuffledImages(prev => {
      const shuffled = shuffleArray(prev);
      console.log('Original order:', prev.map(img => img.name));
      console.log('Shuffled order:', shuffled.map(img => img.name));
      return shuffled;
    });
    setGameState('playing');
  }, [shuffleArray]);

  // საწყისი სურათების ჩატვირთვა
  useEffect(() => {
    loadImages();
  }, [loadImages]);

  // ტაიმერის ლოგიკა
  useEffect(() => {
    let interval;
    
    if (gameState === 'showing' && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0 && gameState === 'showing') {
      shuffleImages();
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timer, gameState, shuffleImages]);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  return (
    <>
      <GameContainer isSetup={gameState === 'setup'}>
        <HomeButton />
        <GameArea scale={scale}>
          {isLoading ? (
            <SetupContainer>
              <GameTitle>მეხსიერების სავარჯიშო <span>🧠</span></GameTitle>
              <h2>სურათები იტვირთება...</h2>
            </SetupContainer>
          ) : gameState === 'setup' && (
            <SetupContainer>
              <GameTitle>მეხსიერების სავარჯიშო <span>🧠</span></GameTitle>
              <h2>აირჩიე რამდენი სურათი გინდა დაიმახსოვრო:</h2>
              <NumberSelect 
                value={numberOfImages} 
                onChange={(e) => setNumberOfImages(Number(e.target.value))}
              >
                <option value={3}>3 სურათი</option>
                <option value={4}>4 სურათი</option>
                <option value={5}>5 სურათი</option>
              </NumberSelect>
              
              <GameModeToggle>
                <ToggleButton 
                  active={gameMode === 'sequence'} 
                  onClick={() => setGameMode('sequence')}
                >
                  თანმიმდევრობა
                </ToggleButton>
                <ToggleButton 
                  active={gameMode === 'missing'} 
                  onClick={() => setGameMode('missing')}
                >
                  ფოტოს ამოკლება
                </ToggleButton>
              </GameModeToggle>

              <StartButton onClick={startGame}>დაწყება</StartButton>
            </SetupContainer>
          )}

          {showSuccess && (
            <SuccessMessage show>
              გილოცავ! {gameMode === 'sequence' ? 'სწორად გაიხსენე თანმიმდევრობა!' : 'სწორად გამოიცანი რომელი ფოტო აკლდა!'} 🎉
            </SuccessMessage>
          )}

          {showError && (
            <ErrorMessage show>
              სამწუხაროდ {gameMode === 'sequence' ? 'თანმიმდევრობა არასწორია' : 'ვერ გამოიცანი რომელი ფოტო აკლდა'}. სცადე თავიდან! 🤔
            </ErrorMessage>
          )}

          {gameState === 'showing' && (
            <>
              <Timer>
                <span className="hourglass">⌛</span>
                {timer} წამი
              </Timer>
              <Message show>დაიმახსოვრე სურათები!</Message>
              <ImagesGrid imageCount={numberOfImages}>
                {selectedImages.map((image, index) => (
                  <ImageCard 
                    key={index} 
                    imageCount={numberOfImages}
                  >
                    <img src={image.url} alt={image.name} />
                    <p>{image.name}</p>
                  </ImageCard>
                ))}
              </ImagesGrid>
            </>
          )}

          {gameState === 'memorizing' && (
            <>
              <Timer>
                <span className="hourglass">⌛</span>
                {timer} წამი
              </Timer>
              <Message show>დახუჭე თვალები! {timer} წამი დარჩა</Message>
            </>
          )}

          {gameState === 'playing' && gameMode === 'sequence' && (
            <>
              <Message show>აღადგინე სურათების თანმიმდევრობა!</Message>
              <ImagesGrid imageCount={numberOfImages}>
                {(isReordering ? reorderedImages : shuffledImages).map((image, index) => (
                  <ImageCard 
                    key={index}
                    imageCount={numberOfImages}
                    isSelected={userSequence.some(seq => seq.index === index)}
                    isPlayable={!userSequence.some(seq => seq.index === index) && !isReordering}
                    onClick={() => !userSequence.some(seq => seq.index === index) && !isReordering && handleImageClick(image, index)}
                    showSuccessAnimation={showSuccessAnimation && userSequence.some(seq => seq.index === index)}
                    isReordering={isReordering}
                    $reorderDelay={index * 0.2}
                  >
                    <img src={image.url} alt={image.name} />
                    <p>{image.name}</p>
                    {(userSequence.findIndex(seq => seq.index === index) > -1 || isReordering) && (
                      <div className="order-number">
                        {isReordering ? index + 1 : userSequence.findIndex(seq => seq.index === index) + 1}
                      </div>
                    )}
                  </ImageCard>
                ))}
              </ImagesGrid>
              <Message show>
                {!isReordering && (userSequence.length < selectedImages.length 
                  ? `აირჩიე ${userSequence.length + 1}-ე სურათი`
                  : 'ყველა სურათი არჩეულია')}
              </Message>
            </>
          )}

          {gameState === 'playing' && gameMode === 'missing' && (
            <>
              <Message show>რომელი ფოტო აკლია?</Message>
              <ImagesGrid imageCount={numberOfImages}>
                {shuffledImages.filter(img => img.name !== missingImage.name).map((image, index) => (
                  <ImageCard 
                    key={index}
                    imageCount={numberOfImages}
                  >
                    <img src={image.url} alt={image.name} />
                    <p>{image.name}</p>
                  </ImageCard>
                ))}
                {showCorrectImageAnimation && selectedOption && (
                  <AnimatedImageCard imageCount={numberOfImages}>
                    <img src={selectedOption.url} alt={selectedOption.name} />
                    <p>{selectedOption.name}</p>
                  </AnimatedImageCard>
                )}
              </ImagesGrid>
              <Message show>აირჩიე სწორი პასუხი:</Message>
              <OptionsGrid>
                {optionImages.map((image, index) => (
                  <OptionCard
                    key={index}
                    selected={selectedOption?.name === image.name}
                    onClick={() => handleOptionSelect(image)}
                    disabled={showCorrectImageAnimation}
                  >
                    <img src={image.url} alt={image.name} />
                    <p>{image.name}</p>
                  </OptionCard>
                ))}
              </OptionsGrid>
            </>
          )}
        </GameArea>
        
        <ZoomControls>
          <ZoomButton onClick={handleZoomOut}>-</ZoomButton>
          <ZoomButton onClick={handleZoomIn}>+</ZoomButton>
        </ZoomControls>
      </GameContainer>
    </>
  );
};

export default MemoryGame;
