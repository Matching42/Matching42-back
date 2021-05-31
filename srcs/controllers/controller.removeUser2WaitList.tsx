import { RequestHandler } from 'express';
import { User, Waitlist } from '../models';

const removeUser2Waitlist: RequestHandler = async (req, res) => {
    try {
        const UserDocument = await User.findOne({ ID: req.params.userId }).exec();
        if (UserDocument === null || UserDocument === undefined)
            throw new Error('This user_ID does not exist.');
        if (UserDocument.waitMatching === null)
            throw new Error('This user_ID not registered in any subject');

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
