import { User } from '../models';
import { tUser } from '../../@types/types.d';

const findAllUser: () => Promise<[tUser]> = async () => {
    const allUsers = await User.find({});
    if (allUsers === null) throw new Error('User not found');
    return allUsers;
};

export default findAllUser;
