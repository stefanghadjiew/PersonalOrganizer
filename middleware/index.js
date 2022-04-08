const { createUser, loginUser } = require("./users.js");
const {
  createJavascriptResource,
  getAllJavascriptResources,
  deleteJavascriptResource,
} = require("./javascript.js");
const {
  createReactJsResource,
  getAllReactJsResources,
  deleteReactJsResource,
} = require("./reactjs.js");
const {
  createNodeJsResource,
  getAllNodeJsResources,
  deleteNodeJsResource,
} = require("./nodejs.js");
const {
  createNpmPackagesResource,
  getAllNpmPackagesResources,
  deleteNpmPackagesResource,
} = require("./npmPackages.js");
const {
  createOthersResource,
  getAllOthersResources,
  deleteOthersResource,
} = require("./others.js");
const {
  createCSSResource,
  getAllCSSResources,
  deleteCSSResource,
} = require("./css.js");
const {
  createBooksResource,
  getAllBooksResources,
  deleteBooksResource,
} = require("./books.js");
const {
  createGitResource,
  getAllGitResources,
  deleteGitResource,
} = require("./git.js");

module.exports = {
  createUser,
  loginUser,
  createJavascriptResource,
  getAllJavascriptResources,
  deleteJavascriptResource,
  createReactJsResource,
  getAllReactJsResources,
  deleteReactJsResource,
  createNodeJsResource,
  getAllNodeJsResources,
  deleteNodeJsResource,
  createNpmPackagesResource,
  getAllNpmPackagesResources,
  deleteNpmPackagesResource,
  createOthersResource,
  getAllOthersResources,
  deleteOthersResource,
  createCSSResource,
  getAllCSSResources,
  deleteCSSResource,
  createBooksResource,
  getAllBooksResources,
  deleteBooksResource,
  createGitResource,
  getAllGitResources,
  deleteGitResource,
};
