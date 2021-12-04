import { RequestHandler } from 'express';
import { findOneUser, findOneTeam } from '../lib';
import { Team, User } from '../models';
import axios from 'axios';

const errorCheck = (user, team) => {
    if (team.memberID.indexOf(user.ID) !== -1) throw new Error('The User already exists');
    if (team.state !== 'wait_member') throw new Error("Can't add a member to this team");
};

const addUser2Team: RequestHandler = async (req, res) => {
    try {
        const user = await findOneUser(req.body.userID);
        const team = await findOneTeam(req.body.teamID);
        errorCheck(user, team);

        await axios.get(`https://api.github.com/users/${req.body.gitName}`).catch((err) => {
            throw new Error(`github API ${err.message}`);
        });

        const updatedTeam = await Team.findOneAndUpdate(
            { ID: team.ID },
            { $push: { memberID: user.ID } },
            { new: true }
        );
        const updatedUser = await User.findOneAndUpdate(
            { ID: user.ID },
            { $set: { teamID: team.ID, gitName: req.body.gitName } },
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

export default addUser2Team;
