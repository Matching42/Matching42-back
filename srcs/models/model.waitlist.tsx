import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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

export default mongoose.model('Waitlist', WaitListSchema, 'Waitlist');
