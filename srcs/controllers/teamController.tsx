import { RequestHandler } from 'express';
import Team from '../models/team';

const updateTeam: RequestHandler = async (req, res) => {
    try {
        await Team.updateOne(
            { _id: req.params.teamid },
            { status: req.body.status },
            { runValidators: true }
        );
        res.json({ result: 'success' });
    } catch (e) {
        console.log(e.message);
        res.json({ result: 'fail' });
    }
};

export { updateTeam };
