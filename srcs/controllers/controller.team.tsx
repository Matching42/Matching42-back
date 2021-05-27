import { RequestHandler } from 'express';
import Team from '../models/model.team';

const updateTeam: RequestHandler = async (req, res) => {
    try {
        const team = await Team.findOne({ ID: req.params.teamid });
        if (req.body.state === undefined || team === null)
            throw new Error('no such team id or state');
        await Team.updateOne(
            { ID: req.params.teamid },
            { state: req.body.state },
            { runValidators: true }
        );
        res.json({
            success: true,
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

export default updateTeam;
