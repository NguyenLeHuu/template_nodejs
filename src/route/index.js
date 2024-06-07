const express = require("express");

let router = express();

const authtRoute = require("./authRoute");
const accountRoute = require("./accountRoute");
const productRoute = require("./productRoute");
const orderRoute = require("./orderRoute");

router.use("/auth", authtRoute);
router.use("/account", accountRoute);
router.use("/product", productRoute);
router.use("/order", orderRoute);


module.exports = router;