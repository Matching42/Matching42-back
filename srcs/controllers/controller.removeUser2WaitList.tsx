import { RequestHandler } from 'express';
import { User, Waitlist } from '../models';
import { findOneWaitlist } from '../lib';

const removeUser2Waitlist: RequestHandler = async (req, res) => {
    try {
        const UserDocument = await User.findOne({ ID: req.params.userID }).exec();
        if (UserDocument === null || UserDocument === undefined)
            throw new Error('This userID does not exist.');
        if (UserDocument.waitMatching === null)
            throw new Error('This userID not registered in any subject');

        const WaitlistDocument = await findOneWaitlist(UserDocument.waitMatching);

        let WaitlistUserInfo = {};
        for (let i = 0; i < WaitlistDocument.user.length; i++) {
            if (WaitlistDocument.user[i].userID === req.params.userID) {
                WaitlistUserInfo = WaitlistDocument.user[i];
                break;
            }
        }
        if (WaitlistUserInfo === null) {
            throw new Error(
                'This userID not registered in ' + WaitlistDocument.subjectName + 'subject'
            );
        }

        const ChangedUser = await User.findOneAndUpdate(
            { ID: req.params.userID },
            {
                waitMatching: null,
                deadline: null,
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
