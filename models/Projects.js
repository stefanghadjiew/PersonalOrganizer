const mongoose = require("mongoose");
const LearningResources = require("./LearningResources");

const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const ProjectsSchema = new Schema({
  title: {
    type: String,
  },
  tasks: [
    {
      title: {
        type: String,
        _id: new ObjectId(),
      },
      done: {
        type: Boolean,
        default: false,
      },
      tags: [
        {
          type: String,
          _id: new ObjectId(),
        },
      ],
      subtasks: [
        {
          title: {
            type: String,
            _id: new ObjectId(),
          },
          done: {
            type: Boolean,
            default: false,
          },
          tags: [
            {
              type: String,
              _id: new ObjectId(),
            },
          ],
        },
      ],
    },
  ],
  learningResourcesId: {
    type: ObjectId,
    ref: "LearningResources",
  },
});

ProjectsSchema.pre("deleteOne", async function (next) {
  try {
    let learningResources = await LearningResources.find(
      this.learningResourcesId
    );
    const itemIndex = learningResources[0].projects.indexOf(this._id);
    learningResources[0].projects.splice(itemIndex, 1);
    await learningResources[0].save();
  } catch (err) {
    return next(err);
  }
});

const Projects = model("Projects", ProjectsSchema);
module.exports = Projects;
