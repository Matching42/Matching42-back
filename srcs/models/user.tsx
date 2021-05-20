import mongoose from 'mongoose';

// User Schema 정의
const userSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true,
        unique: true
    },
    token: String,
    intraInfo: [{
        blackholed_at: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        image_url: {
            type: String,
            required: true
        },
        level: {
            type: Number,
            required: true
        }
    }],
    waitMatching: {
        type: String,
        default: null,
    },
    teamID: {
        type: String,
        default: null,
    },
    gitID: {
        type: String,
        default: null,
    },
    cluster: {
        type: String,
        enum: ["개포", "서초"],
        default: null
    }
});

const User = mongoose.model('user', userSchema, 'User');

export default User