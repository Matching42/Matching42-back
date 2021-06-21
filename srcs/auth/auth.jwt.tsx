import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

const generateToken = (user: string): string => {
    return jwt.sign({ user }, process.env.JWT as string, { expiresIn: '6h' });
};
/* TODO: change any to other */
const getToken = (req: Request): string | undefined => {
    const authField = req.headers['authorization'] as string; /* why it change small case??? */
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

export { generateToken, getToken, decodeToken };
