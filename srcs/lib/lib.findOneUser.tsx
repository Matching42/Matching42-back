import { User } from '../models';
import { tUser } from '../../@types/types.d';

const findOneUser: (userID: string) => Promise<tUser | Error> = async (userID) => {
    try {
        const user = await User.findOne({ ID: userID });
        if (user === null) throw new Error('Invalid User ID');
        return user;
    } catch (error) {
        return error;
    }
};

export default findOneUser;
