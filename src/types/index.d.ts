// src/types/index.d.ts

export type Language = {
    code: string;
    name: string;
  };
  
  export type TranslationRequest = {
    text: string;
    targetLanguages: string[];
  };
  
  export type TranslationResponse = {
    translations: {
      language: string;
      translatedText: string;
    }[];
  };