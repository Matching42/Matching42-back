import { RequestHandler } from 'express';
import User from '../models/model.user';

const getUser: RequestHandler = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            const allUsers = await User.find({});
            res.status(200).json({
                success: true,
                data: allUsers,
            });
        } else {
            const user = await User.findOne({ ID: userId });
            res.status(200).json({
                success: true,
                data: user,
            });
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
