import { RequestHandler } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { Team, User } from '../models';

dotenv.config();

const checkTeamError = (team, teamID, userID) => {
    if (team === null || team === undefined) throw new Error('There is no such Team');
    if (userID && !team.memberID.includes(userID))
        throw new Error(`user: ${userID} is not memeber of team : ${teamID}`);
    if (team.state === 'end') throw new Error('Team already finished this subject');
    if (teamID === null || teamID === undefined) throw new Error('teamID is Required');
    if (team.gitLink === null && team.gitLink === undefined)
        throw new Error('Team does not have gitLink');
};

const checkUserError = async (user) => {
    if (user === null || user === undefined) throw new Error('no such User');
    if (user.gitName === null || user.gitName === undefined)
        throw new Error('User does not have gitID');
    await isGitNameExist(user.gitName);
};

const checkResult = async (result, memberID) => {
    const eMessage = {};

    for (const i of memberID) {
        if (!result[i].success) {
            eMessage[i] = result[i].error.message;
        }
    }

    if (Object.keys(eMessage).length != 0) throw { name: 'Error', message: eMessage };
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
        throw new Error(`team repository : ${gitRepoName} does not exist in github`);
    }
};

const isGitNameExist = async (gitName) => {
    try {
        await axios.get(`https://api.github.com/users/${gitName}`);
    } catch (e) {
        throw new Error(`User:${gitName} does not Exist in github`);
    }
};

const sendInvitation = async (gitRepoName, memberID) => {
    const result = {};
    for (const userID of memberID) {
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
        let gitRepoName = team.gitLink.split('/');
        gitRepoName = gitRepoName[gitRepoName.length - 1];
        await isLinkExist(gitRepoName);
        const memberID: Array<string> =
            req.params.userID === undefined ? team.memberID : [req.params.userID];
        const result = await sendInvitation(gitRepoName, memberID);
        await checkResult(result, memberID);
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
