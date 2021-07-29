import { Team } from '../models';
import { Waitlist } from '../models';
import { User } from '../models';

const makeTeam = async (subject: string, state: string, users): Promise<void> => {
    await new Team({
        ID: `${subject}_${users[0]}_${Date.now()}`,
        leaderID: users[0].userID,
        memberID: [users.userID, users.userID],
        subject: subject,
        state: state,
        startDate: Date.now(),
        notionLink: null,
        gitLink: null,
        teamName: `${subject}_${users[0]}_${Date.now}`,
    }).save;
};

const Matcher = async (): Promise<void> => {
    let allWaitlist = await Waitlist.find({});
    if (allWaitlist === null || allWaitlist === undefined) throw new Error('Wailist not found');
    //user 배열에 원소가 있는지로 필터링
    //매칭해야할 인원이 있는 서브젝트만 남음
    allWaitlist = allWaitlist.filter((list) => {
        return list.user[0];
    });
    //각 waitlist에 각 user별로 선호 클러스터 요청하기
    allWaitlist.forEach(list => {
        list.user.forEach(async (user) => {
            user.cluster = await User.findOne({ ID: user.userID })
            if (user.cluster === null) user.cluster = '개포';
            });
        }
    );
        while (matchUser.length) {
            if (
                matchUser.length === 3 ||
                (matchUser.filter({ cluster: '개포' }).length === 2 &&
                    matchUser.filter({ cluster: '서초 ' }) === 2)
            ) {
                await new Team({
                    ID: matchSubject[i] + '_' + matchUser[0].user.userID,
                    leaderID: matchUser[0].user.userID,
                    memberID: [matchUser[1].user.userID, matchUser[2].user.userID],
                    subject: matchSubject[i],
                    state: 'progress',
                    startDate: Date.now(),
                    notionLink: '',
                    gitLink: '',
                    teamName: matchSubject[i] + '_' + matchUser[0].user.userID,
                }).save;
                for (let j = 0; j < 3; j++) {
                    await User.findOneAndUpdate(
                        { ID: matchUser[j].user.userID },
                        {
                            waitMatching: null,
                            teamID: matchSubject[i] + '_' + matchUser[0].user.userID,
                        },
                        { new: true }
                    );
                    await Waitlist.findOneAndRemove({ user: matchUser[j].user });
                    matchUser.splice(0, 1);
                }
            } else if (matchUser.length < 3) {
                await new Team({
                    ID: matchSubject[i] + '_' + matchUser[0].user.userID,
                    leaderID: matchUser[0].user.userID,
                    memberID: [matchUser[1].user.userID, matchUser[2].user.userID],
                    subject: matchSubject[i],
                    state: 'wait_member',
                    startDate: Date.now(),
                    notionLink: '',
                    gitLink: '',
                    teamName: matchSubject[i] + '_' + matchUser[0].user.userID,
                }).save;
                for (let j = 0; j < matchUser.length; j++) {
                    await User.findOneAndUpdate(
                        { ID: matchUser[j].user.userID },
                        {
                            waitMatching: null,
                            teamID: matchSubject[i] + '_' + matchUser[0].user.userID,
                        },
                        { new: true }
                    );
                    await Waitlist.findOneAndRemove({ user: matchUser[j].user });
                    matchUser.splice(0, 1);
                }
            } else if (matchUser.length > 3) {
                const cluster1 = matchUser.filter({ cluster: '개포' });
                const cluster2 = matchUser.filter({ cluster: '서초' });
                if (cluster1.length >= 3) {
                    await new Team({
                        ID: matchSubject[i] + '_' + cluster1[0].user.userID,
                        leaderID: cluster1[0].user.userID,
                        memberID: [cluster1[1].user.userID, cluster1[2].user.userID],
                        subject: matchSubject[i],
                        state: 'progress',
                        startDate: Date.now(),
                        notionLink: '',
                        gitLink: '',
                        teamName: matchSubject[i] + '_' + cluster1[0].user.userID,
                    }).save;
                    for (let j = 0; j < 3; j++) {
                        await User.findOneAndUpdate(
                            { ID: cluster1[j].user.userID },
                            {
                                waitMatching: null,
                                teamID: matchSubject[i] + '_' + cluster1[0].user.userID,
                            },
                            { new: true }
                        );
                        await Waitlist.findOneAndRemove({ user: cluster1[j].user });
                        let flag = 0;
                        for (let i = 0; flag === 0; i++) {
                            if (matchUser[i].cluster === '개포') {
                                matchUser.splice(i, 1);
                                flag = 1;
                            }
                        }
                    }
                } else if (cluster2.length >= 3) {
                    await new Team({
                        ID: matchSubject[i] + '_' + cluster2[0].user.userID,
                        leaderID: cluster2[0].user.userID,
                        memberID: [cluster2[1].user.userID, cluster2[2].user.userID],
                        subject: matchSubject[i],
                        state: 'progress',
                        startDate: Date.now(),
                        notionLink: '',
                        gitLink: '',
                        teamName: matchSubject[i] + '_' + cluster2[0].user.userID,
                    }).save;
                    for (let j = 0; j < 3; j++) {
                        await User.findOneAndUpdate(
                            { ID: cluster2[j].user.userID },
                            {
                                waitMatching: null,
                                teamID: matchSubject[i] + '_' + cluster2[0].user.userID,
                            },
                            { new: true }
                        );
                        await Waitlist.findOneAndRemove({ user: cluster2[j].user });
                        let flag = 0;
                        for (let i = 0; flag === 0; i++) {
                            if (matchUser[i].cluster === '서초') {
                                matchUser.splice(i, 1);
                                flag = 1;
                            }
                        }
                    }
                }
            }
        }
    }
    return;
};

export default Matcher;
