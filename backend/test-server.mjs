// Import necessary modules
import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

// Load environment variables from .env file
dotenv.config();

// Create an Express app
const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.NOROFFAI_API_KEY;

// Middleware to parse JSON bodies
app.use(express.json());

// Define a route to handle the API request
app.post('/send-message', async (req, res) => {
  try {
    // Extract message from the request body
    const { content } = req.body.messages[0];

    // Prepare request data using the received message
    const requestData = {
      messages: [
        {
          role: 'user',
          content: content, // Use the received message
        },
      ],
    };

    // Make API request
    const response = await axios.post('https://ai.api.noroff.dev/openai/completions', requestData, {
      headers: {
        'Content-Type': 'application/json',
        'X-Noroff-API-Key': API_KEY,
      },
    });

    // Send response from AI API to client
    res.json(response.data);
  } catch (error) {
    // If an error occurs, send error message to client
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
