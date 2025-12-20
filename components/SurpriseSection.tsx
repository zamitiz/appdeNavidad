
import React, { useMemo } from 'react';
import { Gift, Star } from 'lucide-react';
import { SurpriseType } from '../types';
import TriviaCard from './surprises/TriviaCard';
import DigitalPostcard from './surprises/DigitalPostcard';
import ChristmasEve from './surprises/ChristmasEve';

interface SurpriseSectionProps {
  currentDate: Date;
}

const SURPRISE_CONFIG = {
  [SurpriseType.TRIVIA]: {
    Icon: Gift,
    text: "¡Sorpresa Diaria Desbloqueada!",
  },
  [SurpriseType.POSTCARD]: {
    Icon: Star,
    text: "¡Especial Navideño!",
  },
  [SurpriseType.CHRISTMAS_EVE]: {
    Icon: Star,
    text: "¡Especial de Nochebuena!",
  },
};

const SurpriseSection: React.FC<SurpriseSectionProps> = ({ currentDate }) => {
  const surpriseType = useMemo((): SurpriseType => {
    const month = currentDate.getMonth();
    const day = currentDate.getDate();

    if (month !== 11) return SurpriseType.NONE;
    if (day === 25) return SurpriseType.CHRISTMAS_DAY;
    if (day === 24) return SurpriseType.CHRISTMAS_EVE;
    if (day === 22 || day === 23) return SurpriseType.POSTCARD;
    if (day === 21) return SurpriseType.TRIVIA;

    return SurpriseType.NONE;
  }, [currentDate]);

  if (surpriseType === SurpriseType.NONE || surpriseType === SurpriseType.CHRISTMAS_DAY) {
    return null;
  }

  const { Icon, text } = SURPRISE_CONFIG[surpriseType] || SURPRISE_CONFIG[SurpriseType.TRIVIA];

  const renderSurprise = () => {
    switch (surpriseType) {
      case SurpriseType.TRIVIA:
        return <TriviaCard />;
      case SurpriseType.POSTCARD:
        return <DigitalPostcard currentDate={currentDate} />;
      case SurpriseType.CHRISTMAS_EVE:
        return <ChristmasEve currentDate={currentDate} />;
      default:
        return null;
    }
  };

  return (
    <section aria-label="Sorpresa del día" className="w-full max-w-md mt-8 border-t border-white/20 pt-8 animate-fade-in-up">
      <header className="flex items-center justify-center gap-2 mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 py-1 rounded-full text-sm font-bold shadow-[0_0_15px_rgba(59,130,246,0.7)] flex items-center gap-2 border border-blue-200">
          <Icon size={16} aria-hidden="true" />
          <h2>{text}</h2>
        </div>
      </header>

      <div className="bg-slate-900/50 p-4 rounded-2xl border border-blue-300/30 backdrop-blur-md shadow-2xl">
        {renderSurprise()}
      </div>
    </section>
  );
};

export default SurpriseSection;
