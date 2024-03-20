async function sendMessage() {
  const userMessage = document.getElementById('userMessage').value;
  try {
    const response = await fetch('http://localhost:3001/make-api-call', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const responseData = await response.json();
      document.getElementById('messages').textContent +=
        `\n${responseData.choices[0].message.content}`;
    }
  } catch (error) {
    console.error('Problem with fetch operation:', error.message);
  }

  document.getElementById('userMessage').value = '';
}
