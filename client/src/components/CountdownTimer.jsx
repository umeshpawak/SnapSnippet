import React, { useState, useEffect } from 'react';

export default function CountdownTimer({ expiresAt }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const diff = new Date(expiresAt) - new Date();
    if (diff <= 0) return { minutes: 0, seconds: 0, total: 0 };
    return {
      minutes: Math.floor(diff / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      total: diff,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = calculateTimeLeft();
      setTimeLeft(newTime);
      if (newTime.total <= 0) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, [expiresAt]);

  const isExpired = timeLeft.total <= 0;
  const isWarning = timeLeft.total > 0 && timeLeft.total < 5 * 60 * 1000;
  const isCritical = timeLeft.total > 0 && timeLeft.total < 2 * 60 * 1000;

  const percentage = isExpired ? 0 : Math.max(0, (timeLeft.total / (30 * 60 * 1000)) * 100);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  if (isExpired) {
    return (
      <div className="flex flex-col items-center gap-3 animate-in" id="countdown-expired">
        <div className="w-24 h-24 rounded-full bg-red-50 border border-red-200 flex items-center justify-center">
          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-red-600 font-semibold text-base">Expired</p>
        <p className="text-gray-400 text-sm">This snippet is no longer available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2" id="countdown-timer">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="3"
          />
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke={isCritical ? '#ef4444' : isWarning ? '#f59e0b' : '#0d9488'}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-xl font-bold tabular-nums ${
            isCritical ? 'text-red-600' : isWarning ? 'text-amber-600' : 'text-gray-900'
          }`}>
            {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
          </span>
        </div>
      </div>
      <p className={`text-xs font-medium ${
        isCritical ? 'text-red-500' : isWarning ? 'text-amber-500' : 'text-gray-400'
      }`}>
        {isCritical ? 'Expiring soon' : isWarning ? 'Less than 5 min' : 'Time remaining'}
      </p>
    </div>
  );
}
