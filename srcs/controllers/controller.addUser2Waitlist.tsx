import { RequestHandler } from 'express';
import axios from 'axios';
import { User, Waitlist } from '../models';
import { findOneWaitlist, findOneUser } from '../lib';

const errorWaitlistCheck = (WaitlistDocument, userID, subjectName) => {
    const checkUser = WaitlistDocument.user.map((userInfo) => userInfo.userID).includes(userID);
    if (checkUser) {
        throw new Error(`The user is already registered in ${subjectName} subject`);
    }
};

const addUser2Waitlist: RequestHandler = async (req, res) => {
    try {
        await axios.get(`https://api.github.com/users/${req.body.gitName}`).catch((err) => {
            throw new Error(`github API ${err.message}`);
        });

        await findOneUser(req.body.userID);

        const WaitlistDocument = await findOneWaitlist(req.body.subjectName);
        errorWaitlistCheck(WaitlistDocument, req.body.userID, req.body.subjectName);

        const ChangedUser = await User.findOneAndUpdate(
            { ID: req.body.userID },
            {
                waitMatching: req.body.subjectName,
                gitName: req.body.gitName,
                cluster: req.body.cluster,
                deadline: req.body.deadline,
            },
            { new: true, runValidators: true }
        );

        const SubjectUser = { userID: req.body.userID };
        const ChangedWaitlist = await Waitlist.findOneAndUpdate(
            { subjectName: req.body.subjectName },
            { $push: { user: SubjectUser } },
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

export default addUser2Waitlist;
