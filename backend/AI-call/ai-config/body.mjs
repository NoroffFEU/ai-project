import { AIMOT } from './AI-personality.mjs';
const AIMOT_AI = AIMOT.join(' ');
export function createRequestBody(userMessage) {
  return JSON.stringify({
    messages: [
      {
        role: 'assistant',
        content: AIMOT_AI,
      },
      {
        role: 'user',
        content: userMessage,
      },
    ],
  });
}
