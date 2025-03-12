import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import '../styles/ScrambleGame.css';
import { usePlayer } from '../context/PlayerContext.jsx';
import NameModal from './NameModal';
import HomeButton from './HomeButton';

// სურათების იმპორტი
import zebraImg from '../../../public/newmaincontent/photos/ზებრა.webp';
import spiloImg from '../../../public/newmaincontent/photos/სპილო.webp';
import lomiImg from '../../../public/newmaincontent/photos/ლომი.webp';
import datviImg from '../../../public/newmaincontent/photos/დათვი.webp';
import mgeliImg from '../../../public/newmaincontent/photos/მგელო.webp';
import iremiImg from '../../../public/newmaincontent/photos/ირემი.webp';
import txaImg from '../../../public/newmaincontent/photos/თხა (2).webp';
import kurdgeliImg from '../../../public/newmaincontent/photos/კურდღელი.webp';
import flamingoImg from '../../../public/newmaincontent/photos/ფლამინგო.webp';
import selapiImg from '../../../public/newmaincontent/photos/სელაპი.webp';
import ciyviImg from '../../../public/newmaincontent/photos/ციყვი.webp';
import enotiImg from '../../../public/newmaincontent/photos/ენოტი.webp';
import zarmacaImg from '../../../public/newmaincontent/photos/ზარმაცა.webp';
import zgarbiImg from '../../../public/newmaincontent/photos/ზღარბი.webp';
import qamelioniImg from '../../../public/newmaincontent/photos/ქამელეონი.webp';
import oposumiImg from '../../../public/newmaincontent/photos/ოპოსუმი.webp';
import rvafexaImg from '../../../public/newmaincontent/photos/რვაფეხა.webp';
import taxviImg from '../../../public/newmaincontent/photos/თახვი.webp';
import begemotiImg from '../../../public/newmaincontent/photos/ბეგემოტი.webp';
import lamaImg from '../../../public/newmaincontent/photos/ლამა.webp';
import jirafiImg from '../../../public/newmaincontent/photos/ჟირაფი.webp';
import kenguruImg from '../../../public/newmaincontent/photos/კენგურუ.webp';
import buImg from '../../../public/newmaincontent/photos/ბუ.webp';
import pandaImg from '../../../public/newmaincontent/photos/პანდა.webp';
import meliaImg from '../../../public/newmaincontent/photos/მელია.webp';
import delfiniImg from '../../../public/newmaincontent/photos/დელფინი.webp';
import koalaImg from '../../../public/newmaincontent/photos/კოალა.webp';
import pingviniImg from '../../../public/newmaincontent/photos/პნგვინი.webp';
import kiborchxalaImg from '../../../public/newmaincontent/photos/კიბორჩხალა.webp';
import obobaImg from '../../../public/newmaincontent/photos/ობობა.webp';
import gveliImg from '../../../public/newmaincontent/photos/გველი.webp';
import xvlikiImg from '../../../public/newmaincontent/photos/ხვლიკი.webp';
import zvigeniImg from '../../../public/newmaincontent/photos/ზვიგენი.webp';
import farshevangiImg from '../../../public/newmaincontent/photos/ფარშევანგი.webp';
import kodalaImg from '../../../public/newmaincontent/photos/კოდალა.webp';
import aqlemiImg from '../../../public/newmaincontent/photos/აქლემი.webp';
import pepelaImg from '../../../public/newmaincontent/photos/პეპელა.webp';
import arwiviImg from '../../../public/newmaincontent/photos/არწივი.webp';
// ახალი სურათების იმპორტი
import titaImg from '../../../public/newmaincontent/photos/ტიტა.webp';
import tiripiImg from '../../../public/newmaincontent/photos/ტირიფი.webp';
import simindiImg from '../../../public/newmaincontent/photos/სიმინდი.webp';
import sakuraImg from '../../../public/newmaincontent/photos/საკურა.webp';
import rkoImg from '../../../public/newmaincontent/photos/რკო.webp';
import muxaImg from '../../../public/newmaincontent/photos/მუხა.webp';
import mzesumziraImg from '../../../public/newmaincontent/photos/მზესუმზირა.webp';
import kaqtusiImg from '../../../public/newmaincontent/photos/კაქტუსი.webp';
import vashliImg from '../../../public/newmaincontent/photos/ვაშლი.webp';
import bambukiImg from '../../../public/newmaincontent/photos/ბამბუკი.webp';
// ახალი სურათების იმპორტი
import changaliImg from '../../../public/newmaincontent/photos/ჩანგალი.webp';
import kovziImg from '../../../public/newmaincontent/photos/კოვზი.webp';

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
  { name: 'არწივი', image: arwiviImg },
  // ახალი მცენარეები
  { name: 'ტიტა', image: titaImg },
  { name: 'ტირიფი', image: tiripiImg },
  { name: 'სიმინდი', image: simindiImg },
  { name: 'საკურა', image: sakuraImg },
  { name: 'რკო', image: rkoImg },
  { name: 'მუხა', image: muxaImg },
  { name: 'მზესუმზირა', image: mzesumziraImg },
  { name: 'კაქტუსი', image: kaqtusiImg },
  { name: 'ვაშლი', image: vashliImg },
  { name: 'ბამბუკი', image: bambukiImg },
  // ახალი ნივთები
  { name: 'ჩანგალი', image: changaliImg },
  { name: 'კოვზი', image: kovziImg }
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

const correctAnimation = keyframes`
  0% {
    background: rgba(46, 204, 113, 0.6);
    transform: scale(1.15);
    box-shadow: 0 0 15px rgba(46, 204, 113, 0.5);
  }
  30% {
    background: rgba(46, 204, 113, 0.4);
    transform: scale(1.1);
    box-shadow: 0 0 12px rgba(46, 204, 113, 0.4);
  }
  70% {
    background: rgba(46, 204, 113, 0.2);
    transform: scale(1.05);
    box-shadow: 0 0 8px rgba(46, 204, 113, 0.3);
  }
  100% {
    background: rgba(255, 255, 255, 0.95);
    transform: scale(1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
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
  padding-bottom: calc(env(safe-area-inset-bottom) + 8px);

  @media (max-height: 800px) {
    padding-bottom: calc(env(safe-area-inset-bottom) + 12px);
  }

  @media (max-height: 700px) {
    padding-bottom: calc(env(safe-area-inset-bottom) + 15px);
  }
`;

const MainContentContainer = styled.div`
  width: 100%;
  max-width: min(1000px, 98vw);
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
    max-width: 99vw;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 380px;
  margin: 3px auto;
  padding: 5px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    max-height: calc(100vh - 420px);
    object-fit: contain;
  }

  @media (max-height: 700px) {
    margin: 2px auto;
    padding: 4px;
    max-width: 350px;
  }

  @media (max-height: 600px) {
    margin: 2px auto;
    padding: 3px;
    max-width: 320px;
  }
`;

const GameArea = styled.div`
  width: 100%;
  max-width: min(1000px, 98vw);
  margin: 0 auto;
  padding: 10px;
  transform: scale(${props => props.scale});
  transform-origin: center top;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 80px);
  justify-content: flex-start;
  
  @media (max-height: 800px) {
    min-height: calc(100vh - 100px);
  }

  @media (max-height: 700px) {
    min-height: calc(100vh - 120px);
  }

  @media (max-height: 600px) {
    min-height: calc(100vh - 140px);
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

  @media (max-width: 480px) {
    padding: 5px;
    gap: 8px;
    max-width: 99vw;
  }
`;

const TargetContainer = styled.div`
  display: flex;
  gap: clamp(8px, 1.8vw, 12px);
  justify-content: center;
  margin: clamp(6px, 1.8vw, 12px) auto;
  padding: clamp(12px, 2.8vw, 22px);
  background: rgba(135, 206, 235, 0.3);
  border-radius: clamp(12px, 2.5vw, 20px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-wrap: nowrap;
  width: 100%;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }

  .letter-slot {
    width: clamp(55px, 12vw, 75px);
    height: clamp(55px, 12vw, 75px);
    font-size: clamp(35px, 8.5vw, 48px);
    background: white;
    border: 4px dashed #4a90e2;
    border-radius: clamp(8px, 2vw, 12px);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #2c3e50;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    padding: 0;
    line-height: 1;
    text-align: center;
    flex: 0 0 auto;
    
    &.filled {
      border-style: solid;
      background: white;
      color: #1a1a1a;
      font-weight: 900;
      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }
    
    &.correct {
      border-color: #2ecc71;
      border-width: 5px;
      animation: ${correctAnimation} 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      border-style: solid;
      color: #000000;
      font-weight: 900;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
      letter-spacing: 0;
    }
    
    &.wrong {
      border-color: #f44336;
      background: rgba(244, 67, 54, 0.1);
      animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    }
  }

  @media (max-width: 480px) {
    gap: 5px;
    padding: 10px;
    
    .letter-slot {
      width: clamp(48px, 11vw, 65px);
      height: clamp(48px, 11vw, 65px);
      font-size: clamp(32px, 7.5vw, 42px);
    }
  }
`;

const LettersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(8px, 1.8vw, 12px);
  justify-content: center;
  margin: clamp(6px, 1.8vw, 12px) auto;
  width: 100%;
  min-width: 0;
  padding: clamp(12px, 2.8vw, 22px);
  background: rgba(135, 206, 235, 0.3);
  border-radius: clamp(12px, 2.5vw, 20px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .letter {
    width: clamp(55px, 12vw, 75px);
    height: clamp(55px, 12vw, 75px);
    font-size: clamp(35px, 8.5vw, 48px);
    background: white;
    border: 4px solid #4a90e2;
    border-radius: clamp(8px, 2vw, 12px);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    font-weight: bold;
    color: #2c3e50;
    transition: all 0.2s ease;
    flex: 0 0 auto;
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }
  }

  @media (max-width: 480px) {
    gap: 5px;
    padding: 10px;
    
    .letter {
      width: clamp(48px, 11vw, 65px);
      height: clamp(48px, 11vw, 65px);
      font-size: clamp(32px, 7.5vw, 42px);
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

const HelpButton = styled.button`
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: clamp(50px, 12vw, 60px);
  height: clamp(50px, 12vw, 60px);
  border-radius: 50%;
  border: none;
  background: #4CAF50;
  color: white;
  font-size: clamp(26px, 6vw, 32px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    background: #45a049;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  &::before {
    content: "?";
    font-weight: bold;
  }

  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
    font-size: 24px;
  }
`;

const HelpText = styled.div`
  position: fixed;
  inset: 0;
  margin: auto;
  height: fit-content;
  background: rgba(0, 0, 0, 0.85);
  color: white;
  padding: 30px 40px;
  border-radius: 20px;
  font-size: clamp(32px, 7vw, 40px);
  text-align: center;
  z-index: 1100;
  letter-spacing: 0.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  cursor: pointer;
  animation: ${fadeIn} 0.3s ease forwards;
  width: fit-content;
  max-width: 90vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  z-index: 1090;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s ease forwards;
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
  
  // ლოკალური მეხსიერებიდან შესრულებული დავალებების წამოღება
  const [localCompletedTasks, setLocalCompletedTasks] = useState(() => {
    const saved = localStorage.getItem('scrambleCompletedTasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentAnimal, setCurrentAnimal] = useState(() => {
    const availableAnimals = animals.filter(animal => 
      !localCompletedTasks.includes(animal.name)
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
  const [showHelp, setShowHelp] = useState(false);

  const selectRandomAnimal = () => {
    const availableAnimals = animals.filter(animal => 
      !localCompletedTasks.includes(animal.name)
    );
    
    if (availableAnimals.length === 0) {
      showNotification('გილოცავთ! თქვენ ყველა ამოცანა შეასრულეთ! 🎉');
      setLocalCompletedTasks([]);
      localStorage.removeItem('scrambleCompletedTasks');
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

    // მხოლოდ გადათრეული ასოს გამოჩენა
    e.dataTransfer.setDragImage(e.target, 10, 10);
    e.target.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    if (e.target) {
      e.target.style.opacity = '1';
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.target.style.backgroundColor = 'rgba(135, 206, 235, 0.2)';
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.target.style.backgroundColor = '';
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
    e.target.style.backgroundColor = '';
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
      const newLocalCompletedTasks = [...localCompletedTasks, currentAnimal.name];
      setLocalCompletedTasks(newLocalCompletedTasks);
      localStorage.setItem('scrambleCompletedTasks', JSON.stringify(newLocalCompletedTasks));

      updateGameProgress('scramble', newLocalCompletedTasks, {
        ...(gameProgress?.scrambleScores || {}),
        [currentAnimal.name]: 3
      });
      
      const praise = getRandomPraise();
      setPraiseMessage(praise);
      setShowPraise(true);
      
      // შემდეგი დავალების არჩევა
      const nextAnimal = selectNextAnimal(newLocalCompletedTasks);
      
      setTimeout(() => {
        setShowPraise(false);
        if (nextAnimal) {
          setCurrentAnimal(nextAnimal);
          setScrambledLetters(scrambleWord(nextAnimal.name));
          setPlacedLetters(Array(nextAnimal.name.length).fill(null));
          setCorrectPositions([]);
        } else {
          showNotification('გილოცავთ! თქვენ ყველა ამოცანა შეასრულეთ! 🎉');
          setLocalCompletedTasks([]);
          localStorage.removeItem('scrambleCompletedTasks');
          updateGameProgress('scramble', [], {});
          const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
          setCurrentAnimal(randomAnimal);
          setScrambledLetters(scrambleWord(randomAnimal.name));
          setPlacedLetters(Array(randomAnimal.name.length).fill(null));
          setCorrectPositions([]);
        }
      }, 3000);
    }
  };

  const startNewGame = () => {
    const availableAnimals = animals.filter(animal => !localCompletedTasks.includes(animal.name));
    
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
    setLocalCompletedTasks([]);
    localStorage.removeItem('scrambleCompletedTasks');
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

  // ახალი ფუნქცია შემდეგი დავალების ასარჩევად
  const selectNextAnimal = (completedTasks) => {
    const availableAnimals = animals.filter(animal => !completedTasks.includes(animal.name));
    if (availableAnimals.length === 0) return null;
    return availableAnimals[Math.floor(Math.random() * availableAnimals.length)];
  };

  const handleHelpClick = () => {
    setShowHelp(true);
    setTimeout(() => {
      setShowHelp(false);
    }, 4000);
  };

  const handleHelpTextClick = () => {
    setShowHelp(false);
  };

  useEffect(() => {
    const initializeGame = () => {
      const availableAnimals = animals.filter(animal => 
        !localCompletedTasks.includes(animal.name)
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
            შესრულებულია: {localCompletedTasks.length} / {animals.length}
          </span>
        </div>
        
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
                onDragLeave={handleDragLeave}
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
                onDragEnd={handleDragEnd}
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
      <HelpButton onClick={handleHelpClick} title="დახმარება" />
      {showHelp && (
        <>
          <Overlay />
          <HelpText onClick={handleHelpTextClick}>
            {currentAnimal.name}
          </HelpText>
        </>
      )}
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