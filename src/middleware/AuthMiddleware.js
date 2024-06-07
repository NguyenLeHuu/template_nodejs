const jwt = require("jsonwebtoken");
const model = require("../models/index");

const isAuthenticated = (req, res, next) => {
  //#swagger.autoHeaders=false
  try {
    const authorizationHeader = req.headers["authorization"];
    const accessToken = authorizationHeader.split(" ")[1];
    const decodeJwt = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user_id = decodeJwt.user_id;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).send("Token Expired");
    }
    console.log("____authentication not valid");
    return res.status(401).send("Authentication not valid");
  }
};

const isPM = async (req, res, next) => {
  try {
    const user_id = req.user_id;
    const account = await model.User.findById(user_id);
    if (account) {
      if (account.role === "PM") {
        next();
      } else {
        return res.status(401).send("Authentication not valid");
      }
    } else {
      return res.status(401).send("Authorize is not valid");
    }
  } catch (error) {
    return res.status(401).send("Authentication not valid");
  }
};

const isDev = async (req, res, next) => {
  try {
    const user_id = req.user_id;
    const account = await model.User.findById(user_id);
    if (account) {
      if (account.role === "dev") {
        next();
      } else {
        return res.status(401).send("Authentication not valid");
      }
    } else {
      return res.status(401).send("Authorize is not valid");
    }
  } catch (error) {
    return res.status(401).send("Authentication not valid");
  }
};

const userOfSystem = async (req, res, next) => {
  try {
    const user_id = req.user_id;
    const account = await model.User.findById(user_id);
    if (account) {
      next();
    } else {
      return res.status(401).send("Authentication not valid");
    }
  } catch (error) {
    return res.status(401).send("Authentication not valid");
  }
};

module.exports = {
  isAuthenticated,
  isPM,
  isDev,
  userOfSystem,
};