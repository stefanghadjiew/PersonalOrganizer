const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;
const Users = require("./Users");

const learningResourcesSchema = new Schema({
  javascript: [
    {
      type: ObjectId,
      ref: "Javascript",
    },
  ],
  reactjs: [
    {
      type: ObjectId,
      ref: "ReactJs",
    },
  ],
  nodejs: [
    {
      type: ObjectId,
      ref: "NodeJs",
    },
  ],
  npmPackages: [
    {
      type: ObjectId,
      ref: "NpmPackages",
    },
  ],
  projects: [
    {
      type: ObjectId,
      ref: "Projects",
    },
  ],
  books: [
    {
      type: ObjectId,
      ref: "Books",
    },
  ],
  futureProjects: [
    {
      type: ObjectId,
      ref: "FutureProjects",
    },
  ],
  css: [
    {
      type: ObjectId,
      ref: "CSS",
    },
  ],
  others: [
    {
      type: ObjectId,
      ref: "Others",
    },
  ],
  userId: {
    type: ObjectId,
    ref: "Users",
  },
});

learningResourcesSchema.pre("remove", async function () {
  try {
    let user = await Users.findById(this.userId);
    user.learningResources.remove(this.id);
    await user.save();
  } catch (err) {
    return next(err);
  }
});

const LearningResources = model("LearningResources", learningResourcesSchema);
module.exports = LearningResources;
