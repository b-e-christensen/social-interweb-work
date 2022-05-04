const { 
    createThought, 
    getThoughts,
    getSingleThought,
    updateThought,
    deleteThought, 
} = require('../../controllers/thoughtController');

const router = require('express').Router();

router.route('/').get(getThoughts).post(createThought)

router.route('/:_id').get(getSingleThought).put(updateThought).delete(deleteThought)

module.exports = router
