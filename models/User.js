const { Schema, model } = require("mongoose");

// schema for the user model
const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
  { timestamps: true }
);

// initializing our User model
const User = model("User", userSchema);

// virtual to get the amount of friends per user
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// exporting the user model
module.exports = User;
