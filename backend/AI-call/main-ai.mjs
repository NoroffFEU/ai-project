import { request } from 'undici';
import { baseUrl } from './globals/globals.mjs';
import { createHeaders } from './ai-config/header.mjs';
import { createRequestBody } from './ai-config/body.mjs';

// Function handling the API call to the AI service
export async function handleApiCall(req, res) {
  try {
    // Extracts the user message from the incoming HTTPS request
    const userMessage = req.body.message;

    // Calls createHeaders and the returned values are set to headers
    const headers = createHeaders();

    // Calls createRequestBody, passing the user message, and sets the value to body
    const body = createRequestBody(userMessage);

    // Make a request to the external AI API using undici
    const { statusCode, body: responseBody } = await request(
      `${baseUrl}/completions`,
      {
        method: 'POST',
        headers: headers,
        body: body,
      },
    );

    // Handle success response (status code within the range 200-299)
    if (statusCode >= 200 && statusCode < 300) {
      const responseData = await responseBody.json();
      console.log('Response:', responseData);
      console.log('Formatted Response:', JSON.stringify(responseData, null, 2));

      // Send JSON response back to the client with the received data
      res.status(statusCode).json(responseData);
    } else {
      // If there was an error in the API response
      console.error(`Failed to send message, status code: ${statusCode}`);
      const errorResponse = await responseBody.json();
      res.status(statusCode).json(errorResponse);
    }
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error('Error during request:', error.message);
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
}
