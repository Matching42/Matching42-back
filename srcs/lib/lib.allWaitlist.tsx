import { Waitlist } from '../models';
import { tWaitlist } from '../../@types/types.d';

const findAllWaitlist: (subjectName: string) => Promise<tWaitlist> = async (subjectName) => {
    const WaitlistDocument = await Waitlist.findOne({
        subjectName: subjectName,
    });
    if (WaitlistDocument === null || WaitlistDocument === undefined)
        throw new Error('Invalid subjectName');
    return WaitlistDocument;
};

export default findAllWaitlist;
