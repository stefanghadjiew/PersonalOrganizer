const db = require("../db/index.js");
const {
  createResource,
  getAllResources,
  deleteResource,
} = require("../helperFunctions.js");

const createNodeJsResource = async (req, res, next) => {
  const { userId } = req.params;
  const { NodeJs, LearningResources } = db;
  let userLearningResources = await LearningResources.find({ userId });
  try {
    const createdResource = await createResource(
      req,
      NodeJs,
      userLearningResources
    );
    res.status(200).json(createdResource);
  } catch (err) {
    return next(err);
  }
};

const getAllNodeJsResources = async (req, res, next) => {
  const { userId } = req.params;
  const { NodeJs, LearningResources } = db;
  let userLearningResources = await LearningResources.find({ userId });
  try {
    const allResources = await getAllResources(NodeJs, userLearningResources);
    res.status(200).json(allResources);
  } catch (err) {
    return next(err);
  }
};

const deleteNodeJsResource = async (req, res, next) => {
  const { NodeJs } = db;
  try {
    const resourceToRemove = await deleteResource(req, NodeJs);
    res.status(200).json(resourceToRemove);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createNodeJsResource,
  getAllNodeJsResources,
  deleteNodeJsResource,
};
