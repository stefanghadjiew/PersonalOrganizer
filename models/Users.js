const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  learningResources: [
    {
      type: ObjectId,
      ref: "LearningResources",
    },
  ],
});

UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    let hashPass = bcrypt.hashSync(this.password, 10);
    this.password = hashPass;
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.comparePassword = async function (password, next) {
  try {
    let isMatch = await bcrypt.compareSync(password, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};

const Users = model("Users", UserSchema);
module.exports = Users;
