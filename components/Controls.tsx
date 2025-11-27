import React from 'react';
import { AspectRatio, ImageResolution } from '../types';

interface ControlsProps {
  aspectRatio: AspectRatio;
  setAspectRatio: (ar: AspectRatio) => void;
  resolution: ImageResolution;
  setResolution: (res: ImageResolution) => void;
  disabled: boolean;
}

export const Controls: React.FC<ControlsProps> = ({ 
  aspectRatio, 
  setAspectRatio, 
  resolution, 
  setResolution,
  disabled 
}) => {
  const ratios: AspectRatio[] = ['16:9', '1:1', '9:16', '4:3', '3:4'];
  // We limit resolution choices based on common use cases, though API supports 1K, 2K, 4K
  const resolutions: ImageResolution[] = ['1K', '2K', '4K'];

  return (
    <div className="flex flex-col gap-6 p-4 bg-white/5 rounded-xl border border-white/10">
      
      {/* Aspect Ratio */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Aspect Ratio</label>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
          {ratios.map((r) => (
            <button
              key={r}
              onClick={() => setAspectRatio(r)}
              disabled={disabled}
              className={`
                px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                border
                ${aspectRatio === r 
                  ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                  : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Resolution */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Quality</label>
            <span className="text-[10px] text-red-400 border border-red-400/30 rounded px-1.5 py-0.5">PRO ONLY</span>
        </div>
        <div className="flex gap-2">
          {resolutions.map((res) => (
            <button
              key={res}
              onClick={() => setResolution(res)}
              disabled={disabled}
              className={`
                flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                border relative overflow-hidden group
                ${resolution === res 
                  ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.4)]' 
                  : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <span className="relative z-10">{res}</span>
              {resolution === res && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};