import { RequestHandler } from 'express';
import { Team, User } from '../models';

const endTeam: (memberID: Array<string>, teamID: string) => boolean = (memberID, teamID) => {
    try {
        memberID.forEach(async (id) => {
            await User.updateOne(
                { ID: id },
                { teamID: null, $push: { endTeamList: teamID } },
                { new: true }
            );
        });
        return true;
    } catch (e) {
        return false;
    }
};

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

        if (req.body.state === 'end' && !endTeam(team.memberID, req.params.teamID))
            throw new Error('Member State Change Failed');

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
