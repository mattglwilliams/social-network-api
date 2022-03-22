const User = require("../models/User");

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user found" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },
  // Update a user
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user found" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },
  //   Add a friend
  addFriend(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      {
        new: true,
        runValidators: true,
      }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user found" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },
  //   Remove a friend
  removeFriend(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      {
        new: true,
        runValidators: true,
      }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user found" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },
};
