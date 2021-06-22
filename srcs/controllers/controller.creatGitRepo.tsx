import { RequestHandler } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { Team } from '../models';

dotenv.config();

const checkError = (team) => {
    if (team === null) throw new Error('There is no such Team');
    if (team.subject === undefined) throw new Error('Team has no subject');
    if (team.ID === undefined) throw new Error('Team has no ID');
    if (team.gitLink) throw new Error('Team already has a gitLink');
};

const createGitRepo: RequestHandler = async (req, res) => {
    try {
        let team = await Team.findOne({ ID: req.params.teamID });
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
        await Team.updateOne(
            { ID: req.params.teamID },
            { gitLink: gitUrl },
            { runValidators: true }
        );
        team = await Team.findOne({ ID: req.params.teamID });
        res.json({
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
