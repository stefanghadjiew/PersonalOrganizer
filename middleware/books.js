const db = require("../db/index.js");
const {
  createResource,
  getAllResources,
  deleteResource,
} = require("../helperFunctions.js");

let cachedResources;

const createBooksResource = async (req, res, next) => {
  const { userId } = req.params;
  const { Books, LearningResources } = db;
  let userLearningResources = await LearningResources.find({ userId });
  try {
    const createdResource = await createResource(
      req,
      res,
      Books,
      userLearningResources
    );
    res.status(200).json(createdResource);
  } catch (err) {
    return next(err);
  }
};

const getAllBooksResources = async (req, res, next) => {
  const { userId } = req.params;
  const { Books, LearningResources } = db;
  let userLearningResources = await LearningResources.find({ userId });
  try {
    const allResources = await getAllResources(Books, userLearningResources);
    res.status(200).json(allResources);
  } catch (err) {
    return next(err);
  }
};

const deleteBooksResource = async (req, res, next) => {
  const { Books } = db;
  try {
    const resourceToRemove = await deleteResource(req, Books);
    res.status(200).json(resourceToRemove);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createBooksResource,
  getAllBooksResources,
  deleteBooksResource,
};
