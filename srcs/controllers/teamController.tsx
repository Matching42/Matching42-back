import { RequestHandler } from 'express';
import Team from '../models/TeamDB';

const updateTeam: RequestHandler = async (req, res) => {
    if (req.body.state === undefined) {
        console.log('state undefined');
        res.json({ result: 'fail' });
        return;
    }
    try {
        console.log(req.params.teamid);
        await Team.updateOne(
            { ID: req.params.teamid },
            { state: req.body.state },
            { runValidators: true }
        );
        res.json({ result: 'success' });
    } catch (e) {
        console.log(e.message);
        res.json({ result: 'fail' });
    }
};

export { updateTeam };
