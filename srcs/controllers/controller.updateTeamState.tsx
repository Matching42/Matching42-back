import { RequestHandler } from 'express';
import { Team } from '../models';

const updateTeamState: RequestHandler = async (req, res) => {
    try {
        let team = await Team.findOne({ ID: req.params.teamId });
        if (req.body.state === undefined || team === null)
            throw new Error('no such team id or state');
        await Team.updateOne(
            { ID: req.params.teamId },
            { state: req.body.state },
            { runValidators: true }
        );
        team = await Team.findOne({ ID: req.params.teamId });
        res.json({
            success: true,
            team: team,
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

export default updateTeamState;
