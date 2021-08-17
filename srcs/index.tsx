import app from './app';
import dotenv from 'dotenv';
import { connectDB } from './config';
import { logger } from './config/winston';

dotenv.config();
const runServer = async () => {
    logger.info('Chcek DB connection...');
    await connectDB(process.env.DB_URL ? process.env.DB_URL : '');
    /* Run server */
    logger.info('Set application...');
    app.listen(process.env.PORT, () => logger.info(`server Run with port: ${process.env.PORT}`));
};

runServer();
