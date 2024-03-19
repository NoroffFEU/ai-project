import { request } from 'undici';
import { baseUrl } from './globals/globals.mjs';
import { createHeaders } from './send-message.mjs/header.mjs';
import { createRequestBody } from './send-message.mjs/body.mjs';

async function mainAI() {
  try {
    const headers = createHeaders();
    const body = createRequestBody();
    const { statusCode, body: responseBody } = await request(
      `${baseUrl}/completions`,
      {
        method: 'POST',
        headers: headers,
        body: body,
      },
    );

    if (statusCode >= 200 && statusCode < 300) {
      const responseData = await responseBody.json();
      console.log('Response:', responseData);
      console.log('Formatted Response:', JSON.stringify(responseData, null, 2));
    } else {
      console.error(`Failed to send message, status code: ${statusCode}`);

      try {
        const errorResponse = await responseBody.json(); // Use .text() if the response is not JSON format
        console.error(
          'Error Response:',
          JSON.stringify(errorResponse, null, 2),
        );
      } catch (error) {
        console.error('Error parsing response body:', error);
        console.error('Raw response:', await responseBody.text());
      }
    }
  } catch (error) {
    console.error('Error during request:', error.message);
  }
}

mainAI();
