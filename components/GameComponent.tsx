import React, { useState, useEffect } from 'react';
import { DailyQuestion } from '../types';
import Button from './Button';
// TIME_THRESHOLD_NO_BONUS_MS import removed as it's not defined in constants.ts

interface GameComponentProps {
  question: DailyQuestion;
  onOptionSelect: (option: string, timeTakenMs: number) => void; // timeTakenMs gehitu da
  questionNumber: number;
  totalQuestions: number;
}

const GameComponent: React.FC<GameComponentProps> = ({ question, onOptionSelect, questionNumber, totalQuestions }) => {
  const [questionStartTime, setQuestionStartTime] = useState<number | null>(null);

  useEffect(() => {
    // Galdera aldatzen denean, hasiera-ordua ezarri
    setQuestionStartTime(performance.now());
  }, [question.id]); // Galdera bakoitzaren ID bakarraren arabera exekutatu

  const handleOptionClick = (option: string) => {
    if (questionStartTime === null) {
      // Hori ez litzateke gertatu behar, baina badaezpada
      // Eman denbora handi bat puntuazioa 0 izan dadin kasu honetan
      onOptionSelect(option, 10000); // Default to 10 seconds (10000ms)
      return;
    }
    const timeTakenMs = performance.now() - questionStartTime;
    onOptionSelect(option, timeTakenMs);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-sky-50 p-4 sm:p-6">
      <div className="bg-white shadow-2xl rounded-xl p-6 sm:p-10 w-full max-w-xl text-center">
        <header className="mb-6 sm:mb-8">
          <p className="text-sm font-medium text-sky-600">
            {questionNumber}. Galdera / {totalQuestions}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mt-2">Zein da sinonimoa?</h1>
        </header>

        <div className="my-8 sm:my-10 p-6 sm:p-8 bg-sky-600 rounded-lg shadow-inner">
          <p className="text-sm text-sky-200 mb-1">Hitz hau:</p>
          <p className="text-3xl sm:text-4xl font-bold text-white break-words">
            {question.targetWord}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          {question.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleOptionClick(option)} // Erabili handleOptionClick
              variant="secondary"
              className="text-lg sm:text-xl py-3 sm:py-4 break-words min-h-[60px] sm:min-h-[70px]"
              aria-label={`Aukera: ${option}`}
            >
              {option}
            </Button>
          ))}
        </div>
         <footer className="mt-10 text-xs text-slate-400">
            Egunero hitz berriak 8:00etan.
        </footer>
      </div>
    </div>
  );
};

export default GameComponent;