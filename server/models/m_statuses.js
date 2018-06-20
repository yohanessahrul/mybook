const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  status: {
    type: String
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  commentId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true }]
}, {
  timestamps: true
})

const Status = mongoose.model('Status', schema);

module.exports = Status;