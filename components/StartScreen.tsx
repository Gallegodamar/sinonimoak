
import React from 'react';
import Button from './Button';

interface StartScreenProps {
  onStartGame: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-between p-6 sm:p-8 text-center bg-gradient-to-br from-sky-500 to-sky-700 text-white"
      // backgroundImage style removed
    >
      <div className="flex-grow flex flex-col justify-center items-center w-full">
        <div className="my-8 sm:my-12">
          <h1 
            className="text-6xl sm:text-8xl font-extrabold text-white"
            // style textShadow removed
          >
            KAIXO!
          </h1>
          <p 
            className="text-4xl sm:text-6xl font-bold mt-2 text-white"
            // style textShadow removed
          >
            ONGI ETORRI
          </p>
        </div>
      </div>
      
      <div className="w-full max-w-xs sm:max-w-sm pb-8">
        <Button 
          onClick={onStartGame} 
          className="w-full text-2xl py-4" 
          variant="primary" // Changed from success back to primary
          aria-label="Hasi jolasa"
        >
          HASI
        </Button>
      </div>
       <footer 
        className="py-6 text-sm text-white opacity-90"
        // style textShadow removed
        >
        Eguneko Sinonimoak Jokoa
      </footer>
    </div>
  );
};

export default StartScreen;