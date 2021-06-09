import express from 'express';
import router from './routes';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const app = express();

/* Set middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ resave: false, saveUninitialized: false, secret: 'asfsa' }));
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    })
);
app.use(router);

export default app;
