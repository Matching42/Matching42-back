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
const whitelist = [process.env.CLIENT_URI, 'http://localhost:3000'];
/* Set middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ resave: false, saveUninitialized: false, secret: 'asfsa' }));
app.use(
    cors({
        origin: (origin, callback) => {
            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not Allowed by CORS'));
            }
        },
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    })
);
app.use(morgan(morganFormat, { stream }));
app.use(router);

export default app;
