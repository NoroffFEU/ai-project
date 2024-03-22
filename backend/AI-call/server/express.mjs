import express from 'express';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import cors from 'cors';
import { handleApiCall } from '../main-ai.mjs';

// Setup for reading .env file and defining __dirname

// /*
//   The __dirname constant is used to get the directory name of the current module file.
//   There was an issue where process.env.PORT was not being read from the .env file or returning "undefined".
//   This was fixed by using the __dirname constant to get the directory name of the current module file.
//   And it now reads the .env file and returns the correct value for process.env.PORT.
//  */

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '../../.env') });

// Create an Express application instance
const app = express();

// Define the port on which the express server will listen
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies and enable CORS
app.use(express.json());
app.use(cors());

// Define a route to handle POST requests to '/make-api-call'
app.post('/make-api-call', handleApiCall);

// Start the Express server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
