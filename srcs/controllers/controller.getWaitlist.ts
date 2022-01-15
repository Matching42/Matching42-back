import { RequestHandler } from 'express';
import { Waitlist } from '../models';

const getWaitlist: RequestHandler = async (req, res) => {
    try {
        const allWaitlists = await Waitlist.find({});
        const totalWaitingNumber = allWaitlists.reduce((sum, subject) => {
            return sum + subject.user.length;
        }, 0);

        res.status(200).json({
            success: true,
            data: allWaitlists,
            totalWaitingNumber: totalWaitingNumber,
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

export default getWaitlist;
