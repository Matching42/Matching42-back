import { RequestHandler } from 'express';
import { findAllTeam, findOneTeam } from '../lib';

const getTeam: RequestHandler = async (req, res) => {
    try {
        const teamID = req.params.teamID;
        //요청이 /team으로 들어오는 경우 teamID는 undefined다.
        if (teamID === undefined) {
            //parseInt는 NaN, undefinded, null이 들어올 경우 NaN을 반환하고
            //isNaN은 NaN일 경우 true를 반환한다.
            const limit = isNaN(parseInt(req.query.limit as string))
                ? 5
                : parseInt(req.query.limit as string);
            const page = isNaN(parseInt(req.query.page as string))
                ? 0
                : parseInt(req.query.page as string);
            let allTeams = await findAllTeam();
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
            //페이지네이션을 하겠다는 신호를 page, limit 쿼리중 하나라도 요청에 포함해서 보냈느냐로 판단한다.
            if (req.query.limit !== undefined || req.query.page !== undefined) {
                allTeams = allTeams.slice(limit * page, limit * page + limit);
            }
            res.status(200).json({
                success: true,
                data: allTeams,
            });
        }
        //요청이 /team/으로 들어온 경우 teamID는 null이다.
        else {
            const team = await findOneTeam(teamID);
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
