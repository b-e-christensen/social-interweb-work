const { 
    createThought, 
    getThoughts,
    getSingleThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction, 
} = require('../../controllers/thoughtController');

const router = require('express').Router();

router.route('/')
    .get(getThoughts)
    .post(createThought)

router.route('/:_id')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)

router.route('/:thought_id/reactions')
    .post(addReaction)
    .delete(deleteReaction)

module.exports = router
