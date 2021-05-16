import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { db_connect } from './config';

db_connect(process.env.DB_URL ? process.env.DB_URL : '');
const app = express();
app.listen(process.env.PORT, () => console.log(`server port ${process.env.PORT}`));
