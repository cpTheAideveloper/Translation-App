// File: src/app/page.tsx

'use client';

import React, { useState } from 'react';
import TextInput from '@/components/ui/TextInput';
import LanguageSelector from '@/components/ui/LanguageSelector';
import TranslationModal from '@/components/ui/TranslationModal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Language, TranslationResponse } from '@/types';

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ru', name: 'Russian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'it', name: 'Italian' },
  { code: 'ko', name: 'Korean' },
  { code: 'nl', name: 'Dutch' },
  { code: 'sv', name: 'Swedish' },
  { code: 'tr', name: 'Turkish' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'pl', name: 'Polish' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'fa', name: 'Persian' },
  { code: 'he', name: 'Hebrew' },
];

export default function Home() {
  const [modalStep, setModalStep] = useState<'select' | 'result' | null>(null);
  const [selectedText, setSelectedText] = useState<string>('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [translations, setTranslations] = useState<TranslationResponse['translations']>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleTextSubmit = (text: string) => {
    setSelectedText(text);
    setModalStep('select');
  };

  const handleLanguageSelect = async (languages: string[]) => {
    setSelectedLanguages(languages);
    setModalStep('result');
    setLoading(true);

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: selectedText, targetLanguages: languages }),
      });

      const data: TranslationResponse = await response.json();
      setTranslations(data.translations);
    } catch (error) {
      console.error('Error translating:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setModalStep(null);
    setSelectedLanguages([]);
    setTranslations([]);
  };

  return (
    <div className="flex items-center justify-center">
      <TextInput onSubmit={handleTextSubmit} />
      {modalStep === 'select' && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <LanguageSelector languages={languages} onSelect={handleLanguageSelect} />
        </div>
      )}
      {modalStep === 'result' && translations.length > 0 && (
        <TranslationModal translations={translations} onRestart={handleRestart} />
      )}
      {loading && <LoadingSpinner />}
    </div>
  );
}