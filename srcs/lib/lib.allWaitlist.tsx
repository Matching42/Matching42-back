import { Waitlist } from '../models';
import { tWaitlist } from '../../@types/types.d';

const findAllWaitlist: (subjectName: string) => Promise<tWaitlist | Error> = async (
    subjectName
) => {
    try {
        const WaitlistDocument = await Waitlist.findOne({
            subjectName: subjectName,
        });
        if (WaitlistDocument === null || WaitlistDocument === undefined)
            throw new Error('Invalid subjectName');
        return WaitlistDocument;
    } catch (error) {
        return error;
    }
};

export default findAllWaitlist;
