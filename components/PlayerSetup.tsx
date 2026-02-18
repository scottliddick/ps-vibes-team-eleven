'use client';

import { useState } from 'react';

type PlayerSetupProps = {
  onStart: (names: string[]) => void;
};

export default function PlayerSetup({ onStart }: PlayerSetupProps) {
  const [names, setNames] = useState(['', '', '', '']);

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const handleStart = () => {
    const filledNames = names.map((name, i) => 
      name.trim() || `Player ${i + 1}`
    );
    onStart(filledNames);
  };

  const allFilled = names.every(name => name.trim().length > 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Roshambo Royale
      </h1>
      <p className="text-xl text-gray-400 mb-12">Battle Royale Rock-Paper-Scissors</p>
      
      <div className="bg-slate-800 rounded-lg p-8 shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Enter Player Names</h2>
        
        <div className="space-y-4">
          {names.map((name, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Player {index + 1}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                placeholder={`Player ${index + 1}`}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                maxLength={20}
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleStart}
          className="w-full mt-8 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
        >
          Start Battle Royale
        </button>
      </div>
    </div>
  );
}
