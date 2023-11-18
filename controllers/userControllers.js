const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');



module.exports = {

// create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        }   catch (err) {
            res.status(500).json(err);
        }
    }

}