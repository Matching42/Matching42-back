import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { stream } from './config/winston';
dotenv.config();

const app = express();
const morganFormat = process.env.NODE_ENV !== 'production' ? 'dev' : 'combined';
/* Set middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ resave: false, saveUninitialized: false, secret: 'asfsa' }));
app.use(
    cors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    })
);
app.use(morgan(morganFormat, { stream }));
app.use(router);

export default app;
