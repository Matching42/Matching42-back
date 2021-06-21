import { RequestHandler } from 'express';
import { Team } from '../models';

const getTeam: RequestHandler = async (req, res) => {
    try {
        const teamId = req.params.teamId;
        if (!teamId) {
            let limit = 5;
            let page = 0;
            if (req.query.limit) {
                limit = parseInt(req.query.limit as string);
            }
            if (req.query.page) {
                page = parseInt(req.query.page as string);
            }
            const allTeams = await Team.find({});
            if (!req.query.page && !req.query.limit) {
                res.status(200).json({
                    success: true,
                    data: allTeams,
                });
            }
            const pageTeams: Array<string> = [];
            for (let i = 0; i < limit && allTeams[i + limit * page]; i++)
                pageTeams.push(allTeams[i + limit * page]);
            res.status(200).json({
                success: true,
                data: pageTeams,
            });
        } else {
            const team = await Team.findOne({ ID: teamId });
            res.status(200).json({
                sucess: true,
                data: team,
            });
        }
    } catch (e) {
        res.status(400).json({
            sucess: false,
            error: {
                code: e.name,
                message: e.message,
            },
        });
    }
};

export default getTeam;
