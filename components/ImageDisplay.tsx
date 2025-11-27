import React from 'react';
import { GeneratedImage } from '../types';

interface ImageDisplayProps {
  image: GeneratedImage | null;
  loading: boolean;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ image, loading }) => {
  if (loading) {
    return (
      <div className="w-full aspect-video rounded-2xl bg-black border border-white/10 flex flex-col items-center justify-center overflow-hidden relative group">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin mb-4 shadow-[0_0_30px_rgba(220,38,38,0.3)]"></div>
          <p className="text-red-500 font-display tracking-widest text-sm animate-pulse">RENDERING 8K SCENE...</p>
          <p className="text-gray-500 text-xs mt-2">Running physics simulation & raytracing</p>
        </div>
        
        {/* Cinematic grain overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-repeat bg-[length:100px_100px]" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
        </div>
      </div>
    );
  }

  if (!image) {
    return (
      <div className="w-full aspect-video rounded-2xl bg-[#0a0a0a] border border-white/5 flex flex-col items-center justify-center p-8 text-center dashed-border">
        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
           <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-gray-400 font-light">Your masterpiece will appear here.</p>
        <p className="text-gray-600 text-sm mt-2 max-w-sm">Enter a detailed prompt or use the default cinematic preset to begin.</p>
      </div>
    );
  }

  return (
    <div className="w-full relative group rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10">
      <img 
        src={image.url} 
        alt={image.prompt} 
        className="w-full h-auto object-contain max-h-[80vh] mx-auto"
      />
      
      {/* Overlay Actions */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
        <div className="text-left">
             <div className="flex gap-2 mb-2">
                <span className="text-[10px] bg-red-600/80 text-white px-2 py-0.5 rounded font-bold tracking-wider">{image.resolution}</span>
                <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded">{image.aspectRatio}</span>
             </div>
             <p className="text-white/80 text-sm line-clamp-2 max-w-xl font-light">{image.prompt}</p>
        </div>
        
        <a 
          href={image.url} 
          download={`lumina-${Date.now()}.png`}
          className="bg-white/10 hover:bg-white text-white hover:text-black p-3 rounded-full backdrop-blur-md transition-all transform hover:scale-105"
          title="Download Original"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </a>
      </div>
    </div>
  );
};