import dotenv from 'dotenv';
import server from './src/application/http/server.js';

dotenv.config();
server.start();
