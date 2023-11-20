const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');


const thoughtCount = async () => {
    const numberOfThoughts = await Thought.aggregate()
        .count('thoughtCount');
    return numberOfThoughts;
}

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();

            const thoughtObj = {
                thoughts,
                thoughtCount: await thoughtCount(),
            };

            res.json(thoughtObj);
        }   catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.userId })
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            res.json({
                thought,
            });
        }   catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },


    // Create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        }   catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

};