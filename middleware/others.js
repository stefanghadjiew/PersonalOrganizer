const db = require("../db/index.js");
const {
  createResource,
  getAllResources,
  deleteResource,
} = require("../helperFunctions.js");

const createOthersResource = async (req, res, next) => {
  const { userId } = req.params;
  const { Others, LearningResources } = db;
  let userLearningResources = await LearningResources.find({ userId });
  try {
    const createdResource = await createResource(
      req,
      Others,
      userLearningResources
    );
    res.status(200).json(createdResource);
  } catch (err) {
    return next(err);
  }
};

const getAllOthersResources = async (req, res, next) => {
  const { userId } = req.params;
  const { Others, LearningResources } = db;
  let userLearningResources = await LearningResources.find({ userId });
  try {
    const allResources = await getAllResources(Others, userLearningResources);
    res.status(200).json(allResources);
  } catch (err) {
    return next(err);
  }
};

const deleteOthersResource = async (req, res, next) => {
  const { Others } = db;
  try {
    const resourceToRemove = await deleteResource(req, Others);
    res.status(200).json(resourceToRemove);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createOthersResource,
  getAllOthersResources,
  deleteOthersResource,
};
