import React from 'react';
import { ExternalLink, Globe, Map } from 'lucide-react';

const SantaTracker: React.FC = () => {
  return (
    <div className="animate-fade-in bg-white/10 p-6 rounded-xl border border-white/20 overflow-hidden relative shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-6 text-xmas-gold">
        <Globe className="animate-pulse-slow" size={24} />
        <h3 className="text-xl font-bold tracking-wider">Google Santa Tracker</h3>
      </div>
      
      {/* Visual Card */}
      <div className="relative bg-gradient-to-b from-[#1a237e] to-[#0d47a1] rounded-xl border-2 border-white/10 mb-6 overflow-hidden h-48 flex flex-col items-center justify-center group">
         
         {/* Animated Background Elements */}
         <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent animate-pulse-slow"></div>
         
         {/* Map Icon */}
         <Map size={64} className="text-white/80 mb-2 transform group-hover:scale-110 transition-transform duration-500" />
         
         <p className="relative z-10 text-white font-bold text-lg drop-shadow-md">
            Ver Mapa en Tiempo Real
         </p>
         <p className="relative z-10 text-blue-200 text-xs mt-1">
            Conectando con satélite...
         </p>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
         <a 
           href="https://santatracker.google.com/" 
           target="_blank" 
           rel="noopener noreferrer"
           className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.6)] border border-red-400"
         >
           <ExternalLink size={20} />
           Abrir Rastreador
         </a>
      </div>
      
      <p className="text-center text-xs text-gray-400 mt-4 opacity-70">
        Se abrirá la experiencia oficial de Google en una nueva pestaña
      </p>
    </div>
  );
};

export default SantaTracker;