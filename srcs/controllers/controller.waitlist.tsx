import { RequestHandler } from 'express';
import WaitList from '../models/model.waitlist';

const post_waitlist: RequestHandler = async (req, res) => {
    try {
        //subject_name 유효성 검사
        const waitlist_document = await WaitList.findOne({
            subject_name: req.body.subject_name,
        }).exec();
        // 유효하지 않은 subject_name이 들어오면 Error 처리
        if (waitlist_document === null || waitlist_document === undefined)
            throw new Error('Invalid subject_name');
        // 해당 subject에 이미 등록된 유저이면 Error 처리
        for (let i = 0; i < waitlist_document.user.length; i++) {
            if (waitlist_document.user[i].user_ID === req.body.user_ID)
                throw new Error(
                    'The user is already registered in the ' + req.body.subject_name + ' subject'
                );
        }
        const obj_user = { user_ID: req.body.user_ID };
        // WaitList update.
        await WaitList.updateOne(
            { subject_name: req.body.subject_name },
            { $push: { user: obj_user } },
            { runValidators: true }
        ).exec();
        res.json({ success: true });
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

export { post_waitlist };
