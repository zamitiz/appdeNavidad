import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle } from 'lucide-react';

const TriviaCard: React.FC = () => {
  const [answered, setAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const handleAnswer = (correct: boolean) => {
    setAnswered(true);
    setIsCorrect(correct);
  };

  return (
    <div className="animate-fade-in bg-white/10 p-6 rounded-xl border border-white/20">
      <div className="flex items-center justify-center gap-2 mb-4 text-xmas-gold">
        <HelpCircle size={24} />
        <h3 className="text-xl font-bold">Trivia Navideña</h3>
      </div>
      
      {!answered ? (
        <div className="space-y-4">
          <p className="text-lg mb-4">¿Cómo se llama el reno de la nariz roja?</p>
          <div className="grid grid-cols-1 gap-2">
            <button 
              onClick={() => handleAnswer(false)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-left"
            >
              A. Cometa
            </button>
            <button 
              onClick={() => handleAnswer(true)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-left"
            >
              B. Rodolfo
            </button>
            <button 
              onClick={() => handleAnswer(false)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-left"
            >
              C. Trueno
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-4 animate-bounce-slow">
          {isCorrect ? (
            <div className="text-green-400 flex flex-col items-center gap-2">
              <CheckCircle size={48} />
              <p className="text-xl font-bold">¡Correcto!</p>
              <p className="text-sm text-gray-300">Es Rodolfo (Rudolph) el reno.</p>
            </div>
          ) : (
            <div className="text-red-400 flex flex-col items-center gap-2">
              <XCircle size={48} />
              <p className="text-xl font-bold">¡Casi!</p>
              <button 
                onClick={() => setAnswered(false)}
                className="text-sm underline mt-2 text-white"
              >
                Intentar de nuevo
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TriviaCard;