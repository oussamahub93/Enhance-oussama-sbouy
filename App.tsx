import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Controls } from './components/Controls';
import { ImageDisplay } from './components/ImageDisplay';
import { ApiKeyPrompt } from './components/ApiKeyPrompt';
import { generateCinemaImage } from './services/geminiService';
import { AspectRatio, GeneratedImage, ImageResolution } from './types';

// The default prompt provided by the user is excellent for showcasing the model's capability
const DEFAULT_PROMPT = "ultra-photorealistic, 8K, RED cinema photo, shot on 85mm f/1.4 prime lens, shallow depth of field, ultra sharp quality, significant subject-separating rim light, volumetric lighting, ambient occlusion, contact shadows, PBR materials, high acutance, high micro-contrast, realistic skin with subsurface scattering, ACES color grading, perfectly neutral 5600K white balance, deep blacks, clean highlights, subtle chromatic aberration";

const App: React.FC = () => {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [resolution, setResolution] = useState<ImageResolution>('4K');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [showKeyPrompt, setShowKeyPrompt] = useState(false);

  useEffect(() => {
    // Initial check for API key availability
    const checkKey = async () => {
      try {
        if (window.aistudio && window.aistudio.hasSelectedApiKey) {
          const hasKey = await window.aistudio.hasSelectedApiKey();
          setHasApiKey(hasKey);
          if (!hasKey) {
            setShowKeyPrompt(true);
          }
        } else {
            // Fallback for dev environments where window.aistudio might not exist (though strictly required by prompt)
            // In a real scenario, this would block.
            console.warn("AI Studio client not found.");
            setShowKeyPrompt(true);
        }
      } catch (e) {
        console.error("Error checking API key", e);
        setShowKeyPrompt(true);
      }
    };
    checkKey();
  }, []);

  const handleKeySelected = () => {
    setHasApiKey(true);
    setShowKeyPrompt(false);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    // Safety double-check
    if (!hasApiKey) {
        setShowKeyPrompt(true);
        return;
    }

    setLoading(true);
    try {
      const imageUrl = await generateCinemaImage(prompt, aspectRatio, resolution);
      
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url: imageUrl,
        prompt: prompt,
        aspectRatio,
        resolution,
        timestamp: Date.now()
      };
      
      setGeneratedImage(newImage);
    } catch (error) {
      console.error("Failed to generate:", error);
      alert("Failed to generate image. Please ensure your API key has quota and permissions for the Gemini 3 Pro model.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 selection:bg-red-900 selection:text-white pb-20">
      {/* API Key Modal */}
      {showKeyPrompt && <ApiKeyPrompt onKeySelected={handleKeySelected} />}

      <Header />

      <main className="container mx-auto px-4 pt-8 md:pt-12 max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Controls & Input */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Prompt Input Area */}
            <div className="bg-[#111] p-1 rounded-2xl border border-white/10 shadow-xl">
               <div className="p-4 border-b border-white/5 bg-white/[0.02]">
                 <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Prompt</label>
               </div>
               <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your imagination in detail..."
                className="w-full h-48 bg-transparent p-4 text-sm md:text-base text-gray-200 placeholder-gray-600 focus:outline-none resize-none font-light leading-relaxed"
                disabled={loading}
              />
              <div className="p-2 flex justify-end">
                 <button 
                   onClick={() => setPrompt("")}
                   className="text-xs text-gray-500 hover:text-white transition-colors px-3 py-1"
                 >
                   Clear
                 </button>
              </div>
            </div>

            {/* Config Controls */}
            <Controls 
              aspectRatio={aspectRatio} 
              setAspectRatio={setAspectRatio}
              resolution={resolution}
              setResolution={setResolution}
              disabled={loading}
            />

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className={`
                w-full py-4 rounded-xl font-display font-bold text-lg tracking-widest uppercase transition-all duration-300
                flex items-center justify-center gap-3 relative overflow-hidden group
                ${loading || !prompt.trim() ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-500 shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)]'}
              `}
            >
              {/* Button shimmer effect */}
              {!loading && prompt.trim() && (
                 <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"></div>
              )}
              
              <span className="relative z-20">{loading ? 'Processing...' : 'Generate Render'}</span>
              {!loading && (
                <svg className="w-5 h-5 relative z-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              )}
            </button>
            
            <p className="text-center text-xs text-gray-600">
               Uses <span className="text-gray-400">Gemini 3 Pro Image Preview</span> for maximum fidelity.
            </p>

          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <ImageDisplay image={generatedImage} loading={loading} />
            
            {/* Mini Tips Section */}
            {!generatedImage && !loading && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 opacity-50 hover:opacity-100 transition-opacity duration-500">
                    <div className="bg-[#111] p-4 rounded-lg border border-white/5">
                        <h3 className="text-red-500 text-xs font-bold uppercase mb-2">Lighting</h3>
                        <p className="text-xs text-gray-400">Use terms like "rim light", "volumetric", "softbox" to control the atmosphere.</p>
                    </div>
                    <div className="bg-[#111] p-4 rounded-lg border border-white/5">
                        <h3 className="text-red-500 text-xs font-bold uppercase mb-2">Camera</h3>
                        <p className="text-xs text-gray-400">Specify lens (85mm), aperture (f/1.8), and sensor type (Alexa 65, RED).</p>
                    </div>
                     <div className="bg-[#111] p-4 rounded-lg border border-white/5">
                        <h3 className="text-red-500 text-xs font-bold uppercase mb-2">Details</h3>
                        <p className="text-xs text-gray-400">Add "8k", "pores", "hyper-detailed" to force high-frequency textures.</p>
                    </div>
                </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;