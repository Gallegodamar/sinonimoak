import React from 'react';

const LoadingComponent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700 text-white p-6">
      <svg className="animate-spin h-12 w-12 text-sky-400 mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <h1 className="text-3xl font-semibold mb-2">Eguneko Sinonimoak</h1>
      <p className="text-xl text-sky-300">Hitzak kargatzen...</p>
    </div>
  );
};

export default LoadingComponent;