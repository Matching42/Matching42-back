import { Team } from '../models';
import { tTeam } from '../../@types/types.d';

const findAllTeam: () => Promise<tTeam> = async () => {
    const allTeam = await Team.find({});
    if (allTeam === null || allTeam === undefined) throw new Error('Team not found');
    return allTeam;
};

export default findAllTeam;
