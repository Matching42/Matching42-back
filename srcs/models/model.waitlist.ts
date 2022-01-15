import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const WaitlistSchema = new Schema({
    subjectName: {
        type: String,
        required: true,
        unique: true,
    },
    user: [
        {
            userID: { type: String },
            waitedAt: { type: Date, default: Date.now },
        },
    ],
});

export default mongoose.model('waitlist', WaitlistSchema, 'Waitlist');
