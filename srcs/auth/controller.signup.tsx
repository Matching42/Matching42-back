import { User } from '../models';

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

export default signup;
