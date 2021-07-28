import { RequestHandler } from 'express';
import { Team } from '../models';

const getTeam: RequestHandler = async (req, res) => {
    try {
        const teamID = req.params.teamID;
        if (!teamID) {
            const limit =
                req.query.limit === undefined || req.query.limit === null
                    ? 5
                    : parseInt(req.query.limit as string);
            const page =
                req.query.page === undefined || req.query.page === null
                    ? 0
                    : parseInt(req.query.page as string);
            const allTeams = await Team.find({});
            if ((req.query.progress as string) === 'true') {
                allTeams = allTeams.filter((team) => {
                    return team.state !== 'end';
                });
            }
            if (req.query.subject) {
                allTeams = allTeams.filter((team) => {
                    return team.subject === req.query.subject;
                });
            }
            if (!req.query.page && !req.query.limit) {
                res.status(200).json({
                    success: true,
                    data: allTeams,
                });
                return;
            }
            const pageTeams: Array<string> = [];
            for (let i = 0; i < limit && allTeams[i + limit * page]; i++)
                pageTeams.push(allTeams[i + limit * page]);
            res.status(200).json({
                success: true,
                data: pageTeams,
            });
            return;
        } else {
            const team = await Team.findOne({ ID: teamID });
            res.status(200).json({
                sucess: true,
                data: team,
            });
            return;
        }
    } catch (e) {
        res.status(400).json({
            sucess: false,
            error: {
                code: e.name,
                message: e.message,
            },
        });
        return;
    }
};

export default getTeam;
