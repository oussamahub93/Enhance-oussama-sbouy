import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 md:px-8 flex justify-between items-center border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.5)]">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h1 className="text-xl md:text-2xl font-display font-bold tracking-wider text-white">
          LUMINA <span className="text-red-500">8K</span>
        </h1>
      </div>
      <div className="text-xs md:text-sm text-gray-400 border border-white/10 rounded-full px-3 py-1 bg-white/5">
        Gemini 3 Pro Vision
      </div>
    </header>
  );
};