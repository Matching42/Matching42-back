import { RequestHandler } from 'express';
import { Team } from '../models';

const checkError = (team, teamID, state) => {
    if (state === undefined) throw new Error('state value is missing');
    else if (team === null)
        throw new Error(`teamID params :'${teamID}'. no such teamID in database.`);
};

const updateTeamState: RequestHandler = async (req, res) => {
    try {
        let team = await Team.findOne({ ID: req.params.teamID });
        checkError(team, req.params.teamID, req.body.state);
        await Team.updateOne(
            { ID: req.params.teamID },
            { state: req.body.state },
            { runValidators: true }
        );
        team = await Team.findOne({ ID: req.params.teamID });
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
