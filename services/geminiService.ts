import { GoogleGenAI } from "@google/genai";
import type { AspectRatio, Quality } from '../types';

if (!process.env.API_KEY) {
  // This is a placeholder for environments where the key is missing.
  // In the target environment, process.env.API_KEY is expected to be set.
  console.warn("API_KEY environment variable not set. Using a placeholder.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateWallpapers = async (
  prompt: string,
  style: string,
  aspectRatio: AspectRatio,
  quality: Quality
): Promise<string[]> => {
  try {
    let fullPrompt = `A ${style} style wallpaper of: "${prompt}".`;
    
    // Add quality modifiers
    if (quality === 'enhanced') {
        fullPrompt += ' Intricate details, masterpiece, high quality, 4k, cinematic lighting.';
    } else {
        fullPrompt += ' High quality, 4k, cinematic.';
    }

    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: fullPrompt,
      config: {
        numberOfImages: 4,
        outputMimeType: 'image/jpeg',
        aspectRatio: aspectRatio,
      },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
      throw new Error("The AI failed to generate any images. Please try a different prompt.");
    }

    const imageUrls = response.generatedImages.map(img => {
      const base64ImageBytes = img.image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    });

    return imageUrls;

  } catch (error) {
    console.error("Error generating wallpapers:", error);
    if (error instanceof Error) {
      // Provide a more user-friendly message
      if (error.message.includes('API key not valid')) {
         throw new Error('The API key is invalid. Please check your configuration.');
      }
      throw new Error(`Failed to generate wallpapers: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating wallpapers.");
  }
};