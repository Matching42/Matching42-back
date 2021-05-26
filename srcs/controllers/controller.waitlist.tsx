import { RequestHandler } from 'express';
import axios from 'axios';
import WaitList from '../models/model.waitlist';
import User from '../models/model.user';

const post_waitlist: RequestHandler = async (req, res) => {
    try {
        await axios.get('https://api.github.com/users/' + req.body.gitid);

        const user_document = await User.findOne({ ID: req.body.user_ID }).exec();
        if (user_document === null || user_document === undefined)
            throw new Error('This user_ID does not exist.');

        const waitlist_document = await WaitList.findOne({
            subject_name: req.body.subject_name,
        }).exec();
        if (waitlist_document === null || waitlist_document === undefined)
            throw new Error('Invalid subject_name');
        for (let i = 0; i < waitlist_document.user.length; i++) {
            if (waitlist_document.user[i].user_ID === req.body.user_ID)
                throw new Error(
                    'The user is already registered in the ' + req.body.subject_name + ' subject'
                );
        }

        await User.updateOne(
            { ID: req.body.user_ID },
            {
                waitMatching: req.body.subject_name,
                gitID: req.body.gitid,
                cluster: req.body.cluster,
            },
            { runValidators: true, lean: true }
        ).exec();

        const obj_user = { user_ID: req.body.user_ID };
        await WaitList.updateOne(
            { subject_name: req.body.subject_name },
            { $push: { user: obj_user } },
            { runValidators: true }
        ).exec();

        res.json({ success: true });
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

export { post_waitlist };
