/* import mongoose from 'mongoose' */
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGO_ATLAS_CONNECT_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports.Users = require("../models/Users.js");
module.exports.Javascript = require("../models/Javascript.js");
module.exports.NpmPackages = require("../models/npmPackages.js");
module.exports.LearningResources = require("../models/LearningResources.js");
module.exports.ReactJs = require("../models/ReactJs.js");
module.exports.NodeJs = require("../models/NodeJs.js");
module.exports.Books = require("../models/Books.js");
module.exports.Projects = require("../models/Projects.js");
module.exports.FutureProjects = require("../models/FutureProjects.js");
module.exports.Others = require("../models/Others.js");
module.exports.CSS = require("../models/CSS.js");
module.exports.GIT = require("../models/GIT.js");
module.exports.Projects = require("../models/Projects.js");
