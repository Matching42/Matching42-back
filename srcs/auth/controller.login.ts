import { RequestHandler } from 'express';
import axios from 'axios';
import signup from './controller.signup';
import { generateToken, getToken, decodeToken } from './auth.jwt';
import { getUserFromDB, getUserFrom42 } from './auth.lib';
import dotenv from 'dotenv';
dotenv.config();

/*
    TODO: set User from 42 type
*/
const fail: RequestHandler = (req, res) => {
    res.status(401).send({
        success: false,
        message: 'User auth failed in 42',
    });
};

const login: RequestHandler = (req, res) => {
    const token = getToken(req);
    if (!token) {
        return res.redirect(
            `https://api.intra.42.fr/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.RETURN_URI}&response_type=code`
        );
    }
    const decode = decodeToken(token);

    if (!decode) {
        return res.redirect(
            `https://api.intra.42.fr/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.RETURN_URI}&response_type=code`
        );
    }
    res.redirect(`${process.env.CLIENT_URI}?token=${token}`);
};

const granted: RequestHandler = async (req, res) => {
    const { code } = req.query;

    try {
        const data = await axios({
            url: 'https://api.intra.42.fr/oauth/token',
            method: 'post',
            data: {
                grant_type: 'authorization_code',
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                code: code,
                redirect_uri: process.env.RETURN_URI,
            },
        });
        const userFrom42 = await getUserFrom42(data.data.access_token as string);
        if (userFrom42.cursus_users.length < 2) {
            res.status(400).send({
                success: false,
                message: 'user Not correct 42 user',
            });
            return;
        }
        const userFromDB = await getUserFromDB(userFrom42.login);
        if (!userFromDB) signup(userFrom42);
        const token = generateToken(userFrom42.login as string);
        res.redirect(`${process.env.CLIENT_URI}?token=${token}`);
    } catch (err) {
        console.log(err);
    }
};

export { fail, login, granted };
