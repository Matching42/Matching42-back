import { RequestHandler } from 'express';
import { User, Waitlist } from '../models';

const removeUser2Waitlist: RequestHandler = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            error: {
                code: e.name,
                message: e.message,
            },
        });
    }
};

export default removeUser2Waitlist;
