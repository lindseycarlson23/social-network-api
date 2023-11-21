const mongoose = require('mongoose');
const { Schema, Types, model } = mongoose;
// const thoughtSchema = require('./Thought');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: 'Invalid email format',
      },
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
          ref: 'Thought',
        },
    ],

    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function() {
  return this.friends.length;
});

// const User = model('User', userSchema);
// const Thought = model('thought', thoughtSchema);

module.exports = model('User', userSchema);
