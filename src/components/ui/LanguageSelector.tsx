// File: src/components/ui/LanguageSelector.tsx

'use client';

import React, { useState } from 'react';
import { Language } from '@/types';

type LanguageSelectorProps = {
  languages: Language[];
  onSelect: (selected: string[]) => void;
};

export default function LanguageSelector({ languages, onSelect }: LanguageSelectorProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleLanguage = (code: string) => {
    setSelected((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : prev.length < 3 ? [...prev, code] : prev
    );
  };

  const handleSubmit = () => {
    onSelect(selected);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg mb-2">Select up to 3 languages:</h2>
      <div className="grid grid-cols-2 gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            className={`p-2 border rounded ${
              selected.includes(lang.code) ? 'bg-blue-500 text-white' : 'bg-white'
            }`}
            onClick={() => toggleLanguage(lang.code)}
          >
            {lang.name}
          </button>
        ))}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
        onClick={handleSubmit}
        disabled={selected.length === 0}
      >
        Translate
      </button>
    </div>
  );
}