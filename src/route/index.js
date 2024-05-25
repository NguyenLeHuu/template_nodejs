const express = require("express");

let router = express();

const accountRoute = require("./accountRoute");

router.use("/account", accountRoute);
// router.use("/post", accountRoute);
// router.use("/favorite-post", accountRoute);
// router.use("/book-schedules", accountRoute);

module.exports = router;