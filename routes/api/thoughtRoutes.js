
const router = require('express').Router();
const {
    getThoughts,
    // getSingleThought,
    createThought,
    // updateThought,
    // deleteThought,
} = require('../../controllers/thoughtControllers.js');


//  /api/thoughts
router.route('/').get(getThoughts).post(createThought);
// router.route('/').post(createThought);

// /api/thoughts/:thoughtId
// router.route('/:userId').get(getSingleThought).put(updateThought).delete(deleteThought);



module.exports = router;