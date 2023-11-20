const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');


// Aggregate function to get the total number of friends
const userCount = async () => {
    const numberOfUsers = await User.aggregate()
        .count('userCount');
    return numberOfUsers;
}

module.exports = {
//  Get all users
    async getUsers(req, res) {
        try {
          const users = await User.find();
    
          const userObj = {
            users,
            userCount: await userCount(),
          };
    
          res.json(userObj);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({_id: req.params.userId })
                .select('-__v');
        
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            res.json({
                user,
                //friend and thought data as well
            });
        }   catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

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