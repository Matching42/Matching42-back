import { RequestHandler } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { Team } from '../models';

dotenv.config();

const createGitRepo: RequestHandler = async (req, res) => {
    try {
        console.log(`token ${process.env.GIT_TOKEN}`);
        let team = await Team.findOne({ ID: req.params.teamid });
        if (team === null) throw new Error('no such team');
        if (team.subject === undefined || team.ID === undefined)
            throw new Error("team doesn't have subject or ID");
        const createResult = await axios({
            method: 'post',
            url: 'https://api.github.com/user/repos',
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
        const git_url = createResult.data.html_url;
        if (git_url === undefined) throw new Error('git creation failed');
        await Team.updateOne(
            { ID: req.params.teamid },
            { gitLink: git_url },
            { runValidators: true }
        );
        team = await Team.findOne({ ID: req.params.teamid });
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
