import { RequestHandler } from 'express';
import { Team } from '../models';

const updateTeam: RequestHandler = async (req, res) => {
    try {
        const updateData = {};
        if (req.body.state) updateData['state'] = req.body.state;
        if (req.body.teamName) updateData['teamName'] = req.body.teamName;
        if (req.body.description) updateData['description'] = req.body.description;

        const team = await Team.findOneAndUpdate({ ID: req.params.teamID }, updateData, {
            runValidators: true,
            new: true,
        });
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

export default updateTeam;
