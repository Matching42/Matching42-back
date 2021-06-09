import { RequestHandler } from 'express';
import axios from 'axios';
import { generateToken } from './auth';
import { User } from '../models';
import dotenv from 'dotenv';
dotenv.config();

/*
    TODO: set User from 42 type
*/
const signup = async (user: any) => {
    const newUser = new User({
        ID: user.login,
        intraInfo: user.cursus_users.map((cursus) => ({
            blackholed_at: cursus.blackholed_at,
            level: cursus.level,
        })),
    });

    await newUser.save();
};

const getUserFrom42: (token: string) => any = async (token) => {
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

const getUserFromDB: (login: string) => any = async (login) => {
    try {
        const user = await User.findOne({ ID: login });
        return user;
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

const login: RequestHandler = (_, res) => {
    res.redirect(
        `https://api.intra.42.fr/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.RETURN_URI}&response_type=code`
    );
};

const granted: RequestHandler = async (req, res) => {
    const { code } = req.query;
    try {
        const data = await axios.post('https://api.intra.42.fr/oauth/token', {
            grant_type: 'authorization_code',
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code: code,
            redirect_uri: 'http://localhost:4000/login/redirect',
        });
        const userFrom42 = await getUserFrom42(data.data.access_token as string);
        const userFromDB = await getUserFromDB(userFrom42.login);
        if (!userFromDB) signup(userFrom42);
        const token = generateToken(userFrom42.login);
        res.redirect(`http://localhost:3000?token=${token}`);
    } catch (err) {
        console.log(err);
    }
};

export { fail, login, granted };
