import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config';
import router from './routes';

dotenv.config();

const runServer = async () => {
    console.log('Chcek DB connection...');
    await connectDB(process.env.DB_URL ? process.env.DB_URL : '');

    console.log('Set application...');
    const app = express();

    /* Set middleware */
    app.use(router);
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    /* Run server */
    app.listen(process.env.PORT, () => console.log(`server Run with port: ${process.env.PORT}`));
};

runServer();
