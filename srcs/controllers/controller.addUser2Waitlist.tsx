import { RequestHandler } from 'express';
import axios from 'axios';
import { User, Waitlist } from '../models';

const addUser2Waitlist: RequestHandler = async (req, res) => {
    try {
        await axios.get('https://api.github.com/users/' + req.body.gitid);

        const UserDocument = await User.findOne({ ID: req.body.user_ID }).exec();
        if (UserDocument === null || UserDocument === undefined)
            throw new Error('This user_ID does not exist.');

        const WaitlistDocument = await Waitlist.findOne({
            subject_name: req.body.subject_name,
        }).exec();
        if (WaitlistDocument === null || WaitlistDocument === undefined)
            throw new Error('Invalid subject_name');
        for (let i = 0; i < WaitlistDocument.user.length; i++) {
            if (WaitlistDocument.user[i].user_ID === req.body.user_ID)
                throw new Error(
                    'The user is already registered in the ' + req.body.subject_name + ' subject'
                );
        }

        const ChangedUser = await User.findOneAndUpdate(
            { ID: req.body.user_ID },
            {
                waitMatching: req.body.subject_name,
                gitID: req.body.gitid,
                cluster: req.body.cluster,
            },
            { new: true, runValidators: true }
        ).exec();

        const SubjectUser = { user_ID: req.body.user_ID };
        const ChangedWaitlist = await Waitlist.findOneAndUpdate(
            { subject_name: req.body.subject_name },
            { $push: { user: SubjectUser } },
            { new: true, runValidators: true }
        ).exec();

        res.status(200).json({
            success: true,
            User: ChangedUser,
            Waitlist: ChangedWaitlist,
        });
    } catch (e) {
        if (e.request) e.message = 'not found gitid';

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
