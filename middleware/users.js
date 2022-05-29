const db = require("../db/index.js");
const jwt = require("jsonwebtoken");
const {
  checkUserLoginPayload,
  checkUserRegisterPayload,
} = require("../helperFunctions.js");

const createUser = async (req, res, next) => {
  const userInfo = req.body;
  const userInfoForDb = {
    name: userInfo.firstName,
    lastName: userInfo.lastName,
    email: userInfo.email,
    password: userInfo.password,
  };
  if (checkUserRegisterPayload(userInfo)) {
    try {
      let userExists = await db.Users.findOne({ email: userInfo.email });
      if (userExists) {
        return res.status(409).json({ message: "User already exists" });
      }
      let user = await db.Users.create(userInfoForDb);
      const userLearningResources = await db.LearningResources.create({
        userId: user._id,
      });
      user.learningResources.push(userLearningResources._id);
      await user.save();
      const userInfoForToken = { email: user.email, password: user.password };
      return res.status(200).json({
        message: "You have been logged in successfully!",
        name: user.name,
        id: user._id,
        token: jwt.sign(userInfoForToken, process.env.JWT_SECRET_KEY),
      });
    } catch (err) {
      return next(err);
    }
  } else {
    res.status(400).json({
      message: "One or more fields do not meet the requirements!",
    });
  }
};

const loginUser = async (req, res, next) => {
  const userInfo = req.body;
  try {
    if (checkUserLoginPayload(userInfo)) {
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
        res.status(404).json({ message: "User not found" });
      }
    } else {
      res.status(400).json({
        message: "Email and/or password do not meet the requirements",
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
