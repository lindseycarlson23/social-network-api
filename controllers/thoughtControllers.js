const { ObjectId } = require("mongoose").Types;
const { Thought, User } = require("../models");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find()
        .sort({ createdAt: -1 })
        .then((thoughtData) => {
          res.json(thoughtData);
        });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json({
        thought,
      });
    } catch (err) {
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
        res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    Thought.create(req.body)
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thoughtData._id } },
          { new: true }
        );
      })
      .then((userData) => {
        if (!userData) {
          return res
            .status(404)
            .json({ message: "No user found with that ID :(" });
        }
        res.json({ message: "Thought created" });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // delete thought
  async deleteThought(req, res) {
    try {
      const thoughtId = req.params.thoughtId;
      const thought = await Thought.findByIdAndDelete(thoughtId);

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      // remove thought's id from user's 'thoughts' array
      await User.updateOne(
        //I need to reference the username on the thought and get the userId
        { username: thought.username },
        { $pull: { thoughts: thoughtId } }
      );

      res.json({ message: "Thought has been deleted." });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // add reaction
  async createReaction(req, res) {
    console.log("You are adding a reaction");
    console.log(req.body);

    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!reaction) {
        return res
          .status(404)
          .json({ message: "No reaction found with that ID :(" });
      }

      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete reaction
  async deleteReaction(req, res) {
    console.log("You are deleting a reaction");
    // console.log(req.body);

    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!reaction) {
        return res
          .status(404)
          .json({ message: "No reaction found with that ID :(" });
      }

      res.json({ message: "Reaction has been deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
