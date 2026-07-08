const mongoose =
require("mongoose");

const UserSchema =
new mongoose.Schema({
  name: String,
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: String,
  otp: {
    type: String,
    default: ""
  }
});

module.exports =
mongoose.model(
  "User",
  UserSchema
);