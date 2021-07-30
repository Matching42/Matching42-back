import { RequestHandler } from 'express';
import { findOneUser } from '../lib';

const getOneUser: RequestHandler = async (req, res) => {
    try {
        const user = await findOneUser(req.params.userID);
        console.log(user);
        res.status(200).json({
            success: true,
            user: user,
        });
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

export default getOneUser;
