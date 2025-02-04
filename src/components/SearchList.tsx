import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FacebookLink from './FacebookLink';

export interface Student {
  id: string;
  name: string;
  timestamp: number;
  classId: string;
}

interface Group {
  id: number;
  members: Student[];
}

interface Class {
  id: string;
  name: string;
  students: Student[];
}

interface AttendanceRecord {
  date: string;
  presentStudents: string[];
  classId: string;
  className: string;
}

interface Props {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  onModalStateChange?: (isOpen: boolean) => void;
}

import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Container = styled.div<{ $showModal: boolean }>`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  overflow-x: hidden;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease-in-out;
  padding: 20px;
`;

const MainContent = styled.div<{ $isExpanded: boolean }>`
  display: flex;
  gap: 15px;
  width: 100%;
  height: 85vh;  // შევცვალეთ ფიქსირებული სიმაღლე პროცენტულზე
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
  padding: 20px;

  @media (max-height: 800px) {
    height: 80vh;
  }

  @media (max-height: 700px) {
    height: 75vh;
  }

  @media (max-height: 600px) {
    height: 70vh;
  }
`;

const StudentListContainer = styled.div`
  flex: 1;
  width: 700px;
  min-width: 700px;
  max-width: 700px;
  height: 100%;
  background: rgba(255, 255, 255, 0.98);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;

  @media (min-height: 1000px) {
    width: 800px;
    min-width: 800px;
    max-width: 800px;
    padding: 30px;
  }

  @media (max-height: 800px) {
    width: 600px;
    min-width: 600px;
    max-width: 600px;
  }

  @media (max-height: 700px) {
    width: 500px;
    min-width: 500px;
    max-width: 500px;
  }

  @media (max-height: 600px) {
    width: 400px;
    min-width: 400px;
    max-width: 400px;
  }
`;

const StudentListContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100% - 120px); // დავამატოთ ფიქსირებული სიმაღლე GroupSizeSelector-ის გამოკლებით
`;

const GroupSizeSelector = styled.div`
  padding-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  text-align: center;
  height: 120px; // დავამატოთ ფიქსირებული სიმაღლე
`;

const GroupsContainer = styled.div<{ $show: boolean; $isFullscreen: boolean }>`
  flex: 1;
  width: 700px;
  min-width: 700px;
  max-width: 700px;
  height: 100%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  transition: all 0.3s ease;
  opacity: ${props => (props.$show ? 1 : 0)};
  transform: ${props => (props.$show ? 'translateX(0)' : 'translateX(20px)')};
  display: ${props => (props.$show ? 'flex' : 'none')};
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.05);

  @media (min-height: 1000px) {
    width: 800px;
    min-width: 800px;
    max-width: 800px;
    padding: 30px;
  }

  @media (max-height: 800px) {
    width: 600px;
    min-width: 600px;
    max-width: 600px;
  }

  @media (max-height: 700px) {
    width: 500px;
    min-width: 500px;
    max-width: 500px;
  }

  @media (max-height: 600px) {
    width: 400px;
    min-width: 400px;
    max-width: 400px;
  }
`;

const SelectButton = styled.button`
  padding: 15px 20px;
  background: #4285f4;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 15px;
  width: 100%;
  position: relative;
  z-index: 10;

  @media (min-height: 1000px) {
    padding: 20px 25px;
    font-size: 18px;
    border-radius: 12px;
  }

  &:hover {
    background: #3367d6;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(66, 133, 244, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const SelectedStudent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 40px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  text-align: center;
  font-size: 48px;
  font-weight: bold;
  color: #1a73e8;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  text-transform: uppercase;
  animation: fadeIn 0.3s ease;
  max-width: 90vw;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -40%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }

  @media (max-width: 768px) {
    font-size: 36px;
    padding: 30px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
    padding: 20px;
  }
`;

const Overlay = styled.div<{ $show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, ${props => props.$show ? '0.5' : '0'});
  backdrop-filter: blur(${props => props.$show ? '8px' : '0px'});
  z-index: 1000;
  opacity: ${props => props.$show ? 1 : 0};
  visibility: ${props => props.$show ? 'visible' : 'hidden'};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: background, backdrop-filter, opacity;
`;

const GroupsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  height: 70px; // ფიქსირებული სიმაღლე
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const GroupControls = styled.div`
  display: flex;
  gap: 10px;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  color: #666;
  font-size: 24px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: #333;
  }
`;

const GroupTitle = styled.h2<{ $isFullscreen?: boolean }>`
  margin: 0;
  font-size: ${props => props.$isFullscreen ? '32px' : '24px'};
  color: #333;

  @media (min-height: 1000px) {
    font-size: ${props => props.$isFullscreen ? '38px' : '28px'};
  }
`;

const GroupsContent = styled.div<{ $isFullscreen: boolean }>`
  flex: 1;
  overflow-y: auto;
  padding: ${props => props.$isFullscreen ? '20px' : '10px'};
  height: calc(100% - 70px); // Header-ის სიმაღლის გამოკლებით
`;

const GroupGrid = styled.div<{ $isFullscreen: boolean }>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(min-content, 1fr);
  gap: 15px;
  padding: 10px;
  height: 100%;
`;

const StudentList = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-top: 15px;
  margin-bottom: 15px;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const GroupCard = styled.div`
  background: #f8f9fa;
  border-radius: 6px;
  padding: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transform: scale(1);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (min-height: 1000px) {
    padding: 20px;
  }

  &:hover {
    transform: translateY(-2px) scale(1.01);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const GroupMemberList = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  justify-content: space-evenly;
`;

const GroupMember = styled.div`
  padding: 8px;
  margin: 4px 0;
  background: white;
  border-radius: 4px;
  transform: scale(1);
  transition: all 0.2s ease;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-height: 1000px) {
    padding: 12px;
    margin: 6px 0;
    font-size: 18px;
  }

  &:hover {
    transform: translateX(5px) scale(1.02);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ff4444;
  font-size: 24px;
  cursor: pointer;
  padding: 0 5px;
  transition: all 0.2s ease;

  &:hover {
    color: #ff0000;
    transform: scale(1.1);
  }
`;

const StudentCard = styled.div<{ $isRemoving: boolean }>`
  background: white;
  padding: 12px;
  margin: 6px 0;
  min-height: 42px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  animation: ${props => props.$isRemoving ? 'slideOut' : 'slideIn'} 0.3s ease-in-out;
  
  @media (min-height: 1000px) {
    padding: 16px;
    margin: 8px 0;
    min-height: 52px;
    font-size: 18px;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(20px);
    }
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
  }
`;


const SearchBar = styled.div`
  display: flex;
  gap: 10px;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 10;
`;

const AddButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const AddClassButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 20px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  z-index: 10;
  
  &:hover {
    background: #45a049;
  }

  &::before {
    content: '';
    position: absolute;
    top: calc(100% + 2px);
    right: 20px;
    border: 8px solid transparent;
    border-bottom-color: rgba(0, 0, 0, 0.9);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  &::after {
    content: "ამ ღილაკზე დაჭერის შემდეგ: შეინახოთ მთლიანი კლასის სია. ამის შემდეგ, საძიებო ველში მხოლოდ კლასის სახელის შეყვანით, ავტომატურად დაემატება ყველა მოსწავლე ეკრანზე. ეს დაგიზოგავთ დროს და აღარ მოგიწევთ მოსწავლეების სათითაოდ დამატება ყოველ გაკვეთილზე";
    position: absolute;
    top: calc(100% + 20px);
    right: 0;
    width: 300px;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.9);
    color: white;
    font-size: 14px;
    font-weight: normal;
    line-height: 1.5;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    text-align: left;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    pointer-events: none;
    
    @media (max-width: 768px) {
      width: 250px;
      font-size: 13px;
      left: 50%;
      transform: translateX(-50%);
    }
    
    @media (max-width: 480px) {
      width: 200px;
      font-size: 12px;
    }
  }

  &:hover::before,
  &:hover::after {
    opacity: 1;
    visibility: visible;
  }
`;

const SearchInput = styled.input`
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  width: 300px;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  z-index: 1001;
  filter: none !important;
  backdrop-filter: none !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const ModalTitle = styled.h2`
  margin: 0 0 20px 0;
  font-size: 24px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 20px;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 20px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 10px 0;
`;

const Button = styled.button<{ $primary?: boolean }>`
  padding: 12px 20px;
  background: ${props => props.$primary ? '#4CAF50' : '#e0e0e0'};
  color: ${props => props.$primary ? 'white' : '#333'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  
  &:hover {
    background: ${props => props.$primary ? '#45a049' : '#d0d0d0'};
  }
`;

const NumberButton = styled.button<{ 
  $isValid: boolean;
  $studentsCount: number;
  $isSelected: boolean
}>`
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${props => 
    props.$isSelected ? '#4CAF50' :
    props.$studentsCount === 0 ? '#f0f0f0' :
    props.$isValid ? '#e8f5e9' : '#f0f0f0'
  };
  color: ${props => 
    props.$isSelected ? 'white' :
    props.$studentsCount === 0 ? '#666' :
    props.$isValid ? '#2e7d32' : '#666'
  };
  transition: all 0.2s ease;
  min-width: 45px;

  @media (min-height: 1000px) {
    padding: 15px 20px;
    font-size: 18px;
    min-width: 55px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    background-color: ${props => 
      props.$isSelected ? '#45a049' :
      props.$studentsCount === 0 ? '#e0e0e0' :
      props.$isValid ? '#81c784' : '#e0e0e0'
    };
  }

  &:active {
    transform: translateY(0);
  }
`;

const GroupSizeText = styled.div`
  color: #666;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;

  @media (min-height: 1000px) {
    font-size: 16px;
    margin-top: 15px;
  }
`;


const StudentCount = styled.div`
  margin-top: 10px;
  font-size: 16px;
  color: #666;

  @media (min-height: 1000px) {
    font-size: 18px;
    margin-top: 15px;
  }
`;

const CloseButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  color: white;
  font-size: 32px;
  cursor: pointer;
  z-index: 1002;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const AttendanceButton = styled.button<{ $showModal?: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px 25px;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  filter: ${props => props.$showModal ? 'blur(5px)' : 'none'};
  pointer-events: ${props => props.$showModal ? 'none' : 'auto'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const StatisticsModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.98);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  padding: 20px;
  animation: slideIn 0.3s ease-out;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 30px;
  }

  @keyframes slideIn {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const StatisticsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const StatisticsTitle = styled.h2`
  font-size: 32px;
  color: #2c3e50;
  margin: 0;
  font-weight: 600;
`;

const CloseStatisticsButton = styled.button`
  background: none;
  border: none;
  font-size: 32px;
  color: #2c3e50;
  cursor: pointer;
  padding: 10px;
  transition: all 0.2s ease;

  &:hover {
    transform: rotate(90deg);
  }
`;

const StatisticsContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 10px 0;
  
  @media (min-width: 768px) {
    padding: 15px 0;
  }
`;

const StatisticsSelect = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  margin-bottom: 15px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;

  @media (min-width: 768px) {
    width: 300px;
  }

  &:hover {
    border-color: #4CAF50;
  }

  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
  }
`;

const StatisticsSearch = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 15px;
  font-size: 16px;

  @media (min-width: 768px) {
    width: 300px;
  }

  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const ChartContainer = styled.div`
  flex: 1;
  min-height: 0;
  background: white;
  border-radius: 16px;
  padding: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const AttendanceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 15px;
  padding: 15px;
  overflow-y: auto;
  max-height: calc(100vh - 250px);

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
`;

const AttendanceCard = styled.div<{ $percentage: number }>`
  background: ${props => {
    if (props.$percentage >= 80) return 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
    if (props.$percentage >= 60) return 'linear-gradient(135deg, #FFA726 0%, #FB8C00 100%)';
    return 'linear-gradient(135deg, #FF7043 0%, #F4511E 100%)';
  }};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: transform 0.2s ease;
  color: white;
  aspect-ratio: 2/3;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const StudentName = styled.div`
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  word-break: break-word;
`;

const AttendancePercentage = styled.div`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
`;

const CardsContainer = styled.div`
  flex: 1;
  width: 100%;
  max-width: 700px;
  min-width: 300px;
  height: auto;
  min-height: 600px;
  max-height: calc(100vh - 100px);
  background: rgba(255, 255, 255, 0.98);
  padding: 20px;
  border-radius: 12px;
  overflow-y: auto;
  margin-bottom: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

const StatisticsTabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    gap: 10px;
  }
`;

const StatisticsTab = styled.button<{ $active: boolean }>`
  padding: 10px 20px;
  background: ${props => props.$active ? '#4CAF50' : '#f5f5f5'};
  color: ${props => props.$active ? 'white' : '#333'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  font-size: 14px;

  @media (min-width: 768px) {
    padding: 12px 24px;
    font-size: 16px;
  }

  &:hover {
    background: ${props => props.$active ? '#45a049' : '#e0e0e0'};
  }
`;

// სტილის კომპონენტი გადავიტანოთ ცალკე
const StyledSaveButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    background: #388E3C;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
  
  &:active {
    transform: translateY(0);
  }

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 0;
    width: 300px;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.9);
    color: white;
    font-size: 14px;
    font-weight: normal;
    line-height: 1.5;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    text-align: left;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    pointer-events: none;
    
    @media (max-width: 768px) {
      width: 250px;
      font-size: 13px;
      left: 50%;
      transform: translateX(-50%);
    }
    
    @media (max-width: 480px) {
      width: 200px;
      font-size: 12px;
    }
  }

  &:hover::after {
    opacity: 1;
    visibility: visible;
  }
`;

// ახალი კომპონენტი tooltip-ისთვის
const SaveAttendanceButton: React.FC<{ className: string; onClick: () => void }> = ({ 
  className, 
  onClick 
}) => {
  const tooltipText = `ამ ღილაკზე დაჭერის შემდეგ: შეინახება "${className}" კლასის დღევანდელი დასწრების სია, გამოითვლება მოსწავლეთა დასწრების საშუალო მაჩვენებელი და დაგენერირდება გრაფიკები. ამ ინფორმაციის ნახვას კი შეძლებთ დასწრების სტატისტიკაზე დაჭერის შემდეგ.`;

  return (
    <StyledSaveButton
      onClick={onClick}
      data-tooltip={tooltipText}
    >
      შენახვა
    </StyledSaveButton>
  );
};

const AttendanceHistoryList = styled.div`
  margin-top: 20px;
`;

const AttendanceHistoryDay = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
`;

const AttendanceHistoryDate = styled.h3`
  margin-bottom: 10px;
  color: #333;
  font-size: 18px;
`;

const AttendanceHistoryStudents = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
`;

const AttendanceHistoryStudent = styled.div<{ $present: boolean }>`
  padding: 8px 12px;
  background: ${props => props.$present ? '#4CAF50' : '#f44336'};
  color: white;
  border-radius: 6px;
  text-align: center;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;


const SearchList: React.FC<Props> = ({ 
  students, 
  setStudents,
  onModalStateChange 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [groups, setGroups] = useState<Group[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [className, setClassName] = useState('');
  const [studentsList, setStudentsList] = useState('');
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [selectedClassForAttendance, setSelectedClassForAttendance] = useState<string>('');
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(() => {
    const savedRecords = localStorage.getItem('attendanceRecords');
    return savedRecords ? JSON.parse(savedRecords) : [];
  });
  const [classes, setClasses] = useState<Class[]>(() => {
    const savedClasses = localStorage.getItem('classes');
    return savedClasses ? JSON.parse(savedClasses) : [];
  });
  const [selectedSize, setSelectedSize] = useState<number>(3);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [currentSelected, setCurrentSelected] = useState<string | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSelectionDisabled, setIsSelectionDisabled] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [currentClassId, setCurrentClassId] = useState<string>('');
  const [currentClassName, setCurrentClassName] = useState<string>('');
  const [viewMode, setViewMode] = useState<'cards' | 'chart'>('cards');
  const [nameFilter, setNameFilter] = useState('');
  const [showAttendanceHistory, setShowAttendanceHistory] = useState(false);
  const [selectedClassForHistory, setSelectedClassForHistory] = useState<string>('');

  useEffect(() => {
    const savedClasses = localStorage.getItem('classes');
    if (savedClasses) {
      try {
        const parsedClasses = JSON.parse(savedClasses);
        setClasses(parsedClasses);
      } catch (error) {
        console.error('Error parsing saved classes:', error);
        toast.error('კლასების ჩატვირთვა ვერ მოხერხდა');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('classes', JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  useEffect(() => {
    onModalStateChange?.(showModal);
  }, [showModal, onModalStateChange]);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveStudent = (timestamp: number, classId: string) => {
    setStudents(prevStudents => {
      return prevStudents.filter(student => 
        !(student.timestamp === timestamp && student.classId === classId)
      );
    });
  };

  const handleGroupSize = (size: number) => {
    if (students.length < 4) {
      toast.error('მინიმუმ 4 მოსწავლე უნდა იყოს დამატებული (2 ჯგუფი მინიმუმ 2 მოსწავლით)');
      return;
    }

    // Shuffle students
    const shuffled = [...students].sort(() => Math.random() - 0.5);
    const totalStudents = shuffled.length;

    // Calculate number of groups ensuring minimum 2 students per group
    const maxGroups = Math.floor(totalStudents / 2); // მაქსიმალური ჯგუფების რაოდენობა (მინ. 2 კაცი)
    const requestedGroups = Math.ceil(totalStudents / size); // მოთხოვნილი ჯგუფების რაოდენობა
    const numGroups = Math.min(maxGroups, requestedGroups);

    // Ensure we have at least 2 groups
    if (numGroups < 2) {
      toast.error('მინიმუმ 2 ჯგუფის შექმნა უნდა იყოს შესაძლებელი');
      return;
    }

    // Calculate minimum students per group and extras
    const minStudentsPerGroup = Math.floor(totalStudents / numGroups);
    const extraStudents = totalStudents % numGroups;

    // Create groups with even distribution
    const newGroups: Group[] = [];
    let currentIndex = 0;

    for (let i = 0; i < numGroups; i++) {
      // Add one extra student to early groups if we have remainder
      const groupSize = i < extraStudents ? minStudentsPerGroup + 1 : minStudentsPerGroup;
      
      // Ensure each group has at least 2 students
      if (groupSize < 2) {
        toast.error('ყველა ჯგუფში მინიმუმ 2 მოსწავლე უნდა იყოს');
        return;
      }
      
      newGroups.push({
        id: Date.now() + i,
        members: shuffled.slice(currentIndex, currentIndex + groupSize)
      });
      
      currentIndex += groupSize;
    }

    setGroups(newGroups);
    setSelectedSize(size);
    setIsExpanded(true);
  };

  const handleAddClass = () => {
    if (!className.trim()) {
      toast.error('გთხოვთ შეიყვანოთ კლასის სახელი', {
        autoClose: 2000,
        hideProgressBar: false,
      });
      return;
    }

    const classId = Date.now().toString();

    // შევამოწმოთ დუბლიკატი სახელები
    const studentNames = studentsList
      .split('\n')
      .map(name => name.trim())
      .filter(name => name);

    const duplicateNames = studentNames.filter(
      (name, index) => studentNames.indexOf(name) !== index
    );

    if (duplicateNames.length > 0) {
      toast.error(`გთხოვთ წაშალოთ დუბლიკატი სახელები: ${duplicateNames.join(', ')}`, {
        autoClose: 3000,
        hideProgressBar: false,
      });
      return;
    }

    const newStudents = studentNames
      .map((name, index) => ({
        id: crypto.randomUUID(),
        name,
        timestamp: Date.now() + index,
        classId
      }));

    if (newStudents.length === 0) {
      toast.error('გთხოვთ შეიყვანოთ მინიმუმ ერთი მოსწავლე', {
        autoClose: 2000,
        hideProgressBar: false,
      });
      return;
    }

    const existingClassIndex = classes.findIndex(c => 
      c.name.toLowerCase() === className.toLowerCase()
    );

    if (existingClassIndex !== -1) {
      const updatedClasses = [...classes];
      const existingClass = updatedClasses[existingClassIndex];
      
      // Create a new class with the same ID as the existing class
      updatedClasses[existingClassIndex] = {
        id: existingClass.id, // Keep the same ID to preserve history
        name: className,
        students: newStudents.map(student => ({
          ...student,
          classId: existingClass.id // Use existing class ID for new students
        }))
      };
      
      setClasses(updatedClasses);
      localStorage.setItem('classes', JSON.stringify(updatedClasses));
      toast.success('კლასი წარმატებით განახლდა!', {
        autoClose: 2000,
        hideProgressBar: false,
      });
    } else {
      const newClass: Class = {
        id: classId,
        name: className.trim(),
        students: newStudents
      };

      const updatedClasses = [...classes, newClass];
      setClasses(updatedClasses);
      localStorage.setItem('classes', JSON.stringify(updatedClasses));
      toast.success('კლასი წარმატებით დაემატა!', {
        autoClose: 2000,
        hideProgressBar: false,
      });
    }
    
    setClassName('');
    setStudentsList('');
    setShowModal(false);
  };

  const handleSearch = () => {
    const term = searchTerm.trim();
    if (!term) {
      toast.error('გთხოვთ შეიყვანოთ მოსწავლის/კლასის სახელი');
      return;
    }

    try {
      const savedClasses: Class[] = JSON.parse(localStorage.getItem('classes') || '[]');
      const foundClass = savedClasses.find(c => 
        c.name.toLowerCase() === term.toLowerCase()
      );

      if (foundClass && Array.isArray(foundClass.students)) {
        // ჯერ გავასუფთავოთ წინა სია
        setStudents([]);
        setShowSaveButton(false);
        
        const newStudents: Student[] = foundClass.students.map(student => ({
          id: student.id,
          name: student.name,
          timestamp: Date.now() + Math.random(), // უნიკალური timestamp-ის უზრუნველსაყოფად
          classId: foundClass.id
        }));

        setCurrentClassId(foundClass.id);
        setCurrentClassName(foundClass.name);
        setShowSaveButton(true);
        setStudents(newStudents);
        toast.success(`დაემატა ${newStudents.length} მოსწავლე`);
      } else {
        const existingStudent = students.find(
          s => s.name.toLowerCase() === term.toLowerCase()
        );

        if (existingStudent) {
          return;
        }

        const newStudent: Student = {
          id: crypto.randomUUID(),
          name: term,
          timestamp: Date.now(),
          classId: ''
        };

        setStudents(prev => [...prev, newStudent]);
      }
    } catch (error) {
      console.error('Error processing search:', error);
      toast.error('დაფიქსირდა შეცდომა ძებნისას');
    }

    setSearchTerm('');
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  const handleRandomSelect = () => {
    if (isSelectionDisabled) {
      return;
    }

    if (students.length === 0) {
      toast.warning('გთხოვთ დაამატოთ მოსწავლეები', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }

    if (students.length === 1) {
      toast.warning('გთხოვთ დაამატოთ მინიმუმ 2 მოსწავლე', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }

    const availableStudents = students.filter(student => 
      !selectedStudents.includes(student.name)
    );

    if (availableStudents.length === 0) {
      setSelectedStudents([]);
      setCurrentSelected(null);
      setShowOverlay(false);
      setIsSelectionDisabled(true);
      
      toast.info('ყველა მოსწავლე შერჩეულია! ვიწყებთ თავიდან.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      
      setTimeout(() => {
        setIsSelectionDisabled(false);
        
        setTimeout(() => {
          const randomStudent = students[Math.floor(Math.random() * students.length)];
          setCurrentSelected(randomStudent.name);
          setSelectedStudents([randomStudent.name]);
          setShowOverlay(true);
          
          setTimeout(() => {
            setShowOverlay(false);
          }, 7000);
        }, 1000);
        
      }, 5000);
      
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableStudents.length);
    const selectedStudent = availableStudents[randomIndex];
    
    if (showOverlay) {
      setShowOverlay(false);
      setTimeout(() => {
        setCurrentSelected(selectedStudent.name);
        setSelectedStudents([...selectedStudents, selectedStudent.name]);
        setShowOverlay(true);
      }, 300);
    } else {
      setCurrentSelected(selectedStudent.name);
      setSelectedStudents([...selectedStudents, selectedStudent.name]);
      setShowOverlay(true);
    }

    setTimeout(() => {
      setShowOverlay(false);
    }, 7000);
  };

  const handleExpandGroups = () => {
    setIsFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
  };

  const handleSaveAttendance = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    const presentStudents = filteredStudents.map(student => student.name);
    
    if (!currentClassId || !currentClassName) {
      toast.error('კლასის ინფორმაცია ვერ მოიძებნა');
      return;
    }

    const newRecord: AttendanceRecord = {
      date: currentDate,
      presentStudents,
      classId: currentClassId,
      className: currentClassName
    };

    setAttendanceRecords(prev => [...prev, newRecord]);
    setShowSaveButton(false);
    setStudents([]);
    toast.success('დასწრება შენახულია!');
  };

  const calculateAttendance = (className: string) => {
    const selectedClass = classes.find(c => c.name === className);
    if (!selectedClass) return [];

    const classRecords = attendanceRecords.filter(record => record.className === className);
    const allStudents = selectedClass.students;
    
    // Create a map of all historical student names that have attendance records
    const historicalStudentNames = new Set<string>();
    classRecords.forEach(record => {
      record.presentStudents.forEach(name => historicalStudentNames.add(name));
    });
    
    const attendanceData = allStudents.map(student => {
      const totalRecords = classRecords.length;
      const presentCount = classRecords.filter(record => 
        record.presentStudents.includes(student.name)
      ).length;
      
      const percentage = totalRecords === 0 ? 0 : Math.round((presentCount / totalRecords) * 100);
      return { id: student.id, name: student.name, percentage };
    });

    // Add historical students that are no longer in the class with a note
    Array.from(historicalStudentNames)
      .filter(name => !allStudents.some(s => s.name === name))
      .forEach(name => {
        const totalRecords = classRecords.length;
        const presentCount = classRecords.filter(record => 
          record.presentStudents.includes(name)
        ).length;
        
        const percentage = totalRecords === 0 ? 0 : Math.round((presentCount / totalRecords) * 100);
        attendanceData.push({ 
          id: `historical-${name}`, 
          name: `${name} (აღარ არის კლასში)`, 
          percentage 
        });
      });
  
    // დავალაგოთ დასწრების კლების მიხედვით
    return attendanceData.sort((a, b) => b.percentage - a.percentage);
  };

  const getChartData = (attendanceData: { id: string; name: string; percentage: number }[]) => {
    return {
      labels: attendanceData.map(student => student.name),
      datasets: [
        {
          label: 'დასწრების პროცენტი',
          data: attendanceData.map(student => student.percentage),
          backgroundColor: attendanceData.map(student => {
            if (student.percentage >= 80) return 'rgba(76, 175, 80, 0.8)';
            if (student.percentage >= 60) return 'rgba(255, 167, 38, 0.8)';
            return 'rgba(244, 67, 54, 0.8)';
          }),
          borderColor: attendanceData.map(student => {
            if (student.percentage >= 80) return '#4CAF50';
            if (student.percentage >= 60) return '#FB8C00';
            return '#F4511E';
          }),
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'მოსწავლეების დასწრების სტატისტიკა',
        font: {
          size: 16,
        },
        padding: {
          top: 5,
          bottom: 10
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value: number) => `${value}%`,
          font: {
            size: 12
          }
        },
      },
      x: {
        ticks: {
          autoSkip: true,
          maxRotation: 45,
          minRotation: 45,
          font: {
            size: 11
          }
        }
      }
    },
  };

  const filterStudentsByName = (students: { id: string; name: string; percentage: number }[]) => {
    if (!nameFilter) return students;
    return students.filter(student => 
      student.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
  };

  const getFormattedDate = (date: string) => {
    const d = new Date(date);
    
    // შევამოწმოთ არის თუ არა თარიღი სწორი
    if (isNaN(d.getTime())) {
      return 'არასწორი თარიღის ფორმატი';
    }

    const georgianMonths = [
      'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი',
      'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
    ];
    
    const day = d.getDate();
    const month = georgianMonths[d.getMonth()];
    const year = d.getFullYear();
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');

    return `${day} ${month}, ${year} - ${hours}:${minutes}`;
  };

  const getClassAttendanceHistory = (className: string) => {
    return attendanceRecords
      .filter(record => record.className === className)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }



  return (
    <Container $showModal={showModal}>
      <Overlay $show={showOverlay} />
      {showOverlay && <CloseButton onClick={handleCloseOverlay}>×</CloseButton>}
      {currentSelected && showOverlay && (
        <SelectedStudent>
          {currentSelected}
        </SelectedStudent>
      )}
      <ContentWrapper>
        <FacebookLink isBlurred={showModal || showAttendanceModal || currentSelected !== null} />
        <SearchBar>
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="მოსწავლის/კლასის სახელი..."
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <AddButton onClick={handleSearch}>დამატება</AddButton>
        </SearchBar>

        <AddClassButton onClick={() => setShowModal(true)}>
          კლასის დამატება
        </AddClassButton>

        {showModal && (
          <>
            <Overlay $show={true} />
            <ModalOverlay>
              <ModalContent>
                <ModalTitle>კლასის დამატება</ModalTitle>
                <Input
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="კლასის სახელი..."
                />
                <TextArea
                  value={studentsList}
                  onChange={(e) => setStudentsList(e.target.value)}
                  placeholder="ჩაწერეთ მოსწავლეების სია (თითო ხაზზე თითო მოსწავლე)..."
                />
                <ButtonGroup>
                  <Button onClick={() => setShowModal(false)}>გაუქმება</Button>
                  <Button $primary onClick={handleAddClass}>შენახვა</Button>
                </ButtonGroup>
              </ModalContent>
            </ModalOverlay>
          </>
        )}

        <MainContent $isExpanded={isExpanded}>
          <StudentListContainer>
            <StudentListContent>
              <SelectButton 
                onClick={handleRandomSelect}
                disabled={isSelectionDisabled}
                style={{ opacity: isSelectionDisabled ? 0.5 : 1 }}
              >
                მოსწავლის არჩევა
              </SelectButton>
              <StudentCount>
                მოსწავლეების რაოდენობა: {students.length}
              </StudentCount>

              <StudentList>
                {filteredStudents.map((student) => (
                  <StudentCard key={`${student.id}-${student.timestamp}`} $isRemoving={false}>
                    <span>{student.name}</span>
                    <DeleteButton 
                      onClick={() => handleRemoveStudent(student.timestamp, student.classId)}
                    >
                      ×
                    </DeleteButton>
                  </StudentCard>
                ))}
              </StudentList>

              {showSaveButton && filteredStudents.length > 0 && (
                <SaveAttendanceButton 
                  className={currentClassName} 
                  onClick={handleSaveAttendance}
                />
              )}
            </StudentListContent>
            
            <GroupSizeSelector>
              <div style={{ color: '#666', marginBottom: '10px' }}>
                აირჩიეთ ჯგუფის ზომა:
              </div>
              <ButtonGroup>
                {[2, 3, 4, 5, 6].map((size) => (
                  <NumberButton
                    key={size}
                    onClick={() => handleGroupSize(size)}
                    $isValid={filteredStudents.length % size === 0}
                    $studentsCount={filteredStudents.length}
                    $isSelected={selectedSize === size}
                  >
                    {size}
                  </NumberButton>
                ))}
              </ButtonGroup>
              <GroupSizeText>
                {filteredStudents.length > 0 
                  ? `${selectedSize} კაციანი ჯგუფები - ${Math.ceil(filteredStudents.length / selectedSize)} ჯგუფი`
                  : 'აირჩიეთ ჯგუფის ზომა'}
              </GroupSizeText>
            </GroupSizeSelector>

          </StudentListContainer>

          <GroupsContainer $show={isExpanded} $isFullscreen={isFullscreen}>
            <GroupsHeader>
              <GroupTitle $isFullscreen={isFullscreen}>შექმნილი ჯგუფები</GroupTitle>
              <GroupControls>
                {isFullscreen ? (
                  <IconButton onClick={handleCloseFullscreen} title="დახურვა">
                    ×
                  </IconButton>
                ) : (
                  <>
                    <IconButton onClick={handleExpandGroups} title="გადიდება">
                      ⛶
                    </IconButton>
                    <IconButton onClick={() => setIsExpanded(false)} title="დახურვა">
                      ×
                    </IconButton>
                  </>
                )}
              </GroupControls>
            </GroupsHeader>

            <GroupsContent $isFullscreen={isFullscreen}>
              <GroupGrid $isFullscreen={isFullscreen}>
                {groups.map((group, index) => (
                  <GroupCard key={`group-${index}-${group.members[0]?.id || index}`}>
                    <GroupTitle>ჯგუფი {index + 1}</GroupTitle>
                    <GroupMemberList>
                      {group.members.map(student => (
                        <GroupMember key={`${student.id}-${student.timestamp}`}>
                          {student.name}
                        </GroupMember>
                      ))}
                    </GroupMemberList>
                  </GroupCard>
                ))}
              </GroupGrid>
            </GroupsContent>
          </GroupsContainer>
        </MainContent>
      </ContentWrapper>
      
      <AttendanceButton onClick={() => setShowAttendanceModal(true)} $showModal={showModal}>
        დასწრება
      </AttendanceButton>

      {showAttendanceModal && (
        <StatisticsModal>
          <StatisticsHeader>
            <StatisticsTitle>დასწრება</StatisticsTitle>
            <CloseStatisticsButton onClick={() => setShowAttendanceModal(false)}>
              ×
            </CloseStatisticsButton>
          </StatisticsHeader>

          <StatisticsSelect
            value={selectedClassForAttendance}
            onChange={(e) => setSelectedClassForAttendance(e.target.value)}
          >
            <option value="">აირჩიეთ კლასი</option>
            {classes.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </StatisticsSelect>

          {selectedClassForAttendance && (
            <>
              <StatisticsSearch
                type="text"
                placeholder="მოძებნეთ მოსწავლე..."
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />

              <StatisticsTabs>
                <StatisticsTab 
                  $active={viewMode === 'cards'} 
                  onClick={() => setViewMode('cards')}
                >
                  ბარათები
                </StatisticsTab>
                <StatisticsTab 
                  $active={viewMode === 'chart'} 
                  onClick={() => setViewMode('chart')}
                >
                  გრაფიკი
                </StatisticsTab>
                <StatisticsTab 
                  $active={false}
                  onClick={() => {
                    setSelectedClassForHistory(selectedClassForAttendance);
                    setShowAttendanceHistory(true);
                    setShowAttendanceModal(false);
                  }}
                >
                  დასწრების ისტორია
                </StatisticsTab>
              </StatisticsTabs>

              {viewMode === 'cards' ? (
                <CardsContainer>
                  <AttendanceGrid>
                    {filterStudentsByName(calculateAttendance(selectedClassForAttendance))
                      .map(student => (
                        <AttendanceCard 
                          key={student.id} 
                          $percentage={student.percentage}
                        >
                          <StudentName>{student.name}</StudentName>
                          <AttendancePercentage>{student.percentage}%</AttendancePercentage>
                        </AttendanceCard>
                      ))}
                  </AttendanceGrid>
                </CardsContainer>
              ) : (
                <ChartContainer>
                  <Bar 
                    data={getChartData(filterStudentsByName(calculateAttendance(selectedClassForAttendance)))} 
                    options={{
                      ...chartOptions,
                      scales: {
                        y: {
                          beginAtZero: true
                        }
                      }
                    }}
                  />
                </ChartContainer>
              )}
            </>
          )}
        </StatisticsModal>
      )}
      
      {showAttendanceHistory && (
        <>
          <Overlay $show={true} />
          <StatisticsModal style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            maxWidth: 'none',
            margin: 0,
            borderRadius: 0,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <StatisticsHeader>
              <StatisticsTitle>დასწრების ისტორია</StatisticsTitle>
              <CloseStatisticsButton onClick={() => {
                setShowAttendanceHistory(false);
                setShowAttendanceModal(true);
              }}>
                ×
              </CloseStatisticsButton>
            </StatisticsHeader>

            <StatisticsSelect
              value={selectedClassForHistory}
              onChange={(e) => setSelectedClassForHistory(e.target.value)}
              style={{ margin: '20px 0' }}
            >
              <option value="">აირჩიეთ კლასი</option>
              {classes.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </StatisticsSelect>

            <StatisticsContent style={{ flex: 1, overflow: 'auto' }}>
              <AttendanceHistoryList>
                {getClassAttendanceHistory(selectedClassForHistory).map((record, index) => (
                  <AttendanceHistoryDay key={index}>
                    <AttendanceHistoryDate>
                      {getFormattedDate(record.date)}
                    </AttendanceHistoryDate>
                    <AttendanceHistoryStudents>
                      {classes
                        .find(c => c.name === record.className)
                        ?.students
                        .sort((a, b) => {
                          const aPresent = record.presentStudents.includes(a.name);
                          const bPresent = record.presentStudents.includes(b.name);
                          if (aPresent && !bPresent) return -1;
                          if (!aPresent && bPresent) return 1;
                          return 0;
                        })
                        .map(student => (
                          <AttendanceHistoryStudent
                            key={student.id}
                            $present={record.presentStudents.includes(student.name)}
                          >
                            {student.name}
                          </AttendanceHistoryStudent>
                        ))}
                    </AttendanceHistoryStudents>
                  </AttendanceHistoryDay>
                ))}
              </AttendanceHistoryList>
            </StatisticsContent>
          </StatisticsModal>
        </>
      )}
      
    </Container>
  );
}
export default SearchList;
