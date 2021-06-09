import axios from 'axios';
import { User } from '../models';

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

export { getUserFrom42, getUserFromDB };
