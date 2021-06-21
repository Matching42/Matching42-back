import { User } from '../models';
import { tIntra } from '../../@types/types.d';

const signup = async (user: tIntra): Promise<void> => {
    const newUser = new User({
        ID: user.login,
        intraInfo: user.cursus_users.map((cursus) => ({
            blackholed_at: cursus.blackholed_at,
            level: cursus.level,
        })),
    });

    await newUser.save();
};

export default signup;
