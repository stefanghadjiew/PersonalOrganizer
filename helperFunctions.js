const linkPreviewGenerator = require("link-preview-generator");
const db = require("./db/index.js");

const checkUserPayload = (userInfo) => {
  return (
    Object.keys(userInfo).length !== 0 &&
    userInfo.hasOwnProperty("email") &&
    userInfo.hasOwnProperty("password") &&
    userInfo.email.length !== 0 &&
    userInfo.password.length > 6
  );
};

const createResource = async (req, collection, userLearningResources) => {
  const { link } = req.body;
  const resourcePreview = await linkPreviewGenerator(link);
  const createdResource = await collection.create({
    ...resourcePreview,
    learningResourcesId: userLearningResources[0]._id,
    link,
  });
  switch (collection) {
    case db.Javascript:
      userLearningResources[0].javascript.push(createdResource._id);
      break;
    case db.NodeJs:
      userLearningResources[0].nodejs.push(createdResource._id);
      break;
    case db.Books:
      userLearningResources[0].books.push(createdResource._id);
      break;
    case db.FutureProjects:
      userLearningResources[0].futureProjects.push(createdResource._id);
      break;
    case db.NpmPackages:
      userLearningResources[0].npmPackages.push(createdResource._id);
      break;
    case db.ReactJs:
      userLearningResources[0].reactjs.push(createdResource._id);
      break;
    case db.Projects:
      userLearningResources[0].projects.push(createdResource._id);
      break;
    case db.Others:
      userLearningResources[0].others.push(createdResource._id);
      break;
    case db.CSS:
      userLearningResources[0].css.push(createdResource._id);
      break;
    default:
      return;
  }

  await userLearningResources[0].save();
  return createdResource;
};

const deleteResource = async (req, collection) => {
  const { resourceId } = req.params;
  let resourceToRemove = await collection.findById(resourceId);
  await collection.deleteOne(resourceToRemove); // each Schema has pre-deleteOne(remove deprecated) hook for the userLearningResources
  return resourceToRemove;
};

const getAllResources = async (collection, userLearningResources) => {
  let arrFromUserLearningResources;
  switch (collection) {
    case db.Javascript:
      arrFromUserLearningResources = userLearningResources[0].javascript;
      break;
    case db.NodeJs:
      arrFromUserLearningResources = userLearningResources[0].nodejs;
      break;
    case db.ReactJs:
      arrFromUserLearningResources = userLearningResources[0].reactjs;
      break;
    case db.Books:
      arrFromUserLearningResources = userLearningResources[0].books;
      break;
    case db.FutureProjects:
      arrFromUserLearningResources = userLearningResources[0].futureProjects;
      break;
    case db.NpmPackages:
      arrFromUserLearningResources = userLearningResources[0].npmPackages;
      break;
    case db.Others:
      arrFromUserLearningResources = userLearningResources[0].others;
      break;
    case db.Projects:
      arrFromUserLearningResources = userLearningResources[0].projects;
      break;
    case db.CSS:
      arrFromUserLearningResources = userLearningResources[0].css;
      break;
    default:
      return;
  }
  const allResources = await collection.find({
    _id: { $in: arrFromUserLearningResources },
  });
  return allResources;
};

module.exports = {
  createResource,
  deleteResource,
  getAllResources,
  checkUserPayload,
};
