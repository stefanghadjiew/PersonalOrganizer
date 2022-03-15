const db = require("../db/index.js");
const jwt = require("jsonwebtoken");
const { checkUserPayload } = require("../helperFunctions.js");

const createUser = async (req, res, next) => {
  const userInfo = req.body;
  if (checkUserPayload(userInfo)) {
    try {
      let user = await db.Users.create(userInfo);
      const userLearningResources = await db.LearningResources.create({
        userId: user._id,
      });
      user.learningResources.push(userLearningResources._id);
      await user.save();
      return res.status(200).json(user);
    } catch (err) {
      return next(err);
    }
  } else {
    res.status(400).json({
      message: "Username and/or password need to be atleast 6 characters long",
    });
  }
};

const loginUser = async (req, res, next) => {
  const userInfo = req.body;
  try {
    if (checkUserPayload(userInfo)) {
      let user = await db.Users.findOne({ email: userInfo.email });
      if (user) {
        let isMatch = await user.comparePassword(userInfo.password);
        isMatch
          ? res.status(200).json({
              message: "Login successfull",
              name: user.name,
              id: user.id,
              token: jwt.sign(userInfo, process.env.JWT_SECRET_KEY),
            })
          : next({ status: 400, message: "Wrong username/password" });
      } else {
        res.status(404).json({ message: "No such user found" });
      }
    } else {
      res.status(400).json({
        message:
          "Username and/or password need to be atleast 6 characters long",
      });
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createUser,
  loginUser,
};
