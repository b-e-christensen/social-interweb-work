const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')


const thoughtSchema = new Schema(
    {
        // thoughtId: {
        //     type: Schema.Types.ObjectId,
        //     default: () => new Types.ObjectId(),
        // },
        thoughtText: {
            type: String,
            required: true, 
            min: [1, 'Thoughts must be between 1 and 280 characters. On this website at least. Do not reel in any length on the thoughts you thought in your brain.'],
            max: [280, 'Thoughts must be between 1 and 280 characters. On this website at least. Do not reel in any length on the thoughts you thought in your brain.']
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // copied from stack overflow while not fully cetain that it will work. Will need to double check. 
            get: (date) => {
                if (date) return date.toISOString().split("T") [0];
              },
        },
        username: {
            type: String, 
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
)

thoughtSchema
    .virtual('reactionCount')
    .get(() => {
        if(this.reactions){
            return this.reactions.length
        }
    })

const Thought = model('thought', thoughtSchema)
module.exports = Thought;