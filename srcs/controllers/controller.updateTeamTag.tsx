import { RequestHandler } from 'express';
import { Team } from '../models';

const updateTeamTag: RequestHandler = async (req, res) => {
    try {
        if (!(req.body.tag instanceof Array)) throw new Error('tag value is not Array');
        const team = await Team.findOneAndUpdate(
            { ID: req.params.teamID },
            { tag: req.body.tag },
            {
                runValidators: true,
                new: true,
            }
        );
        if (team === null || team === undefined) throw new Error('Invalid Team ID');
        res.status(200).json({
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

export default updateTeamTag;
