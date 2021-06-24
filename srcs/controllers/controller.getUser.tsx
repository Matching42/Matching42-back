import { RequestHandler } from 'express';
import { User } from '../models';

const getUser: RequestHandler = async (req, res) => {
    try {
        const userID = req.params.userID;
        if (!userID) {
            const allUsers = await User.find({});
            res.status(200).json({
                success: true,
                data: allUsers,
            });
        } else {
            const user = await User.findOne({ ID: userID });
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

export default getUser;
