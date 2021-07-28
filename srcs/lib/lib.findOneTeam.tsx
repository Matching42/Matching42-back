import { Team } from '../models';
import { tTeam } from '../../@types/types.d';

const findOneTeam: (teamID: string) => Promise<tTeam> = async (teamID) => {
    const team = await Team.findOne({ ID: teamID });
    if (team === null || allTeams === undefined) throw new Error('Invalid Team ID');
    return team;
};

export default findOneTeam;
