import dotenv from 'dotenv';
import { RequestHandler } from 'express';
import { getToken, decodeToken } from './auth.jwt';
dotenv.config();

const isAuth: RequestHandler = (req, res, next) => {
    const token = getToken(req);
    if (!token) {
        return res.status(401).send({
            success: false,
            message: 'No authenticated user',
        });
    }
    const decode = decodeToken(token);
    if (!decode) {
        return res.status(401).send({
            success: false,
            message: 'No authenticated user',
        });
    }
    next();
};

export default isAuth;
