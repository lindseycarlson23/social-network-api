const router = require('express').Router();
const {
    // getUsers,
    // getSingleUser,
    createUser,
    // updateUser,
    // deleteUser,
} = require('../../controllers/userControllers');

//  /api/users
router.route('/').post(createUser);

module.exports = router;

