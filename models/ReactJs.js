const mongoose = require("mongoose");
const LearningResources = require("./LearningResources");

const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const ReactJsSchema = new Schema({
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

ReactJsSchema.pre("deleteOne", async function (next) {
  try {
    let learningResources = await LearningResources.find(
      this.learningResourcesId
    );
    const itemIndex = learningResources[0].reactjs.indexOf(this._id);
    learningResources[0].reactjs.splice(itemIndex, 1);
    await learningResources[0].save();
  } catch (err) {
    return next(err);
  }
});

const ReactJs = model("ReactJs", ReactJsSchema);
module.exports = ReactJs;
