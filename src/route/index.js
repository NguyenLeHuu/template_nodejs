const express = require("express");

let router = express();

const accountRoute = require("./accountRoute");
const postRoute = require("./postRoute");
const favoritePostRoute = require("./favoritePostRoute");
const bookSchedulesRoute = require("./bookSchedulesRoute");
const configRoute = require("./configRoute");
const stripeRouter = require("../payment/stripe");

router.use("/account", accountRoute);
router.use("/post", postRoute);
router.use("/favorite-post", favoritePostRoute);
router.use("/book-schedules", bookSchedulesRoute);
router.use("/config", configRoute);
router.use("/stripe", stripeRouter);


module.exports = router;