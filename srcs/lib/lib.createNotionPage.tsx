import { Client } from '@notionhq/client';
import dotenv from 'dotenv';
import { Team } from '../models';

dotenv.config();

const hostAddress = 'https://www.notion.so/';
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const createNotionPage = async (teamID: string): Promise<void> => {
    const database_id: string = process.env.NOTION_DATABASE_ID || '';
    const team = await Team.findOne({ ID: teamID });
    const createPageRes = await notion.pages.create({
        parent: {
            database_id,
        },
        properties: {
            Page: {
                type: 'title',
                title: [
                    {
                        type: 'text',
                        text: {
                            content: team.teamName,
                        },
                    },
                ],
            },
            Subject: {
                type: 'select',
                select: {
                    id: '',
                    color: 'default',
                    name: team.subject,
                },
            },
            Member: {
                type: 'rich_text',
                rich_text: [
                    {
                        type: 'text',
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
                id: 'default',
                heading_3: {
                    text: [
                        {
                            plain_text: '스터디 가이드 템플릿',
                            href: 'https://www.notion.so/36f7e104c2fd4640b2d10a8b938ae5e3',
                            annotations: {
                                bold: false,
                                italic: false,
                                strikethrough: false,
                                underline: false,
                                code: false,
                                color: 'default',
                            },
                            type: 'text',
                            text: {
                                content: '스터디 가이드 템플릿',
                                link: {
                                    type: 'url',
                                    url: 'https://www.notion.so/36f7e104c2fd4640b2d10a8b938ae5e3',
                                },
                            },
                        },
                    ],
                },
                created_time: '',
                last_edited_time: '',
                has_children: false,
            },
            // {
            //     object: 'block',
            //     type: 'heading_3',
            //     heading_3: {
            //         text: [
            //             {
            //                 type: 'text',
            //                 text: {
            //                     content: `팀원: ${team.memberID.join(', ')}`,
            //                 },
            //             },
            //         ],
            //     },
            // },
        ],
    });
    const notionPageUrl = hostAddress + createPageRes.id.replace(/-/g, '');
    await Team.updateOne({ ID: team.ID }, { notionLink: notionPageUrl }, { runValidators: true });
};

export default createNotionPage;
