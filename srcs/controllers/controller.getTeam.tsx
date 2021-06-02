import { RequestHandler } from 'express';
import { Team } from '../models';

//var limit: number = 5;

const getTeam: RequestHandler = async (req, res) => {
    try {
        const teamId = req.params.teamId;
        if (!teamId) {
            //if (req.params.limit !== limit)
            //  limit = req.params.limit;
            const allTeams = await Team.find({});
            res.status(200).json({
                success: true,
                data: allTeams
            });
        } else {
            const team = await Team.findOne({ ID: teamId});
            res.status(200).json({
                sucess: true,
                data: team
            });
        }
    } catch (e) {
        res.status(400).json({
            sucess: false,
            error: {
                code: e.name,
                message: e.message,
            }
        });
    };
};

export default getTeam;