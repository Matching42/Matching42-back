import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// WaitList schma 정의
const WaitListSchema = new Schema({
    subject_name: {
        type: String,
        required: true,
        unique: true,
    },
    user: [
        {
            user_ID: { type: String, unique: true },
            waited_at: { type: Date, default: Date.now },
        },
    ],
});

const WaitList = mongoose.model('waitlist', WaitListSchema, 'WaitList');

export default WaitList;
