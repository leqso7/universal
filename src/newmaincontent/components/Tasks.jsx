import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { tasks } from '../data/tasks';
import { createGlobalStyle } from 'styled-components';
import NameModal from './NameModal';
import { usePlayer } from '../context/PlayerContext.jsx';
import { useNavigate } from 'react-router-dom';
import HomeButton from './HomeButton';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: clamp(0.5rem, 2vw, 1rem);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, #EBF3FE, #F3EFFE);
  overflow-y: auto;
  z-index: 0;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const TaskCard = styled.div`
  background: ${props => props.isWrong ? 'rgba(244, 67, 54, 0.1)' : 'rgba(255, 255, 255, 0.8)'};
  backdrop-filter: blur(10px);
  border-radius: clamp(0.5rem, 3vw, 1rem);
  padding: clamp(0.8rem, 2vw, 1.5rem);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: min(95%, 500px);
  text-align: center;
  margin-top: clamp(4rem, 8vh, 6rem);
  transform: scale(${props => props.scale});
  transform-origin: center top;
  transition: all 0.3s ease;

  @media (max-width: 480px) {
    width: 98%;
    border-radius: 0.5rem;
    padding: 0.8rem;
    margin-top: 3.5rem;
  }
`;

const Title = styled.h1`
  font-size: clamp(1.2rem, 4vw, 1.5rem);
  color: #1a237e;
  margin-bottom: clamp(0.5rem, 2vw, 1rem);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.5);
`;

const Subtitle = styled.p`
  color: #666;
  margin-bottom: clamp(1rem, 4vw, 2rem);
  font-size: clamp(0.9rem, 3vw, 1rem);
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(0.5rem, 2vw, 1rem);
  justify-content: center;
  margin-top: clamp(1rem, 4vw, 2rem);
`;

const NavigationButton = styled.button`
  background: #4CAF50;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2);

  &:hover {
    background: #388E3C;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  ${props => props.prev && `
    background: #1976D2;
    &:hover {
      background: #1565C0;
    }
  `}
`;

const MatchingGame = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin: 2rem 0;
  justify-content: center;
  align-items: center;
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
  width: 100%;
  max-width: min(800px, 95vw);
  padding: 0.5rem;

  @media (max-width: 480px) {
    gap: 0.3rem;
    padding: 0.3rem;
  }
`;

const Item = styled.button`
  background: ${props => {
    if (props.wrongMatch) return '#ff0000';
    return props.color || '#4CAF50';
  }};
  color: ${props => {
    if (props.wrongMatch) return 'transparent';
    return props.$isSelected ? 'white' : '#2c3e50';
  }};
  border: none;
  padding: clamp(0.3rem, 1vw, 0.5rem);
  font-size: clamp(0.8rem, 2.5vw, 1rem);
  border-radius: clamp(0.5rem, 2vw, 1rem);
  cursor: pointer;
  transition: all 0.3s ease;
  width: clamp(120px, 35vw, 160px);
  height: clamp(40px, 12vw, 55px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.25rem;
  white-space: normal;
  word-wrap: break-word;
  text-align: center;
  line-height: 1.1;
  overflow-wrap: break-word;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
  animation: ${props => props.wrongMatch ? 'shake 0.5s ease-in-out' : 'none'};

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-8px) rotate(-2deg); }
    20%, 40%, 60%, 80% { transform: translateX(8px) rotate(2deg); }
  }

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }

  &:active {
    transform: translateY(0);
  }

  ${props => props.selected && `
    transform: scale(0.95);
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
  `}

  @media (max-width: 480px) {
    width: calc(45% - 0.5rem);
    height: 45px;
    font-size: clamp(0.7rem, 3vw, 0.9rem);
    padding: 0.3rem;
    margin: 0.25rem;
  }

  @media (max-width: 360px) {
    width: calc(45% - 0.4rem);
    height: 40px;
    font-size: clamp(0.65rem, 2.8vw, 0.8rem);
    padding: 0.25rem;
  }

  img {
    width: 100%;
    height: auto;
    opacity: ${props => props.wrongMatch ? '0' : '1'};
    transition: opacity 0.3s ease;
  }

  span {
    opacity: ${props => props.wrongMatch ? '0' : '1'};
    transition: opacity 0.3s ease;
  }
`;

const MathGame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(1rem, 4vw, 2rem);
  margin-top: clamp(0.5rem, 2vw, 1rem);
`;

const MathProblem = styled.div`
  font-size: clamp(1.5rem, 5vw, 2rem);
  margin-bottom: clamp(0.5rem, 2vw, 1rem);
  background: white;
  padding: clamp(0.75rem, 3vw, 1rem) clamp(1.5rem, 4vw, 2rem);
  border-radius: clamp(0.5rem, 2vw, 1rem);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const NumberGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(0.5rem, 2vw, 1rem);
  width: 100%;
  max-width: min(300px, 90vw);
`;

const NumberButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: clamp(0.75rem, 3vw, 1rem);
  font-size: clamp(1.2rem, 4vw, 1.5rem);
  border-radius: clamp(0.25rem, 1vw, 0.5rem);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    background: #45a049;
  }

  &:active {
    transform: translateY(0);
  }
`;

const StickersContainer = styled.div`
  display: flex;
  gap: clamp(15px, 4vw, 30px);
  justify-content: center;
  margin: clamp(15px, 4vw, 25px) 0;
  flex-wrap: wrap;
`;

const StickersGroup = styled.div`
  display: flex;
  gap: clamp(5px, 2vw, 10px);
  padding: clamp(10px, 3vw, 20px);
  background: #f8f9fa;
  border-radius: clamp(8px, 2vw, 15px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  min-width: clamp(80px, 25vw, 120px);
  justify-content: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Sticker = styled.div`
  font-size: 2rem;
  animation: popIn 0.5s ease-out;
  
  @keyframes popIn {
    0% { transform: scale(0); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
`;

const Input = styled.input`
  padding: clamp(10px, 3vw, 15px);
  font-size: clamp(1.2rem, 4vw, 1.5rem);
  border: 3px solid #2196F3;
  border-radius: clamp(5px, 2vw, 10px);
  width: clamp(80px, 25vw, 120px);
  text-align: center;
  margin: 0 clamp(5px, 2vw, 10px);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.3);
  }
`;

const Button = styled.button`
  padding: clamp(8px, 2vw, 10px) clamp(15px, 3vw, 20px);
  margin: 0 clamp(3px, 1vw, 5px);
  border: none;
  border-radius: clamp(3px, 1vw, 5px);
  background-color: ${props => props.disabled ? '#ccc' : '#4CAF50'};
  color: white;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: clamp(0.9rem, 3vw, 1rem);
  
  &:hover {
    background-color: ${props => props.disabled ? '#ccc' : '#45a049'};
  }
`;

const Message = styled.div`
  color: ${props => props.isCorrect ? '#4CAF50' : '#f44336'};
  font-size: clamp(1.1rem, 3.5vw, 1.3rem);
  margin-top: clamp(10px, 3vw, 15px);
  text-align: center;
  animation: fadeIn 0.5s ease-out;

  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;

const GlobalStyle = createGlobalStyle`
  @keyframes celebrate {
    0% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 0;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.5);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0;
    }
  }

  @keyframes float {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) rotate(360deg);
      opacity: 0;
    }
  }
`;

const celebrationStickers = ['🌟', '🎉', '🎈', '🎊', '🏆', '⭐', '💫', '✨'];

const showCelebration = (stickers) => {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '1000';
  document.body.appendChild(container);

  // ცენტრალური სტიკერი
  const mainSticker = document.createElement('div');
  mainSticker.style.position = 'fixed';
  mainSticker.style.fontSize = '100px';
  mainSticker.style.zIndex = '1000';
  mainSticker.style.top = '50%';
  mainSticker.style.left = '50%';
  mainSticker.style.transform = 'translate(-50%, -50%)';
  mainSticker.style.animation = 'celebrate 1s ease-out forwards';
  mainSticker.textContent = stickers[Math.floor(Math.random() * stickers.length)];
  container.appendChild(mainSticker);

  // მფრინავი სტიკერები
  for (let i = 0; i < 15; i++) {
    const sticker = document.createElement('div');
    sticker.style.position = 'fixed';
    sticker.style.fontSize = '40px';
    sticker.style.zIndex = '999';
    sticker.style.left = Math.random() * 100 + 'vw';
    sticker.style.top = '100vh';
    sticker.style.animation = `float ${2 + Math.random() * 2}s linear forwards`;
    sticker.textContent = stickers[Math.floor(Math.random() * stickers.length)];
    container.appendChild(sticker);
  }

  setTimeout(() => {
    document.body.removeChild(container);
  }, 4000);
};

const Toast = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${props => props.type === 'error' ? 'rgba(244, 67, 54, 0.95)' : 'rgba(76, 175, 80, 0.95)'};
  color: white;
  padding: clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem);
  border-radius: clamp(0.5rem, 2vw, 1rem);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: slideIn 0.3s ease-out forwards;
  font-size: clamp(1.1rem, 3.5vw, 1.4rem);
  min-width: min(300px, 90vw);
  text-align: center;

  @keyframes slideIn {
    0% {
      opacity: 0;
      transform: translate(-50%, -40%);
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
`;

const ProgressIndicator = styled.div`
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.95);
  padding: clamp(0.75rem, 2vw, 1rem) clamp(1rem, 2.5vw, 1.5rem);
  border-radius: clamp(0.5rem, 2vw, 1rem);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 1.5vw, 0.8rem);
  font-size: clamp(1rem, 3vw, 1.3rem);
  color: #1a237e;
  z-index: 1000;
  transition: all 0.3s ease;

  span {
    color: #4CAF50;
    font-weight: bold;
    min-width: clamp(20px, 5vw, 25px);
    text-align: center;
  }

  @media (max-width: 480px) {
    width: 90%;
    justify-content: center;
    top: 5px;
  }
`;

const CompletedTaskOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: clamp(0.5rem, 2vw, 1rem);
  gap: clamp(0.5rem, 2vw, 1rem);
  z-index: 10;

  h2 {
    color: #4CAF50;
    font-size: clamp(1.2rem, 4vw, 1.5rem);
    margin: 0;
  }

  .stars {
    font-size: clamp(1.5rem, 5vw, 2rem);
    animation: pulse 1s ease-in-out infinite;
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;

const RestartButton = styled(NavigationButton)`
  background: #9C27B0;
  margin-top: clamp(1rem, 4vw, 2rem);
  padding: clamp(0.75rem, 2.5vw, 1rem) clamp(1.5rem, 3vw, 2rem);
  font-size: clamp(1rem, 3.5vw, 1.2rem);

  &:hover {
    background: #7B1FA2;
  }
`;

const CompletionMessage = styled.div`
  text-align: center;
  font-size: clamp(1.2rem, 4vw, 1.5rem);
  color: #4CAF50;
  margin: clamp(1rem, 4vw, 2rem) 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(0.5rem, 2vw, 1rem);

  .celebration {
    font-size: clamp(2rem, 6vw, 3rem);
    margin: clamp(0.5rem, 2vw, 1rem) 0;
    animation: bounce 1s infinite;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
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

const CentralPraise = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.95);
  padding: clamp(2rem, 5vw, 3rem);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(31, 38, 135, 0.2);
  z-index: 1000;
  text-align: center;
  max-width: 90vw;
  animation: centralPopIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);

  .praise-text {
    color: #2c3e50;
    font-size: clamp(1.5rem, 4vw, 2rem);
    margin-bottom: 1rem;
    font-weight: bold;
  }

  .praise-emoji {
    font-size: clamp(3rem, 8vw, 4rem);
    margin: 1rem 0;
    display: block;
    animation: bounce 1s infinite;
  }

  @keyframes centralPopIn {
    0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0; }
    50% { transform: translate(-50%, -50%) scale(1.1); }
    70% { transform: translate(-50%, -50%) scale(0.9); }
    100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
`;

const Tasks = () => {
  const { gameProgress, updateGameProgress, getGameStats } = usePlayer();
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState({});
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [answer, setAnswer] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [stickers, setStickers] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [feedback, setFeedback] = useState({ show: false });
  const [answers, setAnswers] = useState({});
  const [isVisible, setIsVisible] = useState(true);
  const [shuffledItems, setShuffledItems] = useState([]);
  const [shuffledColors, setShuffledColors] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [scale, setScale] = useState(1);
  const navigate = useNavigate();
  const [isToastVisible, setIsToastVisible] = useState(false);
  const toastTimeoutRef = useRef(null);
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);
  const [showCentralPraise, setShowCentralPraise] = useState(false);
  const [wrongMatch, setWrongMatch] = useState(null);
  const [wrongMatchColor, setWrongMatchColor] = useState(null);

  const stats = getGameStats('task');
  const completedTasks = stats.completedTasks;
  const totalTasks = tasks.length;
  const currentTask = tasks[currentTaskIndex];

  // ვპოულობთ პირველ შეუსრულებელ დავალებას
  const findFirstUncompletedTask = useCallback(() => {
    for (let i = 0; i < tasks.length; i++) {
      if (!completedTasks.has(i)) {
        return i;
      }
    }
    return 0; // თუ ყველა შესრულებულია, ვბრუნდებით თავიდან
  }, [completedTasks]);

  const handleNextTask = useCallback(() => {
    const nextUncompleted = findFirstUncompletedTask();
    setCurrentTaskIndex(nextUncompleted);
  }, [findFirstUncompletedTask]);

  const showToast = (message, type = 'success') => {
    // თუ წინა ტაიმაუთი არსებობს, გავასუფთაოთ
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    
    // თუ წინა შეტყობინება ჯერ კიდევ ნაჩვენებია, დავიცადოთ მისი გაქრობა
    if (isToastVisible) {
      setTimeout(() => {
        setToast({ show: true, message, type });
      }, 300); // დავიცადოთ წინა ანიმაციის დასრულება
    } else {
      setToast({ show: true, message, type });
    }
    
    setIsToastVisible(true);
    
    // ახალი ტაიმაუთის დაყენება
    toastTimeoutRef.current = setTimeout(() => {
      setToast({ show: false, message: '' });
      setIsToastVisible(false);
    }, 2000);
  };

  // ვამატებთ ეფექტს completedTasks-ის ცვლილებაზე
  useEffect(() => {
    if (completedTasks.size === totalTasks) {
      setShowCentralPraise(true);
      setTimeout(() => {
        setShowCentralPraise(false);
        // ვასუფთავებთ პროგრესი
        updateGameProgress('task', Date.now(), { reset: true });
        // ვანულებთ მდგომარეობას
        setCurrentTaskIndex(0);
        setSelectedNumbers([]);
        setSelectedColors([]);
        setAnswers({});
        setFeedback({});
        setCompletedTasksCount(0);
      }, 4000);
    }
  }, [completedTasks.size, totalTasks, updateGameProgress]);

  // ვაყენებთ მიმდინარე დავალების ინდექსს პირველ შეუსრულებელ დავალებაზე
  useEffect(() => {
    const firstUncompleted = findFirstUncompletedTask();
    setCurrentTaskIndex(firstUncompleted);
  }, [findFirstUncompletedTask]);

  // ვითვლით შესრულებული დავალებების რაოდენობას
  useEffect(() => {
    setCompletedTasksCount(completedTasks.size);
  }, [completedTasks]);

  // ვაინიციალიზებთ დავალების მონაცემებს
  useEffect(() => {
    if (currentTask?.type === 'matching') {
      // ვარევთ items მასივს
      const items = [...currentTask.items];
      for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
      }
      setShuffledItems(items);

      // ვარევთ colorOptions მასივს
      const colors = [...currentTask.colorOptions];
      for (let i = colors.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [colors[i], colors[j]] = [colors[j], colors[i]];
      }
      setShuffledColors(colors);
    }
  }, [currentTask]);

  const handleSuccess = () => {
    const praise = currentTask.praise[Math.floor(Math.random() * currentTask.praise.length)];
    showToast(praise);
    
    // ვაჩვენებთ შექებას
    showCelebration(currentTask.stickers || ['🌟']);
    
    // ვანიშნავთ დავალებას შესრულებულად
    if (!completedTasks.has(currentTaskIndex)) {
      const timestamp = Date.now();
      updateGameProgress('task', timestamp, { 
        taskIndex: currentTaskIndex,
        type: currentTask.type
      });
    }
    
    // ვასუფთავებთ მიმდინარე მდგომარეობას
    setSelectedNumbers([]);
    setSelectedColors([]);
    setShuffledItems(prev => prev.map(item => ({ ...item, matched: false })));
    
    // ვიცდით 3.5 წამს და შემდეგ გადავდივართ შემდეგ დავალებაზე
    setTimeout(() => {
      const nextUncompleted = findFirstUncompletedTask();
      setCurrentTaskIndex(nextUncompleted);
    }, 3500);
  };

  const handleAnswerSubmit = useCallback((selectedAnswer) => {
    if (!currentTask?.answer) {
      console.error('No correct answer defined for task');
      return;
    }

    const isCorrect = Number(selectedAnswer) === Number(currentTask.answer);
    
    if (isCorrect) {
      showToast('სწორია! 🎉', 'success');
      if (!completedTasks.has(currentTaskIndex)) {
        const timestamp = Date.now();
        updateGameProgress('task', timestamp, { 
          taskIndex: currentTaskIndex,
          type: currentTask.type
        });
      }

      showCelebration(currentTask.stickers || ['🌟']);
      // დაუყოვნებლივ გადავდივართ შემდეგ დავალებაზე
      const nextUncompleted = findFirstUncompletedTask();
      setCurrentTaskIndex(nextUncompleted);
    } else {
      setIsWrongAnswer(true);
      setTimeout(() => {
        setIsWrongAnswer(false);
      }, 2000);
    }
  }, [currentTask, currentTaskIndex, updateGameProgress, completedTasks, findFirstUncompletedTask]);

  const handleNumberClick = useCallback((number) => {
    setSelectedNumbers(prev => {
      const newSelection = [...prev];
      const index = newSelection.indexOf(number);
      if (index === -1) {
        newSelection.push(number);
      } else {
        newSelection.splice(index, 1);
      }
      return newSelection;
    });
  }, []);

  const handleColorClick = useCallback((index) => {
    setSelectedColors(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      }
      
      if (selectedNumbers.length === 0) return prev;
      
      const numberIndex = selectedNumbers[0];
      const selectedItem = shuffledItems[numberIndex];
      const selectedOption = shuffledColors[index];
      
      const isCorrectMatch = selectedItem.colorName === selectedOption.name && !selectedItem.matched;
      
      if (isCorrectMatch) {
        const newShuffledItems = shuffledItems.map((item, idx) => {
          if (idx === numberIndex) {
            return { ...item, matched: true };
          }
          return item;
        });
        setShuffledItems(newShuffledItems);
        
        const allMatched = newShuffledItems.every((item) => item.matched);
        if (allMatched) {
          if (!completedTasks.has(currentTaskIndex)) {
            handleSuccess();
          }
        }
      } else {
        // არასწორი შესაბამისობის შემთხვევაში ორივე მხარეს ვაწითლებთ და ვამატებთ ანიმაციას
        setWrongMatch(numberIndex);
        setWrongMatchColor(index);
        
        // ვაჩვენებთ შეტყობინებას არასწორი პასუხის შესახებ
        showToast('არასწორი პასუხი! სცადე თავიდან', 'error');
        
        setTimeout(() => {
          setWrongMatch(null);
          setWrongMatchColor(null);
        }, 2000);
      }
      
      setSelectedNumbers([]);
      return [];
    });
  }, [currentTask, selectedNumbers, shuffledItems, shuffledColors, findFirstUncompletedTask, handleSuccess, completedTasks, currentTaskIndex, showToast]);

  const renderMatchingGame = useCallback((task) => {
    if (!task?.items || !task?.colorOptions) {
      return null;
    }

    return (
      <MatchingGame>
        <ItemsContainer>
          {shuffledItems.map((item, index) => (
            <Item
              key={index}
              color={item.color}
              selected={selectedNumbers.includes(index)}
              onClick={() => handleNumberClick(index)}
              disabled={item.matched}
              fontSize={item.fontSize}
              wrongMatch={wrongMatch === index}
              $isSelected={selectedNumbers.includes(index)}
            >
              {item.image && (
                <img 
                  src={`${process.env.PUBLIC_URL}/newphotos/${item.image}`} 
                  alt={item.text} 
                  style={{ width: '100%', height: 'auto' }}
                />
              )}
              <span>{item.number}</span>
              {item.text && <span style={{ marginLeft: '8px' }}>{item.text}</span>}
            </Item>
          ))}
        </ItemsContainer>
        <ItemsContainer>
          {shuffledColors.map((option, index) => (
            <Item
              key={index}
              color={option.color}
              selected={selectedColors.includes(index)}
              onClick={() => handleColorClick(index)}
              disabled={shuffledItems.find(item => item.colorName === option.name)?.matched}
              wrongMatch={wrongMatchColor === index}
              $isSelected={selectedColors.includes(index)}
            >
              {option.name}
            </Item>
          ))}
        </ItemsContainer>
      </MatchingGame>
    );
  }, [handleColorClick, handleNumberClick, selectedColors, selectedNumbers, shuffledItems, shuffledColors, wrongMatch, wrongMatchColor]);

  const renderMathGame = useCallback((task) => {
    if (!task?.options) {
      console.log('No options found for math task:', task);
      return null;
    }

    return (
      <MathGame>
        <MathProblem>
          {task.problem}
        </MathProblem>
        <NumberGrid>
          {task.options.map((number, i) => (
            <NumberButton
              key={i}
              onClick={() => handleAnswerSubmit(number)}
            >
              {number}
            </NumberButton>
          ))}
        </NumberGrid>
      </MathGame>
    );
  }, [handleAnswerSubmit]);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  return (
    <Container>
      <GlobalStyle />
      <HomeButton />
      {toast.show && <Toast type={toast.type}>{toast.message}</Toast>}
      <ProgressIndicator>
        შესრულებულია: {completedTasksCount} / {tasks.length}
      </ProgressIndicator>
      
      {showCentralPraise && (
        <CentralPraise>
          <div className="praise-text">
            გილოცავ! შენ წარმატებით დაასრულე ყველა დავალება!
          </div>
          <span className="praise-emoji">🎉</span>
          <span className="praise-emoji">🏆</span>
          <span className="praise-emoji">⭐</span>
        </CentralPraise>
      )}

      <TaskCard scale={scale} isWrong={isWrongAnswer}>
        <Title>
          <span>სახალისო ამოცანები</span>
        </Title>
        <Subtitle>{currentTask?.description || 'Loading...'}</Subtitle>

        {isVisible && (
          <div style={{ position: 'relative' }}>
            <>
              {currentTask?.type === 'matching' && renderMatchingGame(currentTask)}
              {currentTask?.type === 'math' && renderMathGame(currentTask)}
            </>
          </div>
        )}

      
      </TaskCard>
      <ZoomControls>
        <ZoomButton onClick={handleZoomOut}>-</ZoomButton>
        <ZoomButton onClick={handleZoomIn}>+</ZoomButton>
      </ZoomControls>
    </Container>
  );
};

const NavigationButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: clamp(0.5rem, 2vw, 1rem);
  margin-top: clamp(1rem, 4vw, 2rem);
`;

export default React.memo(Tasks);
