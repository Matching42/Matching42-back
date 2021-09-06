import app from './app';
import dotenv from 'dotenv';
import { connectDB } from './config';
import { logger } from './config/winston';
import { Scheduler, Matcher } from './lib';

dotenv.config();
const runServer = async () => {
    logger.info('Chcek DB connection...');
    await connectDB(process.env.DB_URL ? process.env.DB_URL : '');
    /* Run server */
    logger.info('Set application...');
    app.listen(process.env.PORT, () => logger.info(`server Run with port: ${process.env.PORT}`));
};

const cancleMatchSchedule = Scheduler(1, 12, 0, 60 * 60 * 24 * 7, Matcher);

runServer();
