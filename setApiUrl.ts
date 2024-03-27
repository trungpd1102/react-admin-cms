import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load existing environment variables
const envConfig = dotenv.parse(fs.readFileSync('.env'));

// Set new value for NEXT_PUBLIC_API_URL
envConfig.NEXT_PUBLIC_API_URL = process.argv[2];

// Convert the environment variables back to a string
const newEnv = Object.entries(envConfig)
  .map(([key, value]) => `${key}=${value}`)
  .join('\n');

fs.writeFileSync(path.join(__dirname, '.env'), newEnv);
