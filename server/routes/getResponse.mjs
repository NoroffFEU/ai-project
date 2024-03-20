import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
try {
  const { body } = req;
  
  if(!body || typeof body.message !== 'string') {
    return res.status(400).json({ message: 'Bad Request' });
  }
  
  const payload = {
    messages: [
      {
        role: 'user',
        content: body.message,
      },
    ],
  };
  const { data } = await axios.post(
    'https://ai.api.noroff.dev/openai/completions',
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Noroff-API-Key': process.env.NOROFF_API_KEY,
      },
    });
    
    const { message } = data.choices[0];
    
    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' }); 
  }
  });
  
  export default router;
  