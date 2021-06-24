import { RequestHandler } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const inviteToRepo: RequestHandler = async (req, res) => {
    try {
        if (req.body.gitID === null) throw new Error(`gitID is Empty`);
        if (req.body.gitLink === null) throw new Error(`gitLink is Empty`);
        const gitLinkSplit = req.body.gitLink.split('/');
        const gitRepoName = gitLinkSplit[gitLinkSplit.length - 1];
        const createResult = await axios({
            method: 'put',
            url: `https://api.github.com/repos/${process.env.ORG_NAME}/${gitRepoName}/collaborators/${req.body.gitID}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${process.env.GIT_TOKEN}`,
            },
            data: { permission: 'write' },
        });
        if (createResult.data.html_url === undefined) throw new Error('fail to invitation');
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
