import React, { createContext, useState, useContext, useEffect } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [playerName, setPlayerName] = useState('');
  const [showNameModal, setShowNameModal] = useState(true);
  const [allPlayersProgress, setAllPlayersProgress] = useState({});
  const [gameProgress, setGameProgress] = useState({
    completedTasks: [],
    taskScores: {},
    completedScrambleTasks: [],
    scrambleScores: {},
    completedPuzzles: [],
    puzzleScores: {},
    lastPlayedDate: null
  });

  useEffect(() => {
    const savedName = localStorage.getItem('playerName');
    const savedAllProgress = localStorage.getItem('allPlayersProgress');
    
    if (savedName) {
      setPlayerName(savedName);
      setShowNameModal(false);
    }
    
    if (savedAllProgress) {
      const parsed = JSON.parse(savedAllProgress);
      setAllPlayersProgress(parsed);
      if (savedName && parsed[savedName]) {
        setGameProgress(parsed[savedName]);
      }
    }
  }, []);

  useEffect(() => {
    if (playerName && gameProgress) {
      const updatedAllProgress = {
        ...allPlayersProgress,
        [playerName]: gameProgress
      };
      setAllPlayersProgress(updatedAllProgress);
      localStorage.setItem('allPlayersProgress', JSON.stringify(updatedAllProgress));
    }
  }, [playerName, gameProgress]);

  const switchPlayer = (newPlayerName) => {
    if (newPlayerName) {
      setPlayerName(newPlayerName);
      localStorage.setItem('playerName', newPlayerName);
      
      if (allPlayersProgress[newPlayerName]) {
        setGameProgress(allPlayersProgress[newPlayerName]);
      } else {
        setGameProgress({
          completedTasks: [],
          taskScores: {},
          completedScrambleTasks: [],
          scrambleScores: {},
          completedPuzzles: [],
          puzzleScores: {},
          lastPlayedDate: null
        });
      }
      setShowNameModal(false);
    }
  };

  const getAllPlayers = () => {
    return Object.keys(allPlayersProgress);
  };

  const updatePlayerName = (name) => {
    if (name && name.trim()) {
      const trimmedName = name.trim();
      setPlayerName(trimmedName);
      localStorage.setItem('playerName', trimmedName);
      
      if (!allPlayersProgress[trimmedName]) {
        const newProgress = {
          completedTasks: [],
          taskScores: {},
          completedScrambleTasks: [],
          scrambleScores: {},
          completedPuzzles: [],
          puzzleScores: {},
          lastPlayedDate: null
        };
        setGameProgress(newProgress);
      } else {
        setGameProgress(allPlayersProgress[trimmedName]);
      }
      setShowNameModal(false);
    }
  };

  const updateGameProgress = (type, completedItems, scores) => {
    console.log('Updating progress:', { type, completedItems, scores });
    
    setGameProgress(prev => {
      let newProgress = { ...prev };
      
      if (type === 'task' || type === 'tasks') {
        const itemToAdd = Array.isArray(completedItems) ? completedItems : [completedItems];
        const existingTasks = new Set(prev.completedTasks || []);
        const newTasks = itemToAdd.filter(item => !existingTasks.has(item));
        
        if (newTasks.length > 0) {
          newProgress = {
            ...prev,
            completedTasks: [...existingTasks, ...newTasks],
            taskScores: {
              ...prev.taskScores,
              ...(typeof scores === 'object' ? scores : { [completedItems]: scores })
            }
          };
        } else {
          return prev; 
        }
      } else if (type === 'scramble') {
        const uniqueScrambleTasks = new Set([
          ...(prev.completedScrambleTasks || []),
          ...(Array.isArray(completedItems) ? completedItems : [completedItems])
        ]);

        newProgress = {
          ...prev,
          completedScrambleTasks: Array.from(uniqueScrambleTasks),
          scrambleScores: {
            ...prev.scrambleScores,
            ...(typeof scores === 'object' ? scores : { [completedItems]: scores })
          }
        };
      } else if (type === 'puzzle') {
        const uniquePuzzles = new Set([
          ...(prev.completedPuzzles || []),
          ...(Array.isArray(completedItems) ? completedItems : [completedItems])
        ]);

        newProgress = {
          ...prev,
          completedPuzzles: Array.from(uniquePuzzles),
          puzzleScores: {
            ...prev.puzzleScores,
            ...(typeof scores === 'object' ? scores : { [completedItems]: scores })
          }
        };
      }
      
      newProgress.lastPlayedDate = new Date().toISOString();
      console.log('Saving progress:', newProgress);
      return newProgress;
    });
  };

  const resetProgress = () => {
    const newProgress = {
      completedTasks: [],
      taskScores: {},
      completedScrambleTasks: [],
      scrambleScores: {},
      completedPuzzles: [],
      puzzleScores: {},
      lastPlayedDate: null
    };
    setGameProgress(newProgress);
    localStorage.setItem('gameProgress', JSON.stringify(newProgress));
  };

  return (
    <PlayerContext.Provider value={{
      playerName,
      setPlayerName,
      showNameModal,
      setShowNameModal,
      gameProgress,
      setGameProgress,
      switchPlayer,
      getAllPlayers,
      updatePlayerName,
      updateGameProgress,
      resetProgress
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};