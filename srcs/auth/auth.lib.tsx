import axios from 'axios';
import { User } from '../models';
import { tUser } from '../../@types/types.d';

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

const getUserFromDB: (login: string) => Promise<tUser | undefined> = async (login) => {
    try {
        const user = await User.findOne({ ID: login });
        return user;
    } catch (err) {
        console.log(err);
        return undefined;
    }
};

export { getUserFrom42, getUserFromDB };
