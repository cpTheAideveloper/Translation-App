// File: src/components/ui/TextInput.tsx

'use client';

import React, { useState } from 'react';

type TextInputProps = {
  onSubmit: (text: string) => void;
};

export default function TextInput({ onSubmit }: TextInputProps) {
  const [text, setText] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && text.trim().length > 0) {
      onSubmit(text.trim());
      setText('');
    }
  };

  return (
    <textarea
      className="w-full h-screen p-4 text-xl"
      maxLength={140}
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Type your message..."
    />
  );
}