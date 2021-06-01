import { RequestHandler } from 'express';
import { Team, User } from '../models';

const addMember: RequestHandler = async (req, res) => {
    try {
        const user = await User.findOne({ ID: req.body.userId });
        const team = await Team.findOne({ ID: req.body.teamId });

        if (user === null) throw new Error('Invalid User ID');
        if (team === null) throw new Error('Invalid Team ID');
        if (team.memberID.indexOf(user.ID) !== -1) throw new Error('The User already exists');
        if (team.state !== 'wait_member') throw new Error("Can't add a member to this team");
        const updatedTeam = await Team.findOneAndUpdate(
            { ID: team.ID },
            { $push: { memberID: user.ID } },
            { new: true }
        );
        const updatedUser = await User.findOneAndUpdate(
            { ID: user.ID },
            { $set: { teamID: team.ID } },
            { new: true }
        );
        res.status(200).json({
            success: true,
            team: updatedTeam,
            user: updatedUser,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: {
                code: error.name,
                message: error.message,
            },
        });
    }
};

export default addMember;
