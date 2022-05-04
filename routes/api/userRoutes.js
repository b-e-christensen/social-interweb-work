const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
} = require('../../controllers/userController')

router.route('/').get(getUsers).post(createUser)

router.route('/:_id').get(getSingleUser).put(updateUser).delete(deleteUser)

router.route('/:user_id/friends/:friend_id').put(addFriend)


module.exports = router