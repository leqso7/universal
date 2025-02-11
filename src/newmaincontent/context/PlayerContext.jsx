import React, { createContext, useContext, useState, useEffect } from 'react';

const PlayerContext = createContext();

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

export const PlayerProvider = ({ children }) => {
  const [players, setPlayers] = useState(() => {
    const savedPlayers = localStorage.getItem('players');
    return savedPlayers ? JSON.parse(savedPlayers) : [];
  });

  const [currentPlayer, setCurrentPlayer] = useState(() => {
    const savedCurrentPlayer = localStorage.getItem('currentPlayer');
    return savedCurrentPlayer ? JSON.parse(savedCurrentPlayer) : null;
  });

  const [gameProgress, setGameProgress] = useState(() => {
    const savedProgress = localStorage.getItem('gameProgress');
    return savedProgress ? JSON.parse(savedProgress) : {};
  });

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem('currentPlayer', JSON.stringify(currentPlayer));
  }, [currentPlayer]);

  useEffect(() => {
    localStorage.setItem('gameProgress', JSON.stringify(gameProgress));
  }, [gameProgress]);

  const addPlayer = (newPlayer) => {
    setPlayers(prev => [...prev, newPlayer]);
  };

  const updateGameProgress = (gameType, timestamp, progress) => {
    if (progress.reset) {
      setGameProgress(prev => ({
        ...prev,
        [gameType]: {}
      }));
    } else {
      setGameProgress(prev => ({
        ...prev,
        [gameType]: {
          ...(prev[gameType] || {}),
          [timestamp]: progress
        }
      }));
    }
  };

  const getGameStats = (gameType) => {
    if (!gameProgress[gameType]) {
      return {
        totalGames: 0,
        completedTasks: new Set()
      };
    }

    const gameStats = gameProgress[gameType];
    const attempts = Object.values(gameStats);
    const completedTasks = new Set();
    
    attempts.forEach(attempt => {
      if (attempt && typeof attempt.taskIndex !== 'undefined') {
        completedTasks.add(attempt.taskIndex);
      }
    });

    return {
      totalGames: attempts.length,
      completedTasks
    };
  };

  const getPlayerStats = (playerId, gameType) => {
    const player = players.find(p => p.id === playerId);
    if (!player || !player.gameProgress || !player.gameProgress[gameType]) {
      return null;
    }

    const gameStats = player.gameProgress[gameType];
    const attempts = Object.values(gameStats);

    return {
      totalGames: attempts.length,
      averageScore: attempts.reduce((acc, curr) => acc + curr.score, 0) / attempts.length,
      bestScore: Math.max(...attempts.map(a => a.score)),
      totalAttempts: attempts.reduce((acc, curr) => acc + curr.totalAttempts, 0),
      lastPlayed: Math.max(...Object.keys(gameStats).map(Number))
    };
  };

  const getPlayerSolvedRiddles = (playerId) => {
    const player = players.find(p => p.id === playerId);
    if (!player || !player.gameProgress || !player.gameProgress.riddles) {
      return new Set();
    }
    
    const riddleStats = player.gameProgress.riddles;
    const solvedRiddles = new Set();
    
    Object.values(riddleStats).forEach(progress => {
      if (progress.solvedRiddles) {
        progress.solvedRiddles.forEach(riddleIndex => solvedRiddles.add(riddleIndex));
      }
    });
    
    return solvedRiddles;
  };

  const getAllPlayersSolvedRiddles = () => {
    const allSolved = new Set();
    players.forEach(player => {
      const solved = getPlayerSolvedRiddles(player.id);
      solved.forEach(riddleIndex => allSolved.add(riddleIndex));
    });
    return allSolved;
  };

  const value = {
    players,
    currentPlayer,
    setCurrentPlayer,
    addPlayer,
    updateGameProgress,
    getGameStats,
    getPlayerStats,
    getPlayerSolvedRiddles,
    getAllPlayersSolvedRiddles
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};