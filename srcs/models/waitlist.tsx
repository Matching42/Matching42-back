const mongoose = require('mongoose');
const Schema = mongoose.Schema

// WaitList schma 정의
const waitlistchema = new Schema({
	subject_name: {
		type: String,
		required: true,
		unique: true
	},
	user:[{
		user_ID: String,
		waited_at:{type: Date, default:Date.now}
	}]
});

module.exports = mongoose.model('waitlist', waitlistchema, 'WaitList');
