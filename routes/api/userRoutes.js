const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController')

router.route('/')
    .get(getUsers)
    .post(createUser)

router.route('/:_id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)

router.route('/:user_id/friends/:friend_id')
    .post(addFriend)
    .delete(deleteFriend)


module.exports = router