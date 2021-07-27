import { Waitlist } from '../models';
import { tWaitlist } from '../../@types/types.d';

const findAllWaitlist: (subjectName: string) => Promise<tWaitlist> = async (subjectName) => {
    try {
        const WaitlistDocument = await Waitlist.findOne({
            subjectName: subjectName,
        });
        if (WaitlistDocument == null || WaitlistDocument == undefined) return undefined;
        return WaitlistDocument;
    } catch (err) {
        return undefined;
    }
};

export default findAllWaitlist;
