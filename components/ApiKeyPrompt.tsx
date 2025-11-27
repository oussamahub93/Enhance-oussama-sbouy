import React, { useState } from 'react';

interface ApiKeyPromptProps {
  onKeySelected: () => void;
}

export const ApiKeyPrompt: React.FC<ApiKeyPromptProps> = ({ onKeySelected }) => {
  const [error, setError] = useState<string | null>(null);

  const handleSelectKey = async () => {
    try {
      setError(null);
      await window.aistudio.openSelectKey();
      // Assume success if no error thrown, proceed immediately
      onKeySelected();
    } catch (err: any) {
      console.error("Key selection failed", err);
      if (err.message && err.message.includes("Requested entity was not found")) {
        setError("Session expired or invalid. Please try selecting the key again.");
      } else {
        setError("Failed to select API key. Please ensure you have a valid project.");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="max-w-md w-full bg-[#111] border border-red-900/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(220,38,38,0.1)] text-center">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11.536 11 9 13.5 9 16l-3 3m0 0l-3-3m3 3h3" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-display font-bold text-white mb-3">Authentication Required</h2>
        <p className="text-gray-400 mb-6 text-sm leading-relaxed">
          To generate ultra-high definition 4K/8K images with <span className="text-white font-semibold">Gemini 3 Pro</span>, you must select a valid API key from a paid Google Cloud Project.
        </p>

        {error && (
          <div className="mb-6 p-3 bg-red-900/20 border border-red-500/20 rounded text-red-400 text-xs">
            {error}
          </div>
        )}

        <button
          onClick={handleSelectKey}
          className="w-full py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] flex items-center justify-center gap-2 group"
        >
          <span>Connect Google Cloud Project</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

        <div className="mt-6 text-xs text-gray-500">
          <a 
            href="https://ai.google.dev/gemini-api/docs/billing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-red-400 underline decoration-red-500/30 underline-offset-4 transition-colors"
          >
            Read about Gemini API Billing & Requirements
          </a>
        </div>
      </div>
    </div>
  );
};