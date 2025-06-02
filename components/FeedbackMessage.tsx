import React from 'react';
import { FeedbackType } from '../types';

interface FeedbackMessageProps {
  feedback: FeedbackType;
  correctWord?: string;
}

const FeedbackMessage: React.FC<FeedbackMessageProps> = ({ feedback, correctWord }) => {
  if (feedback === FeedbackType.NONE) return null;

  const isCorrect = feedback === FeedbackType.CORRECT;
  // Background colors are handled by button states now mostly. This message is supplementary.
  // For this component, we can make it less prominent or ensure good contrast.
  // Let's assume it's shown on the orange background of the game screen.
  
  const message = isCorrect ? 'Zuzena!' : 'Okerra!';
  const textColor = isCorrect ? 'text-green-200' : 'text-red-200'; // Lighter shades for the message itself

  return (
    <div className={`mt-6 p-3 rounded-lg text-center w-full max-w-md`}>
      <p className={`text-xl font-semibold ${isCorrect ? 'text-white' : 'text-white'}`}>{message}</p>
      {feedback === FeedbackType.INCORRECT && correctWord && (
        <p className="text-sm mt-1 text-orange-100">
          Erantzun zuzena: <span className="font-bold">{correctWord}</span>
        </p>
      )}
    </div>
  );
};

export default FeedbackMessage;