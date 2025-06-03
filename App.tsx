
import React, { useState, useEffect, useCallback } from 'react';
import { DailyQuestion, UserAnswer, GameState, StoredGameData } from './types';
import { 
  DAILY_FETCH_HOUR, 
  NUM_QUESTIONS_TO_GENERATE, 
  LOCALSTORAGE_QUESTIONS_KEY,
  BASE_SCORE_CORRECT_ANSWER,
  PERFECT_TIME_THRESHOLD_MS, 
  PENALTY_PER_INTERVAL,      
  MS_PER_PENALTY_INTERVAL  
} from './constants';
import { getAllPredefinedQuestions } from './synonymsData'; 
import LoadingComponent from './components/LoadingComponent';
import ErrorComponent from './components/ErrorComponent';
import GameComponent from './components/GameComponent';
import ResultsComponent from './components/ResultsComponent';
import StartScreen from './components/StartScreen';

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('START_SCREEN');
  const [questions, setQuestions] = useState<DailyQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // const [canPlayToday, setCanPlayToday] = useState<boolean>(true); // REMOVED

  const performInitialWordLoad = useCallback(() => {
    setErrorMessage(null);
    try {
      const allQuestions = getAllPredefinedQuestions();
      if (!allQuestions || allQuestions.length < NUM_QUESTIONS_TO_GENERATE) {
        throw new Error(`Ez dago nahikoa galdera definituta. Beharrezkoak: ${NUM_QUESTIONS_TO_GENERATE}, Eskuragarri: ${allQuestions ? allQuestions.length : 0}`);
      }
      
      const shuffledAll = shuffleArray(allQuestions);
      const dailySet = shuffledAll.slice(0, NUM_QUESTIONS_TO_GENERATE);

      setQuestions(dailySet);
      const gameData: StoredGameData = {
        questions: dailySet,
        fetchTimestamp: new Date().toISOString(),
        // No lastPlayedDate
      };
      localStorage.setItem(LOCALSTORAGE_QUESTIONS_KEY, JSON.stringify(gameData));
      setCurrentQuestionIndex(0);
      setUserAnswers([]);
      setGameState('PLAYING');

    } catch (error) {
      console.error("Errorea hitzak lokalki eskuratzean:", error);
      let detailedMessage = "Errore ezezaguna hitzak eskuratzean.";
      if (error instanceof Error) {
        detailedMessage = error.message;
      }
      setErrorMessage(detailedMessage);
      setGameState('ERROR');
    }
  }, []);

  useEffect(() => {
    const storedDataRaw = localStorage.getItem(LOCALSTORAGE_QUESTIONS_KEY);
    const now = new Date();

    if (gameState === 'LOADING') {
        if (storedDataRaw) {
            try {
                const storedData: StoredGameData = JSON.parse(storedDataRaw);
                const lastFetchDate = new Date(storedData.fetchTimestamp);
                const isSameDayAsFetch = lastFetchDate.toDateString() === now.toDateString();
                
                const useStoredToday = isSameDayAsFetch && 
                                       (lastFetchDate.getHours() >= DAILY_FETCH_HOUR || now.getHours() < DAILY_FETCH_HOUR);

                if (useStoredToday && storedData.questions && storedData.questions.length > 0) {
                    setQuestions(storedData.questions);
                    setCurrentQuestionIndex(0);
                    setUserAnswers([]);
                    setGameState('PLAYING');
                    return; 
                }
            } catch (e) {
                console.error("Errorea gordetako datuak parseatzean:", e);
                localStorage.removeItem(LOCALSTORAGE_QUESTIONS_KEY); 
            }
        }
        performInitialWordLoad();
    }
  }, [gameState, performInitialWordLoad]);

  // useEffect for RESULTS state no longer needs to manage lastPlayedDate
  useEffect(() => {
    if (gameState === 'RESULTS') {
      // Actions for results screen, if any, other than play limit.
    }
  }, [gameState]);

  const handleStartGame = () => {
    setGameState('LOADING');
  };

  const handleOptionSelect = (selectedOption: string, timeTakenMs: number) => {
    if (gameState !== 'PLAYING' || !questions[currentQuestionIndex]) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctSynonym;
    let currentScore = 0;

    if (isCorrect) {
      currentScore = BASE_SCORE_CORRECT_ANSWER; 
      if (timeTakenMs > PERFECT_TIME_THRESHOLD_MS) {
        const timeOverThresholdMs = timeTakenMs - PERFECT_TIME_THRESHOLD_MS;
        const penaltyIntervals = Math.floor(timeOverThresholdMs / MS_PER_PENALTY_INTERVAL);
        const totalPenalty = penaltyIntervals * PENALTY_PER_INTERVAL;
        currentScore -= totalPenalty;
        currentScore = Math.max(0, currentScore); 
      }
    }

    setUserAnswers(prevAnswers => [
      ...prevAnswers,
      {
        questionId: currentQuestion.id,
        targetWord: currentQuestion.targetWord,
        selectedOption,
        correctSynonym: currentQuestion.correctSynonym,
        isCorrect,
        score: currentScore,
      },
    ]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setGameState('RESULTS');
    }
  };

  const handleRetry = () => {
    setGameState('LOADING'); 
  };

  const handleGoToStartScreen = () => {
    setGameState('START_SCREEN'); 
  };

  if (gameState === 'START_SCREEN') {
    return <StartScreen onStartGame={handleStartGame} />; // Removed disabled prop
  }

  if (gameState === 'LOADING') {
    return <LoadingComponent />;
  }

  if (gameState === 'ERROR') {
    return <ErrorComponent message={errorMessage || "Errore ezezagun bat gertatu da."} onRetry={handleRetry} />;
  }

  if (gameState === 'PLAYING' && questions.length > 0 && currentQuestionIndex < questions.length && questions[currentQuestionIndex]) {
    return (
      <GameComponent
        question={questions[currentQuestionIndex]}
        onOptionSelect={handleOptionSelect}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
      />
    );
  }

  if (gameState === 'RESULTS') {
    const totalScore = userAnswers.reduce((sum, ans) => sum + ans.score, 0);
    return (
      <ResultsComponent
        answers={userAnswers}
        score={totalScore}
        totalQuestions={questions.length}
        onPlayAgain={handleGoToStartScreen} // Renamed prop and function
      />
    );
  }
  
  console.warn("Unexpected game state or data:", gameState, questions, currentQuestionIndex);
  return <LoadingComponent />;
};

export default App;