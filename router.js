const express = require("express");
const {
  createUser,
  loginUser,
  changePassword,
  createJavascriptResource,
  deleteJavascriptResource,
  getAllJavascriptResources,
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
} = require("./middleware/index.js");

const router = express.Router();

router.post("/users/create", createUser);
router.post("/login", loginUser);
router.post("/change-password", changePassword);

router.post("/users/:userId/javascript/create", createJavascriptResource);
router.get("/users/:userId/javascript/all", getAllJavascriptResources);
router.delete("/javascript/:resourceId/delete", deleteJavascriptResource);

router.post("/users/:userId/css/create", createCSSResource);
router.get("/users/:userId/css/all", getAllCSSResources);
router.delete("/css/:resourceId/delete", deleteCSSResource);

router.post("/users/:userId/reactjs/create", createReactJsResource);
router.get("/users/:userId/reactjs/all", getAllReactJsResources);
router.delete("/reactjs/:resourceId/delete", deleteReactJsResource);

router.post("/users/:userId/nodejs/create", createNodeJsResource);
router.get("/users/:userId/nodejs/all", getAllNodeJsResources);
router.delete("/nodejs/:resourceId/delete", deleteNodeJsResource);

router.post("/users/:userId/npm-packages/create", createNpmPackagesResource);
router.get("/users/:userId/npm-packages/all", getAllNpmPackagesResources);
router.delete("/npm-packages/:resourceId/delete", deleteNpmPackagesResource);

router.post("/users/:userId/others/create", createOthersResource);
router.get("/users/:userId/others/all", getAllOthersResources);
router.delete("/others/:resourceId/delete", deleteOthersResource);

router.post("/users/:userId/books/create", createBooksResource);
router.get("/users/:userId/books/all", getAllBooksResources);
router.delete("/books/:resourceId/delete", deleteBooksResource);

router.post("/users/:userId/git/create", createGitResource);
router.get("/users/:userId/git/all", getAllGitResources);
router.delete("/git/:resourceId/delete", deleteGitResource);

router.post("/users/:userId/projects/create", createProject);
router.post("/projects/:projectId/tasks/create", createProjectTask);
router.post(
  "/projects/:projectId/tasks/:taskId/subtasks/create",
  createProjectTaskSubtask
);
router.post(
  "/projects/:projectId/tasks/:taskId/tags/create",
  createProjecTaskTag
);
router.post(
  "/projects/:projectId/tasks/:taskId/subtasks/:subtaskId/tags/create",
  createProjectTaskSubtaskTag
);
router.get("/users/:userId/projects/all", getAllProjects);
router.delete("/projects/:projectId/delete", deleteProject);
router.delete("/projects/:projectId/tasks/:taskId/delete", deleteProjectTask);
router.delete(
  "/projects/:projectId/tasks/:taskId/subtasks/:subtaskId/delete",
  deleteProjectTaskSubtask
);

router.delete(
  "/projects/:projectId/tasks/:taskId/tags/delete",
  deleteProjectTaskTag
);
router.delete(
  "/projects/:projectId/task/:taskId/subtasks/:subtaskId/tags/delete",
  deleteProjectTaskSubtaskTag
);

router.put("/projects/:projectId/edit", editProject);
router.put("/projects/:projectId/tasks/:taskId/edit", editProjectTask);
router.put(
  "/projects/:projectId/tasks/:taskId/subtasks/:subtaskId/edit",
  editProjectTaskSubtask
);
router.put(
  "/projects/:projectId/tasks/:taskId/mark-task-as-done",
  markTaskAsDone
);
router.put(
  "/projects/:projectId/tasks/:taskId/subtasks/:subtaskId/mark-subtask-as-done",
  markTaskSubtaskAsDone
);

module.exports = router;
