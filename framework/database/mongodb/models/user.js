const { Schema, model } = require('mongoose');

const COLLECTION_NAME = 'users';
const DOCUMENT_NAME = 'User';

const profileSchema = new Schema({
	name: {
		type: String,
	},
	age: {
		type: Number,
		default: 0,
	},
	bio: {
		type: String,
	},
});

const userSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		profile: profileSchema,
	},
	{
		collection: COLLECTION_NAME,
		timeseries: true,
	}
);

module.exports = model(DOCUMENT_NAME, userSchema);
