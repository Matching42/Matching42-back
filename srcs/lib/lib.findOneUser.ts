import { User } from '../models';
import { tUser } from '../../@types/types.d';

const findOneUser: (userID: string) => Promise<tUser> = async (userID) => {
    const user = await User.findOne({ ID: userID });
    if (user === null) throw new Error('Invalid User ID');
    return user;
};

export default findOneUser;
