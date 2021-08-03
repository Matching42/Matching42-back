import { tTeam } from '../../@types/types.d';
import axios from 'axios';
import dotenv from 'dotenv';
import { Team } from '../models';
import { findOneTeam } from '../lib';

dotenv.config();

const checkError = (team) => {
    if (team === null) throw new Error('There is no such Team');
    if (team.subject === undefined) throw new Error('Team has no subject');
    if (team.ID === undefined) throw new Error('Team has no ID');
    if (team.gitLink) throw new Error('Team already has a gitLink');
    if (team.state === 'end') throw new Error('Team already finished this subject');
};

const createGitRepoLib: (teamID: string) => Promise<tTeam> = async (teamID) => {
    let team = await findOneTeam(teamID);
    checkError(team);
    const createResult = await axios({
        method: 'post',
        url: `https://api.github.com/orgs/${process.env.ORG_NAME}/repos`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${process.env.GIT_TOKEN}`,
        },
        data: {
            name: `Matching42_${team.subject}_${team.ID}`,
            auto_init: true,
            private: true,
        },
    });
    const gitUrl = createResult.data.html_url;
    if (gitUrl === undefined) throw new Error('git Repository creation failed');
    team = await Team.findOneAndUpdate(
        { ID: teamID },
        { gitLink: gitUrl },
        { runValidators: true, new: true }
    );
    return team;
};

export default createGitRepoLib;
