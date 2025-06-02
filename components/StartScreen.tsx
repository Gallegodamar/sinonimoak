
import React from 'react';
import Button from './Button';

interface StartScreenProps {
  onStartGame: () => void;
  disabled?: boolean; // disabled prop gehitu
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame, disabled = false }) => {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-between p-6 sm:p-8 text-center bg-sky-50"
    >
      <div className="flex-grow flex flex-col justify-center items-center w-full">
        <div className="my-8 sm:my-12">
          <h1 
            className="text-6xl sm:text-8xl font-extrabold text-sky-700"
          >
            KAIXO!
          </h1>
          <p 
            className="text-4xl sm:text-6xl font-bold mt-2 text-sky-600"
          >
            ONGI ETORRI
          </p>
        </div>
      </div>
      
      <div className="w-full max-w-xs sm:max-w-sm pb-8">
        <Button 
          onClick={onStartGame} 
          className="w-full text-2xl py-4" 
          variant="primary"
          aria-label="Hasi jolasa"
          disabled={disabled} // disabled prop aplikatu
        >
          HASI
        </Button>
        {disabled && (
          <p className="text-sm text-slate-500 mt-4">
            Gaurkoan jokatu duzu. Bihar arte itxaron berriro jolasteko (8:00etatik aurrera)!
          </p>
        )}
      </div>
       <footer className="py-6 text-sm text-sky-500">
        Eguneko Sinonimoak Jokoa
      </footer>
    </div>
  );
};

export default StartScreen;