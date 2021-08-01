import { RequestHandler } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { Team } from '../models';
import { findOneTeam } from '../lib';

dotenv.config();

const checkError = (team) => {
    if (team === null) throw new Error('There is no such Team');
    if (team.subject === undefined) throw new Error('Team has no subject');
    if (team.ID === undefined) throw new Error('Team has no ID');
    if (team.gitLink) throw new Error('Team already has a gitLink');
    if (team.state === 'end') throw new Error('Team already finished this subject');
};

const createGitRepo: RequestHandler = async (req, res) => {
    try {
        let team = await findOneTeam(req.params.teamID);
        checkError(team);
        const createResult = await axios({
            method: 'post',
            url: `https://api.github.com/orgs/${process.env.ORG_NAME}/repos`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${process.env.GIT_TOKEN}`,
            },
            data: {
                name: `Matching42_${team.subject}_${team.ID}`,
                auto_init: true,
                private: true,
            },
        });
        const gitUrl = createResult.data.html_url;
        if (gitUrl === undefined) throw new Error('git Repository creation failed');
        team = await Team.findOneAndUpdate(
            { ID: req.params.teamID },
            { gitLink: gitUrl },
            { runValidators: true, new: true }
        );
        res.status(200).json({
            success: true,
            team,
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

export default createGitRepo;
