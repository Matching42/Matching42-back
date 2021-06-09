import { RequestHandler } from 'express';
import { User, Waitlist } from '../models';

const removeUser2Waitlist: RequestHandler = async (req, res) => {
    try {
        const UserDocument = await User.findOne({ ID: req.params.userId }).exec();
        if (UserDocument === null || UserDocument === undefined)
            throw new Error('This user_ID does not exist.');
        if (UserDocument.waitMatching === null)
            throw new Error('This user_ID not registered in any subject');

        const WaitlistDocument = await Waitlist.findOne({
            subjectName: UserDocument.waitMatching,
        }).exec();
        if (WaitlistDocument === null || WaitlistDocument === undefined)
            throw new Error('This subjectName does not exist.');
        let WaitlistUserInfo = null;
        for (let i = 0; i < WaitlistDocument.user.length; i++) {
            if (WaitlistDocument.user[i].userID === req.params.userId) {
                WaitlistUserInfo = WaitlistDocument.user[i];
                break;
            }
        }
        if (WaitlistUserInfo === null) {
            throw new Error(
                'This user_ID not registered in ' + WaitlistDocument.subjectName + 'subject'
            );
        }

        const ChangedUser = await User.findOneAndUpdate(
            { ID: req.params.userId },
            {
                waitMatching: null,
            },
            { new: true, runValidators: true }
        ).exec();

        const ChangedWaitlist = await Waitlist.findOneAndUpdate(
            { subjectName: WaitlistDocument.subjectName },
            { $pull: { user: WaitlistUserInfo } },
            { new: true, runValidators: true }
        ).exec();

        res.status(200).json({
            success: true,
            User: ChangedUser,
            Waitlist: ChangedWaitlist,
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
