const {Schema, model, Types} = require('mongoose')

const postSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  owner: {
    type: Types.ObjectId,
    ref: 'User'
  }
})

module.exports = model('Post', postSchema)