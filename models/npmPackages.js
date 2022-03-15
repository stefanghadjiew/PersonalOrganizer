const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;
const LearningResources = require("./LearningResources");

const npmPackagesSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  domain: {
    type: String,
  },
  img: {
    type: String,
  },
  favicon: {
    type: String,
  },
  link: {
    type: String,
  },
  learningResourcesId: {
    type: ObjectId,
    ref: "LearningResources",
  },
});

npmPackagesSchema.pre("deleteOne", async function (next) {
  try {
    let learningResources = await LearningResources.find(
      this.learningResourcesId
    );
    const itemIndex = learningResources[0].npmPackages.indexOf(this._id);
    learningResources[0].npmPackages.splice(itemIndex, 1);
    await learningResources[0].save();
  } catch (err) {
    return next(err);
  }
});

const npmPackage = model("NpmPackages", npmPackagesSchema);
module.exports = npmPackage;
