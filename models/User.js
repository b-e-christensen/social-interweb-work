const { Schema, model } = require('mongoose');
const Thought = require('./Thought')

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
            match: /.+\@.+\..+/,
            max_length: 50,
        },
        thoughts: {type: Array, ref: 'thought'},
        // this is a workable alternative "friends: {type: Array, ref: 'User'},"
        friends: {type: Array, ref: 'user'},
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
    .get(() => {
        if (this.friends) {
            return this.friends.length
        }
    })

const User = model('user', userSchema)

module.exports = User;