const { User } = require("../models")

// Current route/path -----> /api/users
module.exports = {
    // GET all users
    getUsers(req, res) {
        User.find()
        .then((user) => 
        !user
            ? res.status(404).json({ message: 'No user with this id!'})    
            : res.json(user))
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    // GET a single user by its _id
    getSingleUser(req, res) {
        User.findOne({ _id: req.params._id })
        .populate('friends')
        .populate('thoughts')
        .then((user) => 
        !user
            ? res.status(404).json({ message: 'No user with this id!'})    
            : res.json(user))
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    // POST a new user
    createUser(req, res) {
        User.create(req.body)
        .then((user) => 
        !user
            ? res.status(404).json({ message: 'No user with this id!'})    
            : res.json(user))
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    // PUT to update a user by its _id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params._id }, 
            { username: req.body.username, email: req.body.email }, 
            { new: true })
            .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user with this id!'})    
                : res.json(user))
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    // DELETE to remove user by its _id
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params._id })
        .then((user) => 
        !user
            ? res.status(404).json({ message: 'No user with this id!'})    
            : res.json('User Successfully deleted.'))
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    // POST to add a new friend to a user's friend list
    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.user_id }, 
           { $addToSet: { friends: req.params.friend_id }},
           { new: true })
           .then((user) => 
           !user
               ? res.status(404).json({ message: 'No user with this id!'})    
               : res.json(user))
           .catch((err) => {
               console.log(err)
               res.status(500).json(err)
           })
    },

    // DELETE to remove a friend from a user's friend list
    deleteFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.user_id },
            { $pull: { friends: req.params.friend_id }},
            { new: true })
            .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user with this id!'})    
                : res.json(user))
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    }
}

