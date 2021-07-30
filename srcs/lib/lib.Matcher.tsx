import { Team } from '../models';
import { Waitlist } from '../models';
import { User } from '../models';

const makeTeam = async (subject: string, state: string, user, teamID): Promise<void> => {
    await new Team({
        ID: teamID,
        leaderID: user[0],
        memberID: [user[1], user[2]],
        subject: subject,
        state: state,
        startDate: Date.now(),
        notionLink: null,
        gitLink: null,
        teamName: teamID,
    }).save;
};

const updateUser = async (userID: string[], teamName: string): Promise<void> => {
    await User.updateMany({ ID: userID }, { $set: { waitMatching: null, teamID: teamName } });
};

const updateWaitlist = async (list, userList): Promise<void> => {
    await Waitlist.updateMany({ subject: list.subject }, { $pop: { user: userList } });
};

const Matcher = async (): Promise<void> => {
    let allWaitlist = await Waitlist.find({});
    if (allWaitlist === null || allWaitlist === undefined) throw new Error('Wailist not found');
    //user 배열에 원소가 있는지로 필터링
    //매칭해야할 인원이 있는 서브젝트만 남음
    allWaitlist = allWaitlist.filter((list) => {
        return list.user[0];
    });
    allWaitlist.forEach((list) => {
        //각 waitlist에 각 user별로 선호 클러스터 요청하기
        list.user.forEach(async (user) => {
            user.cluster = await User.findOne({ ID: user.userID });
            if (user.cluster === null) user.cluster = '개포';
        });
        while (list.user.length > 0) {
            let userID: string[];
            let teamName: string;
            //매칭 할 인원이 총 세명일 때
            //매칭할 인원의 선호 클러스터가 2 : 2 일 때
            if (
                list.user.length === 3 ||
                (list.user.filter((user) => user.cluster === '개포').length === 2 &&
                    list.user.filter((user) => user.cluster === '서초').length === 2)
            ) {
                userID = list.user.slice(0, 3).map((user) => user.userID);
                teamName = `${list.subject}_${userID[0]}_${Date.now()}`;
                makeTeam(list.subject, 'progress', userID, teamName);
                updateUser(userID, teamName);
                updateWaitlist(list, list.user.slice(0, 3));
                list.user.splice(0, 3);
            }
            // 매칭 할 인원이 1, 2명 일때
            else if (list.user.length === 2 || list.user.length === 1) {
                userID = list.user.map((user) => user.userID);
                teamName = `${list.subject}_${userID[0]}_${Date.now()}`;
                makeTeam(list.subject, 'wait_member', userID, teamName);
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
                teamName = `${list.subject}_${userID[0]}_${Date.now()}`;
                makeTeam(list.subject, 'progress', userID, teamName);
                updateUser(userID, teamName);
                updateWaitlist(
                    list,
                    list.user.filter((user) => user.cluster === '개포').slice(0, 3)
                );
                userID.forEach((ID) =>
                    list.splice(
                        list.user.findIndex((user) => user.userID === ID),
                        1
                    )
                );
            }
            // 서초 클러스터 매칭
            else if (list.user.filter((user) => user.cluster === '서초').length >= 3) {
                userID = list.user
                    .filter((user) => user.cluster === '서초')
                    .slice(0, 3)
                    .map((user) => user.userID);
                teamName = `${list.subject}_${userID[0]}_${Date.now()}`;
                makeTeam(list.subject, 'progress', userID, teamName);
                updateUser(userID, teamName);
                updateWaitlist(
                    list,
                    list.user.filter((user) => user.cluster === '서초').slice(0, 3)
                );
                userID.forEach((ID) =>
                    list.splice(
                        list.user.findIndex((user) => user.userID === ID),
                        1
                    )
                );
            }
        }
    });
};

export default Matcher;
