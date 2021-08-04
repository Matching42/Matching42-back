import { RequestHandler } from 'express';
import { User, Waitlist } from '../models';
import { findOneWaitlist, findOneUser } from '../lib';

const errorWaitlistCheck = (WaitlistDocument, userId) => {
    const userIndex = WaitlistDocument.user.map((userInfo) => userInfo.userID).indexOf(userId);
    if (userIndex !== -1) return userIndex;
    else throw new Error(`This userID not registered in ${WaitlistDocument.subjectName} subject`);
};

const removeUser2Waitlist: RequestHandler = async (req, res) => {
    try {
        const UserDocument = await findOneUser(req.params.userID);
        if (UserDocument.waitMatching === null)
            throw new Error('This userID not registered in any subject');

        const WaitlistDocument = await findOneWaitlist(UserDocument.waitMatching);
        const userIndex = await errorWaitlistCheck(WaitlistDocument, req.params.userID);
        const WaitlistUserInfo = WaitlistDocument.user[userIndex];

        const ChangedUser = await User.findOneAndUpdate(
            { ID: req.params.userID },
            {
                waitMatching: null,
                deadline: null,
            },
            { new: true, runValidators: true }
        );

        const ChangedWaitlist = await Waitlist.findOneAndUpdate(
            { subjectName: WaitlistDocument.subjectName },
            { $pull: { user: WaitlistUserInfo } },
            { new: true, runValidators: true }
        );

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
