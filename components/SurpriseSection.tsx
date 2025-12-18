
import React, { useMemo } from 'react';
import { Gift, Camera, Star } from 'lucide-react';
import { SurpriseType } from '../types';
import TriviaCard from './surprises/TriviaCard';
import DigitalPostcard from './surprises/DigitalPostcard';
import ChristmasEve from './surprises/ChristmasEve';

interface SurpriseSectionProps {
  currentDate: Date;
}

const SurpriseSection: React.FC<SurpriseSectionProps> = ({ currentDate }) => {
  // Explicitly typing the return of useMemo to SurpriseType to fix comparison errors with members that would otherwise be inferred as never-reached
  const surpriseType = useMemo((): SurpriseType => {
    const month = currentDate.getMonth(); // 11 is Dec
    const day = currentDate.getDate();

    if (month !== 11) return SurpriseType.NONE;
    if (day === 25) return SurpriseType.CHRISTMAS_DAY;
    
    // Day 24: Show the full Christmas Eve experience (Tracker + Final Postcard)
    if (day === 24) return SurpriseType.CHRISTMAS_EVE;

    // Days 22 and 23: Show the Digital Postcard as the main surprise
    if (day === 22 || day === 23) return SurpriseType.POSTCARD;

    // Day 21 (and fallback for others): Trivia
    if (day === 21) return SurpriseType.TRIVIA;

    return SurpriseType.NONE;
  }, [currentDate]);

  if (surpriseType === SurpriseType.NONE || surpriseType === SurpriseType.CHRISTMAS_DAY) {
    return null;
  }

  // Define header icon and text based on type
  let HeaderIcon = Gift;
  let headerText = "¡Sorpresa Diaria Desbloqueada!";

  // Fix: Handle both CHRISTMAS_EVE and POSTCARD types for the special header styling to avoid unreachable code warnings
  if (surpriseType === SurpriseType.CHRISTMAS_EVE || surpriseType === SurpriseType.POSTCARD) {
    HeaderIcon = Star;
    // On 24th we call it "Especial de Nochebuena", on 22-23 we can call it "Especial Navideño"
    headerText = currentDate.getDate() === 24 ? "¡Especial de Nochebuena!" : "¡Especial Navideño!";
  }

  return (
    <div className="w-full max-w-md mt-8 border-t border-white/20 pt-8 animate-fade-in-up">
      <div className="flex items-center justify-center gap-2 mb-6">
        <span className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 py-1 rounded-full text-sm font-bold shadow-[0_0_15px_rgba(59,130,246,0.7)] flex items-center gap-2 border border-blue-200">
          <HeaderIcon size={16} />
          {headerText}
        </span>
      </div>

      <div className="bg-slate-900/50 p-4 rounded-2xl border border-blue-300/30 backdrop-blur-md shadow-2xl">
        {/* Conditional rendering based on the active surprise type, now correctly handling POSTCARD */}
        {surpriseType === SurpriseType.TRIVIA && <TriviaCard />}
        {surpriseType === SurpriseType.POSTCARD && <DigitalPostcard currentDate={currentDate} />}
        {surpriseType === SurpriseType.CHRISTMAS_EVE && <ChristmasEve currentDate={currentDate} />}
      </div>
    </div>
  );
};

export default SurpriseSection;
