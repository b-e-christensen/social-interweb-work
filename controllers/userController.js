const { User } = require("../models")

// /api/users

module.exports = {
    // GET all users --- WORKS
    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    // GET a single user by its _id --- WORKS
    getSingleUser(req, res) {
        User.findOne({ _id: req.params._id })
        .populate('friends')
        .populate('thoughts')
        // .populate('thoughts')
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    // POST a new user --- WORKS
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    // PUT to update a user by its _id --- WORKING BUT it is posting the non updated version in the json response. 
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params._id }, { username: req.body.username, email: req.body.email }, { new: true })
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    // DELETE to remove user by its _id --- TEST MEEEEEE
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params._id })
        .then((message) => res.json('User successfully deleted!'))
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    // PUT to add a friend --- WORKS
    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.user_id }, 
           { $addToSet: { friends: req.params.friend_id }})
           .then((user) => res.json(user))
           .catch((err) => {
               console.log(err)
               res.status(500).json(err)
           })
    }
}







// BONUS: Remove a user's associated thoughts when deleted.

// /api/users/:userId/friends/:friendId

// POST to add a new friend to a user's friend list

// DELETE to remove a friend from a user's friend list

