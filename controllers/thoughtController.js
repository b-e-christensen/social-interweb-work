// /api/thoughts
const { User, Thought } = require('../models')

// Current route/path /api/thoughts
module.exports = {
    // GET to get all thoughts
    getThoughts(req, res) {
        Thought.find()
        .then((thought) => 
        !thought
            ? res.status(404).json({ message: 'No thought with this id!'})    
            : res.json(thought))
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    // GET to get a single thought by its _id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params._id })
        .then((thought) => 
        !thought
            ? res.status(404).json({ message: 'No thought with this id!'})    
            : res.json(thought))
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    // POST to create a new thought
    // EXAMPLE DATA -----> 
    // { 
    //   "thoughtText": "Here's a cool thought...",
    //   "username": "lernantino",
    //   "userId": "5edff358a0fcb779aa7b118b"
    // }
    createThought(req, res) {
        Thought.create({ thoughtText: req.body.thoughtText, username: req.body.username})
        .then((data) => User.findOneAndUpdate(
            { _id: req.body.user_id }, 
            { $addToSet: { thoughts: data._id }}, 
            { new: true })
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user with this id!'})    
                : res.json(user))
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
)
    },

    // PUT to update a thought by its _id
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params._id }, { thoughtText: req.body.thoughtText }, { new: true })
        .then((thought) => 
        !thought
            ? res.status(404).json({ message: 'No thought with this id!'})    
            : res.json(thought))
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    // DELETE to remove a thought by its _id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params._id })
            .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought with this id!'})    
                : res.json('Thought successfully deleted.'))
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    // POST to create a reaction stored in a single thought's reactions array field
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thought_id },
            { $addToSet: { reactions: req.body}},
            { new: true })
            .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought with this id!'})    
                : res.json(thought))
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    // DELETE to pull and remove a reaction by the reaction's reactionId value
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thought_id },
            { $pull: { reactions: { reactionId: req.body.reaction_id }}},
            { new: true })
            .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought or reaction with this id!'})    
                : res.json(thought))
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    }

}

