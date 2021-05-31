import express from 'express';
import expressSession from 'express-session';
import dotenv from 'dotenv';
import { connectDB } from './config';
import router from './routes';
import cookieParser from 'cookie-parser';
import { initialize, session } from 'passport';

dotenv.config();

const runServer = async () => {
    console.log('Chcek DB connection...');
    await connectDB(process.env.DB_URL ? process.env.DB_URL : '');

    console.log('Set application...');
    const app = express();

    /* Set middleware */
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(
        expressSession({ resave: false, saveUninitialized: false, secret: `${process.env.SECRET}` })
    );
    app.use(initialize());
    app.use(session());
    app.use(router);

    /* Run server */
    app.listen(process.env.PORT, () => console.log(`server Run with port: ${process.env.PORT}`));
};

runServer();
