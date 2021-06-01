import app from './app';
import dotenv from 'dotenv';
import { connectDB } from './config';

dotenv.config();
const runServer = async () => {
    console.log('Chcek DB connection...');
    await connectDB(process.env.DB_URL ? process.env.DB_URL : '');
    /* Run server */
    console.log('Set application...');
    app.listen(process.env.PORT, () => console.log(`server Run with port: ${process.env.PORT}`));
};

runServer();
