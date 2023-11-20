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

// Put find single user by id and update

    async updateUser (req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body},
                { new: true, runValidators: true }
            );
        
            if (updatedUser) {
                console.log('Updated user: ', updatedUser);
            }   else {
                console.log('User not found');
            }
        }   catch (error) {
            console.error('Error updating user', error.message);
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
    },

// delete a user
    async deleteUser(req, res) {
        try {
          const user = await User.findOneAndDelete({ _id: req.params.userId });
    
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
          }
        } catch (err) {
          res.status(500).json(err);
        }
      },

// add a thought to a user
    async addThought(req,res) {
        console.log('You are adding a thought');
        console.log(req.body);

        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { thoughts: req.body }},
                { runValidators: true, new: true}
            );

        if (!user) {
            return res
                .status(404)
                .json({ message: 'No user found with that ID :('});
        }

            res.json(user);
        }   catch (err) {
            res.status(500).json(err);
        }
    },

}