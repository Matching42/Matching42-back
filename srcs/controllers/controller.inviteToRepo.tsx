import { RequestHandler } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { findOneTeam, findOneUser } from '../lib';

dotenv.config();

const checkTeamError = (team, userID) => {
    if (userID && !team.memberID.includes(userID))
        throw new Error(`user: ${userID} is not memeber of team : ${team.ID}`);
    if (team.state === 'end') throw new Error('Team already finished this subject');
    if (team.gitLink === null && team.gitLink === undefined)
        throw new Error('Team does not have gitLink');
};

const checkUserError = async (user) => {
    if (user.gitName === null || user.gitName === undefined)
        throw new Error('User does not have gitID');
    try {
        await axios.get(`https://api.github.com/users/${user.gitName}`);
    } catch (e) {
        throw new Error(`User:${user.gitName} does not Exist in github`);
    }
};

const sendInvitation = async (gitRepoName, memberID) => {
    const result = {};
    for (const userID of memberID) {
        try {
            const user = await findOneUser(userID);
            await checkUserError(user);
            await axios({
                method: 'put',
                url: `https://api.github.com/repos/${process.env.ORG_NAME}/${gitRepoName}/collaborators/${user.gitName}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `token ${process.env.GIT_TOKEN}`,
                },
                data: { permission: 'write' },
            });
        } catch (e) {
            result[userID] = e.message;
        }
    }
    if (Object.keys(result).length != 0) throw { name: 'Error', message: result };
};

const getGitName = async (gitLink) => {
    const gitRepoName = gitLink[gitLink.length - 1];
    try {
        await axios({
            method: 'get',
            url: `https://api.github.com/repos/${process.env.ORG_NAME}/${gitRepoName}`,
            headers: {
                Accept: 'application/vnd.github.v3+json',
                Authorization: `token ${process.env.GIT_TOKEN}`,
            },
        });
        return gitRepoName;
    } catch (e) {
        throw new Error(`team repository : ${gitRepoName} does not exist in github`);
    }
};

const inviteToRepo: RequestHandler = async (req, res) => {
    try {
        const team = await findOneTeam(req.params.teamID);
        checkTeamError(team, req.params.userID);
        const gitRepoName = await getGitName(team.gitLink.split('/'));
        const memberID: Array<string> =
            req.params.userID === undefined || req.params.userID === null
                ? team.memberID
                : [req.params.userID];
        await sendInvitation(gitRepoName, memberID);
        res.status(200).json({
            success: true,
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

export default inviteToRepo;
