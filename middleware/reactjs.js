const db = require("../db/index.js");
const {
  createResource,
  getAllResources,
  deleteResource,
} = require("../helperFunctions.js");

let cachedResources;

const createReactJsResource = async (req, res, next) => {
  const { userId } = req.params;
  const { ReactJs, LearningResources } = db;
  let userLearningResources = await LearningResources.find({ userId });
  try {
    const createdResource = await createResource(
      req,
      ReactJs,
      userLearningResources
    );
    res.status(200).json(createdResource);
  } catch (err) {
    return next(err);
  }
};

const getAllReactJsResources = async (req, res, next) => {
  const { userId } = req.params;
  const { ReactJs, LearningResources } = db;
  let userLearningResources = await LearningResources.find({ userId });
  try {
    const allResources = await getAllResources(ReactJs, userLearningResources);
    res.status(200).json(allResources);
  } catch (err) {
    return next(err);
  }
};

const deleteReactJsResource = async (req, res, next) => {
  const { ReactJs } = db;
  try {
    const resourceToRemove = await deleteResource(req, ReactJs);
    res.status(200).json(resourceToRemove);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createReactJsResource,
  getAllReactJsResources,
  deleteReactJsResource,
};
