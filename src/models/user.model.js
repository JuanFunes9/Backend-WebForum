const { Schema, model } = require('mongoose');

const UserSchema = Schema({
	email: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	image: {
		type: String,
		default: null,
		required: false
	},
	rol: {
		type: String,
		default: 'user'
	},
	state: {
		type: Boolean,
		default: true
	}
})

module.exports = model('User', UserSchema);