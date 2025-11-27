import { GoogleGenAI } from "@google/genai";
import { AspectRatio, ImageResolution } from "../types";

// We create a new instance for every call to ensure we pick up the latest API key
// if the user re-selects it.
const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateCinemaImage = async (
  prompt: string,
  aspectRatio: AspectRatio,
  resolution: ImageResolution
): Promise<string> => {
  const ai = getAIClient();

  // Using the pro model for high fidelity as requested by the "8K" requirement
  const model = "gemini-3-pro-image-preview";

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
          imageSize: resolution,
        },
      },
    });

    if (!response.candidates || response.candidates.length === 0) {
      throw new Error("No candidates returned from the API.");
    }

    const content = response.candidates[0].content;
    
    // Iterate through parts to find the image
    let base64Image = "";
    if (content.parts) {
        for (const part of content.parts) {
            if (part.inlineData && part.inlineData.data) {
                base64Image = part.inlineData.data;
                break;
            }
        }
    }

    if (!base64Image) {
      throw new Error("No image data found in the response.");
    }

    return `data:image/png;base64,${base64Image}`;
  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    throw error;
  }
};
