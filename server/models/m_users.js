const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  fullname: {
    type: String,
  },
  statuses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Status', required: true}]
}, {
  timestamps: true
})

const User = mongoose.model('User', schema);

module.exports = User;