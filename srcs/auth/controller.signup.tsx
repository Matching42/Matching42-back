import { User } from '../models';
import { tIntra } from '../../@types/types.d';

const signup = async (user: tIntra): Promise<void> => {
    const newUser = new User({
        ID: user.login,
        intraInfo: {
            blackholed_at: user.cursus_users[1].blackholed_at,
            level: user.cursus_users[1].level,
        },
    });
    await newUser.save();
};

export default signup;
