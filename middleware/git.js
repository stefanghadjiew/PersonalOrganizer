const db = require("../db/index.js");
const {
  createResource,
  getAllResources,
  deleteResource,
} = require("../helperFunctions.js");

let cachedResources;

const createGitResource = async (req, res, next) => {
  const { userId } = req.params;
  const { GIT, LearningResources } = db;
  let userLearningResources = await LearningResources.find({ userId });

  try {
    const createdResource = await createResource(
      req,
      res,
      GIT,
      userLearningResources
    );

    res.status(200).json(createdResource);
  } catch (err) {
    return next(err);
  }
};

const getAllGitResources = async (req, res, next) => {
  const { userId } = req.params;
  const { GIT, LearningResources } = db;
  let userLearningResources = await LearningResources.find({ userId });
  try {
    const allResources = await getAllResources(GIT, userLearningResources);
    res.status(200).json(allResources);
  } catch (err) {
    return next(err);
  }
};

const deleteGitResource = async (req, res, next) => {
  const { GIT } = db;
  try {
    const resourceToRemove = await deleteResource(req, GIT);
    res.status(200).json(resourceToRemove);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createGitResource,
  getAllGitResources,
  deleteGitResource,
};
