import { RequestHandler } from 'express';
import { findAllUser } from '../lib';

const getAllUser: RequestHandler = async (req, res) => {
    try {
        const users = await findAllUser();
        res.status(200).json({
            success: true,
            users: users,
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

export default getAllUser;
