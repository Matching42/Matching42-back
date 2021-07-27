import { User } from '../models';
import { tUser } from '../../@types/types.d';

const findAllUser: () => Promise<tUser | Error> = async () => {
    try {
        const allUsers = await User.find({});
        if (allUsers === null) throw new Error('User not found');
        return allUsers;
    } catch (error) {
        return error;
    }
};

export default findAllUser;
