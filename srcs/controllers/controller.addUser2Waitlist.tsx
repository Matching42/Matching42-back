import { RequestHandler } from 'express';
import axios from 'axios';
import { User, Waitlist } from '../models';

const addUser2Waitlist: RequestHandler = async (req, res) => {
    try {
        await axios.get('https://api.github.com/users/' + req.body.gitName);

        const UserDocument = await User.findOne({ ID: req.body.userID }).exec();
        if (UserDocument === null || UserDocument === undefined)
            throw new Error('This userID does not exist.');

        const WaitlistDocument = await Waitlist.findOne({
            subjectName: req.body.subjectName,
        }).exec();
        if (WaitlistDocument === null || WaitlistDocument === undefined)
            throw new Error('Invalid subjectName');
        for (let i = 0; i < WaitlistDocument.user.length; i++) {
            if (WaitlistDocument.user[i].userID === req.body.userID)
                throw new Error(
                    'The user is already registered in the ' + req.body.subjectName + ' subject'
                );
        }

        const ChangedUser = await User.findOneAndUpdate(
            { ID: req.body.userID },
            {
                waitMatching: req.body.subjectName,
                gitName: req.body.gitName,
                cluster: req.body.cluster,
                deadline: req.body.deadline,
            },
            { new: true, runValidators: true }
        ).exec();

        const SubjectUser = { userID: req.body.userID };
        const ChangedWaitlist = await Waitlist.findOneAndUpdate(
            { subjectName: req.body.subjectName },
            { $push: { user: SubjectUser } },
            { new: true, runValidators: true }
        ).exec();

        res.status(200).json({
            success: true,
            User: ChangedUser,
            Waitlist: ChangedWaitlist,
        });
    } catch (e) {
        if (e.request) e.message = 'not found gitName';

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
