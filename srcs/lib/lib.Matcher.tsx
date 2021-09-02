import { Team } from '../models';
import { Waitlist } from '../models';
import { User } from '../models';
import { createGitRepo, createNotionPage, sendSlackMessage } from '../lib';

const makeTeam = async (subject: string, state: string, user, teamID): Promise<void> => {
    const team = new Team({
        ID: teamID,
        leaderID: user[0],
        memberID: user,
        subject: subject,
        state: state,
        startDate: Date.now(),
        notionLink: await createNotionPage(teamID, subject, user),
        gitLink: await createGitRepo(subject, teamID),
        teamName: teamID,
    });
    for (let i = 0; i < 3 && (await sendSlackMessage(team)) === false; i++);
    await team.save();
};

const updateUser = (userID: string[], teamName: string) => {
    userID.forEach(async (Id) => {
        await User.updateOne(
            { ID: Id },
            { $set: { waitMatching: null, teamID: teamName, deadline: null } }
        );
    });
};

const updateWaitlist = async (subject, userList): Promise<void> => {
    userList.forEach(async (ID) => {
        await Waitlist.updateOne({ subjectName: subject }, { $pull: { user: { userID: ID } } });
    });
};

const genTeamName = (subject: string, user: string): string => {
    return `${subject}_${user}_${Date.now()}`;
};

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}

const matching = async (subject, user, min: number, max: number): Promise<void> => {
    try {
        while (user.length > 0) {
            const matchingNumber: number = getRandomIntInclusive(min, max);
            const userID: string[] = user.slice(0, matchingNumber).map((user) => user.ID);
            const teamName: string = genTeamName(subject, userID[0]);
            const state: string = userID.length >= min ? 'progress' : 'wait_member';
            await makeTeam(subject, state, userID, teamName);
            await updateUser(userID, teamName);
            await updateWaitlist(subject, userID);
            user.splice(0, matchingNumber);
        }
    } catch (error) {
        console.error(error);
    }
};

const Matcher = async (): Promise<void> => {
    const matchingSubject = await User.find()
        .distinct('waitMatching')
        .catch((err) => console.error(err));
    for (const subject of matchingSubject) {
        if (subject === null || subject === undefined) continue;
        const matchingUser = await User.find().where('waitMatching', subject).sort('cluster');
        if (subject === 'minishell' || subject === 'miniRT' || subject === 'cub3d')
            await matching(subject, matchingUser, 4, 4);
        else if (subject === 'webserv' || subject === 'ft_irc')
            await matching(subject, matchingUser, 4, 5);
        else if (subject === 'ft_transcendence') await matching(subject, matchingUser, 3, 5);
        else await matching(subject, matchingUser, 3, 3);
    }
};

export default Matcher;
