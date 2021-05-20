import mongoose from 'mongoose';

enum TeamState {
	progress,
	end,
	less_member,
	wait_member,
};

const teamSchema = new mongoose.Schema({
	ID: {type: String,
		default: true,
		immutable: true,
		unique: true
	};
	leaderID: {type: String};
	memberID: [{type: String}];
	//memberID: {type: Array};
	subject: {type: String};
	state: {type: String};
	//state: {
	//	type: Number,
	//	enum: TeamState
	//};
	notionLink: {type: String
		unique: true
	};
	gitLink: {type: String
		unique: true
	};
	teamName: {type: String,
		unique: true
	};
});

const Team = mongoose.model('Team', teamSchema);
