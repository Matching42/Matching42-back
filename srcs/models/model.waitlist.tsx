import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// WaitList schma 정의
const waitlistchema = new Schema({
    subject_name: {
        type: String,
        required: true,
        unique: true,
    },
    user: [
        {
            user_ID: String,
            waited_at: { type: Date, default: Date.now },
        },
    ],
});

const WaitList = mongoose.model('waitlist', waitlistchema, 'WaitList');

export default WaitList;
