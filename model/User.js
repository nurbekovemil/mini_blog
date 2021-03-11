const {Schema, model, Types} = require('mongoose')

const userSchema = new Schema({
	username: {
		type: String,
		require: false
	},
	profileImg: {
		type: String,
		require: false,
	},
	about:{
		type: String,
		require: false,
		default: '...'
	},
	phone: {
		type: Number,
		require: false,
		default: +996
	},
	created_date: {
		type: Date,
		required: false,
		default: Date.now
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	posts: [{
		type: Types.ObjectId,
		ref: 'Post'
	}]
})

module.exports = model('User', userSchema)