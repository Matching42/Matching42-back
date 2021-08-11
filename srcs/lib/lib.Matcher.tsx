import { Team } from '../models';
import { Waitlist } from '../models';
import { User } from '../models';
import { findOneUser, findOneTeam } from '../lib';
import { match } from 'assert/strict';

const makeTeam = async (subject: string, state: string, user, teamID): Promise<void> => {
    const team = new Team({
        ID: teamID,
        leaderID: user[0],
        memberID: user,
        subject: subject,
        state: state,
        startDate: Date.now(),
        notionLink: null,
        gitLink: null,
        teamName: teamID,
    });
    await team.save().reject(new Error(`Error: save new team on DB fail`));
};

const updateUser = (userID: string[], teamName: string) => {
    userID.forEach(async (Id) => {
        await User.updateOne({ ID: Id }, { $set: { waitMatching: null, teamID: teamName } }).reject(
            new Error(`Error: update user information on DB fail`)
        );
    });
};

const updateWaitlist = async (list, userList): Promise<void> => {
    userList.forEach(async (user) => {
        user.userInfo = undefined;
        user.cluster = undefined;
        await Waitlist.updateOne(
            { subjectName: list.subjectName },
            { $pull: { user: user } }
        ).reject(new Error(`Error: update waitlist on DB fail`));
    });
};

const genTeamName = (subject: string, user: string): string => {
    return `${subject}_${user}_${Date.now()}`;
};

const getUserInfo = async (user): Promise<void> => {
    try {
        user.userInfo = findOneUser(user);
        user.cluster = user.userInfo.cluster;
        if (user.cluster === null) user.cluster = '개포';
        //매칭을 신청한 유저가 종료되지 않은 팀에 속해 있다면 에러를 출력
        if (user.teamID) {
            user.userInfo.team = findOneTeam(user.userInfo.teamID);
            if (user.userInfo.team.state !== 'end')
                throw new Error(`Error: ${user.ID} is already in ${user.userInfo.teamID}`);
        }
    } catch (error) {
        console.error(error);
    }
};

const matching = async (list): Promise<void> => {
    try {
        while (list.user.length > 0) {
            let userID: string[];
            let teamName: string;
            // 매칭 할 인원이 총 세명일 때
            // 매칭할 인원의 선호 클러스터가 2 : 2 일 때
            if (
                list.user.length === 3 ||
                (list.user.filter((user) => user.cluster === '개포').length === 2 &&
                    list.user.filter((user) => user.cluster === '서초').length === 2)
            ) {
                userID = list.user.slice(0, 3).map((user) => user.userID);
                teamName = genTeamName(list.subjectName, userID[0]);
                makeTeam(list.subjectName, 'progress', userID, teamName);
                updateUser(userID, teamName);
                updateWaitlist(list, list.user.slice(0, 3));
                list.user.splice(0, 3);
            }
            //매칭 할 인원이 1, 2명 일때
            else if (list.user.length === 2 || list.user.length === 1) {
                userID = list.user.map((user) => user.userID);
                teamName = genTeamName(list.subjectName, userID[0]);
                makeTeam(list.subjectName, 'wait_member', userID, teamName);
                updateUser(userID, teamName);
                updateWaitlist(list, list.user);
                list.user = [];
            }
            // 선호 클러스터 개포인 인원 매칭
            else if (list.user.filter((user) => user.cluster === '개포').length >= 3) {
                userID = list.user
                    .filter((user) => user.cluster === '개포')
                    .slice(0, 3)
                    .map((user) => user.userID);
                teamName = genTeamName(list.subjectName, userID[0]);
                makeTeam(list.subjectName, 'progress', userID, teamName);
                updateUser(userID, teamName);
                updateWaitlist(
                    list,
                    list.user.filter((user) => user.cluster === '개포').slice(0, 3)
                );
                for (const id of userID) {
                    list.user = list.user.filter((user) => user.userID !== id);
                }
            }
            // 서초 클러스터 매칭
            else if (list.user.filter((user) => user.cluster === '서초').length >= 3) {
                userID = list.user
                    .filter((user) => user.cluster === '서초')
                    .slice(0, 3)
                    .map((user) => user.userID);
                teamName = genTeamName(list.subjectName, userID[0]);
                makeTeam(list.subjectName, 'progress', userID, teamName);
                updateUser(userID, teamName);
                updateWaitlist(
                    list,
                    list.user.filter((user) => user.cluster === '서초').slice(0, 3)
                );
                for (const id of userID) {
                    list.user = list.user.filter((user) => user.userID !== id);
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
};

const Matcher = async (): Promise<void> => {
    const matchingSubject = await User.find().distinct('waitMatching');
    console.log(matchingSubject);
    for (const subject of matchingSubject) {
        if (subject === null)
            continue;
        let matchingUser = await User.find().where('waitMatching', subject).sort('cluster');
        console.log(matchingUser);
    }
    //let allWaitlist = await Waitlist.find({}).reject(new Error(`Error: find Waitlist on DB fail`));
    //if (allWaitlist === null || allWaitlist === undefined) throw new Error('Wailist not found');
    //user 배열에 원소가 있는지로 필터링
    //매칭해야할 인원이 있는 서브젝트만 남음
    // allWaitlist = allWaitlist.filter((list) => {
    //     return !(list.user === null || list === undefined);
    // });
    // //각 waitlist에 각 user별로 선호 클러스터 요청하기
    // for (const list of allWaitlist) {
    //     for (const user of list.user) {
    //         await getUserInfo(user);
    //     }
    // }
    // for (const list of allWaitlist) {
    //     await matching(list);
    // }
};

export default Matcher;
