const db = require("../db/index.js");
const {
  createResource,
  getAllResources,
  deleteResource,
} = require("../helperFunctions.js");

const createNpmPackagesResource = async (req, res, next) => {
  const { userId } = req.params;
  const { NpmPackages, LearningResources } = db;
  let userLearningResources = await LearningResources.find({ userId });
  try {
    const createdResource = await createResource(
      req,
      res,
      NpmPackages,
      userLearningResources
    );
    res.status(200).json(createdResource);
  } catch (err) {
    return next(err);
  }
};

const getAllNpmPackagesResources = async (req, res, next) => {
  const { userId } = req.params;
  const { NpmPackages, LearningResources } = db;
  let userLearningResources = await LearningResources.find({ userId });
  try {
    const allResources = await getAllResources(
      NpmPackages,
      userLearningResources
    );
    res.status(200).json(allResources);
  } catch (err) {
    return next(err);
  }
};

const deleteNpmPackagesResource = async (req, res, next) => {
  const { NpmPackages } = db;
  try {
    const resourceToRemove = await deleteResource(req, NpmPackages);
    res.status(200).json(resourceToRemove);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createNpmPackagesResource,
  getAllNpmPackagesResources,
  deleteNpmPackagesResource,
};
