import dotenv from 'dotenv';
import axios from 'axios';
import { logger } from '../config/winston';

dotenv.config();

const createNotionPage = async (
    teamName: string,
    teamSubject: string,
    teamMember: string[]
): Promise<string | null> => {
    try {
        const database_id: string = process.env.NOTION_DATABASE_ID || '';
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
                                content: teamName,
                            },
                        },
                    ],
                },
                Subject: {
                    type: 'select',
                    select: {
                        name: teamSubject,
                    },
                },
                Member: {
                    type: 'rich_text',
                    rich_text: [
                        {
                            text: {
                                content: teamMember.join(', '),
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
        const notionPageUrl = `https://www.notion.so/${createPageRes.data.id.replace(/-/g, '')}`;
        return notionPageUrl;
    } catch (error) {
        logger.error(error.message);
        return null;
    }
};

export default createNotionPage;
