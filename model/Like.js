const {Schema, model, Types} = require('mongoose')

const likeSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
	postid: {
		type: Types.ObjectId,
		ref: 'Post'
	},
  userid: {
    type: Types.ObjectId,
    ref: 'User'
  }
})

module.exports = model('Like', likeSchema)