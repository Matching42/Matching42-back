import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);

enum TeamState {
	"progress",
	"end",
	"less_member",
	"wait_member"
};

const teamSchema = new mongoose.Schema({
	ID: {type: String,
		default: true,
		immutable: true,
		unique: true
	},
	leaderID: {type: String},
	memberID: [{type: String}],
	subject: {type: String},
	state: {
		type: String,
		enum: TeamState
	},
	startDate: {type: Date},
	notionLink: {type: String
		unique: true
	},
	gitLink: {type: String
		unique: true
	},
	teamName: {type: String,
		unique: true
	}
});

const Team = mongoose.model('Team', teamSchema);
