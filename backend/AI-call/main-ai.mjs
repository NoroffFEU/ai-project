/*
To run the Express server, use the command: node main-ai.mjs
From there, you can make a POST request to the 'http://localhost:3001/make-api-call' 
route to send a message to the external API, for example using Postman.
Remember to add the necessary header options into Postman, as the external API requires it.

{
    'Content-Type': 'application/json',
    'X-Noroff-API-Key': Your_API_Key_Here,
  }

If you want to test other replies, change the content: "Your message here" 
in the createRequestBody function.
*/
import express from 'express';
import { request } from 'undici';
import { baseUrl } from './globals/globals.mjs';
import { createHeaders } from './send-message.mjs/header.mjs';
import { createRequestBody } from './send-message.mjs/body.mjs';

// Create an Express application instance
const app = express();

// Define the port on which the express server will listen
const PORT = process.env.PORT || 3001;

// Define a route to handle POST requests to '/make-api-call' using express
app.post('/make-api-call', async (req, res) => {
  try {
    // Create headers and request body using the modules from /send-message.mjs/header.mjs and /send-message.mjs/body.mjs
    const headers = createHeaders();
    const body = createRequestBody();

    // Make a request to the external API using undici
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
    }
    // Handle error response (status code outside the range 200-299)
    else {
      console.error(`Failed to send message, status code: ${statusCode}`);

      try {
        const errorResponse = await responseBody.json();
        console.error(
          'Error Response:',
          JSON.stringify(errorResponse, null, 2),
        );

        // Send JSON response back to the client with the error data
        res.status(statusCode).json(errorResponse);
      } catch (error) {
        console.error('Error parsing response body:', error);

        // Send plain text response back to the client with the error message
        res.status(statusCode).send(await responseBody.text());
      }
    }
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error('Error during request:', error.message);

    // Send internal server error response back to the client
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
});

// Start the Express server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
