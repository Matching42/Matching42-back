import { RequestHandler } from 'express';
import axios from 'axios';
import { generateToken } from './auth';
import { User } from '../models';
import dotenv from 'dotenv';
dotenv.config();

const getUser: (token: string) => any = async (token) => {
    try {
        const user = await axios('https://api.intra.42.fr/v2/me', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return user.data;
    } catch (err) {
        console.log(err);
        return undefined;
    }
};

const fail: RequestHandler = (req, res) => {
    res.status(401).send({
        success: false,
        message: 'user auth failed',
    });
};

const login = (req, res) => {
    res.redirect('https://api.intra.42.fr/oauth/authorize?client_id=840f3b38a134de3c437bd7fb9db995e1168d80cf5ccbde6b29b9d48221e3e107&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Flogin%2Fredirect&response_type=code');
};

const granted: RequestHandler = async (req, res) => {
    const { code } = req.query;

    console.log(code);
    try {
        const data = await axios.post('https://api.intra.42.fr/oauth/token', { 
            grant_type: 'authorization_code',
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code: code,
            redirect_uri: 'http://localhost:4000/login/redirect',
        });
        const user = await getUser(data.data.access_token as string);
        const token = generateToken(user.login);
        res.redirect(`http://localhost:3000/login?token=${token}`);
    } catch (err) {
        console.log(err);
    }
};

export { fail, login, granted };
