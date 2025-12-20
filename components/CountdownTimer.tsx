
import React from 'react';
import { TimeLeft } from '../types';

interface CountdownTimerProps {
  timeLeft: TimeLeft;
}

const TimeBox: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center bg-black/20 rounded-lg p-2 sm:p-4 min-w-[70px] sm:min-w-[90px] backdrop-blur-sm border border-white/10 shadow-lg">
    <span className="text-3xl sm:text-5xl font-bold text-white tabular-nums drop-shadow-md">
      {value < 10 ? `0${value}` : value}
    </span>
    <span className="text-xs sm:text-sm text-slate-300 uppercase tracking-widest mt-1">
      {label}
    </span>
  </div>
);

const CountdownTimer: React.FC<CountdownTimerProps> = ({ timeLeft }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-6 my-8">
      <TimeBox value={timeLeft.days} label="Días" />
      <TimeBox value={timeLeft.hours} label="Hrs" />
      <TimeBox value={timeLeft.minutes} label="Min" />
      <TimeBox value={timeLeft.seconds} label="Seg" />
    </div>
  );
};

export default CountdownTimer;
