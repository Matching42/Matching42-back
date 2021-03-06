import mongoose from 'mongoose';

const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

enum TeamState {
    'progress',
    'end',
    'less_member',
    'wait_member',
}

const teamSchema = new Schema({
    ID: { type: String, default: true, immutable: true, unique: true },
    leaderID: { type: String },
    memberID: [{ type: String }],
    subject: { type: String },
    state: {
        type: String,
        enum: TeamState,
    },
    startDate: { type: Date },
    notionLink: { type: String },
    gitLink: { type: String },
    teamName: { type: String },
    description: { type: String },
    tag: [{ type: String }],
});

export default mongoose.model('team', teamSchema, 'Team');
