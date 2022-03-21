const db = require("../db/index.js");
const {
  createResource,
  getAllResources,
  deleteResource,
} = require("../helperFunctions.js");

const createJavascriptResource = async (req, res, next) => {
  const { userId } = req.params;
  const { Javascript, LearningResources } = db;
  let userLearningResources = await LearningResources.find({ userId });
  try {
    const createdResource = await createResource(
      req,
      res,
      Javascript,
      userLearningResources
    );
    res.status(200).json(createdResource);
  } catch (err) {
    return next(err);
  }
};

const getAllJavascriptResources = async (req, res, next) => {
  const { userId } = req.params;
  const { Javascript, LearningResources } = db;
  let userLearningResources = await LearningResources.find({ userId });
  try {
    const allResources = await getAllResources(
      Javascript,
      userLearningResources
    );
    res.status(200).json(allResources);
  } catch (err) {
    return next(err);
  }
};

const deleteJavascriptResource = async (req, res, next) => {
  const { Javascript } = db;
  try {
    const resourceToRemove = await deleteResource(req, Javascript);
    res.status(200).json(resourceToRemove);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createJavascriptResource,
  getAllJavascriptResources,
  deleteJavascriptResource,
};
