export function createRequestBody() {
  return JSON.stringify({
    messages: [
      {
        role: 'user',
        content: 'You are a crazy AI, I know it to be true!',
      },
    ],
  });
}
