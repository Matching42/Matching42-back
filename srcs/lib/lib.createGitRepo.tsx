import axios from 'axios';
import dotenv from 'dotenv';
import { logger } from '../config/winston';

dotenv.config();

const createGitRepo: (subject: string, ID: string) => Promise<string | null> = async (
    subject,
    ID
) => {
    try {
        const createResult = await axios({
            method: 'post',
            url: `https://api.github.com/orgs/${process.env.ORG_NAME}/repos`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${process.env.GIT_TOKEN}`,
            },
            data: {
                name: `Matching42_${subject}_${ID}`,
                auto_init: true,
                private: false,
            },
        });
        return createResult.data.html_url;
    } catch (e) {
        logger.error(e.message);
        return null;
    }
};

export default createGitRepo;
