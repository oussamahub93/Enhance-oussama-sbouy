export type AspectRatio = '1:1' | '16:9' | '9:16' | '3:4' | '4:3';

export type ImageResolution = '1K' | '2K' | '4K';

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  aspectRatio: AspectRatio;
  resolution: ImageResolution;
  timestamp: number;
}

export interface GenerationConfig {
  aspectRatio: AspectRatio;
  resolution: ImageResolution;
}

// Window interface extension for AI Studio key selection
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    aistudio: AIStudio;
  }
}
