import dotenv from 'dotenv';
import server from './src/application/server.js';

dotenv.config();
server.start();
