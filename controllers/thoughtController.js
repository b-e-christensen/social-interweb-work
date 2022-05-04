// /api/thoughts
const { User, Thought } = require('../models')

module.exports = {
    // GET to get all thoughts
    getThoughts(req, res) {
        Thought.find()
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    // GET to get a single thought by its _id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params._id })
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    // POST to create a new thought --- WORKS
    // // example data
    // {
    //   "thoughtText": "Here's a cool thought...",
    //   "username": "lernantino",
    //   "userId": "5edff358a0fcb779aa7b118b"
    // }
    createThought(req, res) {
        Thought.create({ thoughtText: req.body.thoughtText, username: req.body.username})
        .then((data) => User.findOneAndUpdate({ _id: req.body.user_id }, { $addToSet: { thoughts: data._id }}, { new: true })
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
)
    },

    // PUT to update a thought by its _id
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params._id }, { thoughtText: req.body.thoughtText }, { new: true })
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    // DELETE to remove a thought by its _id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params._id })
        // possibly need some kind of compounding delete that will also remove the thought from attached user, though also might do this for us by default
        .then((message) => res.json('Thought successfully deleted.'))
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    }


}

// /api/thoughts/:thoughtId/reactions

// POST to create a reaction stored in a single thought's reactions array field

// DELETE to pull and remove a reaction by the reaction's reactionId value