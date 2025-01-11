// File: src/app/api/translate/route.ts

import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { TranslationRequest, TranslationResponse } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { text, targetLanguages } = (await request.json()) as TranslationRequest;

  const messages = [
    {
      role: 'system',
      content: `You are an assistant that translates texts while maintaining context and appropriate style based on the type of relationship (formal, informal, etc.). Return the translations in the following JSON format:
      {
        "translations": [
          {
            "language": "es",
            "translatedText": "Texto traducido al español"
          },
          ...
        ]
      }`,
    },
    {
      role: 'user',
      content: `Translate the following text into the languages: ${targetLanguages.join(', ')}.
      Text: "${text}"`,
    },
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });

    const responseContent = completion.choices[0].message?.content;
    const translationResponse: TranslationResponse = JSON.parse(responseContent || '{}');

    return NextResponse.json(translationResponse);
  } catch (error) {
    return NextResponse.json({ error: 'Translation error' }, { status: 500 });
  }
}