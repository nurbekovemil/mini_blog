const {Schema, model, Types} = require('mongoose')

const postSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  owner: {
    type: Types.ObjectId,
    ref: 'User'
  },
  like:[{
    type: Types.ObjectId,
    ref: 'Like'
  }],
  likes_count: {
    type: Number,
    default: 0,
    require: false
  }
})

module.exports = model('Post', postSchema)