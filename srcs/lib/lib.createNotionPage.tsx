import dotenv from 'dotenv';
import axios from 'axios';
import { Team } from '../models';
import { findOneTeam } from '../lib';

dotenv.config();

const hostAddress = 'https://www.notion.so/';

const createNotionPage = async (teamID: string): Promise<void> => {
    const database_id: string = process.env.NOTION_DATABASE_ID || '';
    const team = await findOneTeam(teamID);
    const pageObject = {
        parent: {
            database_id,
        },
        properties: {
            Page: {
                type: 'title',
                title: [
                    {
                        text: {
                            content: team.teamName,
                        },
                    },
                ],
            },
            Subject: {
                type: 'select',
                select: {
                    name: team.subject,
                },
            },
            Member: {
                type: 'rich_text',
                rich_text: [
                    {
                        text: {
                            content: team.memberID.join(', '),
                        },
                    },
                ],
            },
        },
        children: [
            {
                object: 'block',
                type: 'heading_3',
                heading_3: {
                    text: [
                        {
                            type: 'text',
                            text: {
                                content: '스터디 가이드 템플릿',
                                link: {
                                    url: 'https://www.notion.so/36f7e104c2fd4640b2d10a8b938ae5e3',
                                },
                            },
                        },
                    ],
                },
            },
            {
                object: 'block',
                type: 'heading_3',
                heading_3: {
                    text: [
                        {
                            type: 'text',
                            text: {
                                content: `팀원: ${team.memberID.join(', ')}`,
                            },
                        },
                    ],
                },
            },
        ],
    };
    const createPageRes = await axios({
        method: 'post',
        url: 'https://api.notion.com/v1/pages',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
            'Notion-Version': '2021-05-13',
        },
        data: pageObject,
    });
    const notionPageUrl = hostAddress + createPageRes.data.id.replace(/-/g, '');
    await Team.updateOne({ ID: team.ID }, { notionLink: notionPageUrl }, { runValidators: true });
};

export default createNotionPage;
