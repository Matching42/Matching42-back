import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
	ID: {type: String,
		default: true,
		immutable: true,
		unique: true
	};
	leaderID: {type: String};
	memberID: [{type: String}];
	subject: {type: String};
	state: {type: String};
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
