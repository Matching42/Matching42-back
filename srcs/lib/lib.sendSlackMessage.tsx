import dotenv from 'dotenv';
import axios from 'axios';
import { findOneTeam } from './';
import { tSlackdata } from '../../@types/types.d';

dotenv.config();
const BOT_TOKENS = process.env.SLACK_BOT_TOKENS;
const channelID = process.env.SLACK_CHANNEL_ID;

const sendMsgPromise: (msg: string) => Promise<tSlackdata> = async (msg) => {
    return axios({
        method: 'post',
        url: 'https://slack.com/api/chat.postMessage',
        headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + BOT_TOKENS,
        },
        data: {
            text: msg,
            channel: channelID,
            link_names: true,
        },
    }).then((response) => response.data);
};

const sendSlackMessage: (teamID: string) => Promise<void> = async (teamID) => {
    const team = await findOneTeam(teamID);

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

    await sendMsgPromise(msg).then((slackResponse) => {
        if (!slackResponse) throw new Error(slackResponse);
    });
};

export default sendSlackMessage;
