const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  comment: {
    type: String
  },
  statusId: { type: mongoose.Schema.Types.ObjectId, ref: 'Status', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true
})

const Comment = mongoose.model('Comment', schema);

module.exports = Comment;