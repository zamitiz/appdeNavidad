
import React, { useState, useEffect, useRef } from 'react';
import { TimeLeft } from './types';
import Snowfall from './components/Snowfall';
import CountdownTimer from './components/CountdownTimer';
import SurpriseSection from './components/SurpriseSection';
import DebugControls from './components/DebugControls';
import { Sparkles, Volume2, VolumeX, Download } from 'lucide-react';

interface SimulatedDate {
  month: number; // 0-11
  day: number;
}

const App: React.FC = () => {
  const [simulatedDate, setSimulatedDate] = useState<SimulatedDate | null>(null);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  // PWA Install State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  // States for different holidays
  const [isChristmas, setIsChristmas] = useState(false);
  const [isNewYearDay, setIsNewYearDay] = useState(false);
  const [isNewYearPending, setIsNewYearPending] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    });

    window.addEventListener('appinstalled', () => {
      setShowInstallBtn(false);
      setDeferredPrompt(null);
    });
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallBtn(false);
    }
    setDeferredPrompt(null);
  };

  // Audio Control Logic
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const isCelebration = isChristmas || isNewYearDay;
    if (isCelebration) {
      if (audio.paused) {
        audio.volume = 0.4;
        audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    } else {
      if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
      }
    }
  }, [isChristmas, isNewYearDay]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
        let now = new Date();
        if (simulatedDate !== null) {
            now = new Date(now.getFullYear(), simulatedDate.month, simulatedDate.day, 10, 0, 0);
        }
        setCurrentDate(now);
        const month = now.getMonth();
        const day = now.getDate();
        const year = now.getFullYear();

        const checkIsChristmas = month === 11 && day === 25;
        const checkIsNewYearDay = month === 0 && day === 1;
        const checkIsNewYearPending = month === 11 && day > 25;

        setIsChristmas(checkIsChristmas);
        setIsNewYearDay(checkIsNewYearDay);
        setIsNewYearPending(checkIsNewYearPending);

        let target: Date;
        if (checkIsNewYearPending) {
            target = new Date(`January 1, ${year + 1} 00:00:00`);
        } else if (checkIsChristmas || checkIsNewYearDay) {
            target = now; 
        } else if (month === 0 && day > 1) {
             target = new Date(`December 25, ${year} 00:00:00`);
        } else {
             target = new Date(`December 25, ${year} 00:00:00`);
        }

        const diff = target.getTime() - now.getTime();
        if (checkIsChristmas || checkIsNewYearDay) {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        } else if (diff > 0) {
            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / 1000 / 60) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            });
        }
    }, 1000);
    return () => clearInterval(timer);
  }, [simulatedDate]);

  const getStatusMessage = () => {
    if (isChristmas) return "¡Que tengas unas fiestas mágicas!";
    if (isNewYearDay) return "¡Salud, dinero y amor para este nuevo año!";
    if (isNewYearPending) return "¡Despidiendo el año viejo!";
    const day = currentDate.getDate();
    const month = currentDate.getMonth();
    if (month === 11) {
        if (day === 24) return "¡Ya casi es hora! Santa se acerca.";
        if (day >= 22) return "¡Haz una postal navideña!";
    }
    return "Faltan pocos días... ¡Habrá una sorpresa desde el día 22!";
  };

  const getMainTitle = () => {
    if (isChristmas) return "¡Feliz Navidad!";
    if (isNewYearDay) return "¡Feliz Año Nuevo!";
    if (isNewYearPending) return "Año Nuevo";
    return "Navidad";
  };

  const isCelebrationDay = isChristmas || isNewYearDay;

  return (
    <div className="min-h-screen bg-gradient-to-b from-xmas-dark via-xmas-blue to-xmas-light flex flex-col items-center justify-center text-white overflow-hidden relative selection:bg-xmas-gold selection:text-black">
      <Snowfall />
      
      <audio ref={audioRef} loop>
          <source src="https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Kevin_MacLeod/Jazz_Sampler/Kevin_MacLeod_-_Jingle_Bells.mp3" type="audio/mpeg" />
      </audio>

      {/* PWA Install Button */}
      {showInstallBtn && (
        <button 
          onClick={handleInstallClick}
          className="fixed top-4 right-4 z-[60] bg-xmas-gold text-xmas-dark px-4 py-2 rounded-full font-bold text-sm shadow-xl flex items-center gap-2 animate-bounce-slow"
        >
          <Download size={16} /> Instalar App
        </button>
      )}

      <main 
        className={`z-10 bg-white/10 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl max-w-[90%] w-[500px] flex flex-col items-center text-center transform transition-all duration-500 my-10 ${
          isCelebrationDay 
            ? "border-4 border-xmas-gold shadow-[0_0_60px_rgba(255,215,0,0.5)] scale-105" 
            : "border border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        }`}
      >
        
        <header className="mb-4 w-full flex flex-col items-center">
          <h1 className="font-christmas text-6xl md:text-7xl text-xmas-gold drop-shadow-[0_0_10px_rgba(255,215,0,0.5)] animate-pulse-slow">
            {getMainTitle()}
          </h1>
          
          {isCelebrationDay && (
            <>
              <Sparkles className="inline-block text-xmas-gold animate-spin-slow mb-4" size={40} />
              <button 
                onClick={toggleMusic}
                className="mt-2 flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 transition-all text-sm font-bold border border-white/20 shadow-lg hover:scale-105"
              >
                {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
                {isPlaying ? "Pausar Melodía" : "Reproducir Melodía"}
              </button>
            </>
          )}
        </header>

        {!isCelebrationDay && <CountdownTimer timeLeft={timeLeft} />}

        <h2 className="text-xl md:text-2xl font-light text-gray-200 mt-4 tracking-wide">
          {getStatusMessage()}
        </h2>

        {!isNewYearPending && !isNewYearDay && <SurpriseSection currentDate={currentDate} />}

      </main>

      <footer className="z-10 py-6 text-white/40 text-xs text-center">
        Versión App 1.0 • Creado con espíritu navideño
      </footer>

      <DebugControls onSimulate={setSimulatedDate} currentSimulatedDate={simulatedDate} />
    </div>
  );
};

export default App;
