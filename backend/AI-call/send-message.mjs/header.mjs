import dotenv from 'dotenv';
dotenv.config();
export function createHeaders() {
  return {
    'Content-Type': 'application/json',
    'X-Noroff-API-Key': process.env.NOROFFAI_API_KEY,
  };
}
