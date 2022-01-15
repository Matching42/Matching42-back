import { RequestHandler } from 'express';
import { findOneTeam, findOneUser } from '../lib';
import axios from 'axios';
import dotenv from 'dotenv';
import getGitName from '../lib/lib.getGitName';

dotenv.config();

const checkGitInvite: RequestHandler = async (req, res) => {
    try {
        const user = await findOneUser(req.params.userID);
        const team = await findOneTeam(user.teamID);
        const gitRepoName = await getGitName(team.gitLink.split('/'));
        await axios.get(
            `https://api.github.com/repos/${process.env.ORG_NAME}/${gitRepoName}/collaborators/${user.gitName}`,
            {
                headers: {
                    Accept: 'application/vnd.github.v3+json',
                    Authorization: `token ${process.env.GIT_TOKEN}`,
                },
            }
        );
        res.status(200).json({
            success: true,
            exist: true,
        });
    } catch (e) {
        if (e.response && e.response.status === 404) {
            res.status(200).json({
                success: true,
                exist: false,
            });
            return;
        }
        res.status(400).json({
            success: false,
            error: {
                code: e.name,
                message: e.message,
            },
        });
    }
};

export default checkGitInvite;
