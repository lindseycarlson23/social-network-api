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
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' })
            }

            res.json({
                thought,
            });
        }   catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

// update a thought
async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },


    // Create a new thought
    // async createThought(req, res) {
    //     try {
    //         const thought = await Thought.create(req.body);
    //         res.json(thought);
    //     }   catch (err) {
    //         console.log(err);
    //         return res.status(500).json(err);
    //     }
    // },

// async createThought(req, res) {
//     console.log('You are adding a thought.');
//     console.log(req.body);

//     try {
//         const user = await User.findOneAndUpdate(
//             { _id: req.params.userId },
//             { $addToSet: { thoughts: req.body } },
//             { runValidators: true, new: true }
//         );

//         if (!user) {
//             return res.status(404).json({ message: 'No user found with that ID :(' });
//         }

//         res.json(user);
//     }   catch (err) {
//         res.status(500).json(err);
//     }
// },


// delete thought
    async deleteThought(req, res) {
        try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        res.json(thought);
        } catch (err) {
        res.status(500).json(err);
        }
  },

  // add reaction
  async createReaction(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);

    try {
        const reaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true }
        );
        if (!reaction) {
            return res
                .status(404)
                .json({ message: 'No reaction found with that ID :('});
        }

            res.json(reaction);
        }   catch (err) {
            res.status(500).json(err);
        }
    },

    // delete reaction

    async deleteReaction(req, res) {
        console.log('You are deleting a reaction');
        console.log(req.body);

        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: req.params.reactionId }},
                { runValidators: true, new: true }
            );
        
        if (!reaction) {
            return res
                .status(404)
                .json({ message: 'No reaction found with that ID :('});
        }

        res.json(reaction);
        }   catch (err) {
            res.status(500).json(err);
        }
    }

};