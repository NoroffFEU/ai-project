// Express is a web application framework for node.js. Its very minimal and allows us to:
//  -Set up middlewares to respond to HTTP Requests
//  -Define routing tables which can perform different actions based on the HTTP method and URL
//  -Render HTML views.
// This is one of the most popular node.js frameworks
import express from 'express';
// Dotnew is a module that loads environment variables from a .env file into process.env.
// This lets us seperate secrets from the source code. We have to figure out secrets, in the mean time i use local variables
import dotenv from 'dotenv';
// The basic setup for open ai only says to use import OpenAI from "openai";
// confgiuration is added for keeping up with the lates updates from openAI.
import OpenAI from 'openai';
// Imports a the defined personality of the ai
// import { assistant_1 } from './ai-personality.mjs';

//Runs the dotnev and reads the content of the .end file
dotenv.config();
// Calls the express function, creating a new express application.
// This applicatio is then stored in the variable "app", setting up the server.
const app = express();
// Setting up a port number based on the .env file or  set it as 3001 defualt if not available.
const PORT = process.env.PORT || 3001;
// Takes incomming data and parses it as json (which is most common).
app.use(express.json());

// Creates a new configuration object for the OPENAI API. It will hold the settings needed to run the API client.
// In this case it reads from my computer local environment which i have named NOROFFAI_API_KEY and stored my key in.
// const configuration = new Configuration({
//   apiKey: process.env.NOROFFAI_API_KEY,
// });
// A new instance of the openAI API, which is the interface for interacting with the openAI API.
// The instance is needed to make requests to the openAI API
const openai = new OpenAI({ apiKey: process.env.NOROFFAI_API_KEY });

// This dfines a route in the express application and lsitens for a post request on the /generate-text path.
app.post('/generate-text', async (req, res) => {
  // This try/cath block attempts to generate text using the API, is successfull the generated text is sent back
  // Configurations for the AI is set here and configured elsewhere using .mjs structure.
  try {
    const userPrompt = req.body.prompt; // 'prompt' would be the "key" clients need to include in the request
    const completion = await openai.createCompletion({
      messages: [{ role: 'system', content: userPrompt }],
      max_tokens: 500,
    });
    res.json({ response: completion.data.choices[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

// This starts the express application, and makes it lsiten for requests on the specified port.
// A successfull console log indicated the server is running.
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
