
import React, { useState } from 'react';
import SantaTracker from './SantaTracker';
import DigitalPostcard from './DigitalPostcard';
import { Map, Camera } from 'lucide-react';

interface ChristmasEveProps {
  currentDate: Date;
}

const ChristmasEve: React.FC<ChristmasEveProps> = ({ currentDate }) => {
  const [activeTab, setActiveTab] = useState<'tracker' | 'postcard'>('tracker');

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Navigation Tabs with ARIA roles */}
      <div role="tablist" aria-label="Actividades de Nochebuena" className="flex bg-slate-900/80 p-1 rounded-xl border border-white/10">
        <button
          id="tab-tracker"
          role="tab"
          aria-selected={activeTab === 'tracker'}
          aria-controls="panel-tracker"
          onClick={() => setActiveTab('tracker')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${
            activeTab === 'tracker' 
              ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]' 
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Map size={16} aria-hidden="true" /> Rastreador
        </button>
        <button
          id="tab-postcard"
          role="tab"
          aria-selected={activeTab === 'postcard'}
          aria-controls="panel-postcard"
          onClick={() => setActiveTab('postcard')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${
            activeTab === 'postcard' 
              ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' 
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Camera size={16} aria-hidden="true" /> Postal Final
        </button>
      </div>

      {/* Tab Content Panels */}
      <div className="animate-fade-in relative min-h-[400px]">
        <div
          id="panel-tracker"
          role="tabpanel"
          tabIndex={0}
          aria-labelledby="tab-tracker"
          hidden={activeTab !== 'tracker'}
          className="animate-fade-in-up focus:outline-none"
        >
          <SantaTracker />
          <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10 text-center">
             <p className="text-sm text-gray-300 mb-2">¿Ya tienes tu felicitación lista?</p>
             <button 
               onClick={() => setActiveTab('postcard')}
               className="text-xmas-gold text-sm font-bold underline hover:text-white transition-colors"
             >
               Crear Postal de Nochebuena &rarr;
             </button>
          </div>
        </div>
        
        <div
          id="panel-postcard"
          role="tabpanel"
          tabIndex={0}
          aria-labelledby="tab-postcard"
          hidden={activeTab !== 'postcard'}
          className="animate-fade-in-up focus:outline-none"
        >
          <DigitalPostcard currentDate={currentDate} isChristmasEve={true} />
        </div>
      </div>
    </div>
  );
};

export default ChristmasEve;
