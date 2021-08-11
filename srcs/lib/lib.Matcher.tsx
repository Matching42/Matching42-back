import { Team } from '../models';
import { Waitlist } from '../models';
import { User } from '../models';

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
        await User.updateOne(
            { ID: Id },
            { $set: { waitMatching: null, teamID: teamName, deadline: null } }
        ).reject(new Error(`Error: update user information on DB fail`));
    });
};

const updateWaitlist = async (subject, userList): Promise<void> => {
    userList.forEach(async (ID) => {
        await Waitlist.updateOne(
            { subjectName: subject },
            { $pull: { user: { userID: ID } } }
        ).reject(new Error(`Error: update waitlist on DB fail`));
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
            console.log(user);
            const matchingNumber: number = getRandomIntInclusive(min, max);
            console.log(matchingNumber);
            const userID: string[] = user.slice(0, matchingNumber).map((user) => user.ID);
            console.log(userID);
            const teamName: string = genTeamName(subject, userID[0]);
            console.log(teamName);
            const state: string = userID.length >= min ? 'progress' : 'wait_member';
            console.log(state);
            // await makeTeam(subject, state, userID, teamName);
            // await updateUser(userID, teamName);
            // await updateWaitlist(subject, userID);
            user.splice(0, matchingNumber);
            console.log(user);
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
            matching(subject, matchingUser, 4, 4);
        else if (subject === 'webserv' || subject === 'ft_irc')
            matching(subject, matchingUser, 4, 5);
        else if (subject === 'ft_transcendence') matching(subject, matchingUser, 3, 5);
        else matching(subject, matchingUser, 3, 3);
    }
};

export default Matcher;
