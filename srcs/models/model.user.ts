import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true,
        unique: true,
    },
    intraInfo: {
        blackholed_at: {
            type: Date,
            default: null,
        },
        level: {
            type: Number,
            required: true,
        },
    },
    waitMatching: {
        type: String,
        default: null,
    },
    teamID: {
        type: String,
        default: null,
    },
    endTeamList: [{ type: String }],
    gitName: {
        type: String,
        default: null,
    },
    cluster: {
        type: String,
        enum: ['개포', '서초', null],
        default: null,
    },
    deadline: {
        type: String,
        enum: ['3일', '1주', '2주', '4주', '6주 이상', null],
        default: null,
    },
    slackID: {
        type: String,
        default: null,
    },
});

export default mongoose.model('user', userSchema, 'User');
