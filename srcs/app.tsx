import express from 'express';
import expressSession from 'express-session';
import dotenv from 'dotenv';
import { connectDB } from './config';
import router from './routes';

const app = express();

/* Set middleware */
app.use(router);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export default app;
