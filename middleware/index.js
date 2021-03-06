const { createUser, loginUser, changePassword } = require("./users.js");
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
const {
  createProject,
  createProjectTask,
  createProjectTaskSubtask,
  createProjecTaskTag,
  createProjectTaskSubtaskTag,
  getAllProjects,
  deleteProject,
  deleteProjectTask,
  deleteProjectTaskSubtask,
  editProject,
  editProjectTask,
  editProjectTaskSubtask,
  markTaskAsDone,
  markTaskSubtaskAsDone,
  deleteProjectTaskTag,
  deleteProjectTaskSubtaskTag,
} = require("./projects.js");

module.exports = {
  createUser,
  loginUser,
  changePassword,
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
  createProject,
  createProjectTask,
  createProjectTaskSubtask,
  createProjecTaskTag,
  createProjectTaskSubtaskTag,
  getAllProjects,
  deleteProject,
  deleteProjectTask,
  deleteProjectTaskSubtask,
  editProject,
  editProjectTask,
  editProjectTaskSubtask,
  markTaskAsDone,
  markTaskSubtaskAsDone,
  deleteProjectTaskTag,
  deleteProjectTaskSubtaskTag,
};
