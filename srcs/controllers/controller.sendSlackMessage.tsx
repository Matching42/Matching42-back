import { RequestHandler } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { Team } from '../models';

dotenv.config();
const BOT_TOKENS = process.env.SLACK_BOT_TOKENS;
const channelID = process.env.SLACK_CHANNEL_ID;

const sendSlackMessage: RequestHandler = async (req, res) => {
    try {
        const team = await Team.findOne({ ID: req.body.teamID });
        if (team === null || team === undefined) throw new Error('This teamID does not exist.');

        let msg =
            team.subject +
            ' subject에 대한 팀매칭이 완료되었습니다!\n' +
            '팀장: @' +
            team.leaderID +
            '\n팀원 : ';
        for (let i = 0; i < team.memberID.length; i++) {
            msg += '@' + team.memberID[i] + ' ';
        }
        msg += '\nnotion link: ' + team.notionLink + '\ngithub link:  ' + team.gitLink + '\n';

        const sendMsg = await axios({
            method: 'post',
            url: 'https://slack.com/api/chat.postMessage',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${BOT_TOKENS}`,
            },
            data: {
                text: msg,
                channel: channelID,
                link_names: true,
            },
        });
        if (!sendMsg.data.ok) throw new Error(sendMsg.data.error);

        res.json({
            success: true,
            team: team,
            msg: msg,
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

export default sendSlackMessage;
