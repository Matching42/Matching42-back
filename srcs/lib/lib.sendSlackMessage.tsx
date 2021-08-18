import dotenv from 'dotenv';
import axios from 'axios';
import { findOneTeam } from './';
import { tSlackdata, tTeam } from '../../@types/types.d';

dotenv.config();
const BOT_TOKENS = process.env.SLACK_BOT_TOKENS;
const channelID = process.env.SLACK_CHANNEL_ID;

const sendMsgPromise: (msg: string) => Promise<tSlackdata> = async (msg) => {
    return axios({
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
    }).then((response) => response.data);
};

const sendSlackMessage: (team: tTeam) => Promise<boolean> = async (team) => {
    try {
        const msg = `${team.subject} subject에 대한 팀매칭이 완료 되었습니다.
        팀장 : @${team.leaderID}
        팀원 : @${team.memberID.join(' @')}
        notion link : ${team.notionLink}
        github link : ${team.gitLink}`;

        await sendMsgPromise(msg).then((slackResponse) => {
            if (slackResponse.ok === false) {
                console.error(`slack API ${slackResponse.error}`);
                return false;
            }
        });

        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export default sendSlackMessage;
