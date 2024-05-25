const jwt = require("jsonwebtoken");
const db = require("../models/index");

const isAuthenticated = (req, res, next) => {
  //#swagger.autoHeaders=false
  try {
    const authorizationHeader = req.headers["authorization"];
    // console.log("____Token lay tu client " + authorizationHeader);
    const accessToken = authorizationHeader.split(" ")[1];
    const decodeJwt = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    //set account_id to req object
    req.account_id = decodeJwt.account_id;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).send("Token Expired");
    }
    console.log("____authentication not valid");
    return res.status(401).send("Authentication not valid");
  }
};

const isManager = async (req, res, next) => {
  try {
    const account_id = req.account_id;
    const account = await db.account.findByPk(account_id);
    if (account) {
      if (account.role === "manager") {
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

const isVet = async (req, res, next) => {
  try {
    const account_id = req.account_id;
    const vet = await db.veterinarian.findByPk(account_id);
    if (vet) {
      next();
    } else {
      return res.status(401).send("Authorize is not valid");
    }
  } catch (error) {
    return res.status(401).send("Authentication not valid");
  }
};

const isCustomer = async (req, res, next) => {
  try {
    const account_id = req.account_id;
    const customer = await db.customer.findByPk(account_id);
    if (customer) {
      next();
    } else {
      return res.status(401).send("Authentication not valid");
    }
  } catch (error) {
    return res.status(401).send("Authentication not valid");
  }
};

const isStaff = async (req, res, next) => {
  try {
    const account_id = req.account_id;
    const account = await db.account.findByPk(account_id);
    if (account) {
      if (account.role === "staff") {
        next();
      } else {
        return res.status(401).send("Authentication not valid");
      }
    } else {
      return res.status(404).send("Account not exist");
    }
  } catch (error) {
    return res.status(401).send("Authentication not valid");
  }
};

const isPersonOfClinic = async (req, res, next) => {
  try {
    const account_id = req.account_id;
    const account = await db.account.findByPk(account_id);
    if (account) {
      if (account.role !== "customer") next();
    } else {
      return res.status(401).send("Authentication not valid");
    }
  } catch (error) {
    return res.status(401).send("Authentication not valid");
  }
};

const userOfSystem = async (req, res, next) => {
  try {
    const account_id = req.account_id;
    const account = await db.account.findByPk(account_id);
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
  isManager,
  isVet,
  isStaff,
  isCustomer,
  isPersonOfClinic,
  userOfSystem,
};