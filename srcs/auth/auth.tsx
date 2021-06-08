import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { RequestHandler } from 'express';
dotenv.config();

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.JWT as string, { expiresIn: '6h' });
};
/* TODO: change any to other */
const getToken = (req: any): string | undefined => {
    const authField = req.headers['authorization'] as string; /* why it change small case??? */
    console.log(req.headers);
    if (!authField) return undefined;
    if (authField.split(' ')[0] !== 'Bearer') return undefined;
    return authField.split(' ')[1];
};

const decodeToken = (token: string): string | object | undefined => {
    try {
        const decode = jwt.verify(token, process.env.JWT as string);
        return decode;
    } catch (err) {
        console.log('token is not verified');
        return undefined;
    }
};

const isAuth: RequestHandler = (req, res, next) => {
    const token = getToken(req);
    if (!token) return next();
    const decode = decodeToken(token);
    if (!decode) return next(); /* 42 Auth */

    res.status(200).send({
        success: true,
        access_token: token,
    });
};

export { isAuth, decodeToken, getToken, generateToken };
