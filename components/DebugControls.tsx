import React, { useState } from 'react';
import { Settings, Calendar } from 'lucide-react';

interface SimulatedDate {
  month: number;
  day: number;
}

interface DebugControlsProps {
  onSimulate: (date: SimulatedDate | null) => void;
  currentSimulatedDate: SimulatedDate | null;
}

const DebugControls: React.FC<DebugControlsProps> = ({ onSimulate, currentSimulatedDate }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Helper to check if a button is active
  const isActive = (m: number, d: number) => 
    currentSimulatedDate?.month === m && currentSimulatedDate?.day === d;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
        {isOpen && (
            <div className="bg-black/80 backdrop-blur-md p-4 rounded-lg border border-white/20 mb-2 shadow-xl animate-fade-in text-sm text-white min-w-[200px]">
                <div className="flex items-center gap-2 mb-3 text-gray-400 border-b border-gray-700 pb-2">
                    <Calendar size={14} />
                    <span>Modo Prueba (Simular Fecha)</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                    <button 
                        onClick={() => onSimulate(null)}
                        className={`px-3 py-1 rounded text-left hover:bg-white/10 ${currentSimulatedDate === null ? 'text-xmas-gold font-bold' : ''}`}
                    >
                        📅 Hoy (Real)
                    </button>
                    <div className="border-t border-gray-700 my-1"></div>
                    <button 
                        onClick={() => onSimulate({ month: 11, day: 22 })}
                        className={`px-3 py-1 rounded text-left hover:bg-white/10 ${isActive(11, 22) ? 'text-xmas-gold font-bold' : ''}`}
                    >
                        📷 22 Dic (Postal Base)
                    </button>
                     <button 
                        onClick={() => onSimulate({ month: 11, day: 23 })}
                        className={`px-3 py-1 rounded text-left hover:bg-white/10 ${isActive(11, 23) ? 'text-xmas-gold font-bold' : ''}`}
                    >
                        🎨 23 Dic (+Stickers)
                    </button>
                    <button 
                        onClick={() => onSimulate({ month: 11, day: 24 })}
                        className={`px-3 py-1 rounded text-left hover:bg-white/10 ${isActive(11, 24) ? 'text-xmas-gold font-bold' : ''}`}
                    >
                        🎅 24 Dic (Santa Tracker)
                    </button>
                     <button 
                        onClick={() => onSimulate({ month: 11, day: 25 })}
                        className={`px-3 py-1 rounded text-left hover:bg-white/10 ${isActive(11, 25) ? 'text-xmas-gold font-bold' : ''}`}
                    >
                        🎄 25 Dic (Navidad)
                    </button>
                    <div className="border-t border-gray-700 my-1"></div>
                    <button 
                        onClick={() => onSimulate({ month: 11, day: 31 })}
                        className={`px-3 py-1 rounded text-left hover:bg-white/10 ${isActive(11, 31) ? 'text-xmas-gold font-bold' : ''}`}
                    >
                        🥂 31 Dic (Fin de Año)
                    </button>
                    <button 
                        onClick={() => onSimulate({ month: 0, day: 1 })}
                        className={`px-3 py-1 rounded text-left hover:bg-white/10 ${isActive(0, 1) ? 'text-xmas-gold font-bold' : ''}`}
                    >
                        🎉 01 Ene (Año Nuevo)
                    </button>
                </div>
            </div>
        )}
        <button 
            onClick={() => setIsOpen(!isOpen)}
            className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur border border-white/10 shadow-lg transition-transform hover:rotate-45"
            title="Abrir Controles de Depuración"
        >
            <Settings size={24} />
        </button>
    </div>
  );
};

export default DebugControls;