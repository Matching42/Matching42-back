import { RequestHandler } from 'express';
import { Waitlist } from '../models';

const getWaitlist: RequestHandler = async (req, res) => {
    try {
        const allWaitlists = await Waitlist.find({});
        let totalWaitingNumber = 0;
        for (let i = 0; i < allWaitlists.length; i++) {
            totalWaitingNumber += allWaitlists[i].user.length;
        }

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
