const db = require("../db/index.js");
const {
  createResource,
  getAllResources,
  deleteResource,
} = require("../helperFunctions.js");

let cachedResources;

const createCSSResource = async (req, res, next) => {
  const { userId } = req.params;
  const { CSS, LearningResources } = db;
  let userLearningResources = await LearningResources.find({ userId });
  try {
    const createdResource = await createResource(
      req,
      res,
      CSS,
      userLearningResources
    );
    res.status(200).json(createdResource);
  } catch (err) {
    return next(err);
  }
};

const getAllCSSResources = async (req, res, next) => {
  const { userId } = req.params;
  const { CSS, LearningResources } = db;
  let userLearningResources = await LearningResources.find({ userId });
  try {
    const allResources = await getAllResources(CSS, userLearningResources);
    res.status(200).json(allResources);
  } catch (err) {
    return next(err);
  }
};

const deleteCSSResource = async (req, res, next) => {
  const { CSS } = db;
  try {
    const resourceToRemove = await deleteResource(req, CSS);
    res.status(200).json(resourceToRemove);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createCSSResource,
  getAllCSSResources,
  deleteCSSResource,
};
