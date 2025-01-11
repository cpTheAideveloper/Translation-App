// File: src/components/ui/TranslationModal.tsx

'use client';

import React from 'react';
import { TranslationResponse } from '@/types';

type TranslationModalProps = {
  translations: TranslationResponse['translations'];
  onRestart: () => void;
};

export default function TranslationModal({ translations, onRestart }: TranslationModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl mb-4">Translations</h2>
        <ul className="mb-4">
          {translations.map((t) => (
            <li key={t.language} className="mb-2">
              <strong>{t.language.toUpperCase()}:</strong> {t.translatedText}
            </li>
          ))}
        </ul>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={onRestart}
        >
          Start Over
        </button>
      </div>
    </div>
  );
}