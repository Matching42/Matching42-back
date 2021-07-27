import { RequestHandler } from 'express';
import { Team } from '../models';

const getTeam: RequestHandler = async (req, res) => {
    try {
        const teamID = req.params.teamID;
        if (teamID === undefined || teamID === null) {
            let limit = 5;
            let page = 0;

            if (req.query.limit) {
                limit = parseInt(req.query.limit as string);
            }
            if (req.query.page) {
                page = parseInt(req.query.page as string);
            }
            let allTeams = await Team.find({});
            if ((req.query.progress as string) === 'true') {
                for (let i = allTeams.length - 1; i >= 0; i--) {
                    if (allTeams[i].state === 'end') {
                        allTeams.splice(i, 1);
                    }
                }
            }
            if (req.query.subject) {
                for (let i = allTeams.length - 1; i >= 0; i--) {
                    if (allTeams[i].subject !== req.query.subject) {
                        allTeams.splice(i, 1);
                    }
                }
            }
            if (
                req.query.page !== undefined ||
                req.query.limit !== undefined ||
                req.query.page !== null ||
                req.query.limit !== null
            ) {
                allTeams = allTeams.slice(limit * page, limit * page + limit);
            }
            res.status(200).json({
                success: true,
                data: allTeams,
            });
        } else {
            const team = await Team.findOne({ ID: teamID });
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
