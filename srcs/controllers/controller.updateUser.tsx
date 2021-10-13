import { RequestHandler } from 'express';
import { User } from '../models';

const updateUser: RequestHandler = async (req, res) => {
    try {
        const updateData = {};
        if (req.body.teamID !== undefined) updateData['teamID'] = req.body.teamID;
        if (req.body.waitMatching !== undefined) updateData['waitMatching'] = req.body.waitMatching;
        if (req.body.gitName !== undefined) updateData['gitName'] = req.body.gitName;
        if (req.body.cluster !== undefined) updateData['cluster'] = req.body.cluster;
        if (req.body.deadline !== undefined) updateData['deadline'] = req.body.deadline;

        const updatedUser = await User.findOneAndUpdate(
            {
                ID: req.params.userID,
            },
            updateData,
            { runValidators: true, new: true }
        );
        res.status(200).json({
            success: true,
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

export default updateUser;
