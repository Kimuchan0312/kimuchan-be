const mongoose = require('mongoose');

// Friendship Schema
const friendshipSchema = new mongoose.Schema(
  {
    user1: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    user2: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Friendship = mongoose.model('Friendship', friendshipSchema);

module.exports = Friendship;
