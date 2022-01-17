import dotenv from 'dotenv';
import axios from 'axios';
import { tSlackdata, tTeam } from '../../@types/types.d';
import { SubjectPDF } from '../controllers/controller.getSubjectPDF';

dotenv.config();
const BOT_TOKENS = process.env.SLACK_BOT_TOKENS;
const channelID = process.env.SLACK_CHANNEL_ID;

const sendMsgPromise: (msg: string, slackID: string) => Promise<tSlackdata> = async (
    msg,
    slackID
) => {
    return axios({
        method: 'post',
        url: 'https://slack.com/api/chat.postMessage',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${BOT_TOKENS}`,
        },
        data: {
            text: msg,
            channel: slackID,
            link_names: true,
        },
    }).then((response) => response.data);
};

const sendSlackMessage: (team: tTeam, slackID: string[]) => Promise<boolean> = async (
    team,
    slackID
) => {
    try {
        const msg = `안녕하세요! Matching42입니다!
        신청하신 ${team.subject}에 대한 팀매칭이 완료 되었습니다.
        서로 연락하여 과제를 진행해보세요!
        
        팀장 : @${team.leaderID}
        팀원 : @${team.memberID.join(' @')}
        
        여러분의 노션과 깃허브입니다. 자유롭게 사용해주세요(노션은 우측 상단의 [수정하기]를 눌러야 사용 가능합니다)
        notion link : ${team.notionLink}
        github link : ${team.gitLink}
        
        동료학습에 도움이 될만한 자료입니다. 마음껏 사용해주세요.
        동료학습가이드 : https://docs.google.com/document/d/18q7lZ1tqmo1gp8c2iok1VLeprp001HFGBJOWofdmJkQ/edit?usp=sharing
        Matching42사이트 설명: https://docs.google.com/document/d/1bSPBNjGKtJO4lWR8GtsqEWZEehb8ee4hJgJ45sjN65Q/edit?usp=sharing
        
        Matching42: https://matching42.com
        subject Link: ${SubjectPDF[team.subject]}`;
        

        for (let i = 0; i < slackID.length; i++) {
            await sendMsgPromise(msg, slackID[i]).then((slackResponse) => {
                if (slackResponse.ok === false) throw new Error(`slack API ${slackResponse.error}`);
            });
        }
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export default sendSlackMessage;
