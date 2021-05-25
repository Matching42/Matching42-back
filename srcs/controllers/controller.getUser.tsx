import { RequestHandler } from 'express';
import User from '../models/model.user';

const getUser: RequestHandler = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            const allUsers = await User.find({});
            res.json(allUsers);
        } else {
            const user = await User.findOne({ ID: userId });
            res.json(user);
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            error: {
                code: error.name,
                message: error.message,
            },
        });
    }
};

export { getUser };
