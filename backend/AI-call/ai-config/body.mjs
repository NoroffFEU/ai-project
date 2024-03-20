export function createRequestBody(userMessage) {
  return JSON.stringify({
    messages: [
      {
        role: 'user',
        content: userMessage,
      },
    ],
  });
}
