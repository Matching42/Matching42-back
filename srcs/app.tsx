import express from 'express';
import router from './routes';
import cors from 'cors';

const app = express();

/* Set middleware */
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(router);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export default app;
