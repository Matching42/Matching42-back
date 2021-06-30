import { RequestHandler } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { Team, User } from '../models';

dotenv.config();

const checkTeamError = (team, teamID, userID) => {
    if (!team) throw new Error('There is no such Team');
    if (userID && !team.memberID.includes(userID))
        throw new Error(`user: ${userID} is not memeber of team : ${teamID}`);
    if (team.state === 'end') throw new Error('Team already finished this subject');
    if (!teamID) throw new Error('teamID is undefined');
    if (!team.gitLink) throw new Error('Team does not have gitLink');
};

const checkUserError = async (user) => {
    if (!user) throw new Error('no such User');
    if (!user.gitName) throw new Error('User does not have gitID');
    if (!(await isUserExist(user.gitName)))
        throw new Error(`User:${user.gitName} does not Exist in github`);
};

const checkResult = async (result, memberID) => {
    let isOK = true;
    let eMessage = {};

    for (let i of memberID) {
        if (!result[i].success) {
            eMessage[i] = result[i].error.message;
            isOK = false;
        }
    }

    if (!isOK) throw { name: 'Error', message: eMessage };
};

const isLinkExist = async (gitRepoName) => {
    try {
        await axios({
            method: 'get',
            url: `https://api.github.com/repos/${process.env.ORG_NAME}/${gitRepoName}`,
            headers: {
                Accept: 'application/vnd.github.v3+json',
                Authorization: `token ${process.env.GIT_TOKEN}`,
            },
        });
    } catch (e) {
        return false;
    }
    return true;
};

const isUserExist = async (gitName) => {
    try {
        await axios.get(`https://api.github.com/users/${gitName}`);
        return true;
    } catch (e) {
        return false;
    }
};

const sendInvitation = async (gitRepoName, memberID) => {
    const result = {};
    for (let userID of memberID) {
        try {
            const user = await User.findOne({ ID: userID });
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
            result[userID] = {
                userID: userID,
                success: true,
            };
        } catch (e) {
            result[userID] = {
                userID: userID,
                success: false,
                error: {
                    code: e.name,
                    message: e.message,
                },
            };
        }
    }
    return result;
};

const inviteToRepo: RequestHandler = async (req, res) => {
    try {
        const team = await Team.findOne({ ID: req.params.teamID });
        checkTeamError(team, req.params.teamID, req.params.userID);
        const gitLinkSplit = team.gitLink.split('/');
        const gitRepoName = gitLinkSplit[gitLinkSplit.length - 1];
        if (!(await isLinkExist(gitRepoName)))
            throw new Error(`team repository : ${gitRepoName} does not exist in github`);
        let memberID: Array<string> =
            req.params.userID === undefined ? team.memberID : [req.params.userID];

        const result = await sendInvitation(gitRepoName, memberID);
        await checkResult(result, memberID);
        res.json({
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
