import express from 'express';
import router from './routes';
import bodyParser from 'body-parser';

const app = express();

/* Set middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export default app;
