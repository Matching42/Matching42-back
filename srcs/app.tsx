import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config';
import router from './routes';
import bodyParser from 'body-parser';

dotenv.config();

console.log('Chcek DB connection...');

console.log('Set application...');
const app = express();

/* Set middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Run server */

export default app;
