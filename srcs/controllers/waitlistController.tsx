import { RequestHandler } from 'express';
import WaitList from '../models/waitlist';

const addWaitList: RequestHandler = async (req, res) => {
	try {
		const obj_user = {user_ID: req.body.user_ID,};

		await WaitList.updateOne(
			{ subject_name: req.body.subject_name},
			{ $push: { user: obj_user}},
			{ new: true, upsert: true}
		).exec();
		res.json({result:"success"})
	} catch (e) {
        console.log(e.message);
        res.json({ result: 'fail' });
    }
};

export { addWaitList };
