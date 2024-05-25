const express = require("express");

let router = express();

const loginRoute = require("./LoginRoute");

router.use("/login", loginRoute);

module.exports = router;