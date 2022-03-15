const express = require("express");
const {
  createUser,
  loginUser,
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
} = require("./middleware/index.js");

const router = express.Router();

router.post("/users/create", createUser);
router.post("/login", loginUser);

router.post("/users/:userId/javascript/create", createJavascriptResource);
router.get("/users/:userId/javascript/all", getAllJavascriptResources);
router.delete("/javascript/:resourceId/delete", deleteJavascriptResource);

router.post("/users/:userId/react/create", createReactJsResource);
router.get("/users/:userId/react/all", getAllReactJsResources);
router.delete("/react/:resourceId/delete", deleteReactJsResource);

router.post("/users/:userId/nodejs/create", createNodeJsResource);
router.get("/users/:userId/nodejs/all", getAllNodeJsResources);
router.delete("/nodejs/:resourceId/delete", deleteNodeJsResource);

router.post("/users/:userId/npm-packages/create", createNpmPackagesResource);
router.get("/users/:userId/npm-packages/all", getAllNpmPackagesResources);
router.delete("/npm-packages/:resourceId/delete", deleteNpmPackagesResource);

router.post("/users/:userId/others/create", createOthersResource);
router.get("/users/:userId/others/all", getAllOthersResources);
router.delete("/others/:resourceId/delete", deleteOthersResource);

module.exports = router;
