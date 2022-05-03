const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought')

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: () => Promise.resolve(false),
                message: 'Email validation failed'
              }
        },
        thoughts: [thoughtSchema],
        // this is a workable alternative "friends: {type: Array, ref: 'User'},"
        friends: [userSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
);

userSchema
    .virtual('friendCount')
    // does this syntax below actually work???
    .get(() => this.friends.length)

const User = model('user', userSchema)

module.exports = User;